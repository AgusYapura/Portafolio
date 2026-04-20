// ─────────────────────────────────────────────
// Portafolio Agustin Yapura
// 1) Halo del cursor
// 2) Scroll spy con IntersectionObserver
// 3) Smooth scroll al click
// ─────────────────────────────────────────────

(function () {
  // ─── 1) Halo del cursor ───
  const glow = document.querySelector('.cursor-glow');
  if (glow && window.matchMedia('(pointer: fine)').matches) {
    let raf = null;
    let nextX = 0;
    let nextY = 0;

    window.addEventListener('mousemove', (e) => {
      nextX = e.clientX;
      nextY = e.clientY;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        glow.style.setProperty('--cursor-x', nextX + 'px');
        glow.style.setProperty('--cursor-y', nextY + 'px');
        raf = null;
      });
    });
  }

  // ─── 2) Scroll spy ───
  const navLinks = document.querySelectorAll('.side-nav-link');
  const sections = Array.from(navLinks)
    .map((link) => document.getElementById(link.dataset.target))
    .filter(Boolean);

  const setActive = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.dataset.target === id);
    });
  };

  if (sections.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      {
        rootMargin: '-30% 0px -55% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );
    sections.forEach((s) => observer.observe(s));
  }

  // ─── 3) Smooth scroll al click ───
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.dataset.target;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', '#' + id);
      setActive(id);
    });
  });

  const initial = window.location.hash.replace('#', '');
  if (initial) setActive(initial);
  else if (sections[0]) setActive(sections[0].id);
})();
