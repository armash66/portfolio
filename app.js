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
 return '<section class="opening"><p class="kicker">Mumbai · Engineering portfolio</p><h1>Armash Ansari</h1><p class="opening-deck">Backend systems & applied machine learning.</p><p class="opening-note">I enjoy taking a practical problem and working through the software behind it.</p><div class="opening-bottom"><section><h2>Get in touch</h2><div class="links">'+correspondence()+'</div></section><section><h2>Résumé</h2>'+resumeNotice()+'</section></div></section>';
}
function worksPage() {
 return heading('Selected work', '')+'<div class="work-pair">'+profile.projects.map(p=>'<article><p class="kicker">'+escapeHtml(p.category)+'</p><h2>'+escapeHtml(p.title)+'</h2><p>'+escapeHtml(p.description)+'</p><p class="tech">'+escapeHtml(p.stack)+'</p>'+projectLinks(p)+'</article>').join('')+'</div><section class="other-work work-tail"><p class="kicker">Other experiments</p><ul>'+profile.otherProjects.map(p=>'<li>'+link(p.source,p.title)+'<span>'+escapeHtml(p.note)+'</span></li>').join('')+'</ul></section>';
}
function chroniclePage() {
 return heading('About me', '')+'<div class="about-introduction"><p>I started with Computer Engineering and now study Electronics & Computer Science. My interests have grown from building web layouts to working with data, signals and the systems behind an application.</p><p>I like understanding how the pieces fit together, from the logic of a system to the interface someone uses. Alongside coursework, I learn by building small tools and trying ideas in code.</p></div><div class="work-pair"><section><h2>Education</h2>'+educationList()+'</section><section><h2>Experience</h2>'+profile.experience.map(e=>'<article class="experience-entry">'+(e.dates?'<span class="dates">'+escapeHtml(e.dates)+'</span>':'')+'<h3>'+escapeHtml(e.title)+'</h3><p class="institution">'+escapeHtml(e.institution)+'</p>'+(e.description?'<p>'+escapeHtml(e.description)+'</p>':'')+'</article>').join('')+'</section></div><p class="working-tools"><strong>Working tools</strong> Python, JavaScript, SQL, Git, Docker and MATLAB.</p>';
}
function leetcodeBlock() {
 return '<div id="leetcode-activity" aria-live="polite"><div class="empty-chart">Loading the practice calendar…</div></div>' + link('https://leetcode.com/u/' + encodeURIComponent(profile.leetcode), 'View LeetCode profile');
}
function personalInterests() {
 return '<section class="off-clock"><p class="kicker">On the weekends</p><div class="work-pair"><article><h3>Learning chess</h3><p>I play chess on weekends. I’m really new to it and still a beginner.</p>'+link('https://www.chess.com/member/armash66','Chess.com')+'</article><article><h3>A film to watch</h3><p>I also spend weekends watching movies. Some favourites are Dune, Gloomy Sunday, Before Sunrise and Grave of the Fireflies.</p>'+link('https://letterboxd.com/__armash66/','Letterboxd')+'</article></div></section>';
}
function dailyPage() {
 return heading('The daily record', 'Contributions & problem solving') + '<div class="activity-edition"><section class="contributions-section"><p class="kicker">GitHub · ' + escapeHtml(profile.github) + '</p><h2>A year of contributions</h2><div id="github-activity" aria-live="polite"><div class="empty-chart">Loading the contribution calendar…</div></div>' + link(githubUrl,'View GitHub profile') + '</section><section class="practice-section"><p class="kicker">LeetCode</p><h2>Problem-solving practice</h2>' + leetcodeBlock() + '</section>' + personalInterests() + '</div>';
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
