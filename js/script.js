
const global = { 
    currentPage: window.location.pathname
};

function hightlightActiveLink() {
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        if (link.getAttribute('href') === global.currentPage) {
            link.classList.add('active');
        }
    });
}

function initApp() {
    switch (global.currentPage) {
        case '/':
        case '/index.html':
            console.log('"HOME PAGE"');
            break;
        case '/shows.html':
            console.log('"SHOWS PAGE"');
            break;
        case '/movie-details.html':
            console.log('"MOVIE DETAILS PAGE"');
            break;
        case '/tv-details.html':
            console.log('"TV DETAILS PAGE"');
            break;
        case '/search.html':
            console.log('"SEARCH PAGE"');
            break;
        default:
            console.log('404 PAGE NOT FOUND');
            break;
    }     
    
    hightlightActiveLink();
}

document.addEventListener('DOMContentLoaded', initApp);