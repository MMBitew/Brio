/**
 * BRIO - NOTE TAKING SKILL
 * Main controller for Note Taking skill
 */

const BrioNoteTaking = {
    currentCard: null,
    currentQuestion: 0,

    /**
     * Open a card
     */
    openCard(cardId) {
        this.currentCard = cardId;
        BrioState.session.currentCard = cardId;

        switch(cardId) {
            case 'intro':
                NoteIntro.open();
                break;
            case 'watch':
                NoteWatch.open();
                break;
            case 'learn':
                NoteLearn.open();
                break;
            case 'try':
                NoteTry.open();
                break;
            case 'master':
                NoteMaster.open();
                break;
        }

        // Track card view
        BrioAnalytics.trackEvent('note-taking', 'card-view', cardId);
    },

    /**
     * Complete a card
     */
    completeCard(cardId) {
        BrioState.completeCard('note-taking', cardId);
        BrioGamification.showXPGain(20);
        
        // Close modal
        BrioModal.close();
        
        // Show completion message
        setTimeout(() => {
            BrioToast.success('Card completed! 🎉');
        }, 300);
    },

    /**
     * Answer a question
     */
    answerQuestion(questionId, userAnswer, correctAnswer) {
        const correct = this.checkAnswer(userAnswer, correctAnswer);
        
        BrioState.answerQuestion('note-taking', questionId, correct);
        
        if (correct) {
            BrioGamification.showCorrectFeedback();
        } else {
            BrioGamification.showIncorrectFeedback();
        }

        return correct;
    },

    /**
     * Check if answer is correct
     */
    checkAnswer(userAnswer, correctAnswer) {
        if (Array.isArray(correctAnswer)) {
            return correctAnswer.includes(userAnswer);
        }
        return userAnswer === correctAnswer;
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = BrioNoteTaking;
}
