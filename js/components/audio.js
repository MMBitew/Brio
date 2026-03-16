/**
 * BRIO - AUDIO COMPONENT
 * Text-to-speech using Web Speech API
 */

const BrioAudio = {
    enabled: true,
    synth: null,
    currentUtterance: null,

    /**
     * Initialize audio system
     */
    init() {
        if ('speechSynthesis' in window) {
            this.synth = window.speechSynthesis;
            this.enabled = BrioState.settings.audioEnabled !== false;
        } else {
            console.warn('Text-to-speech not supported');
            this.enabled = false;
        }
    },

    /**
     * Speak text
     */
    speak(text, options = {}) {
        if (!this.enabled || !this.synth) return;

        // Cancel any current speech
        this.stop();

        // Create utterance
        this.currentUtterance = new SpeechSynthesisUtterance(text);
        
        // Set voice properties
        this.currentUtterance.rate = options.rate || 0.9; // Slightly slower for clarity
        this.currentUtterance.pitch = options.pitch || 1.0;
        this.currentUtterance.volume = options.volume || 1.0;

        // Speak
        this.synth.speak(this.currentUtterance);
    },

    /**
     * Stop current speech
     */
    stop() {
        if (this.synth && this.synth.speaking) {
            this.synth.cancel();
        }
    },

    /**
     * Toggle audio on/off
     */
    toggle() {
        this.enabled = !this.enabled;
        BrioState.settings.audioEnabled = this.enabled;
        BrioState.save();

        if (!this.enabled) {
            this.stop();
        }

        return this.enabled;
    },

    /**
     * Read card content aloud
     */
    readCard(cardData) {
        if (!cardData) return;

        let textToRead = '';

        if (cardData.title) {
            textToRead += cardData.title + '. ';
        }

        if (cardData.subtitle) {
            textToRead += cardData.subtitle + '. ';
        }

        if (cardData.text) {
            textToRead += cardData.text;
        }

        this.speak(textToRead);
    },

    /**
     * Read current screen content aloud
     */
    readCurrentScreen() {
        const voiceBtn = document.getElementById('voiceBtn');
        
        // Stop if already speaking
        if (this.synth && this.synth.speaking) {
            this.stop();
            if (voiceBtn) voiceBtn.classList.remove('speaking');
            return;
        }

        // Get text from current view
        const mainContent = document.getElementById('main-content');
        if (!mainContent) return;

        // Try to get modal content first (if modal is open)
        const modalBody = document.querySelector('.modal-body');
        const contentSource = modalBody || mainContent;

        // Get title and text
        const titleEl = contentSource.querySelector('.step-title, .card-title, .modal-title, h1, h2, h3');
        const textEl = contentSource.querySelector('.step-text, .card-text, .practice-prompt, p');
        
        let textToSpeak = '';
        if (titleEl) textToSpeak += titleEl.textContent + '. ';
        if (textEl) textToSpeak += textEl.textContent;

        if (textToSpeak && this.enabled) {
            if (voiceBtn) voiceBtn.classList.add('speaking');
            
            this.currentUtterance = new SpeechSynthesisUtterance(textToSpeak);
            this.currentUtterance.rate = 0.9;
            this.currentUtterance.onend = () => {
                if (voiceBtn) voiceBtn.classList.remove('speaking');
                this.currentUtterance = null;
            };
            
            this.synth.speak(this.currentUtterance);
        }
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BrioAudio;
}
