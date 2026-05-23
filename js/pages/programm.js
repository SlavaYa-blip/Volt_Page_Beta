/**
 * Volt Gießen - Program Positions Page Controller
 */

import store from '../store.js';

// Page-local state tracking for active pillar tab
let activePillarId = 'pillar-mobility';

export const programmPage = {
    async render() {
        const state = store.getState();
        
        // Find current active pillar object
        const activePillar = state.pillars.find(p => p.id === activePillarId) || state.pillars[0];

        // Generate Sidebar buttons HTML
        const tabsHtml = state.pillars
            .map(p => {
                const isActive = p.id === activePillarId ? 'active' : '';
                return `
                    <button class="program-tab-btn ${isActive}" data-id="${p.id}">
                        <span style="margin-right: 8px;">${p.icon}</span> ${p.title}
                    </button>
                `;
            })
            .join('');

        // Generate points list HTML
        const pointsHtml = activePillar.points
            .map(point => {
                const [title, ...descParts] = point.split(':');
                const desc = descParts.join(':').trim();
                
                return `
                    <div class="program-point-item anim-slide-up">
                        <h4 class="program-point-title">${title}</h4>
                        ${desc ? `<p class="program-point-desc">${desc}</p>` : ''}
                    </div>
                `;
            })
            .join('');

        return `
            <!-- Top visual Header -->
            <section class="program-intro-header">
                <div class="container">
                    <h1 class="hero-title">Unser Programm für Gießen</h1>
                    <p style="font-size: 18px; color: rgba(255,255,255,0.85); max-width: 700px; margin: 0 auto;">
                        Evidenzbasierte Lösungsansätze statt ideologische Scheuklappen. Wir glauben, dass Gießen bereit ist für mutige Zukunftsentscheidungen.
                    </p>
                </div>
            </section>

            <!-- Interactive Explore Workspace -->
            <section class="container" style="padding-bottom: var(--space-16);">
                <div class="program-explore-wrapper">
                    
                    <!-- Left: Navigation Sidebar Tabs -->
                    <aside class="program-tabs-sidebar anim-slide-up">
                        ${tabsHtml}
                    </aside>

                    <!-- Right: Content Display Details -->
                    <div class="program-content-display" id="program-content-mount">
                        <div class="program-content-pillar-header">
                            <span class="program-pillar-icon">${activePillar.icon}</span>
                            <h2 class="program-pillar-title">${activePillar.title}</h2>
                        </div>
                        
                        <p style="font-size: 18px; line-height: 1.6; color: var(--color-text-muted); margin-bottom: var(--space-8);">
                            ${activePillar.desc}
                        </p>
                        
                        <h3 style="font-weight: 700; color: var(--color-primary); border-bottom: 1px solid var(--color-border-subtle); padding-bottom: var(--space-2);">
                            Unsere Forderungen im Detail:
                        </h3>
                        
                        <div class="program-point-list">
                            ${pointsHtml}
                        </div>
                    </div>
                </div>
            </section>
        `;
    },

    afterRender() {
        const tabs = document.querySelectorAll('.program-tab-btn');
        tabs.forEach(tab => {
            tab.addEventListener('click', (event) => {
                const id = event.currentTarget.getAttribute('data-id');
                if (id && id !== activePillarId) {
                    activePillarId = id;
                    
                    // Re-route page rendering locally
                    this.updateContentDisplay();
                }
            });
        });
    },

    // In-place updating of the content display area to avoid page reloads
    updateContentDisplay() {
        const state = store.getState();
        const activePillar = state.pillars.find(p => p.id === activePillarId) || state.pillars[0];
        
        // Highlight active tab button
        const tabs = document.querySelectorAll('.program-tab-btn');
        tabs.forEach(tab => {
            if (tab.getAttribute('data-id') === activePillarId) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        const mount = document.getElementById('program-content-mount');
        if (!mount) return;

        // Generate points list HTML
        const pointsHtml = activePillar.points
            .map(point => {
                // If the point doesn't have a colon, treat the whole text as title
                const hasColon = point.includes(':');
                const title = hasColon ? point.substring(0, point.indexOf(':')) : point;
                const desc = hasColon ? point.substring(point.indexOf(':') + 1).trim() : '';
                
                return `
                    <div class="program-point-item anim-slide-up" style="animation-duration: 0.4s;">
                        <h4 class="program-point-title">${title}</h4>
                        ${desc ? `<p class="program-point-desc">${desc}</p>` : ''}
                    </div>
                `;
            })
            .join('');

        // Apply dynamic mount change
        mount.innerHTML = `
            <div class="program-content-pillar-header anim-fade-in">
                <span class="program-pillar-icon">${activePillar.icon}</span>
                <h2 class="program-pillar-title">${activePillar.title}</h2>
            </div>
            
            <p class="anim-fade-in" style="font-size: 18px; line-height: 1.6; color: var(--color-text-muted); margin-bottom: var(--space-8);">
                ${activePillar.desc}
            </p>
            
            <h3 class="anim-fade-in" style="font-weight: 700; color: var(--color-primary); border-bottom: 1px solid var(--color-border-subtle); padding-bottom: var(--space-2);">
                Unsere Forderungen im Detail:
            </h3>
            
            <div class="program-point-list">
                ${pointsHtml}
            </div>
        `;
    }
};

export default programmPage;
