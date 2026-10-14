const content = window.siteContent;
function element(tag, className, text) { const node = document.createElement(tag); if (className) node.className = className; if (text) node.textContent = text; return node; }
function externalLink(url, className) {
  const parsed = new URL(url);
  if (parsed.protocol !== 'https:') throw new Error('Public links must use HTTPS');
  const a = element('a', className); a.href = parsed.href; a.target = '_blank'; a.rel = 'noopener noreferrer'; return a;
}
function tags(values) { const node = element('div','tags'); values.forEach(value => node.append(element('span','',value))); return node; }
function newTabText() { return element('span','sr-only',' (opens in a new tab)'); }
function arrow() { const a = element('span','arrow','↗'); a.setAttribute('aria-hidden','true'); return a; }
function icon(kind) {
  const paths = {
    github:'M9 19c-4 1-4-2-6-2m12 4v-3.5c0-1 .1-1.5-.5-2 3-.3 6-1.5 6-5.5 0-1.2-.4-2.3-1.2-3.2.2-.8.2-2-.1-2.8-1.1 0-2.6.8-3.3 1.3-2-.6-4-.6-6 0C9.2 4.8 7.7 4 6.6 4c-.3.8-.3 2-.1 2.8C5.7 7.7 5.3 8.8 5.3 10c0 4 3 5.2 6 5.5-.6.5-.6 1.2-.6 2V21',
    linkedin:'M5 9v11M5 4.5v.1M10 20V9h4v2c1-3 6-3 6 2v7M10 9h4',
    folder:'M3 7V5h6l2 2h10v13H3V7Z'
  };
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('fill','none');svg.setAttribute('stroke','currentColor');svg.setAttribute('stroke-width','1.6');svg.setAttribute('stroke-linecap','round');svg.setAttribute('stroke-linejoin','round');svg.setAttribute('aria-hidden','true');
  const path=document.createElementNS(svg.namespaceURI,'path');path.setAttribute('d',paths[kind]||paths.folder);svg.append(path);return svg;
}
const projectList = document.querySelector('#project-list');
if (projectList) content.projects.forEach((project,i) => {
  const card=externalLink('https://github.com/Jared284/security-portfolio/tree/main/simulations/'+encodeURIComponent(project.path),'project-card');
  card.append(element('p','project-category',['Cloud security','Identity and access','Application security','Linux security'][i]),element('h2','',project.title),element('p','project-description',project.description),tags(project.tags),element('span','project-action','Read documentation ↗'),newTabText());
  projectList.append(card);
});
const sideList = document.querySelector('#side-project-list');
if (sideList) for (const project of content.sideProjects || []) {
  const card=externalLink(project.url,'side-project-card');
  const art=element('div','side-art');art.setAttribute('aria-hidden','true');
  const sphere=document.createElementNS('http://www.w3.org/2000/svg','svg');sphere.setAttribute('viewBox','0 0 160 160');sphere.setAttribute('fill','none');
  const circle=document.createElementNS(sphere.namespaceURI,'circle');circle.setAttribute('cx','80');circle.setAttribute('cy','80');circle.setAttribute('r','56');circle.setAttribute('fill','#242424');circle.setAttribute('stroke','#626262');
  const detail=document.createElementNS(sphere.namespaceURI,'path');detail.setAttribute('d','M25 80h110M29 57h102M29 103h102M80 24c-24 30-24 82 0 112M80 24c24 30 24 82 0 112');detail.setAttribute('stroke','#454545');
  const dish=document.createElementNS(sphere.namespaceURI,'circle');dish.setAttribute('cx','100');dish.setAttribute('cy','59');dish.setAttribute('r','13');dish.setAttribute('fill','#171717');dish.setAttribute('stroke','#767676');
  sphere.append(circle,detail,dish);art.append(sphere,element('span','space-label','SECTOR 07'));
  const body=element('div','side-body');body.append(element('p','project-category','Browser game'),element('h2','',project.title),element('p','project-description','Star Wars-inspired browser game. Built for fun with AI assistance.'),tags(project.tags),element('p','access-note','Access: private. Only my account can open the demo.'),element('span','project-action','Open private demo ↗'));
  card.append(art,body,newTabText());sideList.append(card);
}
const linkList=document.querySelector('#link-list');
if (linkList) content.links.forEach((link,i) => {
  const row=externalLink(link.url,'destination');const holder=element('span','destination-icon');holder.append(icon(i===0?'linkedin':i===1?'github':'folder'));
  const copy=element('div','destination-copy');copy.append(element('strong','',link.label),element('small','',['Professional profile.','Repositories and documentation.','Cybersecurity lab portfolio.'][i]));
  row.append(holder,copy,element('span','destination-host',i===0?'linkedin.com':i===1?'github.com/Jared284':'security-portfolio'),arrow(),newTabText());linkList.append(row);
});
const copyButton=document.querySelector('#copy-link');
if (copyButton) {
  const status=document.querySelector('#copy-status');
  copyButton.addEventListener('click',async()=>{
    try { await navigator.clipboard.writeText('https://jared284.github.io/');copyButton.textContent='Link copied ✓';status.textContent='Website link copied to clipboard.';setTimeout(()=>{copyButton.textContent='Copy website link ⧉';},2500); }
    catch { status.classList.remove('sr-only');status.textContent='https://jared284.github.io/';copyButton.textContent='Select the link to copy'; }
  });
}
