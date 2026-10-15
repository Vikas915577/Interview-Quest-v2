'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = __dirname;

const context = { window: {}, console: { warn: (message) => { throw new Error(message); }, log: () => {} } };
vm.runInNewContext(fs.readFileSync(path.join(root, 'question-bank.js'), 'utf8'), context, { filename: 'question-bank.js' });
const questions = context.window.INTERVIEW_QUESTIONS;
assert.equal(context.window.INTERVIEW_QUESTION_BANK_VERSION, '3.0.0', 'question bank version must be 3.0.0');
assert.ok(Array.isArray(questions), 'question bank must export an array');
assert.equal(questions.length, 300, 'question bank must contain 300 unique, valid questions');

const allowedDifficulty = new Set(['Beginner', 'Intermediate', 'Interview']);
const allowedType = new Set(['Concept', 'Practical', 'Scenario', 'Communication', 'Behavioral', 'Technical']);
const ids = new Set();
const questionTexts = new Set();
const categories = new Set();
const roles = new Set();
for (const q of questions) {
  assert.ok(q && typeof q === 'object', 'question must be an object');
  for (const field of ['id', 'category', 'difficulty', 'type', 'question', 'answer', 'tip']) {
    assert.equal(typeof q[field], 'string', `${q.id || 'unknown'}: ${field} must be a string`);
  }
  for (const field of ['id', 'category', 'question', 'answer']) assert.ok(q[field].trim(), `${q.id}: ${field} must not be blank`);
  assert.ok(allowedDifficulty.has(q.difficulty), `${q.id}: unsupported difficulty ${q.difficulty}`);
  assert.ok(allowedType.has(q.type), `${q.id}: unsupported type ${q.type}`);
  assert.ok(!ids.has(q.id), `duplicate ID: ${q.id}`); ids.add(q.id);
  const normalized = q.question.trim().toLocaleLowerCase('en');
  assert.ok(!questionTexts.has(normalized), `duplicate question text: ${q.question}`); questionTexts.add(normalized);
  assert.ok(Array.isArray(q.roles) && q.roles.length > 0, `${q.id}: role tags must be a non-empty array`);
  assert.ok(q.roles.every(r => typeof r === 'string' && r.trim()), `${q.id}: roles must be strings`);
  if (q.source) assert.ok(typeof q.source.url === 'string' && /^https:\/\//.test(q.source.url), `${q.id}: reference URL must be HTTPS when supplied`);
  q.roles.forEach(r => roles.add(r));
  categories.add(q.category);
}
assert.equal(categories.size, 13, 'expected 13 topic categories');
assert.ok(['Data Analyst','BI Analyst','Junior BI Developer','Junior Data Engineer','MIS/Reporting Analyst','Business Analyst','All roles'].every(r=>roles.has(r)), 'expected all target role tags');
for (let i=1; i<=100; i++) assert.equal(questions[i-1].id, `iq-${String(i).padStart(3,'0')}`, `legacy saved question ID changed at position ${i}`);
assert.equal(questions[100].id, 'iq-101', 'first added question should begin at iq-101');
assert.ok(questions.some(q => q.followUp), 'follow-up practice fields should be present');

const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
for (const id of ['question-role', 'question-category', 'question-difficulty', 'question-type', 'question-load-error', 'question-bank-list']) assert.ok(html.includes(`id="${id}"`), `missing UI element ${id}`);
assert.ok(html.indexOf('src="question-bank.js"') < html.indexOf('src="app.js"'), 'question bank must load before app.js');
assert.ok(html.includes('id="bank-total">300</strong>'), 'initial question count should match the bank');
const sw = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
assert.ok(sw.includes("const CACHE_NAME = 'interview-quest-v3'"), 'service worker cache must be versioned for V3');
for (const file of ['./index.html','./style.css','./app.js','./question-bank.js','./manifest.webmanifest','./icon.svg']) assert.ok(sw.includes(file), `service worker missing ${file}`);
JSON.parse(fs.readFileSync(path.join(root, 'manifest.webmanifest'), 'utf8'));
console.log(`PASS: ${questions.length} questions; ${ids.size} unique IDs; ${questionTexts.size} unique question texts; ${categories.size} categories; ${roles.size} role labels.`);
console.log('PASS: required fields, supported levels/types, references, legacy IDs, role filters, load-error fallback, script order and V3 cache configuration.');
