const profile = window.portfolio;
const pages = ['front', 'works', 'chronicle', 'daily'];
const main = document.querySelector('#edition');
const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
function safeUrl(value) {
  if (!value) return null;
  try { const url = new URL(value, location.href); return ['http:', 'https:'].includes(url.protocol) ? url.href : null; } catch { return null; }
}
function link(url, label) { const safe = safeUrl(url); return safe ? `<a class="text-link" href="${escapeHtml(safe)}" target="_blank" rel="noopener">${escapeHtml(label)}</a>` : ''; }
const githubUrl = `https://github.com/${encodeURIComponent(profile.github)}`;
function resumeNotice() {
 return safeUrl(profile.resume) ? link(profile.resume, 'View résumé') + '<a class="text-link" href="' + escapeHtml(safeUrl(profile.resume)) + '" download>Download PDF</a>' : '<span class="small muted">Résumé being updated.</span>';
}
function correspondence() {
 return link(githubUrl, 'GitHub') + (profile.linkedin ? link(profile.linkedin, 'LinkedIn') : '') + (profile.email ? '<a class="text-link" href="mailto:' + escapeHtml(profile.email) + '">' + escapeHtml(profile.email) + '</a>' : '') + (profile.phone ? '<a class="text-link" href="tel:' + escapeHtml(profile.phone.replace(/[^+0-9]/g,'')) + '">' + escapeHtml(profile.phone) + '</a>' : '');
}
function heading(name, subtitle) { return '<div class="page-heading"><h1>' + name + '</h1><span>' + subtitle + '</span></div>'; }
function projectLinks(p) { return '<div class="links">' + link(p.url, 'Open project') + link(p.source, 'Source') + '</div>'; }
function projectVisual(p) {
 if (p.visual === 'ecg') return '<figure class="signal-plate"><p class="kicker">Inside the model</p><div class="fusion-branches"><div><strong>Signal branch</strong><span>ResNet · BiGRU · Attention</span></div><div><strong>Feature branch</strong><span>Wavelets · Rhythm · Statistics</span></div></div><div class="fusion-gate">Adaptive gated fusion</div><div class="diagnostic-tags"><span>NORM</span><span>MI</span><span>STTC</span><span>CD</span><span>HYP</span></div><figcaption>Architecture schematic. Five PTB-XL diagnostic categories.</figcaption></figure>';
 return '<figure class="marksheet-plate"><p class="kicker">How a cell is read</p><table><thead><tr><th>Input example</th><th>Recorded state</th></tr></thead><tbody><tr><td>45</td><td>Marked</td></tr><tr><td>AB</td><td>Flagged</td></tr><tr><td>NA</td><td>Uncalculated</td></tr><tr><td>Empty elective</td><td>Not enrolled</td></tr><tr><td>Malformed text</td><td>Unparsed</td></tr></tbody></table><figcaption>Illustrative parsing examples, not student records.</figcaption></figure>';
}
function educationList() {
 return '<ol class="education-ledger">' + profile.education.map(e=>'<li><span class="dates">' + escapeHtml(e.dates) + '</span><h3>' + escapeHtml(e.title) + '</h3><p>' + escapeHtml(e.institution) + '</p><span class="small muted">' + escapeHtml(e.note) + '</span></li>').join('') + '</ol>';
}
function frontPage() {
 return '<div class="front-splash"><div><p class="kicker">The personal edition</p><h1>Armash Ansari</h1></div><p>Electronics & Computer Science student.<br>Based in Mumbai.<br><em>Also a chess player and a movie lover.</em></p></div>'+
 '<div class="news-columns">'+
 '<section class="news-column education-column"><p class="section-strap">Education</p><h2>From computers<br><em>to circuits.</em></h2><p class="dropcap">I started with a diploma in Computer Engineering. I’m now studying Electronics and Computer Science at Vidyalankar Institute of Technology.</p><div class="mini-record"><strong>2025–2028</strong><h3>B.Tech</h3><p>Vidyalankar Institute<br>of Technology</p></div><div class="mini-record"><strong>2022–2025</strong><h3>Computer Engineering</h3><p>M. H. Saboo Siddik Polytechnic</p></div><a class="text-link" href="#chronicle">Read my background</a></section>'+
 '<section class="news-column lead-column"><p class="section-strap">At the workbench</p><figure class="engraving"><img src="assets/engineering-desk.svg" alt="An ink drawing of a laptop, circuit and desk lamp on an engineering workbench"><figcaption>Software, signals and a little curiosity.</figcaption></figure><h2>Backend systems &<br>applied machine learning.</h2><div class="article-columns"><p>My interests sit around backend systems, applied AI and machine learning. I enjoy turning a problem into software I can actually use.</p><p>I like working through both the logic of a system and the interface someone uses to make sense of it.</p></div></section>'+
 '<section class="news-column notes-column"><p class="section-strap">Off the clock</p><article class="column-story"><div class="pastime-illustration" aria-hidden="true"><svg viewBox="0 0 180 82"><path d="M18 70h144M28 76h124M68 64l6-19h33l7 19zM75 40l-4-11 13-9 4-12 18 8 8 19-13-4-9 10zM73 25l-5-8 15 3" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="101" cy="23" r="1.8" fill="currentColor"/></svg></div><h2>A game of chess</h2><p>I really enjoy playing chess. It’s one of the things I make time for outside my studies and projects.</p></article><article class="column-story"><div class="pastime-illustration" aria-hidden="true"><svg viewBox="0 0 180 68"><g fill="none" stroke="currentColor" stroke-width="1.5"><path d="M24 14h132v42H24zM24 23h132M24 47h132M66 23v24M112 23v24"/><path d="M31 17h8m13 0h8m13 0h8m13 0h8m13 0h8m13 0h8M31 52h8m13 0h8m13 0h8m13 0h8m13 0h8m13 0h8" stroke-width="3"/></g></svg></div><h3>At the movies</h3><p>I love watching movies, too. Films and chess belong here just as much as the things I build.</p></article><article class="column-story"><h3>Just for fun</h3><p>Some of my coding projects start that way as well: a small idea I want to try, without needing it to become something bigger.</p></article></section>'+
 '<aside class="news-column notices-column"><div class="notice-box resume-ad"><p class="kicker">For the record</p><h2>Résumé</h2><p>Education, experience<br>and selected work.</p>'+resumeNotice()+'</div><div class="contents-box"><p class="section-strap">Inside this edition</p><a href="#works"><strong>Selected work</strong><span>ECG ML & EduQuery</span><b>2</b></a><a href="#chronicle"><strong>The personal record</strong><span>Education & experience</span><b>3</b></a><a href="#daily"><strong>The daily record</strong><span>GitHub & LeetCode</span><b>4</b></a></div><section class="contact-notice"><h3>Get in touch</h3><p class="small">Find me online, or get in touch.</p><div class="links">'+correspondence()+'</div></section></aside></div>'+
 '<div class="classifieds"><section><p class="kicker">Experience</p><h3>Learning on the job</h3><p>Heuristic Academy · Web development<br>Anukool India Pvt Ltd · Internship</p><a class="text-link" href="#chronicle">The experience record</a></section><section class="classified-feature"><p class="kicker">Selected work · Page 2</p><a href="#works"><h3>ECG ML <em>&</em> EduQuery</h3></a><p>Signal classification and academic data analysis.</p></section><section><p class="kicker">Practice · Page 4</p><h3>A record of the everyday</h3><p>Contributions, submissions and solved problems.</p><a class="text-link" href="#daily">Open the activity calendars</a></section></div>';
}
function worksPage() {
 const [ecg,edu]=profile.projects;
 return heading('Selected work', 'Two main projects') +
 '<article class="case-study ecg-case"><div class="case-copy"><p class="kicker">' + escapeHtml(ecg.category) + '</p><h2>ECG ML</h2><p class="case-deck">Reading a signal.<br>Inspecting a prediction.</p><p>' + escapeHtml(ecg.description) + '</p><p class="tech">' + escapeHtml(ecg.stack) + '</p>' + projectLinks(ecg) + '</div><div class="case-visual">' + projectVisual(ecg) + '</div><aside class="case-notes"><section class="brief"><h3>The work</h3><p class="small">Preprocessing, feature extraction, model comparisons, and an interface for inspecting waveforms and attribution overlays.</p></section><section class="brief"><h3>The evaluation</h3><p class="small">Patient-independent data splits, validation-only threshold selection, and comparisons between model variants.</p></section><p class="small muted">Research prototype. Not a medical device.</p></aside></article>' +
 '<article class="case-study edu-case"><div class="case-copy"><p class="kicker">' + escapeHtml(edu.category) + '</p><h2>EduQuery</h2><p class="case-deck">Messy marksheets.<br>Traceable answers.</p><p>' + escapeHtml(edu.description) + '</p><p class="tech">' + escapeHtml(edu.stack) + '</p>' + projectLinks(edu) + '</div><div class="case-visual">' + projectVisual(edu) + '</div><aside class="case-notes"><section class="brief"><h3>Ask across a cohort</h3><p class="small">Filter by division, marks, failures and SGPI using combined conditions.</p></section><section class="brief"><h3>Keep the source</h3><p class="small">Reports retain source sheet and row references. Exports include Excel, CSV and PDF.</p></section></aside></article>' +
 '<section class="other-work"><p class="kicker">Other experiments · Built for fun</p><ul>' + profile.otherProjects.map(p=>'<li>' + link(p.source,p.title) + '<span>' + escapeHtml(p.note) + '</span></li>').join('') + '</ul></section>';
}
function chroniclePage() {
 const experience=profile.experience.map(e=>'<article class="experience-entry">'+(e.dates ? '<span class="dates">'+escapeHtml(e.dates)+'</span>' : '')+'<h2>'+escapeHtml(e.title)+'</h2><p class="institution">'+escapeHtml(e.institution)+'</p>'+(e.description ? '<p>'+escapeHtml(e.description)+'</p>' : '')+'</article>').join('');
 return heading('The personal record', 'Education, experience & interests') +
 '<div class="record-grid"><section class="education-section"><p class="kicker">Education</p><h2>The route so far.</h2>' + educationList() + '</section><section class="experience-section"><p class="kicker">Experience</p>' + experience + '</section>' +
 '<aside class="interests-section"><p class="kicker">Interests</p><h3>What draws my attention</h3><p>I’m interested in backend systems and applied machine learning. Away from that, I enjoy playing chess and watching movies.</p><section class="brief"><h3>Languages</h3><p class="small">English and Hindi</p></section><section><h3>Résumé</h3>' + resumeNotice() + '</section></aside>' +
 '<section class="skills-section"><p class="kicker">Tools & working knowledge</p><div class="skills-ledger"><section><h3>Programming</h3><p>Python, Java, JavaScript, Go, Rust, C++</p></section><section><h3>Web & data</h3><p>Node.js, HTML, CSS, PostgreSQL, MySQL</p></section><section><h3>Development</h3><p>Git, GitHub, Docker, Vercel</p></section><section><h3>Laboratory</h3><p>MATLAB for numerical computing, simulations and data analysis</p></section></div></section></div>';
}
function leetcodeBlock() {
 return '<div id="leetcode-activity" aria-live="polite"><div class="empty-chart">Loading the practice calendar…</div></div>' + link('https://leetcode.com/u/' + encodeURIComponent(profile.leetcode), 'View LeetCode profile');
}
function dailyPage() {
 return heading('The daily record', 'Contributions & problem solving') + '<div class="activity-edition"><section class="contributions-section"><p class="kicker">GitHub · ' + escapeHtml(profile.github) + '</p><h2>A year of contributions</h2><div id="github-activity" aria-live="polite"><div class="empty-chart">Loading the contribution calendar…</div></div>' + link(githubUrl,'View GitHub profile') + '</section><section class="practice-section"><p class="kicker">LeetCode</p><h2>Problem-solving practice</h2>' + leetcodeBlock() + '</section><aside class="daily-marginalia"><section class="brief"><h3>The two records</h3><p class="small">GitHub shows contributions. LeetCode records submissions and solved problems.</p></section><section class="notice-box"><h3>Correspondence</h3>' + correspondence() + '</section></aside></div>';
}
let activePage;
function render() {
 const route = location.hash.slice(1); const page = pages.includes(route) ? route : 'front'; const index = pages.indexOf(page); const old = pages.indexOf(activePage);
 main.dataset.page = page;
 main.innerHTML = ({ front:frontPage, works:worksPage, chronicle:chroniclePage, daily:dailyPage })[page]();
 document.querySelectorAll('[data-page]').forEach(a => { if(a.dataset.page === page) a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current'); });
 document.title = `${['Front Page','Works & Inventions','The Chronicle','Daily Dispatch'][index]} | The Engineering Diaries`;
 if (activePage && page !== activePage) { main.className = ''; void main.offsetWidth; main.className = index >= old ? 'turn-forward' : 'turn-back'; main.focus({preventScroll:true}); window.scrollTo({top:0,behavior:'instant'}); }
 document.querySelector('#folio-title').textContent = ['Front page','Selected work','Personal record','Daily record'][index];
 document.querySelector('#folio-count').textContent = 'Page ' + (index+1) + ' of 4';
 activePage = page; if (page === 'daily') { loadGithub(); loadLeetcode(); }
}
window.addEventListener('hashchange',render);
let githubCache;
async function loadGithub() {
 const target=document.querySelector('#github-activity');
 try {
  if(!githubCache || Date.now()-githubCache.at>3600000) {
   const response=await fetch('https://github-contributions-api.jogruber.de/v4/'+encodeURIComponent(profile.github)+'?y=last',{signal:AbortSignal.timeout(12000)});
   if(!response.ok) throw new Error('Unavailable');
   const data=await response.json();
   if(!Array.isArray(data.contributions) || !data.contributions.length) throw new Error('Missing calendar');
   const days=data.contributions.filter(d=>/^\d{4}-\d{2}-\d{2}$/.test(d.date)&&Number.isInteger(d.count)&&d.count>=0).sort((a,b)=>a.date.localeCompare(b.date));
   if(!days.length) throw new Error('Invalid calendar');
   githubCache={days,at:Date.now()};
  }
  if(!target.isConnected) return;
  const days=githubCache.days;
  const total=days.reduce((sum,d)=>sum+d.count,0), active=days.filter(d=>d.count>0).length;
  const offset=new Date(days[0].date+'T00:00:00Z').getUTCDay();
  const cells=Array.from({length:offset},()=>'<span class="heat-cell blank" aria-hidden="true"></span>').join('')+days.map(d=>'<span tabindex="0" class="heat-cell level-'+Math.min(4,Math.max(0,Number(d.level)||0))+'" title="'+escapeHtml(d.date)+': '+d.count+' contributions" aria-label="'+escapeHtml(d.date)+': '+d.count+' contributions"></span>').join('');
  target.innerHTML='<div class="stats"><div><strong>'+total.toLocaleString()+'</strong><span>Contributions in this period</span></div><div><strong>'+active+'</strong><span>Active days</span></div><div><strong>'+Math.max(...days.map(d=>d.count))+'</strong><span>Most in a day</span></div></div><div class="calendar-scroll" tabindex="0" role="region" aria-label="Contribution calendar, scroll horizontally on small screens"><div class="heatmap" style="--weeks:'+Math.ceil((days.length+offset)/7)+'">'+cells+'</div></div><div class="chart-labels"><span>'+escapeHtml(days[0].date)+'</span><span>'+escapeHtml(days[days.length-1].date)+'</span></div><div class="heat-legend"><span>Less</span><i class="level-0"></i><i class="level-1"></i><i class="level-2"></i><i class="level-3"></i><i class="level-4"></i><span>More</span></div><p class="small muted">Public calendar via '+link('https://github.com/grubersjoe/github-contributions-api','GitHub Contributions API')+' · fetched '+new Date(githubCache.at).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})+'</p>';
 } catch {
  if(target.isConnected) target.innerHTML='<div class="empty-chart">The contribution calendar is temporarily unavailable.</div><p class="small">Your GitHub profile remains available below.</p>';
 }
}
async function loadLeetcode() {
 const target=document.querySelector('#leetcode-activity');
 try {
  const response=await fetch('/api/leetcode',{signal:AbortSignal.timeout(15000)});
  if(!response.ok) throw new Error('Unavailable');
  const data=await response.json();
  if(!Array.isArray(data.days)||!data.days.length||!data.solved) throw new Error('Invalid data');
  if(!target.isConnected) return;
  const days=data.days, offset=new Date(days[0].date+'T00:00:00Z').getUTCDay();
  const total=days.reduce((n,d)=>n+d.count,0);
  const cells='<span class="heat-cell blank" aria-hidden="true"></span>'.repeat(offset)+days.map(d=>{
   const level=d.count===0?0:d.count<3?1:d.count<6?2:d.count<10?3:4;
   const label=escapeHtml(d.date)+': '+d.count+' submissions';
   return '<span class="heat-cell level-'+level+'" tabindex="0" title="'+label+'" aria-label="'+label+'"></span>';
  }).join('');
  target.innerHTML='<div class="stats"><div><strong>'+data.solved.all+'</strong><span>Problems solved · all time</span></div><div><strong>'+total+'</strong><span>Submissions · '+data.year+'</span></div><div><strong>'+days.filter(d=>d.count>0).length+'</strong><span>Active days · '+data.year+'</span></div></div>'+
   '<div class="difficulty-record">'+['easy','medium','hard'].map(k=>'<span><strong>'+data.solved[k]+'</strong> '+k+'</span>').join('')+'</div>'+
   '<div class="calendar-scroll" tabindex="0" role="region" aria-label="LeetCode submission calendar, scroll horizontally on small screens"><div class="heatmap" style="--weeks:'+Math.ceil((days.length+offset)/7)+'">'+cells+'</div></div>'+
   '<div class="chart-labels"><span>'+escapeHtml(days[0].date)+'</span><span>'+escapeHtml(days[days.length-1].date)+'</span></div>'+
   '<div class="heat-legend"><span>Less</span><i class="level-0"></i><i class="level-1"></i><i class="level-2"></i><i class="level-3"></i><i class="level-4"></i><span>More</span></div>'+
   '<p class="small muted">'+(data.stale?'Last available record':'Public LeetCode record')+' · updated '+escapeHtml(new Date(data.fetchedAt).toLocaleString())+'</p>';
 } catch {
  if(target.isConnected) target.innerHTML='<div class="empty-chart">The practice calendar is temporarily unavailable.</div><p class="small">You can still visit my LeetCode profile below.</p>';
 }
}
render();
