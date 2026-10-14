function element(tag, className, text) { const node = document.createElement(tag); if (className) node.className = className; if (text) node.textContent = text; return node; }
function externalLink(url, className) { const a = element('a', className); const parsed = new URL(url); if (!['https:', 'http:', 'mailto:'].includes(parsed.protocol)) throw new Error('Unsupported link'); a.href = parsed.href; a.target = '_blank'; a.rel = 'noopener noreferrer'; return a; }
for (const link of window.siteContent.links) {
  const a = externalLink(link.url, 'link-card'); const symbol = element('span', 'link-symbol', link.symbol); symbol.setAttribute('aria-hidden', 'true'); const label = element('div'); label.append(element('strong', '', link.label), element('small', '', link.detail)); const arrow = element('span', 'arrow', '↗'); arrow.setAttribute('aria-hidden', 'true'); a.append(symbol, label, arrow); document.querySelector('#link-list').append(a);
}
window.siteContent.projects.forEach((project, i) => {
  const url = 'https://github.com/Jared284/security-portfolio/tree/main/simulations/' + encodeURIComponent(project.path);
  const a = externalLink(url, 'project-card'); const body = element('div'); body.append(element('h3', '', project.title), element('p', '', project.description)); const tags = element('div', 'tags'); for (const tag of project.tags) tags.append(element('span', '', tag)); body.append(tags); const arrow = element('span', 'arrow', '↗'); arrow.setAttribute('aria-hidden', 'true'); a.append(element('span', 'project-number', String(i + 1).padStart(2, '0')), body, arrow); document.querySelector('#project-list').append(a);
});
