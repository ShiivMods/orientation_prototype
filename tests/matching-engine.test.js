const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const catalog = fs.readFileSync(path.join(root, 'assets/js/catalog.js'), 'utf8');
const taxonomy = fs.readFileSync(path.join(root, 'assets/js/skills-taxonomy.js'), 'utf8');
const largeJobs = fs.readFileSync(path.join(root, 'assets/js/jobs-large.js'), 'utf8');
const engine = fs.readFileSync(path.join(root, 'assets/js/matching-engine.js'), 'utf8');

function makeContext(profile) {
  const context = vm.createContext({ profile });
  vm.runInContext(catalog + '\n' + taxonomy + '\n' + largeJobs + '\n' + engine, context, { filename: 'justecap-engine.js' });
  return context;
}

function baseProfile(overrides = {}) {
  return {
    education: 2,
    maxTraining: 12,
    salary: 1600,
    skills: [],
    genericSkills: [],
    skillMacros: ['numerique-02', 'analyse-04'],
    soft: ['Curiosité', 'Rigueur', 'Autonomie'],
    qualitiesSelected: [],
    defectsSelected: [],
    hobbiesSelected: [],
    experienceSelected: [],
    disabilitiesSelected: [],
    functionalLimits: [],
    employmentAreaIds: ['caen'],
    employmentAreaId: 'caen',
    prefs: {
      public: 'neutral', team: 'neutral', outdoor: 'neutral', physical: 'neutral',
      routine: 'neutral', travel: 'neutral', remote: 'neutral', fixed: 'neutral',
      weekend: 'neutral', night: 'neutral'
    },
    ...overrides,
  };
}

function expr(context, source) {
  return vm.runInContext(source, context);
}

test('scores stay in the 0-100 interval', () => {
  const ctx = makeContext(baseProfile());
  const scores = expr(ctx, 'jobs.map(j => scoreJob(j).total)');
  assert.ok(scores.length >= 20);
  assert.ok(scores.every(score => Number.isFinite(score) && score >= 0 && score <= 100));
});

test('professional driving limitation blocks bus driving', () => {
  const ctx = makeContext(baseProfile({ functionalLimits: ['no_professional_driving'] }));
  const result = expr(ctx, 'accessibilityAssessment(jobs.find(j => j.id === 21))');
  assert.equal(result.blocked, true);
  assert.equal(result.status, 'blocked');
});

test('visual impairment requests a regulated aptitude check instead of automatic exclusion', () => {
  const ctx = makeContext(baseProfile({ disabilitiesSelected: ['visual_impairment'] }));
  const result = expr(ctx, 'accessibilityAssessment(jobs.find(j => j.id === 21))');
  assert.equal(result.blocked, false);
  assert.equal(result.status, 'check');
});

test('blindness blocks the regulated bus-driving demo case', () => {
  const ctx = makeContext(baseProfile({ disabilitiesSelected: ['blindness'] }));
  const result = expr(ctx, 'accessibilityAssessment(jobs.find(j => j.id === 21))');
  assert.equal(result.blocked, true);
});

test('local market demo index is deterministic for the same job and basin', () => {
  const ctx = makeContext(baseProfile());
  const pair = expr(ctx, "(() => { const job = jobs.find(j => j.id === 2); const basin = getBasinById('caen'); return [localMarketForBasin(job, basin).index, localMarketForBasin(job, basin).index]; })()");
  assert.equal(pair[0], pair[1]);
});


test('neutral preferences do not add compatibility points', () => {
  const ctx = makeContext(baseProfile());
  const pref = expr(ctx, 'preferenceScore(jobs.find(j => j.id === 2))');
  assert.equal(pref.score, null);
  assert.equal(pref.activeCount, 0);
});

test('an empty evidence profile does not receive free compatibility points', () => {
  const ctx = makeContext(baseProfile({
    skills: [],
    genericSkills: [],
    skillMacros: [],
    soft: [],
    qualitiesSelected: [],
    prefs: {
      public: 'neutral', team: 'neutral', outdoor: 'neutral', physical: 'neutral',
      routine: 'neutral', travel: 'neutral', remote: 'neutral', fixed: 'neutral',
      weekend: 'neutral', night: 'neutral'
    }
  }));
  const totals = expr(ctx, 'jobs.map(j => scoreJob(j).total)');
  assert.ok(totals.every(score => score === 0));
});

test('Caen BMO demo data matches the published 2026 values', () => {
  const ctx = makeContext(baseProfile());
  const caen = expr(ctx, "getBasinById('caen')");
  assert.equal(caen.projects, 16010);
  assert.equal(caen.difficulty, 43.2);
  assert.equal(caen.seasonal, 30.3);
});


test('key demo jobs expose verified ROME references', () => {
  const ctx = makeContext(baseProfile());
  const refs = expr(ctx, 'Object.fromEntries(jobs.map(j => [j.id, j.rome]))');
  assert.equal(refs[1], 'K1801');
  assert.equal(refs[2], 'I1401');
  assert.equal(refs[3], 'N1103');
  assert.equal(refs[13], 'M1805');
  assert.equal(refs[20], 'I1604');
  assert.equal(refs[21], 'N4103');
});

test('generic demo job titles are not forced into a ROME family', () => {
  const ctx = makeContext(baseProfile());
  const refs = expr(ctx, '[jobs.find(j=>j.id===4).rome, jobs.find(j=>j.id===5).rome, jobs.find(j=>j.id===9).rome]');
  assert.deepEqual(Array.from(refs), [null, null, null]);
});


test('taxonomy exposes exactly 15 categories, 167 macros and 668 details', () => {
  const ctx = makeContext(baseProfile());
  const stats = expr(ctx, 'skillTaxonomyStats');
  assert.equal(stats.categories, 15);
  assert.equal(stats.macros, 167);
  assert.equal(stats.details, 668);
});

test('skill taxonomy search data contains common precise terms', () => {
  const ctx = makeContext(baseProfile());
  const text = expr(ctx, 'skillTaxonomy.flatMap(s => [s.label, ...(s.details||[])]).join(" | ")');
  assert.match(text, /Excel/i);
  assert.match(text, /JavaScript/i);
  assert.match(text, /soudage/i);
  assert.match(text, /CACES/i);
});

test('same skill family gives partial coverage instead of an exact match', () => {
  const ctx = makeContext(baseProfile({ skillMacros: ['numerique-01'] }));
  const score = expr(ctx, 'macroSkillCoverage(jobs.find(j => j.id === 13), profile.skillMacros)');
  assert.ok(score > 0 && score < 100);
});


test('explicit job skill mappings stay semantically coherent for demo-critical jobs', () => {
  const ctx = makeContext(baseProfile());
  const dev = expr(ctx, 'jobMacroRequirements(jobs.find(j=>j.id===13)).map(id=>skillById.get(id).label)');
  const bus = expr(ctx, 'jobMacroRequirements(jobs.find(j=>j.id===21)).map(id=>skillById.get(id).label)');
  const cook = expr(ctx, 'jobMacroRequirements(jobs.find(j=>j.id===17)).map(id=>skillById.get(id).label)');
  assert.ok(dev.includes('Développer une application web'));
  assert.ok(dev.includes('Créer une interface web'));
  assert.ok(bus.includes('Conduire un véhicule de transport collectif'));
  assert.ok(bus.includes('Prendre en charge des passagers'));
  assert.ok(cook.includes("Respecter des règles d'hygiène"));
  assert.ok(!dev.includes('Retoucher une image'));
  assert.ok(!cook.includes('Contrôler un accès'));
});

test('every current demo job has an explicit macro-skill mapping', () => {
  const ctx = makeContext(baseProfile());
  const missing = expr(ctx, 'jobs.filter(j=>!Array.isArray(j.skillMacroIds)||!j.skillMacroIds.length).map(j=>j.title)');
  assert.deepEqual(Array.from(missing), []);
});


test('large demo catalog restores 301 unique jobs', () => {
  const ctx = makeContext(baseProfile());
  const stats = expr(ctx, 'LARGE_DEMO_CATALOG_STATS');
  const titles = expr(ctx, 'jobs.map(j=>j.title.toLocaleLowerCase("fr"))');
  assert.equal(stats.enriched, 21);
  assert.equal(stats.secondary, 280);
  assert.equal(stats.total, 301);
  assert.equal(new Set(Array.from(titles)).size, 301);
});

test('all large-catalog skill mappings reference valid taxonomy entries', () => {
  const ctx = makeContext(baseProfile());
  const invalid = expr(ctx, 'jobs.flatMap(j=>(j.skillMacroIds||[]).filter(id=>!skillById.has(id)).map(id=>({title:j.title,id})))');
  assert.deepEqual(Array.from(invalid), []);
});

test('large catalog includes diverse searchable professions', () => {
  const ctx = makeContext(baseProfile());
  const titles = expr(ctx, 'jobs.map(j=>j.title)');
  for (const expected of ['Plombier','Data analyst','Infirmier','Boulanger','Agent immobilier','Éducateur spécialisé']) {
    assert.ok(titles.includes(expected), expected + ' missing from catalog');
  }
});


test('generic skills contribute less than an exact detailed skill for the same requirement', () => {
  const genericCtx = makeContext(baseProfile({ genericSkills: ['Utiliser des outils numériques'], skillMacros: [] }));
  const exactCtx = makeContext(baseProfile({ genericSkills: [], skillMacros: ['creation-09'] }));
  const genericScore = expr(genericCtx, "macroSkillCoverage({skillMacroIds:['creation-09']}, profile.skillMacros)");
  const exactScore = expr(exactCtx, "macroSkillCoverage({skillMacroIds:['creation-09']}, profile.skillMacros)");
  assert.ok(genericScore > 0);
  assert.ok(genericScore < exactScore);
  assert.equal(exactScore, 100);
});
