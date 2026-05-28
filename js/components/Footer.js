/**
 * Volt Gießen - Footer Component
 */

import store from '../store.js';

export const Footer = {
    render() {
        const currentYear = new Date().getFullYear();
        
        return `
            <div class="container">
                <div class="footer-grid">
                    <!-- Column 1: Logo & Brief Description -->
                    <div class="footer-col-logo">
                        <img class="footer-logo-img" src="assets/signal-2026-05-03-205636_002.png" alt="Volt Fraktion in Gießen">
                        <p style="margin-top: var(--space-4); font-size: 15px; color: rgba(255,255,255,0.7); max-width: 250px;">
                            Volt ist die erste paneuropäische Partei. Wir bringen frischen, zukunftsorientierten Wind in die Stadtverordnetenversammlung Gießen.
                        </p>
                    </div>

                    <!-- Column 2: Navigation Links -->
                    <div>
                        <h4 class="footer-title">Navigation</h4>
                        <div class="footer-links">
                            <a href="#/">Startseite</a>
                            <a href="#/fraktion">Fraktion</a>
                            <a href="#/programm">Programm</a>
                            <a href="#/antraege">Anträge</a>
                            <a href="#/news">Presse & Blog</a>
                        </div>
                    </div>

                    <!-- Column 3: Legal Links -->
                    <div>
                        <h4 class="footer-title">Rechtliches</h4>
                        <div class="footer-links">
                            <a href="#/kontakt">Kontakt</a>
                            <a href="https://voltdeutschland.org/impressum" target="_blank" rel="noopener">Impressum</a>
                            <a href="https://voltdeutschland.org/datenschutz" target="_blank" rel="noopener">Datenschutz</a>
                            <a href="https://voltdeutschland.org" target="_blank" rel="noopener">Volt Deutschland</a>
                        </div>
                    </div>

                    <!-- Column 4: Newsletter -->
                    <div>
                        <h4 class="footer-title">Newsletter</h4>
                        <p class="footer-newsletter-text">
                            Bleib auf dem Laufenden über unsere Arbeit im Gießener Rathaus.
                        </p>
                        <form class="footer-newsletter-form" id="newsletter-form">
                            <div class="form-group" style="margin-bottom: 0; flex-grow: 1;">
                                <input type="email" class="form-input" id="newsletter-email" placeholder="Deine E-Mail-Adresse" required aria-label="E-Mail für Newsletter">
                            </div>
                            <button type="submit" class="btn btn-accent" style="border-radius: 4px; padding: 0 var(--space-4);">Abonnieren</button>
                        </form>
                        <div id="newsletter-success" style="display: none; margin-top: var(--space-2); color: var(--color-secondary); font-size: 14px; font-weight: 500;">
                            ✓ Danke! Du hast unseren Newsletter abonniert.
                        </div>
                    </div>
                </div>

                <!-- Footer bottom bar -->
                <div class="footer-bottom">
                    <p>&copy; ${currentYear} Volt Gießen. Alle Rechte vorbehalten. Gestaltet nach Volt Branding Richtlinien.</p>
                    
                    <!-- Social icons (Mock) -->
                    <div class="footer-socials">
                        <a href="https://instagram.com" target="_blank" rel="noopener" class="footer-social-link" aria-label="Volt Gießen auf Instagram">📸</a>
                        <a href="https://facebook.com" target="_blank" rel="noopener" class="footer-social-link" aria-label="Volt Gießen auf Facebook">👥</a>
                        <a href="https://twitter.com" target="_blank" rel="noopener" class="footer-social-link" aria-label="Volt Gießen auf Twitter">🐦</a>
                    </div>
                </div>
            </div>
        `;
    },

    afterRender() {
        const form = document.getElementById('newsletter-form');
        const successMsg = document.getElementById('newsletter-success');

        if (form && successMsg) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const emailInput = document.getElementById('newsletter-email');
                const email = emailInput ? emailInput.value : '';
                
                // Track mock submission in console
                console.log(`Newsletter registration received for email: ${email}`);
                
                // Hide form, show success
                form.style.display = 'none';
                successMsg.style.display = 'block';
            });
        }
    }
};

export default Footer;
