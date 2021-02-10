const btn = document.querySelector('.switch');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

const currentTheme = localStorage.getItem('theme');
if (currentTheme == 'dark') {
  document.body.classList.toggle('dark-theme');
  document.getElementById('check-toggle').checked = true;
} else if (currentTheme == 'light') {
  document.body.classList.toggle('light-theme');
  document.getElementById('check-toggle').checked = false;
}

btn.addEventListener('change', () => {
  if (prefersDarkScheme.matches) {
    document.body.classList.toggle('light-theme');
    var theme = document.body.classList.contains('light-theme')
      ? 'light'
      : 'dark';
  } else {
    document.body.classList.toggle('dark-theme');
    var theme = document.body.classList.contains('dark-theme')
      ? 'dark'
      : 'light';
  }
  localStorage.setItem('theme', theme);
});

document.getElementById('copyright').appendChild(document.createTextNode(new Date().getFullYear()));
