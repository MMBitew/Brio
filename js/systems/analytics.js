/**
 * BRIO - ANALYTICS
 * Privacy-friendly usage analytics (local only)
 */

const BrioAnalytics = {
    /**
     * Initialize analytics
     */
    init() {
        console.log('Analytics ready (privacy-friendly, local only)');
        this.trackSession();
    },

    /**
     * Track session start
     */
    trackSession() {
        const sessions = BrioStorage.get('brio-sessions') || [];
        sessions.push({
            timestamp: new Date().toISOString(),
            duration: 0
        });
        BrioStorage.set('brio-sessions', sessions);

        // Track session duration
        this.sessionStart = Date.now();
        window.addEventListener('beforeunload', () => {
            this.endSession();
        });
    },

    /**
     * End session tracking
     */
    endSession() {
        if (!this.sessionStart) return;

        const duration = Date.now() - this.sessionStart;
        const sessions = BrioStorage.get('brio-sessions') || [];
        
        if (sessions.length > 0) {
            sessions[sessions.length - 1].duration = duration;
            BrioStorage.set('brio-sessions', sessions);
        }
    },

    /**
     * Track event (local only)
     */
    trackEvent(category, action, label = null) {
        const events = BrioStorage.get('brio-events') || [];
        
        events.push({
            category,
            action,
            label,
            timestamp: new Date().toISOString()
        });

        // Keep only last 1000 events
        if (events.length > 1000) {
            events.shift();
        }

        BrioStorage.set('brio-events', events);
    },

    /**
     * Get analytics summary
     */
    getSummary() {
        const sessions = BrioStorage.get('brio-sessions') || [];
        const events = BrioStorage.get('brio-events') || [];

        const totalTime = sessions.reduce((sum, s) => sum + (s.duration || 0), 0);
        const avgTime = sessions.length > 0 ? totalTime / sessions.length : 0;

        return {
            totalSessions: sessions.length,
            totalTime: Math.floor(totalTime / 1000 / 60), // minutes
            averageTime: Math.floor(avgTime / 1000 / 60), // minutes
            totalEvents: events.length,
            lastSession: sessions.length > 0 ? sessions[sessions.length - 1].timestamp : null
        };
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BrioAnalytics;
}
