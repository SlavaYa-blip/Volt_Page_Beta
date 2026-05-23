/**
 * Volt Gießen - Contact & Citizen Dialogue Page Controller
 */

import store from '../store.js';
import FeedbackForm from '../components/FeedbackForm.js';

export const contactPage = {
    async render() {
        return `
            <section class="container" style="padding: var(--space-8) 0;">
                <div class="contact-layout-grid">
                    
                    <!-- Left Column: Contact details and Map info -->
                    <div class="contact-info-panel anim-slide-up">
                        <div>
                            <h1 class="hero-title" style="color: var(--color-primary); margin-bottom: var(--space-4);">Kontakt & Mitmachen</h1>
                            <p style="font-size: 17px; color: var(--color-text-muted); line-height: 1.5; margin-bottom: var(--space-4);">
                                Du hast Anregungen für unsere Fraktionsarbeit? Möchtest du Missstände in deinem Gießer Stadtteil melden oder hast Fragen zu einem unserer Anträge? Kontaktiere uns direkt.
                            </p>
                        </div>

                        <!-- Faction Office info -->
                        <div class="contact-details-box">
                            <div class="contact-detail-item">
                                <span class="contact-detail-icon">🏢</span>
                                <div class="contact-detail-text">
                                    <h4>Fraktionsbüro Gießen</h4>
                                    <p>Berliner Platz 1, 35390 Gießen<br>Rathaus, Zimmer 231</p>
                                </div>
                            </div>

                            <div class="contact-detail-item">
                                <span class="contact-detail-icon">📧</span>
                                <div class="contact-detail-text">
                                    <h4>E-Mail-Adresse</h4>
                                    <p><a href="mailto:fraktion@voltgiessen.de">fraktion@voltgiessen.de</a></p>
                                </div>
                            </div>

                            <div class="contact-detail-item">
                                <span class="contact-detail-icon">⏰</span>
                                <div class="contact-detail-text">
                                    <h4>Sprechzeiten</h4>
                                    <p>Nach Vereinbarung (auch digital via Teams/Zoom)</p>
                                </div>
                            </div>
                        </div>

                        <!-- Interactive map wrapper placeholder -->
                        <div class="contact-map-wrapper">
                            <div>
                                <span style="font-size: 32px; display: block; margin-bottom: var(--space-1);">📍</span>
                                <strong>Rathaus Gießen</strong>
                                <p style="font-size: 13px; color: var(--color-text-muted); margin-top: 4px; margin-bottom: 0;">Berliner Platz 1, 35390 Gießen</p>
                            </div>
                        </div>

                        <!-- Social media quick panel -->
                        <div class="contact-socials-block">
                            <h4 style="font-size: 15px; text-transform: uppercase; font-weight: 700; color: var(--color-primary);">Folge uns online</h4>
                            <div class="contact-socials-grid">
                                <a href="https://instagram.com" target="_blank" rel="noopener" class="btn btn-outline btn-sm">Instagram</a>
                                <a href="https://facebook.com" target="_blank" rel="noopener" class="btn btn-outline btn-sm">Facebook</a>
                                <a href="https://twitter.com" target="_blank" rel="noopener" class="btn btn-outline btn-sm">Twitter</a>
                            </div>
                        </div>
                    </div>

                    <!-- Right Column: Interactive Dialog form panel -->
                    <div class="contact-form-panel anim-slide-up-delay-1" id="form-panel-mount">
                        <div class="contact-form-intro">
                            <h2 class="section-title">Bürgerdialog</h2>
                            <p class="text-muted" style="margin-top: var(--space-2);">
                                Sende uns deine Ideen, Verbesserungsvorschläge oder Fragen direkt zu. Wir besprechen jedes Anliegen in unserer Fraktionssitzung.
                            </p>
                        </div>

                        <!-- Form mount -->
                        ${FeedbackForm.render()}
                    </div>

                </div>
            </section>
        `;
    },

    afterRender() {
        // Bind submit listeners to form
        FeedbackForm.bindEvents((payload) => {
            this.handleFormSubmission(payload);
        });
    },

    // Handles form data processing
    handleFormSubmission(payload) {
        // Store inside data store
        store.addFeedback(payload);

        // Mount success screen in-place
        const formPanel = document.getElementById('form-panel-mount');
        if (!formPanel) return;

        formPanel.innerHTML = `
            <div class="form-success-box">
                <div class="success-icon">✉️</div>
                <h3 style="font-size: 22px; font-weight: 700; margin-bottom: var(--space-3); color: var(--color-accent);">Vielen Dank, ${payload.name}!</h3>
                <p style="font-size: 16px; line-height: 1.6; color: var(--color-text-body); margin-bottom: var(--space-6);">
                    Wir haben dein Feedback zum Thema <strong>"${payload.topic}"</strong> erfolgreich erhalten. 
                    Wir werden uns in Kürze unter deiner Adresse <strong>${payload.email}</strong> bei dir melden.
                </p>
                <div style="border-top: 1px solid rgba(27,190,111,0.2); padding-top: var(--space-4); margin-bottom: var(--space-6); text-align: left; font-size: 14px; color: var(--color-text-muted);">
                    <strong>Übermittelte Nachricht:</strong><br>
                    <span style="font-style: italic; white-space: pre-wrap;">"${payload.message}"</span>
                </div>
                <button class="btn btn-primary btn-sm" id="send-another-fb-btn" style="border-radius: 4px;">Weiteres Feedback absenden</button>
            </div>
        `;

        // Bind reset form button trigger
        const resetBtn = document.getElementById('send-another-fb-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.resetFormView();
            });
        }
    },

    // Re-renders blank form structure
    resetFormView() {
        const formPanel = document.getElementById('form-panel-mount');
        if (!formPanel) return;

        formPanel.innerHTML = `
            <div class="contact-form-intro">
                <h2 class="section-title">Bürgerdialog</h2>
                <p class="text-muted" style="margin-top: var(--space-2);">
                    Sende uns deine Ideen, Verbesserungsvorschläge oder Fragen direkt zu. Wir besprechen jedes Anliegen in unserer Fraktionssitzung.
                </p>
            </div>
            ${FeedbackForm.render()}
        `;

        // Rebind listener events
        this.afterRender();
    }
};

export default contactPage;
