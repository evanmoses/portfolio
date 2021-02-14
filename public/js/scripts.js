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

// NAV BAR AND HAMBURGER MENU
const content = document.querySelector('body');
const nav = document.querySelector('.nav-items');
const navToggle = document.querySelector('.skip');
const hamburger = document.querySelector('.hamburger');
const anchorLinks = document.querySelectorAll('.nav-items ul li');
let width = window.innerWidth;

window.addEventListener('resize', () => {
  width = window.innerWidth;
  if (width > 768) {
    nav.classList.remove('open');
    hamburger.classList.remove('is-active');
    content.style.marginTop = 0;
  }
});

navToggle.addEventListener('click', (e) => {
  if (width < 768) {
    if (nav.classList.contains('open')) {
      content.style.marginTop = 0;
    } else {
      content.style.marginTop = '250px';
    }
    nav.classList.toggle('open');
    hamburger.classList.toggle('is-active');
    e.preventDefault();
  }
});

anchorLinks.forEach((anchorLink) => {
  anchorLink.addEventListener('click', () => {
    if (width < 768) {
      if (nav.classList.contains('open')) {
        content.style.marginTop = 0;
      } else {
        content.style.marginTop = '250px';
      }
      nav.classList.toggle('open');
      hamburger.classList.toggle('is-active');
    }
  });
});

/* Any click outside of the nav element will close the menu if it's open */
const specifiedElement = document.querySelector('nav');
document.addEventListener('click', (event) => {
  const isClickInside = specifiedElement.contains(event.target);
  if (!isClickInside && nav.classList.contains('open')) {
    nav.classList.remove('open');
    hamburger.classList.remove('is-active');
    content.style.marginTop = 0;
  }
});

// PROJECT CARD EXPANDING TOGGLE;
const cardExpanders = document.querySelectorAll('.card-expander');

cardExpanders.forEach((cardExpander) => {
  cardExpander.addEventListener('mousedown', function () {
    const thisContent = this.parentNode.getElementsByClassName('toggle-content')[0];
    const thisIcon = this.parentNode.getElementsByClassName('toggle-icon')[0];
    thisContent.classList.toggle('expanded');
    thisIcon.classList.toggle('rotated');
  });
});

// FOOTER COPYRIGHT;
document.getElementById('copyright').appendChild(document.createTextNode(new Date().getFullYear()));
