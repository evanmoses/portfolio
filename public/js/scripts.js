// NAV BAR AND HAMBURGER MENU

const nav = document.querySelector('.nav-items');
const navToggle = document.querySelector('.skip');
const hamburger = document.querySelector('.hamburger');
if (navToggle) {
  navToggle.addEventListener('click',
    (e) => {
      nav.classList.toggle('open');
      hamburger.classList.toggle('is-active');
      e.preventDefault();
    }, false);
}

/* Any click outside of the nav element will close the menu if it's open */
const specifiedElement = document.querySelector('nav');
document.addEventListener('click', (event) => {
  const isClickInside = specifiedElement.contains(event.target);
  if (!isClickInside && nav.classList.contains('open')) {
    nav.classList.remove('open');
    hamburger.classList.remove('is-active');
  }
});

// DARK MODE
const btn = document.querySelector('.switch');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// set based on system preferences or local storage
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
  document.body.classList.toggle('dark-theme');
  document.getElementById('check-toggle').checked = true;
} else if (currentTheme === 'light') {
  document.body.classList.toggle('light-theme');
  document.getElementById('check-toggle').checked = false;
}

// toggle dark mode on button click
btn.addEventListener('change', () => {
  let theme = '';
  if (prefersDarkScheme.matches) {
    document.body.classList.toggle('light-theme');
    theme = document.body.classList.contains('light-theme')
      ? 'light'
      : 'dark';
  } else {
    document.body.classList.toggle('dark-theme');
    theme = document.body.classList.contains('dark-theme')
      ? 'dark'
      : 'light';
  }
  localStorage.setItem('theme', theme);
});

// FOOTER COPYRIGHT;
document.getElementById('copyright').appendChild(document.createTextNode(new Date().getFullYear()));
