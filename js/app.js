/**
 * Volt Gießen Fraktion - App Entry Bootstrapper
 * Mounts layouts, registers routes, and triggers router.
 */

import store from './store.js';
import router from './router.js';

// Import Components
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';

// Import Page controllers
import homePage from './pages/home.js';
import fraktionPage from './pages/fraktion.js';
import programmPage from './pages/programm.js';
import antraegePage from './pages/antraege.js';
import newsPage from './pages/news.js';
import contactPage from './pages/contact.js';

// Register routes
router.register('#/', homePage);
router.register('#/fraktion', fraktionPage);
router.register('#/programm', programmPage);
router.register('#/antraege', antraegePage);
router.register('#/news', newsPage);
router.register('#/kontakt', contactPage);

// Application initializer on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize CSS variables theme
    store.initTheme();

    // 2. Render Core layout Shell
    const headerNode = document.getElementById('site-header');
    const footerNode = document.getElementById('site-footer');

    if (headerNode) {
        headerNode.innerHTML = Navbar.render();
        Navbar.afterRender(); // Bind listeners for header
    }

    if (footerNode) {
        footerNode.innerHTML = Footer.render();
        Footer.afterRender(); // Bind listeners for newsletter form
    }

    // 3. Bind global event listeners
    bindGlobalListeners();

    // 4. Start routing
    router.init();
});

// Setup click delegators and utility triggers
function bindGlobalListeners() {
    // Watch for click outside mobile menu drawer to close it
    document.addEventListener('click', (event) => {
        const navMenu = document.querySelector('.nav-menu');
        const menuBtn = document.querySelector('.mobile-menu-btn');
        
        if (navMenu && navMenu.classList.contains('active')) {
            const isClickInsideMenu = navMenu.contains(event.target);
            const isClickOnToggle = menuBtn.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnToggle) {
                navMenu.classList.remove('active');
                menuBtn.classList.remove('active');
            }
        }
    });

    // Theme toggler click delegation
    document.addEventListener('click', (event) => {
        const toggleBtn = event.target.closest('.theme-toggle-btn');
        if (toggleBtn) {
            store.toggleTheme();
            
            // Update theme toggle icon inside all buttons
            const isDark = store.getState().theme === 'dark';
            const iconSvg = toggleBtn.querySelector('svg');
            if (iconSvg) {
                if (isDark) {
                    // Sun icon for dark mode
                    iconSvg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.364 17.636l-.707.707M17.636 17.636l-.707-.707M6.364 6.364l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />';
                } else {
                    // Moon icon for light mode
                    iconSvg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />';
                }
            }
        }
    });
}
