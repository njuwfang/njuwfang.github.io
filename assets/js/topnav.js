(function () {
    const nav = document.querySelector('.top-nav');
    if (!nav) return;

    const btn = nav.querySelector('.nav-toggle');
    const menu = nav.querySelector('#nav-menu');

    function closeMenu() {
      nav.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    }

    function toggleMenu() {
      const open = nav.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // 点击菜单项后自动关闭（手机体验更好）
    menu.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (a) closeMenu();
    });

    // 点击页面其它区域关闭
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target)) closeMenu();
    });

    // ESC 关闭
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });

    // 屏幕变回桌面端时，确保菜单不会卡在打开状态
    window.addEventListener('resize', () => {
      if (window.matchMedia('(min-width: 721px)').matches) closeMenu();
    });
  })();