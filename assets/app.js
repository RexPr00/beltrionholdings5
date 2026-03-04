document.addEventListener('DOMContentLoaded', () => {
  const langSwitchers = document.querySelectorAll('.lang-switcher');
  langSwitchers.forEach((switcher) => {
    const button = switcher.querySelector('.lang-active');
    button?.addEventListener('click', () => {
      switcher.classList.toggle('open');
    });
    document.addEventListener('click', (event) => {
      if (!switcher.contains(event.target)) switcher.classList.remove('open');
    });
  });

  const drawer = document.querySelector('.mobile-drawer');
  const openBtn = document.querySelector('.burger');
  const closeBtn = document.querySelector('.drawer-close');
  const backdrop = document.querySelector('.drawer-backdrop');
  const focusables = 'a[href],button:not([disabled]),input:not([disabled])';

  const lock = () => document.body.classList.add('lock-scroll');
  const unlock = () => document.body.classList.remove('lock-scroll');

  const openDrawer = () => {
    if (!drawer) return;
    drawer.classList.add('open');
    lock();
    const first = drawer.querySelector(focusables);
    first?.focus();
  };

  const closeDrawer = () => {
    if (!drawer) return;
    drawer.classList.remove('open');
    unlock();
    openBtn?.focus();
  };

  const trapFocus = (event) => {
    if (!drawer?.classList.contains('open') || event.key !== 'Tab') return;
    const nodes = [...drawer.querySelectorAll(focusables)];
    if (!nodes.length) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  openBtn?.addEventListener('click', openDrawer);
  closeBtn?.addEventListener('click', closeDrawer);
  backdrop?.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeDrawer();
      closePrivacy();
    }
    trapFocus(event);
  });

  drawer?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeDrawer));

  const faqItems = [...document.querySelectorAll('.faq-item')];
  faqItems.forEach((item) => {
    item.querySelector('.faq-q')?.addEventListener('click', () => {
      faqItems.forEach((other) => {
        if (other !== item) other.classList.remove('open');
      });
      item.classList.toggle('open');
    });
  });

  const modal = document.querySelector('#privacy-modal');
  const openPrivacyBtn = document.querySelectorAll('[data-open-privacy]');
  const closePrivacyBtn = document.querySelectorAll('[data-close-privacy]');

  function openPrivacy() {
    modal?.classList.add('open');
    lock();
    modal?.querySelector('.modal-close-x')?.focus();
  }

  function closePrivacy() {
    modal?.classList.remove('open');
    unlock();
  }

  openPrivacyBtn.forEach((button) => button.addEventListener('click', (event) => {
    event.preventDefault();
    openPrivacy();
  }));
  closePrivacyBtn.forEach((button) => button.addEventListener('click', closePrivacy));
  modal?.querySelector('.modal-backdrop')?.addEventListener('click', closePrivacy);

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach((node) => revealObserver.observe(node));
});
