/**
 * BRIO - GAMIFICATION SYSTEM
 * XP, levels, streaks, badges
 */

const BrioGamification = {
    /**
     * Initialize gamification system
     */
    init() {
        console.log('Gamification system ready');
    },

    /**
     * Show XP gain animation
     */
    showXPGain(amount) {
        BrioToast.show(`+${amount} XP! 🌟`, 'success', 2000);
        
        // Update UI
        setTimeout(() => {
            BrioState.updateUI();
        }, 300);
    },

    /**
     * Show level up animation
     */
    showLevelUp(newLevel) {
        const content = `
            <div style="text-align: center; padding: 20px;">
                <div style="font-size: 80px; margin-bottom: 16px;">🎉</div>
                <h2 style="font-size: 28px; font-weight: 800; margin-bottom: 12px;">
                    Level Up!
                </h2>
                <p style="font-size: 20px; color: var(--primary-color); font-weight: 800;">
                    You're now Level ${newLevel}!
                </p>
                <p style="margin-top: 16px; color: var(--text-secondary);">
                    Keep learning to unlock more skills!
                </p>
                <button class="btn btn-primary mt-xl" onclick="BrioModal.close()" style="width: 100%;">
                    Awesome! 🚀
                </button>
            </div>
        `;

        BrioModal.open('🏆 Achievement', content);
        
        // Play level-up sound if available
        this.playSound('levelup');
    },

    /**
     * Award badge
     */
    awardBadge(badgeId, badgeName, badgeIcon) {
        // Check if already has badge
        if (BrioState.user.badges.includes(badgeId)) {
            return;
        }

        // Add badge
        BrioState.user.badges.push(badgeId);
        BrioState.save();

        // Show badge modal
        const content = `
            <div style="text-align: center; padding: 20px;">
                <div style="font-size: 100px; margin-bottom: 16px;">${badgeIcon}</div>
                <h2 style="font-size: 24px; font-weight: 800; margin-bottom: 12px;">
                    Badge Earned!
                </h2>
                <p style="font-size: 18px; color: var(--primary-color); font-weight: 700;">
                    ${badgeName}
                </p>
                <button class="btn btn-primary mt-xl" onclick="BrioModal.close()" style="width: 100%;">
                    Nice! 🎖️
                </button>
            </div>
        `;

        BrioModal.open('🎖️ New Badge', content);
    },

    /**
     * Check and award streak badges
     */
    checkStreakBadges() {
        const streak = BrioState.user.streak;

        if (streak >= 7 && !BrioState.user.badges.includes('streak-7')) {
            this.awardBadge('streak-7', '7 Day Streak', '🔥');
        }
        if (streak >= 30 && !BrioState.user.badges.includes('streak-30')) {
            this.awardBadge('streak-30', '30 Day Streak', '🔥🔥');
        }
        if (streak >= 100 && !BrioState.user.badges.includes('streak-100')) {
            this.awardBadge('streak-100', '100 Day Streak', '🔥🔥🔥');
        }
    },

    /**
     * Show correct answer feedback
     */
    showCorrectFeedback(encouragement = 'Nice!') {
        const phrases = [
            'Nice! ✨',
            'Great job! 🌟',
            'Correct! 🎯',
            'You got it! ✅',
            'Awesome! 🎉',
            'Perfect! ⭐'
        ];

        const message = phrases[Math.floor(Math.random() * phrases.length)];
        BrioToast.success(message);
        this.playSound('correct');
    },

    /**
     * Show incorrect answer feedback
     */
    showIncorrectFeedback() {
        const phrases = [
            'Not quite... try again!',
            'Close! Give it another shot',
            'Almost there!',
            'Keep trying!'
        ];

        const message = phrases[Math.floor(Math.random() * phrases.length)];
        BrioToast.show(message, 'default');
        this.playSound('incorrect');
    },

    /**
     * Play sound effect
     */
    playSound(soundName) {
        // Placeholder for sound effects
        // In production, load actual audio files
        const audio = new Audio(`assets/sounds/${soundName}.mp3`);
        audio.volume = 0.3;
        audio.play().catch(() => {
            // Ignore errors if sounds not loaded
        });
    },

    /**
     * Calculate XP for completion
     */
    calculateXP(taskType, performance = 1.0) {
        const baseXP = {
            'card-view': 5,
            'card-complete': 20,
            'question-correct': 10,
            'question-perfect': 15,
            'skill-complete': 100
        };

        return Math.floor((baseXP[taskType] || 10) * performance);
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BrioGamification;
}
