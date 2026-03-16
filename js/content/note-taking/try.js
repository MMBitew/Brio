/** Note Taking - Card 4: Try */
const NoteTry = {
    currentQ: 0,
    open() {
        const data = NOTE_TAKING_DATA.try;
        this.currentQ = 0;
        this.showQuestion();
    },
    showQuestion() {
        const questions = NOTE_TAKING_DATA.try.questions;
        if (this.currentQ >= questions.length) {
            BrioNoteTaking.completeCard('try');
            return;
        }
        const q = questions[this.currentQ];
        const content = `
            <div class="reminder-box">
                <div class="reminder-title">💡 Question ${this.currentQ + 1} of ${questions.length}</div>
                <div class="reminder-text">${q.prompt}</div>
            </div>
            ${q.type === 'keyword_selection' ? this.renderKeywordQuestion(q) : ''}
            <div class="action-buttons mt-xl">
                <button class="btn btn-secondary" onclick="NoteTry.showHint()">💡 Hint</button>
                <button class="btn btn-primary" onclick="NoteTry.nextQuestion()">Next →</button>
            </div>
        `;
        BrioModal.open('✨ Practice', content);
    },
    renderKeywordQuestion(q) {
        return `<p class="practice-prompt" style="background: #f5f5f5; padding: 12px; border-radius: 8px;">${q.text}</p>`;
    },
    showHint() {
        const q = NOTE_TAKING_DATA.try.questions[this.currentQ];
        BrioToast.show(q.hint, 'default', 4000);
    },
    nextQuestion() {
        this.currentQ++;
        this.showQuestion();
    }
};
