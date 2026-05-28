/**
 * Volt Gießen - News & Press Releases Page Controller
 */

import store from '../store.js';

export const newsPage = {
    async render() {
        const state = store.getState();
        const allNews = state.news;

        if (!allNews || allNews.length === 0) {
            return `
                <section class="container" style="padding: var(--space-16) 0; text-align: center;">
                    <h2 class="section-title">News & Presse</h2>
                    <p class="text-muted">Derzeit sind keine Beiträge vorhanden.</p>
                </section>
            `;
        }

        // Highlight the first article as featured
        const featured = allNews[0];
        const remaining = allNews.slice(1);

        // Format featured date
        const featuredDateStr = new Date(featured.date).toLocaleDateString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        // Remaining news items grid cards
        const gridCardsHtml = remaining.map(item => {
            const dateStr = new Date(item.date).toLocaleDateString('de-DE', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });

            const tagsHtml = item.tags
                .map(t => `<span class="news-tag" style="margin-right: 6px;">#${t}</span>`)
                .join('');

            return `
                <article class="card interactive-hover-grow news-list-card" data-id="${item.id}" style="cursor: pointer; display: flex; flex-direction: column;">
                    <div class="news-card-img-wrapper">
                        ${item.image
                            ? `<img src="${item.image}" alt="${item.title}" class="news-card-img">`
                            : `<div style="background: linear-gradient(135deg, var(--color-primary), var(--color-bg-secondary)); width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; color: white;"><span style="font-size: 24px;">📰</span></div>`
                        }
                    </div>
                    <div style="flex-grow: 1; display: flex; flex-direction: column;">
                        <div>
                            ${tagsHtml}
                            <h3 style="font-weight: 700; color: var(--color-primary); line-height: 1.3; margin-bottom: var(--space-2);">${item.title}</h3>
                        </div>
                        <p class="text-muted" style="font-size: 14px; margin-bottom: var(--space-4);">📅 ${dateStr} • ${item.category}</p>
                        <p style="font-size: 15px; line-height: 1.5; color: var(--color-text-muted); margin-bottom: var(--space-4); display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
                            ${item.summary}
                        </p>
                        <button class="btn btn-outline btn-sm news-detail-trigger" data-id="${item.id}" style="margin-top: auto; align-self: flex-start;">Beitrag lesen</button>
                    </div>
                </article>
            `;
        }).join('');

        // Featured tags
        const featuredTagsHtml = featured.tags
            .map(t => `<span class="news-tag" style="margin-right: 8px;">#${t}</span>`)
            .join('');

        return `
            <section class="news-layout-container">
                <div class="container">
                    <div class="section-header-block">
                        <h1 class="hero-title" style="color: var(--color-primary);">News & Pressemitteilungen</h1>
                        <p class="text-muted">Aktuelle Berichte über unsere kommunalpolitischen Aktivitäten in Gießen</p>
                    </div>

                    <!-- Highlight featured post -->
                    <article class="featured-news-card anim-slide-up" data-id="${featured.id}">
                        <div class="featured-image-wrapper">
                            ${featured.image
                                ? `<img src="${featured.image}" alt="${featured.title}" class="featured-image">`
                                : `<div style="background: linear-gradient(135deg, var(--color-primary), var(--color-bg-tertiary)); width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; color: white;"><span style="font-size: 64px;">📢</span></div>`
                            }
                        </div>
                        <div class="featured-content">
                            <div>
                                ${featuredTagsHtml}
                                <h2 class="featured-title">${featured.title}</h2>
                            </div>
                            <p class="news-date">📅 ${featuredDateStr} • ${featured.category}</p>
                            <p class="featured-summary">${featured.summary}</p>
                            <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
                                <button class="btn btn-primary news-detail-trigger" data-id="${featured.id}">Vollständigen Artikel lesen</button>
                                <a href="klimabericht_volt.html" class="btn btn-outline">Das Datendashboard öffnen</a>
                            </div>
                        </div>
                    </article>

                    <!-- Remaining news list -->
                    ${remaining.length > 0 ? `
                        <h2 class="section-title" style="margin-bottom: var(--space-6); font-size: var(--font-size-h2-large);">Weitere Berichte</h2>
                        <div class="news-grid">
                            ${gridCardsHtml}
                        </div>
                    ` : ''}
                </div>
            </section>
        `;
    },

    afterRender() {
        // Bind dynamic overlay triggers
        const triggers = document.querySelectorAll('.news-detail-trigger');
        triggers.forEach(trig => {
            trig.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = e.currentTarget.getAttribute('data-id');
                this.showNewsDetailModal(id);
            });
        });

        // Also make card clickable directly
        const cards = document.querySelectorAll('.news-list-card');
        cards.forEach(card => {
            card.addEventListener('click', (e) => {
                const id = card.getAttribute('data-id');
                this.showNewsDetailModal(id);
            });
        });
    },

    showNewsDetailModal(id) {
        const item = store.getNewsById(id);
        if (!item) return;

        const modalMount = document.getElementById('modal-mount');
        if (!modalMount) return;

        const dateStr = new Date(item.date).toLocaleDateString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        modalMount.innerHTML = `
            <div class="modal-overlay" id="news-modal-overlay">
                <div class="modal-container modal-lg">
                    <div class="modal-header">
                        <span class="news-tag">${item.category}</span>
                        <button class="modal-close-btn" id="news-modal-close-trigger" aria-label="Schließen">&times;</button>
                    </div>
                    <div class="modal-body" style="padding-top: var(--space-4);">
                        <p class="news-date" style="margin-bottom: var(--space-2);">📅 ${dateStr} • Veröffentlicht von Volt Gießen</p>
                        <h2 style="color: var(--color-primary); font-size: 28px; font-weight: 700; line-height: 1.25; margin-bottom: var(--space-4);">${item.title}</h2>
                        
                        <div style="font-size: 16px; font-style: italic; color: var(--color-text-muted); background-color: var(--color-bg-secondary); border-left: 4px solid var(--color-secondary); padding: var(--space-4); margin-bottom: var(--space-6);">
                            ${item.summary}
                        </div>
                        
                        <!-- Main text body, preserving paragraph formatting -->
                        <div class="news-article-body" style="font-size: 17px; line-height: 1.7; color: var(--color-text-body); white-space: pre-wrap;">${item.body}</div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-outline" id="news-modal-footer-close-btn">Schließen</button>
                    </div>
                </div>
            </div>
        `;

        const overlay = document.getElementById('news-modal-overlay');
        const closeBtn = document.getElementById('news-modal-close-trigger');
        const closeFooterBtn = document.getElementById('news-modal-footer-close-btn');

        const closeModal = () => {
            overlay.classList.remove('active');
            setTimeout(() => {
                modalMount.innerHTML = '';
            }, 300);
        };

        // Trigger transition open
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

export default newsPage;
