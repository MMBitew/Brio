/** Note Taking - Card 2: Watch */
const NoteWatch = {
    open() {
        const data = NOTE_TAKING_DATA.watch;
        const content = `
            <p class="practice-prompt">Here are 3 note-taking methods. Tap one to see an example!</p>
            ${data.examples.map((ex, i) => `
                <div class="learning-card" onclick="NoteWatch.showExample(${i})" style="margin-bottom: 12px;">
                    <div class="learning-card-icon">${i + 1}️⃣</div>
                    <div class="learning-card-content">
                        <h4>${ex.name}</h4>
                        <p>${ex.description}</p>
                    </div>
                    <div class="learning-card-arrow">👀</div>
                </div>
            `).join('')}
            <button class="btn btn-primary mt-xl" onclick="BrioNoteTaking.completeCard('watch')" style="width: 100%;">
                Done watching →
            </button>
        `;
        BrioModal.open(`${data.icon} ${data.title}`, content);
    },
    showExample(index) {
        const ex = NOTE_TAKING_DATA.watch.examples[index];
        BrioToast.show(`${ex.name} example shown!`, 'success');
    }
};
