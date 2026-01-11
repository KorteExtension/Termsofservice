document.addEventListener('DOMContentLoaded', () => {
  // Theme Management
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  
  // Check local storage or system preference
  const savedTheme = localStorage.getItem('theme');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  
  if (savedTheme === 'dark' || (!savedTheme && systemTheme === 'dark')) {
    htmlElement.classList.add('dark');
  } else {
    htmlElement.classList.remove('dark');
  }

  themeToggleBtn.addEventListener('click', () => {
    htmlElement.classList.toggle('dark');
    const isDark = htmlElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon();
  });

  function updateThemeIcon() {
    const isDark = htmlElement.classList.contains('dark');
    themeToggleBtn.innerHTML = isDark 
      ? '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>' // Sun icon
      : '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>'; // Moon icon
  }
  
  updateThemeIcon();

  // Language Management
  const langSelect = document.getElementById('language-select');
  if (langSelect) {
    const savedLang = localStorage.getItem('language') || 'en';
    const browserLang = navigator.language.split('-')[0];
    const supportedLangs = ['en', 'fr', 'de', 'es', 'pt', 'zh'];
    
    // Determine initial language
    let initialLang = savedLang;
    if (!localStorage.getItem('language') && supportedLangs.includes(browserLang)) {
      initialLang = browserLang;
    }
    
    // Set selector value
    if (supportedLangs.includes(initialLang)) {
      langSelect.value = initialLang;
      updateLanguage(initialLang);
    } else {
      langSelect.value = 'en';
      updateLanguage('en');
    }

    langSelect.addEventListener('change', (e) => {
      const selectedLang = e.target.value;
      localStorage.setItem('language', selectedLang);
      updateLanguage(selectedLang);
    });
  }

  function updateLanguage(lang) {
    // Hide all language content
    document.querySelectorAll('[data-lang-content]').forEach(el => {
      el.classList.remove('active');
    });

    // Show selected language content
    const activeElements = document.querySelectorAll(`[data-lang-content="${lang}"]`);
    if (activeElements.length > 0) {
      activeElements.forEach(el => el.classList.add('active'));
    } else {
      // Fallback to English if translation missing
      document.querySelectorAll('[data-lang-content="en"]').forEach(el => el.classList.add('active'));
    }
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
  }
});
