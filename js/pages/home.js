/**
 * Volt Gießen - Home Page Controller
 */

import store from '../store.js';
import MotionCard from '../components/MotionCard.js';
import Timeline from '../components/Timeline.js';

export const homePage = {
    async render() {
        const state = store.getState();
        
        // Fetch top 3 latest motions for the preview grid
        const latestMotions = state.motions.slice(0, 3);
        const motionsCardsHtml = latestMotions
            .map(m => MotionCard.render(m))
            .join('');

        // Fetch upcoming 3 timeline events
        const upcomingEvents = state.timeline.slice(0, 3);
        const timelineHtml = Timeline.render(upcomingEvents);

        return `
            <!-- Hero Banner Section -->
            <section class="hero-section">
                <!-- Smooth Ken Burns Skyline Background -->
                <div class="hero-bg-animated"></div>
                <!-- Dynamic Twinkling Particles Overlay -->
                <div class="hero-particles" id="hero-particles-mount"></div>

                <div class="container" style="position: relative; z-index: 2;">
                    <div class="hero-content anim-slide-up">
                        <span class="hero-subtitle">Volt Gießen</span>
                        <h1 class="hero-title">Neue Energie für Gießen</h1>
                        <p class="hero-lead">
                            Wir bringen frische, europäische Ideen und sachorientierte Politik in die Stadtverordnetenversammlung Gießen. Evidenzbasiert, pragmatisch und bürgernah.
                        </p>
                        <div class="hero-buttons">
                            <a href="#/programm" class="btn btn-primary btn-lg">Unser Programm</a>
                            <a href="#/antraege" class="btn btn-secondary btn-lg">Unsere Anträge</a>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Quick stats panel -->
            <section class="home-section" style="padding-top: var(--space-8); padding-bottom: var(--space-8);">
                <div class="container">
                    <div class="stats-container anim-slide-up-delay-1">
                        <div class="stat-card">
                            <div class="stat-number">3</div>
                            <div class="stat-label">Stadtverordnete</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">0+</div>
                            <div class="stat-label">Eingereichte Anträge</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">4</div>
                            <div class="stat-label">Ausschusssitze</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">100%</div>
                            <div class="stat-label">Leidenschaft</div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Faction intro panel -->
            <section class="home-section-alt">
                <div class="container">
                    <div class="highlight-panel">
                        <div class="highlight-image-wrapper anim-slide-up" style="position: relative;">
                            <img src="assets/photo_2026-05-23_16-04-38.jpg"
                                 alt="Volt Fraktion Gießen – Teamfoto"
                                 class="highlight-image"
                                 style="object-position: center 15%;">
                            <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(80,35,121,0.08) 0%, rgba(40,16,62,0.0) 40%, rgba(40,16,62,0.75) 75%, rgba(40,16,62,0.88) 100%); display: flex; align-items: flex-end; padding: 1.5rem;">
                                <div>
                                    <h3 style="color: var(--color-secondary); font-weight: 700; font-size: 22px; margin-bottom: 6px; text-shadow: 0 1px 4px rgba(0,0,0,0.4);">Volt Fraktion Gießen</h3>
                                    <p style="font-size: 14px; color: rgba(255,255,255,0.9); max-width: 320px; line-height: 1.45; text-shadow: 0 1px 3px rgba(0,0,0,0.35);">Gemeinsam stark für eine lebenswerte, klimaneutrale und zukunftsorientierte Universitätsstadt.</p>
                                </div>
                            </div>
                        </div>
                        <div class="highlight-content anim-slide-up-delay-1">
                            <h2 class="section-title">Wer wir sind</h2>
                            <p class="highlight-lead">
                                Wir sind die Volt-Fraktion in der Stadtverordnetenversammlung Gießen. Seit der Kommunalwahl setzen wir uns leidenschaftlich für die Bürgerinnen und Bürger unserer Stadt ein.
                            </p>
                            <p>
                                Als Teil einer gesamteuropäischen Bewegung bringen wir Best-Practice-Beispiele aus anderen europäischen Städten direkt nach Gießen. Wir glauben, dass Politik transparenter, digitaler und mutiger gestaltet werden muss.
                            </p>
                            <div style="margin-top: var(--space-6);">
                                <a href="#/fraktion" class="btn btn-outline">Lerne unser Team kennen</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Focus Pillars Summary -->
            <section class="home-section">
                <div class="container">
                    <div class="section-header-block">
                        <h2 class="section-title">Unsere politischen Schwerpunkte</h2>
                        <p class="text-muted">Dafür machen wir uns im Gießener Rathaus stark</p>
                    </div>

                    <div class="grid-cols-2">
                        <div class="card interactive-hover-grow">
                            <h3 style="display: flex; align-items: center; gap: 8px;"><span style="font-size: 24px;">🚲</span> Clevere Mobilität</h3>
                            <p class="text-muted" style="font-size: 15px; margin-top: 4px;">
                                Sichere Radwege am Anlagenring, ein verlässlicher Busverkehr im 10-Minuten-Takt und die Verkehrsberuhigung von Wohnquartieren, damit Straßen wieder zu lebenswerten Begegnungsräumen werden.
                            </p>
                        </div>
                        <div class="card interactive-hover-grow">
                            <h3 style="display: flex; align-items: center; gap: 8px;"><span style="font-size: 24px;">🌱</span> Klimaneutrales Gießen 2035</h3>
                            <p class="text-muted" style="font-size: 15px; margin-top: 4px;">
                                Massiver Photovoltaik-Ausbau auf öffentlichen Dächern, Fernwärmede-karbonisierung sowie Begrünungsanreize für Fassaden, um Gießen widerstandsfähiger gegen sommerliche Hitzeinseln zu machen.
                            </p>
                        </div>
                        <div class="card interactive-hover-grow">
                            <h3 style="display: flex; align-items: center; gap: 8px;"><span style="font-size: 24px;">💻</span> Digitales Rathaus</h3>
                            <p class="text-muted" style="font-size: 15px; margin-top: 4px;">
                                Digitale Behördenleistungen rund um die Uhr, offene Daten im städtischen Datenportal zur freien Nutzung und die Videoübertragung von Ausschuss- und Stadtverordnetensitzungen.
                            </p>
                        </div>
                        <div class="card interactive-hover-grow">
                            <h3 style="display: flex; align-items: center; gap: 8px;"><span style="font-size: 24px;">🇪🇺</span> Soziale & lebendige Stadt</h3>
                            <p class="text-muted" style="font-size: 15px; margin-top: 4px;">
                                Bezahlbarer Wohnraum, die Stärkung lokaler Kultur- und Freiräume, die Gründung eines Jugendparlaments und wirkungsvolle Integrationsunterstützung in den Quartieren.
                            </p>
                        </div>
                    </div>
                    
                    <div class="text-center" style="margin-top: var(--space-8);">
                        <a href="#/programm" class="btn btn-primary">Details zum Programm</a>
                    </div>
                </div>
            </section>

            <!-- Latest Motions Section -->
            <section class="home-section-alt">
                <div class="container">
                    <div class="section-header-block">
                        <h2 class="section-title">Aktuelle Anträge & Initiativen</h2>
                        <p class="text-muted">Unsere neuesten Initiativen in der Stadtverordnetenversammlung</p>
                    </div>

                    <div class="grid-cols-3">
                        ${motionsCardsHtml}
                    </div>

                    <div class="text-center" style="margin-top: var(--space-8);">
                        <a href="#/antraege" class="btn btn-outline">Alle Anträge durchsuchen</a>
                    </div>
                </div>
            </section>

            <!-- Calendar / Upcoming Events Section -->
            <section class="home-section">
                <div class="container">
                    <div class="section-header-block">
                        <h2 class="section-title">Termine & Mitmachen</h2>
                        <p class="text-muted">Komm vorbei und diskutiere mit uns</p>
                    </div>

                    ${timelineHtml}

                    <div class="text-center" style="margin-top: var(--space-8);">
                        <a href="#/kontakt" class="btn btn-primary">Jetzt Kontakt aufnehmen</a>
                    </div>
                </div>
            </section>
        `;
    },

    afterRender() {
        // 1. Generate floating star particles dynamically
        this.generateParticles();

        // 2. Bind click events to motion detail buttons
        const detailButtons = document.querySelectorAll('.motion-detail-trigger');
        detailButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const id = event.target.getAttribute('data-id');
                this.showMotionDetailModal(id);
            });
        });
    },

    // Particle generator logic
    generateParticles() {
        const mount = document.getElementById('hero-particles-mount');
        if (!mount) return;

        const particleCount = 20;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random styling constraints
            const size = Math.random() * 5 + 3; // 3px to 8px
            const left = Math.random() * 100; // 0% to 100%
            const bottom = Math.random() * 30; // 0% to 30% from bottom of hero
            const delay = Math.random() * 8; // 0s to 8s
            const duration = Math.random() * 6 + 6; // 6s to 12s

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${left}%`;
            particle.style.bottom = `${bottom}%`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;

            mount.appendChild(particle);
        }
    },

    // Dynamic detail modal invocation
    showMotionDetailModal(id) {
        const motion = store.getMotionById(id);
        if (!motion) return;

        const modalMount = document.getElementById('modal-mount');
        if (!modalMount) return;

        const dateObj = new Date(motion.date);
        const formattedDate = dateObj.toLocaleDateString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        const statusLabel = MotionCard.getStatusName(motion.status);
        const statusBadgeClass = MotionCard.getBadgeClass(motion.status);

        modalMount.innerHTML = `
            <div class="modal-overlay" id="detail-modal-overlay">
                <div class="modal-container modal-lg">
                    <div class="modal-header">
                        <span class="motion-id-badge">${motion.id}</span>
                        <button class="modal-close-btn" id="modal-close-trigger" aria-label="Schließen">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="motion-detail-body">
                            <h2 style="color: var(--color-primary); font-size: 26px; font-weight: 700; margin-bottom: var(--space-2);">${motion.title}</h2>
                            
                            <div class="motion-detail-meta-grid">
                                <div class="motion-detail-meta-item">
                                    <strong>Status</strong>
                                    <span class="motion-status-badge ${statusBadgeClass}">${statusLabel}</span>
                                </div>
                                <div class="motion-detail-meta-item">
                                    <strong>Datum</strong>
                                    <span>📅 ${formattedDate}</span>
                                </div>
                                <div class="motion-detail-meta-item">
                                    <strong>Themenbereich</strong>
                                    <span>📂 ${motion.category}</span>
                                </div>
                            </div>
                            
                            <div>
                                <h3 style="border-bottom: 1px solid var(--color-border-subtle); padding-bottom: var(--space-2); margin-top: var(--space-4);">Zusammenfassung</h3>
                                <p style="font-size: 16px; line-height: 1.6; margin-top: var(--space-2); font-style: italic; color: var(--color-text-muted);">${motion.summary}</p>
                            </div>
                            
                            <div>
                                <h3 style="border-bottom: 1px solid var(--color-border-subtle); padding-bottom: var(--space-2); margin-top: var(--space-4);">Antragstext</h3>
                                <div class="motion-detail-content" style="margin-top: var(--space-2);">${motion.detail}</div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-outline" id="modal-footer-close-btn">Schließen</button>
                    </div>
                </div>
            </div>
        `;

        const overlay = document.getElementById('detail-modal-overlay');
        const closeBtn = document.getElementById('modal-close-trigger');
        const closeFooterBtn = document.getElementById('modal-footer-close-btn');

        // Function to destroy modal
        const closeModal = () => {
            overlay.classList.remove('active');
            setTimeout(() => {
                modalMount.innerHTML = '';
            }, 300);
        };

        // Open transition
        setTimeout(() => {
            overlay.classList.add('active');
        }, 10);

        closeBtn.addEventListener('click', closeModal);
        closeFooterBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal();
            }
        });
    }
};

export default homePage;
