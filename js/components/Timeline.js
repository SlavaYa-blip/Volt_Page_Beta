/**
 * Volt Gießen - Timeline List Component
 */

export const Timeline = {
    render(events) {
        if (!events || events.length === 0) {
            return `<p class="text-center text-muted">Derzeit stehen keine Termine an.</p>`;
        }

        // Loop and build alternate rows
        const itemsHtml = events.map((event, index) => {
            const isLeft = index % 2 === 0;
            const alignClass = isLeft ? 'timeline-item-left' : 'timeline-item-right';
            
            return `
                <div class="timeline-item ${alignClass}">
                    <div class="timeline-node"></div>
                    <div class="timeline-content anim-slide-up">
                        <span class="timeline-category">${event.category}</span>
                        <div class="timeline-date">${event.date} • ${event.time}</div>
                        <h3 class="timeline-title">${event.title}</h3>
                        <p class="timeline-desc">${event.desc}</p>
                        <div style="margin-top: var(--space-2); font-size: 13px; color: var(--color-primary); font-weight: 500;">
                            📍 ${event.location}
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        return `
            <div class="timeline">
                ${itemsHtml}
            </div>
        `;
    }
};

export default Timeline;
