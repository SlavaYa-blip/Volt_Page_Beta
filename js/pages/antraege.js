/**
 * Volt Gießen - Motions (Anträge) Page Controller
 */

import store from '../store.js';
import MotionCard from '../components/MotionCard.js';
import homePage from './home.js';

// Local search filter state
let searchQuery = '';
let statusFilter = 'all';
let categoryFilter = 'all';

export const antraegePage = {
    async render() {
        const state = store.getState();

        // Calculate count metrics for the stats panel
        const totalCount = state.motions.length;
        const approvedCount = state.motions.filter(m => m.status === 'approved').length;
        const committeeCount = state.motions.filter(m => m.status === 'committee').length;
        const submittedCount = state.motions.filter(m => m.status === 'submitted').length;
        const rejectedCount = state.motions.filter(m => m.status === 'rejected').length;

        // Query matching motions based on filters
        const filteredMotions = store.queryMotions(searchQuery, statusFilter, categoryFilter);

        // Generate card layout HTML
        let motionsListHtml = '';
        if (filteredMotions.length > 0) {
            motionsListHtml = `
                <div class="grid-cols-3" id="motions-grid-mount">
                    ${filteredMotions.map(m => MotionCard.render(m)).join('')}
                </div>
            `;
        } else {
            motionsListHtml = `
                <div class="motions-empty-state" id="motions-grid-mount">
                    <div class="motions-empty-icon">🔍</div>
                    <h3 class="motions-empty-title">Keine Anträge gefunden</h3>
                    <p class="text-muted">Passe deine Suchbegriffe oder Filteroptionen an, um andere Ergebnisse zu sehen.</p>
                </div>
            `;
        }

        // Fetch categories list dynamically from data for filter dropdown
        const categories = [...new Set(state.motions.map(m => m.category))];
        const categoryOptions = categories
            .map(cat => `<option value="${cat}" ${categoryFilter === cat ? 'selected' : ''}>${cat}</option>`)
            .join('');

        return `
            <!-- Top Hero Banner -->
            <section class="motions-hero-header">
                <div class="container">
                    <h1 class="hero-title">Anträge & Initiativen</h1>
                    <p style="font-size: 18px; color: rgba(255,255,255,0.85); max-width: 800px;">
                        Hier findest du alle politischen Vorlagen, Anträge und Anfragen, die wir in die Gießener Stadtverordnetenversammlung eingebracht haben, inklusive Status und Volltext.
                    </p>
                </div>
            </section>

            <!-- Dashboard view wrapper -->
            <section class="container" style="padding-bottom: var(--space-16);">
                
                <!-- Stats counters panels -->
                <div class="motions-stats-panel anim-slide-up">
                    <div class="motions-stat-box stat-total">
                        <div class="motions-stat-num">${totalCount}</div>
                        <div class="motions-stat-txt">Gesamt</div>
                    </div>
                    <div class="motions-stat-box stat-approved">
                        <div class="motions-stat-num">${approvedCount}</div>
                        <div class="motions-stat-txt">Angenommen</div>
                    </div>
                    <div class="motions-stat-box stat-committee">
                        <div class="motions-stat-num">${committeeCount}</div>
                        <div class="motions-stat-txt">In Ausschuss</div>
                    </div>
                    <div class="motions-stat-box stat-submitted">
                        <div class="motions-stat-num">${submittedCount}</div>
                        <div class="motions-stat-txt">Eingereicht</div>
                    </div>
                    <div class="motions-stat-box stat-rejected">
                        <div class="motions-stat-num">${rejectedCount}</div>
                        <div class="motions-stat-txt">Abgelehnt</div>
                    </div>
                </div>

                <!-- Live filter input row -->
                <div class="motions-filter-container anim-slide-up-delay-1">
                    <!-- Search input text -->
                    <div class="motions-search-wrapper">
                        <label class="form-label" for="search-input">Stichwortsuche</label>
                        <input type="text" class="form-input" id="search-input" placeholder="Z.B. Fahrradring, Solar, Bürgerbüro..." value="${searchQuery}">
                    </div>

                    <!-- Category dropdown select -->
                    <div class="motions-select-wrapper">
                        <label class="form-label" for="category-select">Themenbereich</label>
                        <select class="form-select" id="category-select">
                            <option value="all">Alle Themen</option>
                            ${categoryOptions}
                        </select>
                    </div>

                    <!-- Status dropdown select -->
                    <div class="motions-select-wrapper">
                        <label class="form-label" for="status-select">Verfahrensstand</label>
                        <select class="form-select" id="status-select">
                            <option value="all" ${statusFilter === 'all' ? 'selected' : ''}>Alle Status</option>
                            <option value="draft" ${statusFilter === 'draft' ? 'selected' : ''}>Entwurf</option>
                            <option value="submitted" ${statusFilter === 'submitted' ? 'selected' : ''}>Eingereicht</option>
                            <option value="committee" ${statusFilter === 'committee' ? 'selected' : ''}>In Ausschussberatung</option>
                            <option value="approved" ${statusFilter === 'approved' ? 'selected' : ''}>Angenommen</option>
                            <option value="rejected" ${statusFilter === 'rejected' ? 'selected' : ''}>Abgelehnt</option>
                        </select>
                    </div>

                    <button class="btn btn-outline" id="reset-filters-btn" style="border-radius: 0px; height: 48px;">
                        Reset
                    </button>
                </div>

                <!-- Grid mount target -->
                <div id="motions-list-container">
                    ${motionsListHtml}
                </div>
            </section>
        `;
    },

    afterRender() {
        const searchInput = document.getElementById('search-input');
        const categorySelect = document.getElementById('category-select');
        const statusSelect = document.getElementById('status-select');
        const resetBtn = document.getElementById('reset-filters-btn');

        // Watchers for inputs
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                searchQuery = e.target.value.trim();
                this.updateFilterResults();
            });
        }

        if (categorySelect) {
            categorySelect.addEventListener('change', (e) => {
                categoryFilter = e.target.value;
                this.updateFilterResults();
            });
        }

        if (statusSelect) {
            statusSelect.addEventListener('change', (e) => {
                statusFilter = e.target.value;
                this.updateFilterResults();
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                searchQuery = '';
                categoryFilter = 'all';
                statusFilter = 'all';
                if (searchInput) searchInput.value = '';
                if (categorySelect) categorySelect.value = 'all';
                if (statusSelect) statusSelect.value = 'all';
                this.updateFilterResults();
            });
        }

        // Bind dynamic detail modal trigger to elements
        this.bindDetailTriggers();
    },

    // Refilters list items in-place
    updateFilterResults() {
        const listContainer = document.getElementById('motions-list-container');
        if (!listContainer) return;

        const filtered = store.queryMotions(searchQuery, statusFilter, categoryFilter);

        if (filtered.length > 0) {
            listContainer.innerHTML = `
                <div class="grid-cols-3 anim-fade-in" id="motions-grid-mount">
                    ${filtered.map(m => MotionCard.render(m)).join('')}
                </div>
            `;
        } else {
            listContainer.innerHTML = `
                <div class="motions-empty-state anim-fade-in" id="motions-grid-mount">
                    <div class="motions-empty-icon">🔍</div>
                    <h3 class="motions-empty-title">Keine Anträge gefunden</h3>
                    <p class="text-muted">Passe deine Suchbegriffe oder Filteroptionen an, um andere Ergebnisse zu sehen.</p>
                </div>
            `;
        }

        // Rebind click triggers for detail modals
        this.bindDetailTriggers();
    },

    bindDetailTriggers() {
        // Reuse homePage detail modal rendering method to maintain absolute DRY code
        const triggers = document.querySelectorAll('.motion-detail-trigger');
        triggers.forEach(trig => {
            trig.addEventListener('click', (event) => {
                const id = event.target.getAttribute('data-id');
                homePage.showMotionDetailModal(id);
            });
        });
    }
};

export default antraegePage;
