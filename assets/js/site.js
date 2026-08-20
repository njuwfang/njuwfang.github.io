(() => {
  const nav = document.querySelector('.top-nav');

  if (nav) {
    const toggle = nav.querySelector('.nav-toggle');
    const menu = nav.querySelector('#nav-menu');

    const closeMenu = () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
    };

    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    menu.addEventListener('click', (event) => {
      if (event.target.closest('a')) closeMenu();
    });

    document.addEventListener('click', (event) => {
      if (!nav.contains(event.target)) closeMenu();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });

    window.addEventListener('resize', () => {
      if (window.matchMedia('(min-width: 721px)').matches) closeMenu();
    });
  }

  const backToTop = document.querySelector('#back-to-top');

  if (backToTop) {
    const updateBackToTop = () => {
      const isVisible = window.scrollY > 0;
      backToTop.classList.toggle('is-visible', isVisible);
      backToTop.tabIndex = isVisible ? 0 : -1;
    };

    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    window.addEventListener('scroll', updateBackToTop, { passive: true });
    updateBackToTop();
  }
})();
