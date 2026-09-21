const switcher = document.getElementById('language');
switcher.addEventListener('click', () => {
  const language = document.documentElement.lang === 'cs' ? 'en' : 'cs';
  document.documentElement.lang = language;
  document.querySelectorAll('[data-cs]').forEach(element => {element.innerHTML = element.dataset[language];});
  switcher.textContent = language === 'cs' ? 'EN' : 'CZ';
  switcher.setAttribute('aria-label', language === 'cs' ? 'Switch to English' : 'Přepnout do češtiny');
  document.title = language === 'cs' ? 'Petr Caha — Weby a aplikace' : 'Petr Caha — Websites & apps';
});
