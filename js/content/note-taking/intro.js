/** Note Taking - Card 1: Intro */
const NoteIntro = {
    open() {
        const data = NOTE_TAKING_DATA.intro;
        const content = `
            <div class="reminder-box">
                <div class="reminder-title">${data.icon} ${data.content.what.title}</div>
                <div class="reminder-text">${data.content.what.text}</div>
            </div>
            <div style="margin-bottom: 20px;">
                <h3 style="font-size: 18px; font-weight: 800; margin-bottom: 12px;">${data.content.why.title}</h3>
                ${data.content.why.benefits.map(b => `
                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                        <span style="font-size: 28px;">${b.icon}</span>
                        <span style="font-size: 16px; font-weight: 600;">${b.text}</span>
                    </div>
                `).join('')}
            </div>
            <button class="btn btn-primary" onclick="BrioNoteTaking.completeCard('intro')" style="width: 100%;">
                Got it! →
            </button>
        `;
        BrioModal.open(`${data.icon} ${data.title}`, content);
    }
};
