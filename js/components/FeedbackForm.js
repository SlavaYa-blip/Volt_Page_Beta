/**
 * Volt Gießen - Bürger-Feedback Form Component
 */

export const FeedbackForm = {
    render() {
        return `
            <div id="feedback-form-container">
                <form id="citizen-feedback-form" novalidate>
                    <div class="form-group" id="group-name">
                        <label class="form-label" for="fb-name">Dein Name</label>
                        <input type="text" class="form-input" id="fb-name" placeholder="Erika Mustermann" required>
                        <span class="form-error-msg" style="display: none;">Bitte gib deinen Namen ein.</span>
                    </div>

                    <div class="form-group" id="group-email">
                        <label class="form-label" for="fb-email">Deine E-Mail-Adresse</label>
                        <input type="email" class="form-input" id="fb-email" placeholder="erika.mustermann@mail.de" required>
                        <span class="form-error-msg" style="display: none;">Bitte gib eine gültige E-Mail-Adresse ein.</span>
                    </div>

                    <div class="form-group" id="group-topic">
                        <label class="form-label" for="fb-topic">Themenbereich</label>
                        <select class="form-select" id="fb-topic">
                            <option value="Allgemein">Allgemeines Anliegen</option>
                            <option value="Mobilität">Mobilität & Verkehr</option>
                            <option value="Klimaschutz">Umwelt & Klimaschutz</option>
                            <option value="Digitalisierung">Digitalisierung & Transparenz</option>
                            <option value="Soziales">Soziales, Wohnen & Bildung</option>
                        </select>
                    </div>

                    <div class="form-group" id="group-message">
                        <label class="form-label" for="fb-message">Deine Idee oder Frage für Gießen</label>
                        <textarea class="form-textarea" id="fb-message" placeholder="Beschreibe uns deine Idee oder frage uns etwas zu unserer Fraktionsarbeit..." required></textarea>
                        <span class="form-error-msg" style="display: none;">Bitte gib deine Nachricht ein.</span>
                    </div>

                    <div class="form-check" id="group-privacy">
                        <input type="checkbox" class="form-check-input" id="fb-privacy" required>
                        <label class="form-check-label" for="fb-privacy">
                            Ich stimme zu, dass meine Daten zum Zweck der Kontaktaufnahme durch die Volt-Fraktion verarbeitet werden. 
                            Weitere Informationen unter <a href="https://voltdeutschland.org/datenschutz" target="_blank" rel="noopener">Datenschutz</a>.
                        </label>
                        <div class="form-error-msg" id="privacy-error" style="display: none; margin-top: 4px;">Bitte stimme den Datenschutzbestimmungen zu.</div>
                    </div>

                    <button type="submit" class="btn btn-primary" style="width: 100%;">
                        Feedback absenden
                    </button>
                </form>
            </div>
        `;
    },

    bindEvents(onSubmitSuccess) {
        const form = document.getElementById('citizen-feedback-form');
        if (!form) return;

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            
            // Clean up old error states
            const formGroups = form.querySelectorAll('.form-group');
            formGroups.forEach(g => g.classList.remove('has-error'));
            const errorMsgs = form.querySelectorAll('.form-error-msg');
            errorMsgs.forEach(m => m.style.display = 'none');
            
            let isValid = true;

            // Name validation
            const nameInput = document.getElementById('fb-name');
            if (!nameInput.value.trim()) {
                document.getElementById('group-name').classList.add('has-error');
                document.getElementById('group-name').querySelector('.form-error-msg').style.display = 'block';
                isValid = false;
            }

            // Email validation
            const emailInput = document.getElementById('fb-email');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim() || !emailPattern.test(emailInput.value)) {
                document.getElementById('group-email').classList.add('has-error');
                document.getElementById('group-email').querySelector('.form-error-msg').style.display = 'block';
                isValid = false;
            }

            // Message validation
            const messageInput = document.getElementById('fb-message');
            if (!messageInput.value.trim()) {
                document.getElementById('group-message').classList.add('has-error');
                document.getElementById('group-message').querySelector('.form-error-msg').style.display = 'block';
                isValid = false;
            }

            // Privacy validation
            const privacyCheckbox = document.getElementById('fb-privacy');
            if (!privacyCheckbox.checked) {
                document.getElementById('privacy-error').style.display = 'block';
                isValid = false;
            }

            if (isValid) {
                const payload = {
                    name: nameInput.value.trim(),
                    email: emailInput.value.trim(),
                    topic: document.getElementById('fb-topic').value,
                    message: messageInput.value.trim()
                };
                
                // Trigger success callback
                if (onSubmitSuccess) {
                    onSubmitSuccess(payload);
                }
            }
        });
    }
};

export default FeedbackForm;
