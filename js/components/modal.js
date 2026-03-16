/**
 * BRIO - MODAL COMPONENT
 * Handles modal dialogs
 */

const BrioModal = {
    container: null,

    /**
     * Initialize modal system
     */
    init() {
        this.container = document.getElementById('modal-root');
        if (!this.container) {
            console.error('Modal container not found');
        }
    },

    /**
     * Open a modal
     */
    open(title, content, options = {}) {
        if (!this.container) return;

        const modalHTML = `
            <div class="modal-overlay" id="currentModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="modal-title">${title}</div>
                        <button class="close-btn" onclick="BrioModal.close()">×</button>
                    </div>
                    <div class="modal-body">
                        ${content}
                    </div>
                </div>
            </div>
        `;

        this.container.innerHTML = modalHTML;

        // Prevent body scroll
        document.body.style.overflow = 'hidden';

        // Close on overlay click
        const overlay = document.getElementById('currentModal');
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.close();
            }
        });

        // Close on escape key
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                this.close();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    },

    /**
     * Close current modal
     */
    close() {
        if (!this.container) return;
        
        this.container.innerHTML = '';
        document.body.style.overflow = '';
    },

    /**
     * Confirm dialog
     */
    confirm(title, message, onConfirm) {
        const content = `
            <p class="practice-prompt">${message}</p>
            <div class="action-buttons">
                <button class="btn btn-secondary" onclick="BrioModal.close()">Cancel</button>
                <button class="btn btn-primary" onclick="BrioModal.handleConfirm()"">Confirm</button>
            </div>
        `;

        this.confirmCallback = onConfirm;
        this.open(title, content);
    },

    /**
     * Handle confirm callback
     */
    handleConfirm() {
        if (this.confirmCallback) {
            this.confirmCallback();
            this.confirmCallback = null;
        }
        this.close();
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BrioModal;
}
