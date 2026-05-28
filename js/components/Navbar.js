/**
 * Volt Gießen - Navbar Header Component
 */

import store from '../store.js';

export const Navbar = {
    render() {
        const theme = store.getState().theme;
        const isDark = theme === 'dark';
        
        // Define theme icon markup (moon or sun)
        const themeIcon = isDark 
            ? `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.364 17.636l-.707.707M17.636 17.636l-.707-.707M6.364 6.364l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />`
            : `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />`;

        return `
            <div class="container navbar-container">
                <!-- Branding Logo linking to homepage -->
                <a href="#/" class="brand-logo-link" aria-label="Volt Gießen Startseite">
                    <img class="brand-logo-svg" src="assets/signal-2026-05-03-205636_002.png" alt="Volt Fraktion in Gießen">
                </a>

                <!-- Desktop navigation menu -->
                <nav class="nav-menu" id="nav-menu">
                    <a href="#/" class="nav-link">Startseite</a>
                    <a href="#/fraktion" class="nav-link">Fraktion</a>
                    <a href="#/programm" class="nav-link">Programm</a>
                    <a href="#/antraege" class="nav-link">Anträge</a>
                    <a href="#/news" class="nav-link">News</a>
                    <a href="#/kontakt" class="nav-link">Kontakt</a>
                </nav>

                <div class="header-actions">
                    <!-- Light / Dark Toggle -->
                    <button class="theme-toggle-btn" aria-label="Farbschema umschalten">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
                            ${themeIcon}
                        </svg>
                    </button>

                    <!-- Mitmachen Primary Call-to-action -->
                    <a href="#/kontakt" class="btn btn-primary btn-sm">Mitmachen</a>

                    <!-- Hamburger button for mobile drawers -->
                    <button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Menü öffnen">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        `;
    },

    afterRender() {
        const menuBtn = document.getElementById('mobile-menu-btn');
        const navMenu = document.getElementById('nav-menu');

        if (menuBtn && navMenu) {
            menuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                menuBtn.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }
    }
};

export default Navbar;
