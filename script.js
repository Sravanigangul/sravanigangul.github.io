const projects={
  nlp:{tag:"Clinical NLP · Machine learning",title:"Clinical NLP & Automated ICD Coding",lede:"An end-to-end pipeline that converts unstructured medical notes into validated, reusable features for clinical classification.",problem:"Clinical narratives contain abbreviations, protected information, negated conditions, and inconsistent structure—making direct analysis unreliable.",approach:"Built reusable modules for PHI de-identification, abbreviation expansion, section extraction, medication and laboratory recognition, negation detection, TF-IDF feature generation, and ICD classification.",evaluation:"Measured classification quality with accuracy and agreement statistics, inspected ambiguous terminology, and added automated tests and code-quality checks across multiple Python versions.",value:"Creates a reproducible foundation for clinical text analytics while keeping model outputs interpretable and reviewable.",results:[['88%','Coding accuracy'],['0.849','Cohen’s kappa'],['92%','Zero-shot proof of concept']]},
  rag:{tag:"RAG · Cloud architecture",title:"Healthcare Knowledge Retrieval & RAG",lede:"A serverless retrieval layer designed to ground healthcare questions in relevant source passages.",problem:"Healthcare knowledge is distributed across documents, and keyword search can miss conceptually related information.",approach:"Created ingestion and search APIs with Cloudflare Workers, stored metadata in D1, generated embeddings, and retrieved semantically similar content from Vectorize.",evaluation:"Tested healthcare-specific questions, reviewed top-k relevance, and analyzed ranking and grounding failures to improve retrieval configuration.",value:"Provides traceable context for AI-assisted answers and a practical foundation for more formal retrieval evaluation.",results:[['Top 3','Retrieved passages'],['2','Ingestion + search APIs'],['Serverless','Cloud deployment']]},
  stars:{tag:"Population health · SQL",title:"Medicare Stars & HEDIS Analytics",lede:"A contract-level analytics system combining claims, adherence, and member-experience measures.",problem:"Quality teams need a unified view of performance gaps across preventive care, medication adherence, and member experience.",approach:"Designed a Snowflake star schema, standardized source values, created SQL measure logic, benchmarked performance against CMS cut points, and visualized results in Tableau.",evaluation:"Compared contract-level trends, identified underperforming measures, and validated composite calculations across plan types.",value:"Helps quality teams prioritize interventions instead of reviewing disconnected reports.",results:[['3','Integrated data domains'],['SQL','Measure engine'],['Tableau','Decision surface']]},
  risk:{tag:"Predictive modeling · Outcomes",title:"Clinical Risk & Outcomes Modeling",lede:"Interpretable patient-level models for mortality, readmission, length of stay, and survival outcomes.",problem:"Clinical teams need reliable ways to identify risk patterns across fragmented demographic, encounter, laboratory, medication, and utilization data.",approach:"Integrated patient-level data, engineered clinically meaningful features, developed regression and survival models, and translated outputs for clinical and operational stakeholders.",evaluation:"Assessed discrimination, calibration, goodness of fit, multicollinearity, and outcome performance to test robustness and interpretability.",value:"Turns complex clinical histories into transparent risk signals that can support focused review and earlier intervention.",results:[['0.806','Mortality-model C-statistic'],['Validated','Calibration + fit'],['Interpretable','Patient-level features']]}
};

const expertise={
  modeling:{title:'Modeling that holds up under scrutiny.',body:'I connect the prediction target, cohort logic, feature design, and validation strategy so performance metrics reflect the real clinical question.',skills:['Predictive modeling','Logistic regression','Survival analysis','Cox proportional hazards','Feature engineering','Hypothesis testing','Calibration','Explainability']},
  nlp:{title:'Clinical language made analyzable.',body:'I build transparent text pipelines that handle the realities of clinical documentation—from PHI and abbreviations to negation and coding labels.',skills:['Clinical text preprocessing','TF-IDF','Text classification','Information extraction','PHI de-identification','Negation detection','RAG','LLM evaluation']},
  data:{title:'Reliable inputs before impressive outputs.',body:'I combine healthcare sources into validated analytical datasets, automate quality controls, and make every transformation reproducible.',skills:['Python','SQL','ETL','Snowflake','SQL Server','Data modeling','Data validation','GitHub Actions']},
  healthcare:{title:'Domain context at every step.',body:'My PharmD background and healthcare analytics experience help me recognize clinically meaningful features, questionable assumptions, and operational constraints.',skills:['Epic Clarity','Epic Caboodle','Epic Cogito','EHR analytics','ICD-10','Population health','Clinical outcomes','Healthcare quality']}
};

const root=document.documentElement;
const themeToggle=document.querySelector('#theme-toggle');
const storedTheme=localStorage.getItem('portfolio-theme');
if(storedTheme)root.dataset.theme=storedTheme;
themeToggle.addEventListener('click',()=>{root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';localStorage.setItem('portfolio-theme',root.dataset.theme)});

const header=document.querySelector('.site-header');
const progress=document.querySelector('#scroll-progress-bar');
window.addEventListener('scroll',()=>{header.classList.toggle('scrolled',scrollY>10);const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=`${max?scrollY/max*100:0}%`},{passive:true});

const menu=document.querySelector('#mobile-nav');
const menuToggle=document.querySelector('#menu-toggle');
menuToggle.addEventListener('click',()=>{const open=menu.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));menuToggle.textContent=open?'Close':'Menu'});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.textContent='Menu'}));

const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const category=btn.dataset.filter;document.querySelectorAll('.project-card').forEach(card=>card.classList.toggle('hidden',category!=='all'&&card.dataset.category!==category))}));

const dialog=document.querySelector('#case-dialog');
const dialogContent=document.querySelector('#dialog-content');
document.querySelectorAll('.case-button').forEach(btn=>btn.addEventListener('click',()=>{const p=projects[btn.dataset.project];dialogContent.innerHTML=`<div class="dialog-body"><p class="eyebrow">${p.tag}</p><h2 id="dialog-title">${p.title}</h2><p class="dialog-lede">${p.lede}</p><div class="result-banner">${p.results.map(r=>`<div><strong>${r[0]}</strong><span>${r[1]}</span></div>`).join('')}</div><div class="case-grid"><article><h3>Problem</h3><p>${p.problem}</p></article><article><h3>Approach</h3><p>${p.approach}</p></article><article><h3>Evaluation</h3><p>${p.evaluation}</p></article><article><h3>Practical value</h3><p>${p.value}</p></article></div><a class="text-link" href="https://github.com/Sravanigangul" target="_blank" rel="noreferrer">Explore related work on GitHub ↗</a></div>`;dialog.showModal()}));
document.querySelector('#dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});

const panel=document.querySelector('#expertise-panel');
function renderExpertise(key){const item=expertise[key];panel.innerHTML=`<p class="eyebrow">How I work</p><h3>${item.title}</h3><p>${item.body}</p><div class="skill-cloud">${item.skills.map(skill=>`<span>${skill}</span>`).join('')}</div>`}
renderExpertise('modeling');
document.querySelectorAll('[role="tab"]').forEach(tab=>tab.addEventListener('click',()=>{document.querySelectorAll('[role="tab"]').forEach(t=>t.setAttribute('aria-selected','false'));tab.setAttribute('aria-selected','true');renderExpertise(tab.dataset.tab)}));

const canTilt=window.matchMedia('(pointer:fine)').matches&&!window.matchMedia('(prefers-reduced-motion:reduce)').matches;
if(canTilt){
  document.querySelectorAll('.tilt-surface,.project-card').forEach(surface=>{
    surface.addEventListener('pointermove',event=>{
      const rect=surface.getBoundingClientRect();
      const x=(event.clientX-rect.left)/rect.width-.5;
      const y=(event.clientY-rect.top)/rect.height-.5;
      const strength=surface.classList.contains('signal-panel')?8:3.5;
      surface.style.transform=`perspective(1200px) rotateX(${-y*strength}deg) rotateY(${x*strength}deg) translateY(-4px)`;
    });
    surface.addEventListener('pointerleave',()=>{surface.style.transform=''});
  });
}
