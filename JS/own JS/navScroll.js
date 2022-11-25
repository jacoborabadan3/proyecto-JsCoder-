//Menu Scroll
window.addEventListener('scroll', () => {
    let header = document.querySelector('header')
    header.classList.toggle('navScroll', window.scrollY > 0);
    //Modificacion del DOM
    let svg = document.getElementById('svgScroll');
    window.scrollY > 0 ? svg.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-building-bank" width="60" height="60" viewBox="0 0 24 24" stroke-width="0.6" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <line x1="3" y1="21" x2="21" y2="21" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <polyline points="5 6 12 3 19 6" />
        <line x1="4" y1="10" x2="4" y2="21" />
        <line x1="20" y1="10" x2="20" y2="21" />
        <line x1="8" y1="14" x2="8" y2="17" />
        <line x1="12" y1="14" x2="12" y2="17" />
        <line x1="16" y1="14" x2="16" y2="17" />
    </svg>
    ` : svg.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-businessplan" width="88"
    height="88" viewBox="0 0 24 24" stroke-width="0.5" stroke="#ffffff" fill="none"
    stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <ellipse cx="16" cy="6" rx="5" ry="3" />
        <path d="M11 6v4c0 1.657 2.239 3 5 3s5 -1.343 5 -3v-4" />
        <path d="M11 10v4c0 1.657 2.239 3 5 3s5 -1.343 5 -3v-4" />
        <path d="M11 14v4c0 1.657 2.239 3 5 3s5 -1.343 5 -3v-4" />
        <path d="M7 9h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5" />
        <path d="M5 15v1m0 -8v1" />
    </svg>
    `;
});