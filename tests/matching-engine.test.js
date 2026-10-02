const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const catalog = fs.readFileSync(path.join(root, 'assets/js/catalog.js'), 'utf8');
const taxonomy = fs.readFileSync(path.join(root, 'assets/js/skills-taxonomy.js'), 'utf8');
const engine = fs.readFileSync(path.join(root, 'assets/js/matching-engine.js'), 'utf8');

function makeContext(profile) {
  const context = vm.createContext({ profile });
  vm.runInContext(catalog + '\n' + taxonomy + '\n' + engine, context, { filename: 'justecap-engine.js' });
  return context;
}

function baseProfile(overrides = {}) {
  return {
    education: 2,
    maxTraining: 12,
    salary: 1600,
    skills: [],
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
