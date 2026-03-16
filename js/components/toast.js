/**
 * BRIO - TOAST NOTIFICATIONS
 * Simple notification system
 */

const BrioToast = {
    container: null,

    /**
     * Initialize toast system
     */
    init() {
        this.container = document.getElementById('toast-container');
        if (!this.container) {
            console.error('Toast container not found');
        }
    },

    /**
     * Show a toast notification
     */
    show(message, type = 'default', duration = 3000) {
        if (!this.container) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;

        this.container.appendChild(toast);

        // Auto-remove after duration
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, duration);
    },

    /**
     * Show success toast
     */
    success(message) {
        this.show(message, 'success');
    },

    /**
     * Show error toast
     */
    error(message) {
        this.show(message, 'error');
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BrioToast;
}
