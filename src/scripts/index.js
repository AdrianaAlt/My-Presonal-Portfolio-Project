import logoDarkMode from 'url:../img/logo-black.svg';
import logoLightMode from 'url:../img/logo-white.svg';

const home = document.querySelector('.section-home');
const nav = document.querySelector('.nav');
const navList = document.querySelector('.nav__list');
const navMarker = document.querySelector('.nav__marker');
const navItems = document.querySelectorAll('.nav__item');
const logo = document.querySelector('#logo');
const themeBtn = document.querySelector('.theme-btn');

// Observer
const navHeight = navList.getBoundingClientRect().height;
const scrolledNav = function (entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
};
const headerObserver = new IntersectionObserver(scrolledNav, {
    root: null,
    threshold: 0.8,
    rootMargin: `${navHeight}px`,
});
      

// handle events
const handleNavItemClick = function(e){
    const clickedNavItem = e.target.closest('.nav__item');
    if (!clickedNavItem) return;
    navItems.forEach(item => item.classList.remove('active'));
    clickedNavItem.classList.add('active');
}
const handleNavigationHover = function(e) {
    const clickedNavItem = e.target.closest('.nav__item');
    if (!clickedNavItem  || nav.classList.contains('scrolled')) return;

    navMarker.style.left = clickedNavItem.offsetLeft+'px';
    navMarker.style.width = clickedNavItem.offsetWidth + 'px';
}
const handleNavigationMouseOut = function(e){
    const activeItem = navList.querySelector('.active');
    navMarker.style.left = activeItem.offsetLeft + 'px';
    navMarker.style.width = activeItem.offsetWidth + 'px';
}
const toggleThemeMode = function(){
    const body = document.body;
    logo.setAttribute('src', body.classList.contains('light-mode') ? logoLightMode : logoDarkMode);
    document.body.classList.toggle('light-mode');
}


const controlNavigation = function(){
    navList.addEventListener('click', handleNavItemClick);
    navList.addEventListener('mouseover', handleNavigationHover)
    navList.addEventListener('mouseout', handleNavigationMouseOut);
}

const controlTheme = function(){
    themeBtn.addEventListener('click', toggleThemeMode);
}

const init = function(){
    controlNavigation();
    controlTheme();
    headerObserver.observe(home);
}
init();