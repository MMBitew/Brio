/**
 * BRIO - MAIN APPLICATION
 * Application initialization and setup
 */

const BrioApp = {
    /**
     * Initialize the application
     */
    init() {
        console.log('🌟 Brio App Starting...');

        // Initialize storage
        this.checkLocalStorage();

        // Initialize state
        BrioState.init();

        // Initialize router
        BrioRouter.init();

        // Initialize components
        this.initializeComponents();

        // Set up event listeners
        this.setupEventListeners();

        // Update UI with current state
        BrioState.updateUI();

        // Update time display
        this.updateTime();
        setInterval(() => this.updateTime(), 60000); // Update every minute

        console.log('✅ Brio App Ready!');
    },

    /**
     * Check if localStorage is available
     */
    checkLocalStorage() {
        try {
            const test = '__storage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (error) {
            console.error('localStorage not available:', error);
            alert('This app requires localStorage to save your progress. Please enable it in your browser settings.');
            return false;
        }
    },

    /**
     * Initialize components
     */
    initializeComponents() {
        // Initialize Modal system
        if (typeof BrioModal !== 'undefined') {
            BrioModal.init();
        }

        // Initialize Audio system
        if (typeof BrioAudio !== 'undefined') {
            BrioAudio.init();
        }

        // Initialize Toast system
        if (typeof BrioToast !== 'undefined') {
            BrioToast.init();
        }

        // Initialize Gamification
        if (typeof BrioGamification !== 'undefined') {
            BrioGamification.init();
        }

        // Initialize Analytics
        if (typeof BrioAnalytics !== 'undefined') {
            BrioAnalytics.init();
        }
    },

    /**
     * Set up event listeners
     */
    setupEventListeners() {
        // Settings button
        const settingsBtn = document.getElementById('settingsBtn');
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => this.openSettings());
        }

        // Prevent zoom on double-tap (iOS)
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (event) => {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    },

    /**
     * Update time display
     */
    updateTime() {
        const timeEl = document.getElementById('currentTime');
        if (timeEl) {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes().toString().padStart(2, '0');
            timeEl.textContent = `${hours}:${minutes}`;
        }
    },

    /**
     * Open settings modal
     */
    openSettings() {
        const currentTheme = BrioState.settings.theme;
        const currentCoach = BrioState.settings.coach;

        const content = `
            <div class="settings-section">
                <div class="section-title">🎨 Theme</div>
                <div class="theme-grid">
                    <div class="theme-option ${currentTheme === 'power' ? 'selected' : ''}" 
                         onclick="BrioApp.changeTheme('power')">
                        <div class="theme-circle theme-power-preview"></div>
                        <div class="theme-name">Power</div>
                    </div>
                    <div class="theme-option ${currentTheme === 'chill' ? 'selected' : ''}" 
                         onclick="BrioApp.changeTheme('chill')">
                        <div class="theme-circle theme-chill-preview"></div>
                        <div class="theme-name">Chill</div>
                    </div>
                    <div class="theme-option ${currentTheme === 'focus' ? 'selected' : ''}" 
                         onclick="BrioApp.changeTheme('focus')">
                        <div class="theme-circle theme-focus-preview"></div>
                        <div class="theme-name">Focus</div>
                    </div>
                    <div class="theme-option ${currentTheme === 'party' ? 'selected' : ''}" 
                         onclick="BrioApp.changeTheme('party')">
                        <div class="theme-circle theme-party-preview"></div>
                        <div class="theme-name">Party</div>
                    </div>
                </div>
            </div>

            <div class="settings-section">
                <div class="section-title">🎤 Coach</div>
                <div class="coach-grid">
                    ${this.renderCoachOptions(currentCoach)}
                </div>
            </div>
        `;

        BrioModal.open('⚙️ Settings', content);
    },

    /**
     * Render coach options
     */
    renderCoachOptions(currentCoach) {
        const coaches = [
            { id: 'maya', emoji: '🌸', name: 'Maya', trait: 'Wise' },
            { id: 'alex', emoji: '⚡', name: 'Alex', trait: 'Energetic' },
            { id: 'jordan', emoji: '📘', name: 'Jordan', trait: 'Clear' },
            { id: 'sam', emoji: '😎', name: 'Sam', trait: 'Casual' },
            { id: 'riley', emoji: '🌈', name: 'Riley', trait: 'Fun' },
            { id: 'casey', emoji: '🎯', name: 'Casey', trait: 'Focused' },
            { id: 'taylor', emoji: '💡', name: 'Taylor', trait: 'Smart' },
            { id: 'morgan', emoji: '🔧', name: 'Morgan', trait: 'Practical' }
        ];

        return coaches.map(coach => `
            <div class="coach-option ${currentCoach === coach.id ? 'selected' : ''}" 
                 onclick="BrioApp.changeCoach('${coach.id}')">
                <div class="coach-emoji">${coach.emoji}</div>
                <div class="coach-name">${coach.name}</div>
                <div class="coach-trait">${coach.trait}</div>
            </div>
        `).join('');
    },

    /**
     * Change theme
     */
    changeTheme(themeName) {
        BrioState.changeTheme(themeName);
        
        // Update selected state in UI
        document.querySelectorAll('.theme-option').forEach(option => {
            option.classList.remove('selected');
        });
        event.target.closest('.theme-option').classList.add('selected');
        
        BrioToast.show('Theme updated!', 'success');
    },

    /**
     * Change coach
     */
    changeCoach(coachName) {
        BrioState.changeCoach(coachName);
        
        // Update selected state in UI
        document.querySelectorAll('.coach-option').forEach(option => {
            option.classList.remove('selected');
        });
        event.target.closest('.coach-option').classList.add('selected');
        
        BrioToast.show('Coach updated!', 'success');
    }
};

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => BrioApp.init());
} else {
    BrioApp.init();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BrioApp;
}
