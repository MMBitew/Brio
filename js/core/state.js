/**
 * BRIO - STATE MANAGEMENT
 * Global application state
 */

const BrioState = {
    // User Data
    user: {
        streak: 0,
        totalXP: 0,
        level: 1,
        badges: [],
        theme: 'power',
        coach: 'maya',
        lastVisit: null
    },

    // Current Session
    session: {
        currentView: 'home',
        currentSkill: null,
        currentCard: null,
        viewHistory: []
    },

    // Skills Progress
    skills: {
        'note-taking': {
            unlocked: true,
            level: 1,
            xp: 0,
            cardsCompleted: [],
            questionsAnswered: [],
            streakDays: 0,
            lastPractice: null
        },
        'reading': {
            unlocked: false,
            level: 0,
            xp: 0
        },
        'research': {
            unlocked: false,
            level: 0,
            xp: 0
        },
        'essays': {
            unlocked: false,
            level: 0,
            xp: 0
        }
    },

    // Settings
    settings: {
        audioEnabled: true,
        theme: 'power',
        coach: 'maya',
        notifications: true
    },

    /**
     * Initialize state from localStorage or defaults
     */
    init() {
        const saved = BrioStorage.get('brio-state');
        if (saved) {
            Object.assign(this.user, saved.user || {});
            Object.assign(this.skills, saved.skills || {});
            Object.assign(this.settings, saved.settings || {});
        }
        
        // Update last visit
        this.user.lastVisit = new Date().toISOString();
        
        // Apply theme
        this.applyTheme();
        
        // Calculate streak
        this.calculateStreak();
        
        // Save initial state
        this.save();
    },

    /**
     * Save state to localStorage
     */
    save() {
        BrioStorage.set('brio-state', {
            user: this.user,
            skills: this.skills,
            settings: this.settings
        });
    },

    /**
     * Calculate current streak
     */
    calculateStreak() {
        const lastVisit = this.user.lastVisit;
        if (!lastVisit) {
            this.user.streak = 0;
            return;
        }

        const lastDate = new Date(lastVisit);
        const today = new Date();
        const diffDays = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
            // Same day - keep streak
            return;
        } else if (diffDays === 1) {
            // Yesterday - increment streak
            this.user.streak += 1;
        } else {
            // Streak broken
            this.user.streak = 0;
        }
    },

    /**
     * Award XP to user
     */
    awardXP(amount, skill = null) {
        this.user.totalXP += amount;
        
        // Award to specific skill if provided
        if (skill && this.skills[skill]) {
            this.skills[skill].xp += amount;
        }

        // Check for level up
        this.checkLevelUp();
        
        // Save state
        this.save();

        // Trigger XP animation
        BrioGamification.showXPGain(amount);
    },

    /**
     * Check if user should level up
     */
    checkLevelUp() {
        const xpForNextLevel = this.user.level * 100;
        
        if (this.user.totalXP >= xpForNextLevel) {
            this.user.level += 1;
            BrioGamification.showLevelUp(this.user.level);
        }
    },

    /**
     * Mark card as completed
     */
    completeCard(skill, cardId) {
        if (!this.skills[skill]) return;
        
        if (!this.skills[skill].cardsCompleted) {
            this.skills[skill].cardsCompleted = [];
        }
        
        if (!this.skills[skill].cardsCompleted.includes(cardId)) {
            this.skills[skill].cardsCompleted.push(cardId);
            this.awardXP(20, skill);
        }
        
        this.save();
    },

    /**
     * Mark question as answered
     */
    answerQuestion(skill, questionId, correct) {
        if (!this.skills[skill]) return;
        
        if (!this.skills[skill].questionsAnswered) {
            this.skills[skill].questionsAnswered = [];
        }
        
        this.skills[skill].questionsAnswered.push({
            id: questionId,
            correct: correct,
            timestamp: new Date().toISOString()
        });
        
        // Award XP for correct answers
        if (correct) {
            this.awardXP(10, skill);
        }
        
        this.save();
    },

    /**
     * Change theme
     */
    changeTheme(themeName) {
        this.settings.theme = themeName;
        this.user.theme = themeName;
        this.applyTheme();
        this.save();
    },

    /**
     * Apply current theme to body
     */
    applyTheme() {
        const themes = ['power', 'chill', 'focus', 'party'];
        themes.forEach(theme => {
            document.body.classList.remove(`theme-${theme}`);
        });
        document.body.classList.add(`theme-${this.settings.theme}`);
    },

    /**
     * Change coach
     */
    changeCoach(coachName) {
        this.settings.coach = coachName;
        this.user.coach = coachName;
        this.save();
    },

    /**
     * Get current skill progress
     */
    getSkillProgress(skillId) {
        return this.skills[skillId] || null;
    },

    /**
     * Update UI with current state
     */
    updateUI() {
        // Update streak display
        const streakEl = document.getElementById('streakDays');
        if (streakEl) streakEl.textContent = this.user.streak;

        // Update XP display
        const xpEl = document.getElementById('totalXP');
        if (xpEl) xpEl.textContent = this.user.totalXP;

        // Update level display
        const levelEl = document.getElementById('currentLevel');
        if (levelEl) levelEl.textContent = this.user.level;
    },

    /**
     * Reset all progress (for testing)
     */
    reset() {
        if (confirm('Reset all progress? This cannot be undone!')) {
            BrioStorage.clear();
            window.location.reload();
        }
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BrioState;
}
