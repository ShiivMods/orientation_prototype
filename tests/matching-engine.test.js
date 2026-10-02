const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const catalog = fs.readFileSync(path.join(root, 'assets/js/catalog.js'), 'utf8');
const engine = fs.readFileSync(path.join(root, 'assets/js/matching-engine.js'), 'utf8');

function makeContext(profile) {
  const context = vm.createContext({ profile });
  vm.runInContext(catalog + '\n' + engine, context, { filename: 'justecap-engine.js' });
  return context;
}

function baseProfile(overrides = {}) {
  return {
    education: 2,
    maxTraining: 12,
    salary: 1600,
    skills: ['Utiliser des outils numériques', 'Résoudre des problèmes'],
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
