
const toast = (msg) => {
  const el = document.querySelector('.toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
};

document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-tab]');
  if (btn) {
    document.querySelectorAll('[data-tab]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const target = btn.dataset.tab;
    document.querySelectorAll('[data-panel]').forEach(p => p.style.display = p.dataset.panel === target ? 'block' : 'none');
  }

  const filter = e.target.closest('[data-filter]');
  if (filter) {
    const tag = filter.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('active'));
    filter.classList.add('active');
    document.querySelectorAll('[data-project]').forEach(card => {
      const show = tag === 'all' || card.dataset.project.includes(tag);
      card.style.display = show ? 'block' : 'none';
    });
  }

  const menuBtn = e.target.closest('[data-menu-toggle]');
  if (menuBtn) {
    const menu = document.querySelector('.mobile-menu');
    if (menu) menu.classList.toggle('open');
  }

  const modalOpen = e.target.closest('[data-open-modal]');
  if (modalOpen) {
    const title = modalOpen.dataset.openModal;
    toast(`Открыт проект: ${title}`);
  }

  const submit = e.target.closest('[data-demo-submit]');
  if (submit) {
    e.preventDefault();
    const form = submit.closest('form');
    if (form && form.reportValidity()) {
      toast('Заявка отправлена. Мы скоро свяжемся с вами.');
      form.reset();
    }
  }
});
