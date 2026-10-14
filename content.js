// Add or change public links and projects here. No account or build step needed.
window.siteContent = {
  links: [
    { label: 'LinkedIn', detail: 'Connect with me', symbol: 'in', url: 'https://www.linkedin.com/in/jared-weiss12' },
    { label: 'GitHub', detail: 'Code, labs & documentation', symbol: '{ }', url: 'https://github.com/Jared284' },
    { label: 'Security portfolio', detail: 'Explore the full collection', symbol: '↳', url: 'https://github.com/Jared284/security-portfolio' }
  ],
  projects: [
    { title: 'Cloud security monitoring', description: 'An AWS lab connecting Linux authentication logs and CloudTrail activity to detection signals and alerts.', tags: ['AWS', 'CloudWatch', 'CloudTrail'], path: '03-cloud-security-monitoring' },
    { title: 'IAM least privilege', description: 'A lab exploring over-permissioned access, scoped IAM policies, and allowed- and denied-action testing.', tags: ['IAM', 'Access control', 'AWS CLI'], path: '04-iam-least-privilege-hardening' },
    { title: 'API authorization', description: 'A serverless API lab investigating broken object-level authorization and backend ownership checks.', tags: ['API security', 'Lambda', 'BOLA'], path: '02-banking-api-security' },
    { title: 'SSH detection & response', description: 'A Linux lab using authentication logs, Fail2Ban, and custom logic to investigate SSH brute-force activity.', tags: ['Linux', 'Log analysis', 'Fail2Ban'], path: '01-ssh-bruteforce-detection' }
  ]
};
