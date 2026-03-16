/** Note Taking - Card 5: Master */
const NoteMaster = {
    open() {
        const data = NOTE_TAKING_DATA.master;
        const content = `
            <div style="text-align: center; padding: 20px;">
                <div style="font-size: 80px; margin-bottom: 16px;">🎯</div>
                <h2 style="font-size: 24px; font-weight: 800; margin-bottom: 12px;">Master Challenge</h2>
                <p style="color: var(--text-secondary); margin-bottom: 24px;">
                    Complete real note-taking scenarios to master this skill!
                </p>
                <button class="btn btn-primary" onclick="NoteMaster.startChallenge()" style="width: 100%;">
                    Start Challenge →
                </button>
            </div>
        `;
        BrioModal.open('🎯 Master', content);
    },
    startChallenge() {
        BrioNoteTaking.completeCard('master');
        BrioToast.success('Master challenge completed! 🏆');
    }
};
