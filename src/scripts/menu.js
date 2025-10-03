const navBtn = document.querySelector('.nav__btn');
const nav = document.querySelector('nav');
navBtn.addEventListener('click', () => {
    console.log('click!')
    nav.classList.toggle('expanded');
    document.body.classList.toggle('no-scroll');
});