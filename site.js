const content = window.siteContent;
function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}
function externalLink(url, className) {
  const parsed = new URL(url);
  if (parsed.protocol !== 'https:') throw new Error('Public links must use HTTPS');
  const a = element('a', className);
  a.href = parsed.href; a.target = '_blank'; a.rel = 'noopener noreferrer';
  return a;
}
function icon(kind) {
  const paths = {
    github: 'M9 19c-4 1-4-2-6-2m12 4v-3.5c0-1 .1-1.5-.5-2 3-.3 6-1.5 6-5.5 0-1.2-.4-2.3-1.2-3.2.2-.8.2-2-.1-2.8-1.1 0-2.6.8-3.3 1.3-2-.6-4-.6-6 0C9.2 4.8 7.7 4 6.6 4c-.3.8-.3 2-.1 2.8C5.7 7.7 5.3 8.8 5.3 10c0 4 3 5.2 6 5.5-.6.5-.6 1.2-.6 2V21',
    linkedin: 'M5 9v11M5 4.5v.1M10 20V9h4v2c1-3 6-3 6 2v7M10 9h4',
    folder: 'M3 7V5h6l2 2h10v13H3V7Z',
    code: 'm8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 20',
    terminal: 'm5 6 5 5-5 5m8 0h6'
  };
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24'); svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor'); svg.setAttribute('stroke-width', '1.6');
  svg.setAttribute('stroke-linecap', 'round'); svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('aria-hidden', 'true');
  const path = document.createElementNS(svg.namespaceURI, 'path');
  path.setAttribute('d', paths[kind] || paths.folder); svg.append(path); return svg;
}
function arrow() { const span = element('span', 'arrow', '↗'); span.setAttribute('aria-hidden', 'true'); return span; }
function newTabText() { return element('span', 'sr-only', ' (opens in a new tab)'); }
function tags(values) { const node = element('div', 'tags'); values.forEach(value => node.append(element('span', '', value))); return node; }
function labUrl(project) { return 'https://github.com/Jared284/security-portfolio/tree/main/simulations/' + encodeURIComponent(project.path); }
function labVisual(index) {
  const visual = element('div', 'project-visual'); visual.setAttribute('aria-hidden', 'true');
  visual.append(element('span', 'visual-label', index === 0 ? 'SIGNAL → ALERT' : 'ACCESS CONTROL'));
  if (index === 0) {
    ['EC2 + CloudTrail', 'CloudWatch', 'SNS alert'].forEach((step, i) => {
      if (i) visual.append(element('span', 'flow-line'));
      visual.append(element('span', 'flow-step', step));
    });
  } else {
    visual.append(icon('folder'), element('span', 'policy-before', 'Broad permissions'), element('span', 'flow-line'), element('span', 'policy-after', 'Scoped policy'));
  }
  return visual;
}
content.projects.forEach((project, i) => {
  const featured = i < 2;
  const card = externalLink(labUrl(project), featured ? 'featured-card' : 'compact-card');
  const body = element('div', 'project-body');
  if (featured) body.append(element('p', 'project-category', i === 0 ? 'Cloud security / Detection' : 'Identity / Least privilege'));
  body.append(element('h3', '', project.title), element('p', 'project-description', project.description), tags(project.tags));
  if (featured) {
    body.append(element('span', 'project-action', 'Read the lab ↗'));
    card.append(labVisual(i), body);
  } else {
    const holder = element('span', 'compact-icon'); holder.append(icon(i === 2 ? 'code' : 'terminal'));
    card.append(holder, body, arrow());
  }
  card.append(newTabText());
  document.querySelector(featured ? '#project-list' : '#more-project-list').append(card);
});
for (const project of content.sideProjects || []) {
  const card = externalLink(project.url, 'side-card');
  const visual = element('div', 'space-visual'); visual.setAttribute('aria-hidden', 'true');
  const sphere = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  sphere.setAttribute('viewBox', '0 0 160 160'); sphere.setAttribute('fill', 'none');
  const circle = document.createElementNS(sphere.namespaceURI, 'circle'); circle.setAttribute('cx','80');circle.setAttribute('cy','80');circle.setAttribute('r','56');circle.setAttribute('fill','#242426');circle.setAttribute('stroke','#626266');
  const detail = document.createElementNS(sphere.namespaceURI,'path');detail.setAttribute('d','M25 80h110M29 57h102M29 103h102M80 24c-24 30-24 82 0 112M80 24c24 30 24 82 0 112');detail.setAttribute('stroke','#454549');
  const dish = document.createElementNS(sphere.namespaceURI,'circle');dish.setAttribute('cx','100');dish.setAttribute('cy','59');dish.setAttribute('r','13');dish.setAttribute('fill','#171719');dish.setAttribute('stroke','#76767c');
  sphere.append(circle,detail,dish);visual.append(sphere,element('span','space-label','SECTOR 07'));
  const body = element('div','side-body');body.append(element('p','project-category','Personal experiment'),element('h3','',project.title),element('p','project-description',project.description),tags(project.tags),element('span','project-action','Open private demo ↗'));
  card.append(visual,body,newTabText());document.querySelector('#side-project-list').append(card);
}
content.links.forEach((link, i) => {
  const kind = i === 0 ? 'linkedin' : i === 1 ? 'github' : 'folder';
  const row = externalLink(link.url,'destination');
  const holder = element('span','destination-icon');holder.append(icon(kind));
  const text = element('div','destination-copy');text.append(element('strong','',link.label),element('small','',link.detail));
  row.append(holder,text,element('span','destination-host',i === 0 ? 'linkedin.com' : i === 1 ? 'github.com/Jared284' : 'security-portfolio'),arrow(),newTabText());
  document.querySelector('#link-list').append(row);
  if (i < 2) { const quick = externalLink(link.url,'');quick.append(icon(kind),document.createTextNode(link.label),newTabText());document.querySelector('#profile-links').append(quick); }
});
const navLinks = [...document.querySelectorAll('.section-nav a')];
const sections = navLinks.map(a => document.querySelector(a.getAttribute('href')));
function updateNavigation() {
  const marker = window.innerHeight * .3;
  let current = sections[0];
  for (const section of sections) if (section.getBoundingClientRect().top <= marker) current = section;
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) current = sections.at(-1);
  for (const link of navLinks) {
    const active = link.getAttribute('href') === '#' + current.id;
    link.classList.toggle('is-active', active);
    if (active) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current');
  }
}
let navScheduled = false;
window.addEventListener('scroll', () => { if (!navScheduled) { navScheduled = true; requestAnimationFrame(() => { updateNavigation(); navScheduled = false; }); } }, {passive:true});
window.addEventListener('resize',updateNavigation);updateNavigation();
const copyButton = document.querySelector('#copy-link');
const copyStatus = document.querySelector('#copy-status');
copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('https://jared284.github.io/');
    copyButton.textContent = 'Link copied ✓';copyStatus.textContent = 'Website link copied to clipboard.';
    setTimeout(() => { copyButton.textContent = 'Copy website link ⧉'; },2500);
  } catch {
    copyStatus.classList.remove('sr-only');copyStatus.textContent = 'https://jared284.github.io/';
    copyButton.textContent = 'Select the link to copy';
  }
});
