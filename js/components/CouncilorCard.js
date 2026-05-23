/**
 * Volt Gießen - Councilor Card Component
 */

export const CouncilorCard = {
    render(member) {
        // Construct focus tags badges
        const focusBadges = member.focus
            .map(f => `<span class="badge badge-purple" style="margin-right: var(--space-1); margin-bottom: var(--space-1);">${f}</span>`)
            .join('');

        // Construct committee items list
        const committeeItems = member.committees
            .map(c => `<li>• ${c}</li>`)
            .join('');

        return `
            <div class="card profile-card interactive-hover-grow">
                <div class="profile-card-image-wrapper">
                    <!-- If no image is provided, display styled SVG placeholder silhouette -->
                    <div class="profile-card-fallback-avatar">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="100" height="100" style="opacity: 0.5;">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                </div>

                <div class="profile-card-content">
                    <span class="profile-card-role">${member.role}</span>
                    <h3 class="profile-card-name">${member.name}</h3>
                    
                    <div style="margin-bottom: var(--space-3); display: flex; flex-wrap: wrap;">
                        ${focusBadges}
                    </div>

                    <p style="font-size: 15px; margin-bottom: var(--space-4); line-height: 1.5;">
                        ${member.bio}
                    </p>
                    
                    <div class="profile-card-committees">
                        <strong style="font-size: 13px; color: var(--color-primary); text-transform: uppercase; display: block; margin-bottom: var(--space-1);">Ausschüsse & Gremien:</strong>
                        <ul style="list-style: none; font-size: 13px; display: flex; flex-direction: column; gap: 4px;">
                            ${committeeItems}
                        </ul>
                    </div>

                    <div class="profile-card-contact">
                        <a href="mailto:${member.email}" class="profile-contact-link" aria-label="E-Mail an ${member.name}">
                            ✉️ ${member.email}
                        </a>
                    </div>
                </div>
            </div>
        `;
    }
};

export default CouncilorCard;
