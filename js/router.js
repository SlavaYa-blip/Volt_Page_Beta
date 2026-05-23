/**
 * Volt Gießen Fraktion - Client-side Router
 * Handles hash navigation and rendering page views dynamically.
 */

import store from './store.js';

// Route registration map
const routes = {};

export const router = {
    // Add a route mapping to a page controller
    register(path, pageController) {
        routes[path] = pageController;
    },

    // Initialize routing listeners
    init() {
        window.addEventListener('hashchange', () => this.handleRouting());
        
        // Initial routing trigger
        this.handleRouting();
    },

    // Process hash changes
    async handleRouting() {
        let hash = window.location.hash || '#/';
        
        // Normalize hash format
        if (!hash.startsWith('#/')) {
            hash = '#/';
        }
        
        // Update global store path
        store.setPath(hash);
        
        // Get matching controller or fall back to home
        const controller = routes[hash] || routes['#/'];
        
        const mountNode = document.getElementById('app-mount');
        if (!mountNode) return;
        
        // Render loading state
        mountNode.innerHTML = `
            <div class="loader-container">
                <div class="loader"></div>
            </div>
        `;
        
        try {
            // Trigger rendering of page
            const htmlContent = await controller.render();
            
            // Clean loader and inject content inside animate wrapper
            mountNode.innerHTML = `
                <div class="page-view anim-fade-in">
                    ${htmlContent}
                </div>
            `;
            
            // Execute page post-render scripts (e.g. form binds, accordion hooks)
            if (controller.afterRender) {
                controller.afterRender();
            }
            
            // Highlight active navigation links
            this.updateActiveNavLinks(hash);
            
            // Smoothly scroll window to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
        } catch (error) {
            console.error('Routing rendering error:', error);
            mountNode.innerHTML = `
                <div class="container" style="padding: var(--space-16) 0; text-align: center;">
                    <h2 class="section-title">Hoppla! Etwas lief schief.</h2>
                    <p class="text-muted">Die gewünschte Seite konnte nicht geladen werden.</p>
                    <a href="#/" class="btn btn-primary" style="margin-top: var(--space-4);">Zur Startseite</a>
                </div>
            `;
        }
    },

    // Highlights navbar anchors based on current hash
    updateActiveNavLinks(hash) {
        const links = document.querySelectorAll('.nav-link');
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href === hash) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        
        // Auto-close mobile navigation drawer on route change
        const navMenu = document.querySelector('.nav-menu');
        const menuBtn = document.querySelector('.mobile-menu-btn');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuBtn.classList.remove('active');
        }
    }
};

export default router;
