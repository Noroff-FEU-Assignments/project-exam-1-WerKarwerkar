const hamburgerBtn = document.querySelector('button.hamburger');
const nav = document.querySelector('nav.navigation');

hamburgerBtn.addEventListener('click', () => {
  nav.classList.toggle('is-open');
  document.body.classList.toggle('no-scroll');
});