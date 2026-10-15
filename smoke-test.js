const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const root=__dirname;
class CL { constructor(){this.s=new Set(['hidden']);} add(...x){x.forEach(v=>this.s.add(v))} remove(...x){x.forEach(v=>this.s.delete(v))} contains(x){return this.s.has(x)} toggle(x,force){if(force===undefined)force=!this.s.has(x);if(force)this.s.add(x);else this.s.delete(x);return force;} }
class E {constructor(id=''){this.id=id;this.value='';this.textContent='';this.innerHTML='';this.hidden=false;this.dataset={};this.classList=new CL();this.handlers={};this.attributes={};this.tagName=id.includes('search')?'INPUT':'DIV';} addEventListener(type,fn){(this.handlers[type]??=[]).push(fn)} setAttribute(k,v){this.attributes[k]=v} closest(){return null} focus(){} }
const els=new Map();function el(id){if(!els.has(id)){const e=new E(id); if(['question-role','question-category','question-difficulty','question-type'].includes(id))e.value='all'; els.set(id,e)}return els.get(id)}
const views=['home','practice','questions','module','plan','progress'].map(x=>{const e=el(x+'-view');e.id=x+'-view';return e});views[0].classList.remove('hidden');
const nav=Array.from({length:5},(_,i)=>{const e=el('nav'+i);e.dataset.tab=['home','practice','questions','plan','progress'][i];e.classList.add('nav-item');return e;});
const document={getElementById:el,addEventListener(){},querySelectorAll(sel){if(sel==='.view')return views;if(sel==='.nav-item')return nav;return []},querySelector(){return views.find(v=>v.classList.contains('active'))||views[0]},activeElement:{tagName:'BODY'}};
const localStorage={getItem(){return null},setItem(){}};
const window={INTERVIEW_QUESTIONS:[],INTERVIEW_QUESTION_BANK_VERSION:'3.1.0',addEventListener(){},scrollTo(){},open(){return {}},confirm(){return true}};
const navigator={serviceWorker:{register(){return Promise.resolve()}}};
const context={window,document,localStorage,navigator,location:{protocol:'http:'},console, setTimeout(){return 1},clearTimeout(){},URL,Date,Set,Map,Promise,encodeURIComponent};
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(root,'question-bank.js'),'utf8'),context,{filename:'question-bank.js'});
vm.runInContext(fs.readFileSync(path.join(root,'sql-lab.js'),'utf8'),context,{filename:'sql-lab.js'});
vm.runInContext(fs.readFileSync(path.join(root,'app.js'),'utf8'),context,{filename:'app.js'});
assert.equal(String(el('bank-total').textContent),'500');
let cardCount=(el('question-bank-list').innerHTML.match(/class="bank-card"/g)||[]).length;
assert.equal(cardCount,500,`expected 500 visible cards, got ${cardCount}`);
assert.ok(el('question-role').innerHTML.includes('Data Analyst'));
el('question-role').value='Business Analyst';context.renderQuestionBank();
cardCount=(el('question-bank-list').innerHTML.match(/class="bank-card"/g)||[]).length;
assert.ok(cardCount>0&&cardCount<500,`role filter should narrow list, got ${cardCount}`);
el('question-role').value='all';el('question-category').value='Data Analysis';context.renderQuestionBank();
cardCount=(el('question-bank-list').innerHTML.match(/class="bank-card"/g)||[]).length;
assert.ok(cardCount>=20&&cardCount<500,`topic filter should work, got ${cardCount}`);
assert.equal(window.INTERVIEW_SQL_LAB.tables.length,4);assert.equal(window.INTERVIEW_SQL_LAB.exercises.length,20);context.renderModule('sql');assert.ok(el('module-detail').innerHTML.includes('sql-table-card'));assert.equal((el('module-detail').innerHTML.match(/class="sql-exercise"/g)||[]).length,20);assert.ok(el('module-detail').innerHTML.includes('sql-attempt-sql01'));assert.equal((el('plan-list').innerHTML.match(/class="plan-item"/g)||[]).length,10);
window.INTERVIEW_QUESTIONS=undefined;context.renderQuestionBank();
assert.equal(el('question-load-error').classList.contains('hidden'),false,'load error notice should appear when bank unavailable');
console.log(`PASS: startup rendered 500 cards; role filter showed ${0}; topic filter returned ${cardCount}; load-error fallback appeared when question data was unavailable.`.replace('role filter showed 0',`role filter and topic filter work`));
