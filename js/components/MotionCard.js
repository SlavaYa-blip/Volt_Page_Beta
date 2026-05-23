/**
 * Volt Gießen - Motion Card Component
 */

export const MotionCard = {
    // Translate status code to German readable title
    getStatusName(status) {
        const statuses = {
            draft: 'Entwurf',
            submitted: 'Eingereicht',
            committee: 'In Ausschussberatung',
            approved: 'Angenommen',
            rejected: 'Abgelehnt'
        };
        return statuses[status] || status;
    },

    // Get appropriate CSS badge class
    getBadgeClass(status) {
        const classes = {
            draft: 'badge-draft',
            submitted: 'badge-submitted',
            committee: 'badge-committee',
            approved: 'badge-approved',
            rejected: 'badge-rejected'
        };
        return classes[status] || 'badge-draft';
    },

    render(motion) {
        const statusName = this.getStatusName(motion.status);
        const badgeClass = this.getBadgeClass(motion.status);
        
        // Format date string to German style
        const dateObj = new Date(motion.date);
        const formattedDate = dateObj.toLocaleDateString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        return `
            <article class="card motion-card status-${motion.status} interactive-hover-grow" data-id="${motion.id}">
                <div class="motion-header">
                    <span class="motion-id-badge">${motion.id}</span>
                    <span class="motion-status-badge ${badgeClass}">${statusName}</span>
                </div>
                
                <h3 class="motion-title">${motion.title}</h3>
                
                <div class="motion-meta">
                    <span>📅 ${formattedDate}</span>
                    <span>📂 ${motion.category}</span>
                    <span>👤 ${motion.proposer}</span>
                </div>
                
                <p class="motion-summary">${motion.summary}</p>
                
                <div style="margin-top: auto; display: flex; justify-content: flex-end;">
                    <button class="btn btn-secondary btn-sm motion-detail-trigger" data-id="${motion.id}">Details ansehen</button>
                </div>
            </article>
        `;
    }
};

export default MotionCard;
