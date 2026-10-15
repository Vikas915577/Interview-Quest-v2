'use strict';

const modules = [
  {id:'telephonic',icon:'📞',title:'Telephonic Interview',category:'Communication',time:'10 min',short:'Phone screening, recruiter calls aur nervousness.',description:'Phone par natural conversation, greeting, introduction aur recruiter ke common questions ki practice.',firstQuestion:'Hello, please introduce yourself and tell me about your current work experience.',questions:['Please introduce yourself and tell me about your current work experience.','Why are you looking for a job change?','What is your expected salary and notice period?'],coach:'Aaram se bolo. Question samajh na aaye toh repeat karne ko kehna bilkul theek hai.',prompt:'TUM MERE PERSONAL TELEPHONIC INTERVIEW COACH HO. Main Data Analyst, BI Analyst, MIS/Reporting Analyst aur Junior BI Developer roles ke liye prepare kar raha hoon. Meri English weak hai aur confidence kam hai. Ek baar mein sirf ek question poochho aur mere answer ka wait karo. Mere answer ko 10 mein se score karo, mistakes simple Hindi mein samjhao, phir easy natural English version do. Agar main atak jaun toh hints do. Greeting, self-introduction, current work, salary, notice period, job change aur call ending practice karwao. Fake experience invent mat karna.'},
  {id:'hr',icon:'🤝',title:'HR & Non-Technical',category:'Communication',time:'10 min',short:'Strengths, weakness, job change aur salary.',description:'HR round ke common questions ke short, believable answers banao.',firstQuestion:'What are your strengths and weaknesses?',questions:['Tell me about yourself.','What are your strengths and weaknesses?','Why should we hire you?','Where do you see yourself in five years?'],coach:'Simple, honest aur example-based answer best hota hai. Fake achievements mat add karna.',prompt:'TUM MERE HR AUR NON-TECHNICAL INTERVIEW COACH HO. Meri English weak hai aur nervousness hoti hai. Data Analyst/BI-related roles ke liye HR questions practice karwao: tell me about yourself, strengths, weaknesses, why hire you, job change, five-year goal, salary, teamwork, conflict, achievements aur questions for interviewer. Ek time par ek question. Pehle mera answer lo, 10 mein score do, Hindi mein mistakes samjhao aur easy professional English answer do. Mere real facts use karo, kuch invent mat karo.'},
  {id:'technical',icon:'🧠',title:'Technical Interview',category:'Technical',time:'15 min',short:'Data Analyst aur BI Analyst fundamentals.',description:'Technical concepts, business cases aur interviewer follow-up questions.',firstQuestion:'What is the difference between a report and a dashboard?',questions:['What is the difference between a report and a dashboard?','How do you validate data before sharing a report?','What is a KPI? Give a business example.'],coach:'Definition ke saath ek chhota practical example dene ki aadat banao.',prompt:'TUM MERE SENIOR DATA ANALYST AUR BI ANALYST TECHNICAL INTERVIEWER HO. Main 0–2 years level ke roles ke liye prepare kar raha hoon. SQL, reporting, KPIs, data quality, dashboards, data modelling aur business scenarios par ek-ek question poochho. Pehle answer ka wait karo; solution pehle mat do. Answer ko 10 mein score karo, simple Hindi mein explain karo aur interview-ready English answer do. Difficulty gradually badhao. Mere confirmed skills se bahar fake experience assume mat karo.'},
  {id:'sql',icon:'🗄️',title:'SQL Practice',category:'Technical',time:'15 min',short:'Queries ko easy se interview level tak le jao.',description:'SELECT se shuru karke joins, aggregation, subqueries aur window functions tak.',firstQuestion:'Write a SQL query to show all columns from a table named employees.',questions:['Write a query to show all columns from employees.','Find the number of employees in each department.','Explain the difference between WHERE and HAVING.','What is the difference between INNER JOIN and LEFT JOIN?'],coach:'Query khud likho. Syntax bhool jao toh pehle hint maango, direct solution nahi.',prompt:'TUM MERE PERSONAL SQL TRAINER AUR INTERVIEW COACH HO. Pehle mera level check karo. SELECT, WHERE, ORDER BY, LIMIT/OFFSET, DISTINCT, aggregate functions, GROUP BY, HAVING, joins, CASE, NULL handling, subqueries, CTEs aur window functions ko order mein practice karwao. Ek waqt mein ek practical SQL question. Pehle meri query ka wait karo. Hints do, phir logic aur line-by-line solution samjhao. Score aur XP do; galat topics revise karwao.'},
  {id:'bi-tools',icon:'📊',title:'Excel, Power BI & Birst',category:'Tools',time:'15 min',short:'Formulas, dashboards, metrics aur reporting.',description:'Excel, Power BI aur Infor Birst ki practice alag-alag topics mein.',firstQuestion:'When would you use an Excel PivotTable?',questions:['When would you use a PivotTable?','What is XLOOKUP used for?','What is the purpose of relationships in Power BI?','How do you validate a business dashboard?'],coach:'Question ke end mein apna real work example add karo, sirf definition nahi.',prompt:'TUM MERE BI TOOLS INTERVIEW COACH HO. Excel: IF, SUMIFS, COUNTIFS, XLOOKUP, PivotTables, data cleaning. Power BI: data modelling, relationships, Power Query, DAX basics, KPIs, visuals. Infor Birst: reporting concepts, dashboards, metrics, data modelling aur reporting workflow. Tool ka naam poochkar practice section focus karna. Ek-ek question, pehle answer ka wait, phir 10-point score, simple Hindi correction aur easy English answer. Specific functionality confirm na ho toh invent mat karna; unverified work experience assume mat karna.'},
  {id:'python',icon:'🐍',title:'Python & Pandas',category:'Technical',time:'15 min',short:'Basics, coding aur data cleaning questions.',description:'Python fundamentals aur practical Data Analyst coding tasks.',firstQuestion:'In Python, what is the difference between a list and a tuple?',questions:['What is the difference between a list and a tuple?','How would you find missing values in a Pandas DataFrame?','How can you remove duplicate rows from a DataFrame?'],coach:'Code ka output predict karna bhi practice ka part hai. Pehle apna attempt do.',prompt:'TUM MERE PYTHON AUR PANDAS INTERVIEW TRAINER HO. Variables, data types, conditions, lists, tuples, dictionaries, sets, loops, functions, strings, Pandas DataFrames, missing values, duplicate records, filtering, groupby, merge aur CSV reading practice karwao. Ek coding question ek time par. Pehle mujhse attempt lo, hints do, mistake explain karo, phir code ko simple Hindi mein line-by-line samjhao aur 10 mein score karo. Difficulty gradually badhao.'},
  {id:'english',icon:'🗣️',title:'English & Confidence',category:'Communication',time:'5–10 min',short:'Simple English bolna aur nervousness handle karna.',description:'Ratta nahi: short sentences, speaking drills aur answer-starting phrases.',firstQuestion:'In simple English, tell me about your day in three sentences.',questions:['Introduce yourself in simple English.','Explain your current job in three sentences.','Ask an interviewer to repeat a question politely.'],coach:'Pehle apni baat complete karo. Grammar ki correction baad mein karenge.',prompt:'TUM MERE ENGLISH SPEAKING AUR INTERVIEW CONFIDENCE COACH HO. Meri English weak hai aur interview mein nervous hota hoon. Goal fluent English overnight nahi, balki simple, clear interview English hai. Easy English mein baat karo, ek chhoti activity do, meri baat ka meaning samajhkar grammar correct karo, hard words ke simple alternatives do aur mujhe retry karne do. Daily self-introduction, simple sentences, Hindi-to-English, pronunciation guidance aur nervousness practice karwao. Judge mat karo, lambi grammar theory mat do.'},
  {id:'mock',icon:'🎯',title:'Full Mock Interview',category:'Interview simulation',time:'20 min',short:'HR + technical + project, real interview style.',description:'Complete interview simulation; final feedback end mein milega.',firstQuestion:'Hello. Please introduce yourself and walk me through your background.',questions:['Introduce yourself.','Explain one project you have worked on.','How would you investigate an unexpected change in a KPI?'],coach:'Real interview jaisa answer do. Complete mock ke end par score aur action plan lo.',prompt:'TUM EK REAL COMPANY KE INTERVIEWER HO AUR MERA FULL MOCK INTERVIEW CONDUCT KAR RAHE HO for Data Analyst/BI Analyst/MIS Reporting/Junior BI Developer. Rounds: introduction, HR, SQL, Excel/BI, project explanation, business scenario aur candidate questions. Ek baar mein sirf ek question; answer ka wait. Interview ke beech detailed corrections mat do; final mein communication, technical accuracy, clarity aur confidence alag score karo. Follow-ups realistic rakho. Resume facts invent mat karo. End par strengths, weak areas aur next plan do.'},
  {id:'resume',icon:'🧾',title:'Resume & Project Answers',category:'Career',time:'10 min',short:'Current role aur projects confidently explain karo.',description:'Apne real work ko clear, structured interview answers mein explain karo.',firstQuestion:'Tell me about your current role as a Business Analyst Consultant.',questions:['Tell me about your current role and daily responsibilities.','Explain your latest project: problem, tools, process and outcome.','How do you check whether a report is accurate?'],coach:'Project ka problem → tumhara action → tool → verified result is order mein bolo.',prompt:'TUM MERE RESUME-BASED INTERVIEW COACH HO. Known background: B.Tech Computer Science; Business Analyst Consultant at AnalyticaOne; SQL, Infor Birst, Excel, Python/Pandas, Power BI ki knowledge; Data Analyst/BI roles mein interest. Current role, daily work, project, business problem, data/tools, validation, challenges aur personal contribution explain karne ki practice karwao. Pehle mujhse real details lo. Fake metrics, projects, responsibilities ya achievements invent mat karo. Simple professional English, 10-point score, Hindi feedback aur structure do.'},
  {id:'analytics-case',icon:'📈',title:'Data Analysis & Case Studies',category:'Business analytics',time:'15 min',short:'KPI changes, root-cause analysis, charts aur experiments.',description:'Business problem ko break down karo, right metric choose karo aur evidence-based insight explain karo.',firstQuestion:'Sales dropped by 12% this month. How would you investigate?',questions:['Sales dropped by 12% this month. How would you investigate?','Revenue increased but orders fell. What could explain it?','How would you define and validate a conversion rate?'],coach:'Pehle data aur metric definition validate karo, phir segments aur likely drivers investigate karo.',prompt:'TUM MERE DATA ANALYST CASE STUDY INTERVIEWER HO. KPI definition, revenue/sales analysis, funnel conversion, retention, churn, cohorts, segmentation, descriptive statistics, A/B testing basics, chart choice, data quality aur root-cause analysis par practical case questions poochho. Ek baar mein sirf ek question; mera answer lo, phir structured feedback, assumptions, calculations aur simple English sample answer do. Correlation ko causation mat bolo; fake outcomes invent mat karna.'},
  {id:'ba-mis',icon:'🗂️',title:'Business Analyst & MIS Reporting',category:'Requirements & reporting',time:'12 min',short:'Requirements, acceptance criteria, reconciliations aur daily MIS.',description:'Stakeholder requests ko clear requirements aur accurate recurring reports mein convert karna seekho.',firstQuestion:'A manager asks for a report but has not explained what decision it should support. What do you ask?',questions:['How do you gather requirements for a new dashboard?','How do you reconcile reports from different branches?','What are acceptance criteria?'],coach:'Audience, decision, KPI definition, date range, freshness aur validation criteria clear karo.',prompt:'TUM MERE BUSINESS ANALYST AUR MIS/REPORTING INTERVIEW COACH HO. Requirement elicitation, user stories, acceptance criteria, As-Is/To-Be, stakeholder conflicts, reporting cadence, control totals, daily MIS, branch consolidation, Excel/Power Query automation aur reconciliation par ek-ek scenario question poochho. Pehle mera answer lo; phir 10 mein score, Hindi feedback, easy professional English answer aur follow-up do. Unsupported work experience ya results invent mat karna.'}
];

const tenDayPlan = [
  {day:'DAY 1',title:'SQL foundations: SELECT, WHERE, DISTINCT',desc:'Use the sample tables. Write and run through 4 beginner queries; explain each clause aloud.',module:'sql'},
  {day:'DAY 2',title:'SQL aggregation and business counts',desc:'Practice COUNT, SUM, AVG, GROUP BY and HAVING. Check your result against expected totals.',module:'sql'},
  {day:'DAY 3',title:'SQL JOINs using all four tables',desc:'Join employees to departments and customers to orders. Learn INNER JOIN vs LEFT JOIN.',module:'sql'},
  {day:'DAY 4',title:'SQL interview problems',desc:'Subqueries, CASE, NOT EXISTS, CTEs, window functions and data-quality checks.',module:'sql'},
  {day:'DAY 5',title:'Excel + Power BI reporting',desc:'PivotTables, XLOOKUP, DAX measures, relationships and KPI validation.',module:'bi-tools'},
  {day:'DAY 6',title:'Python + Pandas data cleaning',desc:'Missing values, duplicates, filters, groupby, merge and safe CSV handling.',module:'python'},
  {day:'DAY 7',title:'Analysis and data-quality cases',desc:'Investigate KPI changes, reconcile totals, investigate outliers and explain findings.',module:'technical'},
  {day:'DAY 8',title:'Infor Birst + data modelling',desc:'Explain grain, facts/dimensions, governed metrics, refresh checks and report validation.',module:'bi-tools'},
  {day:'DAY 9',title:'Resume, HR and simple English',desc:'Explain your real role and projects without inventing achievements; practice short answers.',module:'resume'},
  {day:'DAY 10',title:'Full mock interview + revision',desc:'Complete a mock, revise saved questions and focus on your two weakest topics.',module:'mock'}
];

const STORAGE_KEY = 'interviewQuest.v1';
let state = loadState();
let selectedModule = null;
let toastTimer = null;
let showBookmarkedOnly = false;

function loadState(){
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return {
      sessions: Array.isArray(saved.sessions) ? saved.sessions : [],
      bookmarks: Array.isArray(saved.bookmarks) ? saved.bookmarks : [],
      sqlAttempts: saved.sqlAttempts && typeof saved.sqlAttempts === 'object' && !Array.isArray(saved.sqlAttempts) ? saved.sqlAttempts : {}
    };
  } catch { return {sessions:[],bookmarks:[],sqlAttempts:{}}; }
}
function saveState(){
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
  catch { showToast('Browser storage unavailable. Progress may not be saved.'); }
}
function localDateKey(date = new Date()) { return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`; }
function getModule(id){ return modules.find(m=>m.id===id) || modules[0]; }
function getQuestions(){
  if (!Array.isArray(window.INTERVIEW_QUESTIONS)) return [];
  return window.INTERVIEW_QUESTIONS.filter(q => q && typeof q.id==='string' && typeof q.category==='string' && typeof q.question==='string' && typeof q.answer==='string' && q.question.trim() && q.answer.trim());
}
function getSessionsToday(){ const today=localDateKey(); return state.sessions.filter(s=>s.date===today); }
function getDoneIdsToday(){ return new Set(getSessionsToday().map(s=>s.moduleId)); }
function getXp(){ return state.sessions.reduce((sum,s)=>sum+(Number(s.xp)||10),0); }
function getStreak(){
  const days = new Set(state.sessions.map(s=>s.date));
  if(!days.size) return 0;
  const today = new Date(); today.setHours(0,0,0,0);
  const yesterday = new Date(today); yesterday.setDate(yesterday.getDate()-1);
  let cursor = days.has(localDateKey(today)) ? today : (days.has(localDateKey(yesterday)) ? yesterday : null);
  if(!cursor) return 0;
  let streak=0;
  while(days.has(localDateKey(cursor))){ streak++; cursor.setDate(cursor.getDate()-1); }
  return streak;
}
function dailyModule(){ const start=new Date(new Date().getFullYear(),0,0); const today=new Date(); const day=Math.floor((today-start)/86400000); return modules[day%modules.length]; }
function escapeHtml(value){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function showToast(message){ const el=document.getElementById('toast'); if(!el)return; el.textContent=message; el.classList.add('show'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>el.classList.remove('show'),2600); }
function moduleCard(m){ const isDone=getDoneIdsToday().has(m.id); return `<button class="module-card" type="button" data-module="${m.id}" aria-label="Open ${escapeHtml(m.title)} practice"><div class="module-top"><span class="module-icon" aria-hidden="true">${m.icon}</span><span class="module-time">${escapeHtml(m.time)}</span></div><h3>${escapeHtml(m.title)}</h3><p>${escapeHtml(m.short)}</p><div class="module-bottom"><span class="${isDone?'done-label':''}">${isDone?'✓ Done today':'Start practice'}</span><span aria-hidden="true">→</span></div></button>`; }
function renderHome(){
  const done=getDoneIdsToday();
  document.getElementById('home-xp').textContent=`${getXp()} XP`;
  document.getElementById('home-streak').textContent=`${getStreak()} ${getStreak()===1?'day':'days'}`;
  document.getElementById('home-done').textContent=`${done.size} today`;
  document.getElementById('home-modules').innerHTML=modules.slice(0,4).map(moduleCard).join('');
  document.getElementById('start-today').innerHTML=`${done.has(dailyModule().id)?'Practice another question':'Start today’s mission'} <span aria-hidden="true">→</span>`;
}
function renderAllModules(filter=''){
  const search=document.getElementById('module-search');
  const needle=(filter || (search?search.value:'' ) || '').trim().toLowerCase();
  const filtered=modules.filter(m=>`${m.title} ${m.short} ${m.category} ${m.description}`.toLowerCase().includes(needle));
  document.getElementById('all-modules').innerHTML=filtered.map(moduleCard).join('');
  document.getElementById('no-results').classList.toggle('hidden',filtered.length>0);
}

function renderSqlTable(table){
  const head=table.columns.map(c=>`<th scope="col">${escapeHtml(c)}</th>`).join('');
  const rows=table.rows.map(row=>`<tr>${row.map(value=>`<td>${value===null?'<span class="null-value">NULL</span>':escapeHtml(value)}</td>`).join('')}</tr>`).join('');
  return `<div class="sql-table-card"><div class="sql-table-head"><strong>${escapeHtml(table.name)}</strong><span>${escapeHtml(table.description)}</span></div><div class="sql-table-scroll"><table class="sql-data-table"><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table></div></div>`;
}
function renderSqlLab(){
  const lab=window.INTERVIEW_SQL_LAB;
  if(!lab||!Array.isArray(lab.tables)||!Array.isArray(lab.exercises))return '<div class="coach-note load-warning">SQL practice tables could not be loaded. Check that <code>sql-lab.js</code> is in the same folder.</div>';
  const groups=[...new Set(lab.exercises.map(e=>e.level))];
  const exerciseMarkup=lab.exercises.map((e,i)=>`<article class="sql-exercise" id="${e.id}">
    <div class="sql-exercise-top"><span class="sql-index">${String(i+1).padStart(2,'0')}</span><span class="level-tag">${escapeHtml(e.level)}</span><span class="type-tag">${escapeHtml(e.topic)}</span></div>
    <h3>${escapeHtml(e.title)}</h3><p class="sql-task">${escapeHtml(e.task)}</p>
    <label class="sql-attempt-label" for="sql-attempt-${e.id}">Your query attempt</label><textarea class="sql-attempt-input" id="sql-attempt-${e.id}" rows="3" spellcheck="false" autocapitalize="off" autocomplete="off" placeholder="Write your SQL query here...">${escapeHtml(state.sqlAttempts?.[e.id]||'')}</textarea>
    <div class="sql-actions"><button class="btn btn-mint" type="button" data-sql-action="save-attempt" data-sql-id="${e.id}">Save attempt</button><button class="btn btn-secondary" type="button" data-sql-action="hint" data-sql-id="${e.id}" aria-controls="hint-${e.id}" aria-expanded="false">Show hint</button><button class="btn btn-primary" type="button" data-sql-action="solution" data-sql-id="${e.id}" aria-controls="solution-${e.id}" aria-expanded="false">Show solution</button><button class="btn btn-secondary" type="button" data-sql-action="copy" data-sql-id="${e.id}">Copy SQL</button></div>
    <div class="sql-hint" id="hint-${e.id}" hidden><strong>Hint</strong><p>${escapeHtml(e.hint)}</p></div>
    <div class="sql-solution" id="solution-${e.id}" hidden><strong>Example solution</strong><pre><code>${escapeHtml(e.solution)}</code></pre><p>${escapeHtml(e.explanation)}</p><p class="sql-expected"><b>Expected check:</b> ${escapeHtml(e.expected)}</p></div>
  </article>`).join('');
  return `<section class="sql-lab subsection" aria-labelledby="sql-lab-title">
    <div class="sql-lab-intro"><p class="kicker">PRACTISE WITH SAMPLE DATA</p><h2 id="sql-lab-title">SQL Lab: tables + 20 questions</h2><p>Question padho, pehle khud query likho, phir hint ya solution kholo. Sample data practice ke liye illustrative hai; query browser mein execute nahi hoti.</p><div class="chip-row"><span class="chip">${lab.tables.length} sample tables</span><span class="chip">${lab.exercises.length} SQL exercises</span><span class="chip">Beginner → Interview</span></div></div>
    <div class="sql-filter-row"><label for="sql-level-filter">Difficulty</label><select id="sql-level-filter"><option value="all">All levels (${lab.exercises.length})</option>${groups.map(g=>`<option value="${escapeHtml(g)}">${escapeHtml(g)} (${lab.exercises.filter(e=>e.level===g).length})</option>`).join('')}</select></div>
    <div class="sql-tables"><h3>Sample tables</h3><p>Use these exact table and column names in the exercises.</p>${lab.tables.map(renderSqlTable).join('')}</div>
    <div class="sql-exercises"><div class="sql-exercise-heading"><h3>SQL practice questions</h3><span id="sql-visible-count">${lab.exercises.length} questions</span></div>${exerciseMarkup}<p id="sql-empty" class="empty-state hidden">No questions at this level.</p></div>
  </section>`;
}
function initSqlLab(){
  const filter=document.getElementById('sql-level-filter');
  if(filter){filter.addEventListener('change',()=>{let visible=0;document.querySelectorAll('.sql-exercise').forEach(card=>{const level=card.querySelector('.level-tag')?.textContent||'';const show=filter.value==='all'||level===filter.value;card.classList.toggle('hidden',!show);if(show)visible++;});const count=document.getElementById('sql-visible-count');if(count)count.textContent=`${visible} questions`;const empty=document.getElementById('sql-empty');if(empty)empty.classList.toggle('hidden',visible>0);});}
}

function renderModule(id){
  selectedModule=getModule(id); const m=selectedModule;
  const questions=m.questions.map((q,i)=>`<div class="question-item"><span class="question-number">${i+1}</span><p>${escapeHtml(q)}</p></div>`).join('');
  document.getElementById('module-detail').innerHTML=`
    <div class="detail-head"><div class="module-icon" aria-hidden="true">${m.icon}</div><div class="kicker">${escapeHtml(m.category.toUpperCase())} · ${escapeHtml(m.time.toUpperCase())}</div><h1 id="module-title">${escapeHtml(m.title)}</h1><p>${escapeHtml(m.description)}</p><div class="chip-row"><span class="chip">One question at a time</span><span class="chip">Hindi feedback</span><span class="chip">Easy English answers</span></div></div>
    <div class="subsection"><h2>Try these questions</h2><div class="question-list">${questions}</div></div>
    ${m.id==='sql'?renderSqlLab():''}
    <div class="coach-note"><strong>Coach tip:</strong> ${escapeHtml(m.coach)}</div>
    <div class="detail-actions"><button type="button" class="btn btn-primary" id="start-chat">Practice with ChatGPT ↗</button><button type="button" class="btn btn-secondary" id="copy-prompt">Copy full prompt</button><button type="button" class="btn btn-mint full-span" id="mark-done">✓ Mark practice complete (+10 XP)</button></div>
    <p class="helper-copy">ChatGPT opens separately. If the prompt is not prefilled on your device, tap “Copy full prompt” and paste it in ChatGPT.</p>`;
  document.getElementById('start-chat').addEventListener('click',()=>openChat(m));
  if(m.id==='sql') initSqlLab();
  document.getElementById('copy-prompt').addEventListener('click',()=>copyPrompt(m));
  document.getElementById('mark-done').addEventListener('click',()=>markDone(m.id));
}
function buildPrompt(m){return `${m.prompt}\n\nAaj ki practice: ${m.firstQuestion}\n\nImportant: Ek hi question se shuru karo aur mere answer ka wait karo. Main Hindi, Hinglish ya simple English mein jawab de sakta hoon.`;}
function openChat(m){
  const url=`https://chatgpt.com/?q=${encodeURIComponent(buildPrompt(m))}`;
  window.open(url,'_blank','noopener,noreferrer');
  showToast('ChatGPT khul raha hai. Prefill na ho toh Copy full prompt use karo.');
}
async function copyText(text){
  try { await navigator.clipboard.writeText(text); return true; }
  catch {
    try {
      const ta=document.createElement('textarea'); ta.value=text; ta.setAttribute('readonly',''); ta.style.position='fixed'; ta.style.left='-9999px'; document.body.appendChild(ta); ta.select();
      const ok=document.execCommand('copy'); ta.remove(); return ok;
    } catch { return false; }
  }
}
async function copyPrompt(m){const ok=await copyText(buildPrompt(m));showToast(ok?'Full prompt copied. ChatGPT mein paste kar do.':'Copy unavailable. Prompt ko manually select/copy karne ki koshish karo.');}
function markDone(id){
  const date=localDateKey();
  if(state.sessions.some(s=>s.moduleId===id&&s.date===date)){showToast('Ye practice area aaj complete ho chuka hai. Great work!');return;}
  state.sessions.push({moduleId:id,date,xp:10,at:new Date().toISOString()}); saveState(); renderAll(); showToast('Practice saved! +10 XP earned 🎉'); renderModule(id);
}
function renderPlan(){document.getElementById('plan-list').innerHTML=tenDayPlan.map((p,i)=>`<div class="plan-item"><div class="plan-day">${p.day.replace('DAY ','D')}</div><div class="plan-copy"><strong>${escapeHtml(p.title)}</strong><small>${escapeHtml(p.desc)}</small></div><button type="button" data-plan-module="${p.module}" data-plan-day="${i+1}" aria-label="Start ${escapeHtml(p.title)}">→</button></div>`).join('');}
function renderProgress(){
  document.getElementById('progress-xp').textContent=`${getXp()} XP`;
  document.getElementById('progress-sessions').textContent=`${state.sessions.length} practice ${state.sessions.length===1?'session':'sessions'} completed`;
  document.getElementById('progress-list').innerHTML=modules.map(m=>{const count=state.sessions.filter(s=>s.moduleId===m.id).length;const last=state.sessions.filter(s=>s.moduleId===m.id).sort((a,b)=>b.date.localeCompare(a.date))[0];return `<div class="progress-row"><span class="row-icon">${m.icon}</span><div class="row-main"><strong>${escapeHtml(m.title)}</strong><small>${last?`Last practiced ${escapeHtml(last.date)}`:'Not practiced yet'}</small></div><span class="row-count">${count} ${count===1?'time':'times'}</span></div>`;}).join('');
}
function populateQuestionRoles(){
  const select=document.getElementById('question-role');
  if(!select) return;
  const current=select.value || 'all';
  const roles=[...new Set(getQuestions().flatMap(q=>Array.isArray(q.roles)?q.roles:[]))].sort((a,b)=>a.localeCompare(b));
  select.innerHTML='<option value="all">All roles</option>'+roles.map(role=>`<option value="${escapeHtml(role)}">${escapeHtml(role)}</option>`).join('');
  if(roles.includes(current)) select.value=current;
}
function populateQuestionCategories(){
  const select=document.getElementById('question-category');
  const current=select.value || 'all';
  const cats=[...new Set(getQuestions().map(q=>q.category))].sort((a,b)=>a.localeCompare(b));
  select.innerHTML='<option value="all">All topics</option>'+cats.map(c=>`<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join('');
  if(cats.includes(current)) select.value=current;
}
function renderQuestionBank(){
  const questions=getQuestions();
  const search=(document.getElementById('question-search').value||'').trim().toLowerCase();
  const role=document.getElementById('question-role')?.value || 'all';
  const category=document.getElementById('question-category').value;
  const difficulty=document.getElementById('question-difficulty').value;
  const type=document.getElementById('question-type').value;
  const loadError=document.getElementById('question-load-error');
  if(loadError) loadError.classList.toggle('hidden', questions.length>0);
  const filtered=questions.filter(q=>{
    if(role!=='all'&&!(Array.isArray(q.roles)&&q.roles.includes(role)))return false;
    if(category!=='all'&&q.category!==category)return false;
    if(difficulty!=='all'&&q.difficulty!==difficulty)return false;
    if(type!=='all'&&q.type!==type)return false;
    if(showBookmarkedOnly&&!state.bookmarks.includes(q.id))return false;
    const text=`${q.question} ${q.answer} ${q.tip} ${q.followUp||''} ${q.category} ${q.difficulty} ${q.type} ${(q.roles||[]).join(' ')}`.toLowerCase();
    return !search||text.includes(search);
  });
  document.getElementById('bank-total').textContent=questions.length;
  document.getElementById('bank-saved-count').textContent=state.bookmarks.length;
  document.getElementById('bank-visible-count').textContent=filtered.length;
  document.getElementById('toggle-saved').textContent=showBookmarkedOnly?'★ Showing saved · Show all':'☆ Show saved only';
  document.getElementById('question-bank-list').innerHTML=filtered.map(q=>{
    const saved=state.bookmarks.includes(q.id);
    const answerId=`answer-${q.id}`;
    const source=q.source?`<a class="answer-source" href="${escapeHtml(q.source.url)}" target="_blank" rel="noopener noreferrer">Reference: ${escapeHtml(q.source.label)} ↗</a>`:'';
    return `<article class="bank-card" id="card-${q.id}">
      <div class="bank-card-top"><span class="bank-tag">${escapeHtml(q.category)}</span><span class="level-tag">${escapeHtml(q.difficulty)}</span><span class="type-tag">${escapeHtml(q.type)}</span><button class="save-q ${saved?'saved':''}" type="button" data-q-action="bookmark" data-q-id="${q.id}" aria-pressed="${saved}" aria-label="${saved?'Remove from':'Save to'} revision list">${saved?'★ Saved':'☆ Save'}</button></div>
      <h3>${escapeHtml(q.question)}</h3>
      <div class="bank-actions"><button class="btn btn-secondary" type="button" data-q-action="answer" data-q-id="${q.id}" aria-controls="${answerId}" aria-expanded="false">Show answer</button><button class="btn btn-primary" type="button" data-q-action="ask" data-q-id="${q.id}">Ask ChatGPT ↗</button><button class="btn btn-secondary" type="button" data-q-action="copy" data-q-id="${q.id}">Copy question</button></div>
      <div class="answer-panel" id="${answerId}" hidden><strong>Suggested answer</strong><p>${escapeHtml(q.answer)}</p>${q.tip?`<strong>Interview tip</strong><p class="answer-tip">${escapeHtml(q.tip)}</p>`:''}${q.followUp?`<strong>Follow-up practice</strong><p>${escapeHtml(q.followUp)}</p>`:''}${source}</div>
    </article>`;
  }).join('');
  document.getElementById('question-empty').classList.toggle('hidden',filtered.length>0);
}
function buildQuestionPrompt(q){return `You are my beginner-friendly Data Analyst / BI Analyst interview coach. Explain this interview question in simple English and Hinglish. Give a correct answer, step-by-step reasoning, a practical example or code where relevant, common mistakes, and one follow-up question. Do not invent facts or assume I have experience I have not stated.\n\nTarget roles: ${(q.roles||[]).join(', ')}\nTopic: ${q.category}\nDifficulty: ${q.difficulty}\nQuestion: ${q.question}\nSuggested answer from my study bank: ${q.answer}\nInterview tip: ${q.tip||'Explain the reasoning clearly.'}\nNext follow-up: ${q.followUp||'Ask a realistic follow-up about validation or edge cases.'}\n\nAfter explaining, ask me to answer in my own words and wait for my response.`;}
function openQuestionChat(q){
  const prompt=buildQuestionPrompt(q);
  const url=`https://chatgpt.com/?q=${encodeURIComponent(prompt)}`;
  window.open(url,'_blank','noopener,noreferrer');
  copyText(prompt).then(ok=>showToast(ok?'ChatGPT link opened; prompt copied as a fallback.':'ChatGPT link opened. If prompt is not prefilled, use Copy question.'));
}
function toggleBookmark(id){
  if(state.bookmarks.includes(id)) state.bookmarks=state.bookmarks.filter(item=>item!==id);
  else state.bookmarks.push(id);
  saveState(); renderQuestionBank();
  showToast(state.bookmarks.includes(id)?'Question saved for revision.':'Question removed from saved list.');
}
function renderAll(){renderHome();renderAllModules(document.getElementById('module-search').value);renderPlan();renderProgress();renderQuestionBank();}
function showTab(tab){
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  const target=document.getElementById(`${tab}-view`); if(target) target.classList.add('active');
  document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));
  if(tab==='practice')renderAllModules(document.getElementById('module-search').value);
  if(tab==='progress')renderProgress();
  if(tab==='questions')renderQuestionBank();
  window.scrollTo({top:0,behavior:'smooth'});
}

document.addEventListener('click',e=>{
  const tab=e.target.closest('[data-tab]'); if(tab){showTab(tab.dataset.tab);return;}
  const card=e.target.closest('[data-module]'); if(card){renderModule(card.dataset.module);showTab('module');return;}
  const plan=e.target.closest('[data-plan-module]'); if(plan){renderModule(plan.dataset.planModule);showTab('module');if(plan.dataset.planDay&&plan.dataset.planModule==='sql'){const target=document.getElementById('sql-lab-title');if(target)target.scrollIntoView({behavior:'smooth',block:'start'});}return;}
  const sqlAction=e.target.closest('[data-sql-action]');
  if(sqlAction){const lab=window.INTERVIEW_SQL_LAB;const ex=lab?.exercises?.find(item=>item.id===sqlAction.dataset.sqlId);if(!ex)return;const action=sqlAction.dataset.sqlAction;if(action==='copy'){copyText(ex.solution).then(ok=>showToast(ok?'SQL solution copied.':'Copy unavailable on this browser.'));return;}if(action==='save-attempt'){const input=document.getElementById(`sql-attempt-${ex.id}`);if(!input)return;state.sqlAttempts=state.sqlAttempts||{};state.sqlAttempts[ex.id]=String(input.value||'');saveState();showToast('SQL attempt saved on this device.');return;}const panel=document.getElementById(`${action==='hint'?'hint':'solution'}-${ex.id}`);if(!panel)return;const show=panel.hidden;panel.hidden=!show;sqlAction.setAttribute('aria-expanded',String(show));sqlAction.textContent=show?(action==='hint'?'Hide hint':'Hide solution'):(action==='hint'?'Show hint':'Show solution');return;}
  const qAction=e.target.closest('[data-q-action]');
  if(qAction){
    const q=getQuestions().find(item=>item.id===qAction.dataset.qId); if(!q)return;
    const action=qAction.dataset.qAction;
    if(action==='bookmark'){toggleBookmark(q.id);return;}
    if(action==='answer'){
      const panel=document.getElementById(`answer-${q.id}`); const shouldShow=panel.hidden; panel.hidden=!shouldShow;
      qAction.setAttribute('aria-expanded',String(shouldShow)); qAction.textContent=shouldShow?'Hide answer':'Show answer'; return;
    }
    if(action==='ask'){openQuestionChat(q);return;}
    if(action==='copy'){copyText(`${q.category} interview question: ${q.question}\n\nPlease explain this in simple Hinglish with a practical example.`).then(ok=>showToast(ok?'Question prompt copied.':'Copy failed; please try again.'));return;}
  }
});
document.getElementById('start-today').addEventListener('click',()=>{const m=dailyModule();renderModule(m.id);showTab('module');});
document.getElementById('back-to-practice').addEventListener('click',()=>showTab('practice'));
document.getElementById('module-search').addEventListener('input',e=>renderAllModules(e.target.value));
['question-search','question-role','question-category','question-difficulty','question-type'].forEach(id=>{
  document.getElementById(id).addEventListener(id==='question-search'?'input':'change',renderQuestionBank);
});
document.getElementById('toggle-saved').addEventListener('click',()=>{showBookmarkedOnly=!showBookmarkedOnly;renderQuestionBank();});
document.getElementById('reset-question-filters').addEventListener('click',()=>{
  document.getElementById('question-search').value='';document.getElementById('question-role').value='all';document.getElementById('question-category').value='all';document.getElementById('question-difficulty').value='all';document.getElementById('question-type').value='all';showBookmarkedOnly=false;renderQuestionBank();
});
document.getElementById('reset-progress').addEventListener('click',()=>{
  if(!state.sessions.length){showToast('Abhi reset karne ke liye progress nahi hai.');return;}
  if(window.confirm('Kya tum apni poori practice history aur XP delete karna chahte ho? Saved questions ko delete nahi kiya jayega.')){state.sessions=[];saveState();renderAll();showToast('Practice progress reset ho gayi. Saved questions safe hain.');}
});
document.addEventListener('keydown',e=>{
  if(e.key==='/'&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)){
    e.preventDefault();const active=document.querySelector('.view.active');
    if(active&&active.id==='questions-view'){document.getElementById('question-search').focus();}
    else{showTab('practice');document.getElementById('module-search').focus();}
  }
  if(e.key==='Escape'&&document.getElementById('module-view').classList.contains('active'))showTab('practice');
});

populateQuestionRoles();
populateQuestionCategories();
renderAll();
if('serviceWorker' in navigator && location.protocol.startsWith('http')){
  window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
}
