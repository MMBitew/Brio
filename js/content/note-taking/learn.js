/** Note Taking - Card 3: Learn */
const NoteLearn = {
    open() {
        const data = NOTE_TAKING_DATA.learn;
        const content = `
            <p class="practice-prompt">Learn 3 quick strategies:</p>
            ${data.strategies.map((strat, i) => `
                <div style="background: #f0fdf4; border: 2px solid #58cc02; border-radius: 12px; padding: 16px; margin-bottom: 16px;">
                    <h4 style="font-size: 16px; font-weight: 800; margin-bottom: 8px;">${i + 1}. ${strat.name}</h4>
                    ${strat.steps.map(step => `<p style="font-size: 14px; margin: 4px 0;">• ${step}</p>`).join('')}
                    <p style="font-size: 13px; color: #166534; margin-top: 8px;"><strong>💡 Tip:</strong> ${strat.tip}</p>
                </div>
            `).join('')}
            <button class="btn btn-primary" onclick="BrioNoteTaking.completeCard('learn')" style="width: 100%;">
                Let's practice! →
            </button>
        `;
        BrioModal.open(`${data.icon} ${data.title}`, content);
    }
};
