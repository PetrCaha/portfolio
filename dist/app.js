const switcher = document.getElementById('language');
const languageStorageKey = 'portfolio-language';
const metadata = {
  cs: {
    title: 'Petr Caha — Weby a aplikace',
    description: 'Portfolio Petra Cahy. Weby, praktické aplikace a vlastní interaktivní projekty.',
    imageAlt: 'Petr Caha — Weby a aplikace. Monogram PC.',
    locale: 'cs_CZ'
  },
  en: {
    title: 'Petr Caha — Websites & apps',
    description: 'Petr Caha’s portfolio. Websites, practical apps and original interactive projects.',
    imageAlt: 'Petr Caha — Websites & apps. PC monogram.',
    locale: 'en_GB'
  }
};

function applyLanguage(language) {
  const copy = metadata[language];
  document.documentElement.lang = language;
  document.querySelectorAll('[data-cs][data-en]').forEach(element => {
    element.innerHTML = element.dataset[language];
  });
  document.querySelectorAll('[data-aria-cs][data-aria-en]').forEach(element => {
    element.setAttribute('aria-label', element.getAttribute(`data-aria-${language}`));
  });
  switcher.textContent = language === 'cs' ? 'EN' : 'CZ';
  switcher.setAttribute('aria-label', language === 'cs' ? 'Switch to English' : 'Přepnout do češtiny');
  switcher.lang = language === 'cs' ? 'en' : 'cs';
  document.title = copy.title;
  const values = {
    'meta[name="description"]': copy.description,
    'meta[property="og:title"]': copy.title,
    'meta[property="og:description"]': copy.description,
    'meta[property="og:image:alt"]': copy.imageAlt,
    'meta[property="og:locale"]': copy.locale,
    'meta[name="twitter:title"]': copy.title,
    'meta[name="twitter:description"]': copy.description,
    'meta[name="twitter:image:alt"]': copy.imageAlt
  };
  Object.entries(values).forEach(([selector, value]) => {
    document.querySelector(selector).setAttribute('content', value);
  });
}

let savedLanguage = 'cs';
try {
  const stored = localStorage.getItem(languageStorageKey);
  if (stored === 'cs' || stored === 'en') savedLanguage = stored;
} catch { /* Language switching also works when storage is unavailable. */ }
applyLanguage(savedLanguage);

switcher.addEventListener('click', () => {
  const language = document.documentElement.lang === 'cs' ? 'en' : 'cs';
  applyLanguage(language);
  try { localStorage.setItem(languageStorageKey, language); } catch { /* Optional preference. */ }
});
