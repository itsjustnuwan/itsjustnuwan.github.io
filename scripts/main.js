/**
 * portfolio/scripts/main.js
 * Loads content.json and builds the entire portfolio dynamically.
 */

/* ── fetch data ── */
async function loadData() {
  const res = await fetch('./data/content.json');
  if (!res.ok) throw new Error('Could not load content.json');
  return res.json();
}

/* ── social icon SVGs (inline, no external dependency) ── */
const SOCIAL_ICONS = {
  facebook: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`,
  twitter:  `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  instagram:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
  github:   `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>`,
};

/* ── contact icons ── */
const CONTACT_ICONS = {
  phone:    '📞',
  email:    '✉️',
  location: '📍',
};

/* ── Build Hero code window ── */
function buildTerminal(p) {
  return `
  <div class="terminal">
    <div class="terminal-bar">
      <div class="t-dot r"></div>
      <div class="t-dot y"></div>
      <div class="t-dot g"></div>
      <span class="terminal-title">Nuwantha.java</span>
    </div>
    <div class="terminal-body">
      <div class="t-line"><span class="t-kw">public class</span> <span class="t-cls">Nuwantha</span> {</div>
      <div class="t-line">&nbsp;&nbsp;<span class="t-kw">String</span> name = <span class="t-str">"${p.name}"</span>;</div>
      <div class="t-line">&nbsp;&nbsp;<span class="t-kw">String</span> role = <span class="t-str">"${p.tagline}"</span>;</div>
      <div class="t-line">&nbsp;&nbsp;<span class="t-kw">String</span>[] skills = {<span class="t-str">"Programming"</span>, <span class="t-str">"Banking"</span>, <span class="t-str">"UX"</span>};</div>
      <div class="t-line">&nbsp;&nbsp;<span class="t-kw">String</span>[] langs = {<span class="t-str">"English"</span>, <span class="t-str">"Sinhala"</span>};</div>
      <div class="t-line">&nbsp;&nbsp;<span class="t-fn">String</span> dailyRoutine() {</div>
      <div class="t-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="t-kw">return</span> <span class="t-str">"☀️ Wake → 🏦 Bank → 💻 Code → ☕ Coffee"</span>;</div>
      <div class="t-line">&nbsp;&nbsp;}</div>
      <div class="t-line">} <span class="cursor"></span></div>
    </div>
  </div>`;
}

/* ── Build Skills section ── */
function buildSkills(skills) {
  return skills.map(s => `
    <div class="skill-card">
      <div class="skill-card-icon">${s.icon}</div>
      <h3>${s.category}</h3>
      <div class="skill-tags">
        ${s.items.map(i => `<span class="skill-tag">${i}</span>`).join('')}
      </div>
    </div>`).join('');
}

/* ── Build Experience / Education timeline ── */
function buildExperienceItem(job) {
  const sectionsHTML = job.sections.map(sec => `
    <p class="tl-section-head">${sec.heading}</p>
    <ul class="tl-duties">
      ${sec.duties.map(d => `<li>${d}</li>`).join('')}
    </ul>`).join('');
  return `
  <div class="tl-item">
    <div class="tl-card">
      <div class="tl-header">
        <span class="tl-title">${job.title}</span>
        <span class="tl-badge${job.current ? ' current' : ''}">${job.current ? '● ' : ''}${job.period}</span>
      </div>
      <p class="tl-company">${job.company}</p>
      ${sectionsHTML}
    </div>
  </div>`;
}

function buildEducationItem(edu) {
  const highlights = edu.highlights.length
    ? `<ul class="tl-duties">${edu.highlights.map(h => `<li>${h}</li>`).join('')}</ul>` : '';
  return `
  <div class="tl-item">
    <div class="tl-card">
      <div class="tl-header">
        <span class="tl-title">${edu.degree}</span>
        <span class="tl-badge">${edu.period}</span>
      </div>
      <p class="tl-company">${edu.institution}</p>
      <p class="tl-status">${edu.status}</p>
      ${highlights}
    </div>
  </div>`;
}

/* ── Build Contact info ── */
function buildContactInfo(p, social) {
  const items = [
    { icon: CONTACT_ICONS.phone,    text: p.phone,    href: `tel:${p.phone.replace(/\s/g,'')}` },
    { icon: CONTACT_ICONS.email,    text: p.email,    href: `mailto:${p.email}` },
    { icon: CONTACT_ICONS.location, text: p.location, href: null },
  ];

  const infoHTML = items.map(it => `
    <div class="contact-item">
      <div class="contact-item-icon">${it.icon}</div>
      <span>${it.href ? `<a href="${it.href}" target="_blank">${it.text}</a>` : it.text}</span>
    </div>`).join('');

  const socialHTML = social.map(s => `
    <a class="social-btn" href="${s.url}" target="_blank" rel="noopener">
      ${SOCIAL_ICONS[s.icon] ?? ''}
      ${s.platform}
    </a>`).join('');

  return `
    <div class="contact-info-card">
      <h3>Contact Information</h3>
      ${infoHTML}
      <div class="social-row">${socialHTML}</div>
    </div>`;
}

/* ── Projects placeholder ── */
function buildProjectsPlaceholder() {
  return `
    <div class="placeholder-card"><div class="ph-icon">🚀</div><span>Coming soon — project showcase</span></div>
    <div class="placeholder-card"><div class="ph-icon">🚀</div><span>Coming soon — project showcase</span></div>
    <div class="placeholder-card"><div class="ph-icon">🚀</div><span>Coming soon — project showcase</span></div>`;
}

/* ── Render everything ── */
function render(data) {
  const { personal: p, social, skills, experience, education } = data;

  // Hero
  document.getElementById('hero-eyebrow').textContent = 'Hello, I\'m';
  document.getElementById('hero-name').innerHTML = p.name.split(' ').map((w,i) =>
    i === 1 ? `<span class="accent-word">${w}</span>` : w).join(' ');
  document.getElementById('hero-subtitle').textContent = p.title;
  document.getElementById('hero-bio').textContent = p.bio;
  const cvBtn = document.getElementById('btn-download-cv');
  if (cvBtn && p.cv_url && p.cv_url !== '#') {
    cvBtn.href = p.cv_url;
    cvBtn.removeAttribute('aria-disabled');
    cvBtn.style.display = 'inline-flex';
  }
  document.getElementById('hero-terminal').innerHTML = buildTerminal(p);

  // Skills
  document.getElementById('skills-grid').innerHTML = buildSkills(skills);

  // Experience
  document.getElementById('experience-timeline').innerHTML =
    experience.map(buildExperienceItem).join('');

  // Education
  document.getElementById('education-timeline').innerHTML =
    education.map(buildEducationItem).join('');

  // Projects
  document.getElementById('projects-grid').innerHTML = buildProjectsPlaceholder();

  // Contact
  document.getElementById('contact-info').innerHTML = buildContactInfo(p, social);

  // Footer
  document.getElementById('footer-name').textContent = p.name;

  // After render, init observers
  initScrollReveal();
  initTimelineReveal();
}

/* ── Scroll reveal (generic .reveal and .reveal-stagger) ── */
function initScrollReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => io.observe(el));
}

/* ── Timeline items ── */
function initTimelineReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, idx) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), idx * 80);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.tl-item').forEach(el => io.observe(el));
}

/* ── Nav scroll behavior ── */
function initNav() {
  const nav = document.querySelector('nav');
  const links = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // scrolled class
    nav.classList.toggle('scrolled', window.scrollY > 40);

    // active link
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    links.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
  }, { passive: true });

  // smooth anchor click
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // close mobile nav
      document.querySelector('.mobile-nav')?.classList.remove('open');
      document.querySelector('body').style.overflow = '';
    });
  });
}

/* ── Mobile nav toggle ── */
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  if (!toggle || !mobileNav) return;

  toggle.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    toggle.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
}

/* ── Scroll progress bar ── */
function initProgressBar() {
  const bar = document.getElementById('progress-bar');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = `${(window.scrollY / total) * 100}%`;
  }, { passive: true });
}

/* ── Contact form ── */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    const btn = form.querySelector('.btn-submit');
    btn.classList.add('loading');
    btn.disabled = true;
    // Formspree handles the actual POST; re-enable after delay
    setTimeout(() => { btn.classList.remove('loading'); btn.disabled = false; }, 4000);
  });
}

/* ── Mouse glow follow (subtle) ── */
function initMouseGlow() {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position:fixed;pointer-events:none;z-index:0;
    width:400px;height:400px;border-radius:50%;
    background:radial-gradient(circle,rgba(99,179,237,0.04) 0%,transparent 70%);
    transform:translate(-50%,-50%);
    transition:left 0.8s ease,top 0.8s ease;
    top:50%;left:50%;
  `;
  document.body.appendChild(glow);
  let raf;
  document.addEventListener('mousemove', e => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      glow.style.left = e.clientX + 'px';
      glow.style.top  = e.clientY + 'px';
    });
  });
}

/* ── Page load fade ── */
function initPageLoad() {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  window.addEventListener('load', () => {
    requestAnimationFrame(() => { document.body.style.opacity = '1'; });
  });
}

/* ── Bootstrap ── */
initPageLoad();

document.addEventListener('DOMContentLoaded', async () => {
  initNav();
  initMobileNav();
  initProgressBar();
  initContactForm();
  initMouseGlow();

  try {
    const data = await loadData();
    render(data);
  } catch (err) {
    console.error('Portfolio data load error:', err);
  }
});
