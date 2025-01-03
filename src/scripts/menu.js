document.addEventListener('astro:page-load', () => {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    hamburger.addEventListener('click', () => {
        console.log('click!')
        nav.classList.toggle('expanded');
    });
})