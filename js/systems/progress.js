/**
 * BRIO - PROGRESS TRACKING
 * Track user progress across skills
 */

const BrioProgress = {
    /**
     * Initialize progress system
     */
    init() {
        console.log('Progress tracking ready');
    },

    /**
     * Get overall progress percentage
     */
    getOverallProgress() {
        const skills = BrioState.skills;
        const skillKeys = Object.keys(skills);
        let totalCards = 0;
        let completedCards = 0;

        skillKeys.forEach(key => {
            const skill = skills[key];
            if (skill.unlocked) {
                // Assume 5 cards per skill
                totalCards += 5;
                completedCards += (skill.cardsCompleted || []).length;
            }
        });

        return totalCards > 0 ? (completedCards / totalCards) * 100 : 0;
    },

    /**
     * Get skill completion percentage
     */
    getSkillProgress(skillId) {
        const skill = BrioState.skills[skillId];
        if (!skill || !skill.unlocked) return 0;

        const totalCards = 5; // All skills have 5 cards
        const completed = (skill.cardsCompleted || []).length;

        return (completed / totalCards) * 100;
    },

    /**
     * Check if skill is complete
     */
    isSkillComplete(skillId) {
        return this.getSkillProgress(skillId) === 100;
    },

    /**
     * Get next unlockable skill
     */
    getNextSkill() {
        const skills = BrioState.skills;
        const skillOrder = ['note-taking', 'reading', 'research', 'essays'];

        for (let skillId of skillOrder) {
            if (skills[skillId] && !skills[skillId].unlocked) {
                return skillId;
            }
        }

        return null;
    },

    /**
     * Unlock next skill
     */
    unlockNextSkill() {
        const nextSkill = this.getNextSkill();
        
        if (nextSkill) {
            BrioState.skills[nextSkill].unlocked = true;
            BrioState.save();

            const skillNames = {
                'reading': 'Reading',
                'research': 'Research',
                'essays': 'Essays'
            };

            BrioToast.success(`${skillNames[nextSkill]} unlocked! 🎉`);
            return true;
        }

        return false;
    },

    /**
     * Get learning statistics
     */
    getStats() {
        return {
            totalXP: BrioState.user.totalXP,
            level: BrioState.user.level,
            streak: BrioState.user.streak,
            badges: BrioState.user.badges.length,
            skillsUnlocked: this.getUnlockedSkillsCount(),
            skillsCompleted: this.getCompletedSkillsCount(),
            overallProgress: this.getOverallProgress()
        };
    },

    /**
     * Get count of unlocked skills
     */
    getUnlockedSkillsCount() {
        return Object.values(BrioState.skills).filter(s => s.unlocked).length;
    },

    /**
     * Get count of completed skills
     */
    getCompletedSkillsCount() {
        return Object.keys(BrioState.skills).filter(id => this.isSkillComplete(id)).length;
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BrioProgress;
}
