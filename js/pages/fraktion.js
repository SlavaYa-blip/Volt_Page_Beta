/**
 * Volt Gießen - Faction Members Page Controller
 */

import store from '../store.js';
import CouncilorCard from '../components/CouncilorCard.js';

export const fraktionPage = {
    async render() {
        const state = store.getState();

        // Render cards for all faction members
        const memberCardsHtml = state.members
            .map(member => CouncilorCard.render(member))
            .join('');

        return `
            <!-- Top intro banner -->
            <section class="fraktion-intro-container">
                <div class="container">
                    <h1 class="hero-title" style="color: var(--color-primary); margin-bottom: var(--space-4);">Unsere Fraktion im Rathaus</h1>
                    <p style="font-size: 19px; line-height: 1.6; max-width: 800px; color: var(--color-text-muted);">
                        Seit der Kommunalwahl setzen wir uns tagtäglich im Gießener Stadtparlament für eine evidenzbasierte, transparente und bürgernahe Politik ein. Hier findest du unsere Stadtverordneten, Magistratsmitglieder und deren Themenschwerpunkte.
                    </p>
                </div>
            </section>

            <!-- Main grid layout -->
            <section class="container" style="padding: var(--space-16) 0;">
                <div class="fraktion-layout-grid">
                    
                    <!-- Left: Members cards list -->
                    <div>
                        <h2 class="fraktion-section-title">Fraktionsmitglieder</h2>
                        <div class="grid-cols-2">
                            ${memberCardsHtml}
                        </div>
                    </div>

                    <!-- Right: Committees details info -->
                    <aside class="committees-info-panel anim-slide-up">
                        <h3 style="color: var(--color-primary); font-weight: 700; font-size: 19px; border-bottom: 2px solid var(--color-secondary); padding-bottom: 4px; margin-bottom: var(--space-4);">
                            Unsere Ausschüsse
                        </h3>
                        <p style="font-size: 14px; line-height: 1.5; color: var(--color-text-muted); margin-bottom: var(--space-4);">
                            Ausschüsse bereiten die Beschlüsse der Stadtverordnetenversammlung vor. Volt-Gießen ist in folgenden Gremien vertreten:
                        </p>
                        <div class="committees-list">
                            <div class="committee-item">
                                <span class="committee-name">Haupt-, Finanz- und Beteiligungsausschuss (HFBA)</span>
                                <div class="committee-members-count">Vertretung: Dr. Clara Schumann</div>
                            </div>
                            <div class="committee-item">
                                <span class="committee-name">Stadtentwicklung, Bauen und Verkehrsplanung (ASBV)</span>
                                <div class="committee-members-count">Vertretung: Dr. Clara Schumann</div>
                            </div>
                            <div class="committee-item">
                                <span class="committee-name">Umwelt, Klimaschutz und Energie (AUKE)</span>
                                <div class="committee-members-count">Vertretung: Julian Weber</div>
                            </div>
                            <div class="committee-item">
                                <span class="committee-name">Schule, Bildung und Kultur (ASBK)</span>
                                <div class="committee-members-count">Vertretung: Julian Weber</div>
                            </div>
                            <div class="committee-item">
                                <span class="committee-name">Soziales, Integration, Gesundheit & Wohnungsbau (SIGW)</span>
                                <div class="committee-members-count">Vertretung: Sophia Becker</div>
                            </div>
                        </div>
                    </aside>
                </div>

                <!-- Contact bottom CTA panel -->
                <div class="fraktion-office-box anim-slide-up">
                    <div class="fraktion-office-text">
                        <h3 class="fraktion-office-title">Fragen an unsere Fraktion?</h3>
                        <p style="margin: 0; color: rgba(255,255,255,0.85); font-size: 16px;">
                            Unsere Fraktionssitzungen sind in der Regel parteiöffentlich. Wenn du Anregungen hast oder städtische Themen besprechen möchtest, schreibe uns eine Nachricht oder nimm an einer unserer nächsten Sitzungen teil.
                        </p>
                    </div>
                    <div>
                        <a href="#/kontakt" class="btn btn-secondary" style="border-radius: 4px;">Fraktion kontaktieren</a>
                    </div>
                </div>
            </section>
        `;
    },

    afterRender() {
        // Nothing specific to bind here
    }
};

export default fraktionPage;
