/**
 * BRIO - ROUTER
 * View navigation and screen management
 */

const BrioRouter = {
    currentView: 'home',
    history: [],

    /**
     * Initialize router
     */
    init() {
        // Set up back button handler
        const backBtn = document.querySelector('.back-btn');
        if (backBtn) {
            backBtn.addEventListener('click', () => this.back());
        }

        // Load home view
        this.navigate('home');
    },

    /**
     * Navigate to a view
     */
    navigate(viewName, params = {}) {
        // Save current view to history
        if (this.currentView !== viewName) {
            this.history.push(this.currentView);
        }

        this.currentView = viewName;
        BrioState.session.currentView = viewName;

        // Update header
        this.updateHeader(viewName, params);

        // Load view content
        this.loadView(viewName, params);

        // Scroll to top
        window.scrollTo(0, 0);
    },

    /**
     * Go back to previous view
     */
    back() {
        if (this.history.length > 0) {
            const previousView = this.history.pop();
            this.currentView = previousView;
            BrioState.session.currentView = previousView;
            this.loadView(previousView);
            window.scrollTo(0, 0);
        } else {
            this.navigate('home');
        }
    },

    /**
     * Update header based on current view
     */
    updateHeader(viewName, params = {}) {
        const headerIcon = document.getElementById('headerIcon');
        const headerTitle = document.getElementById('headerTitle');

        const viewConfig = {
            'home': { icon: '🌟', title: 'Brio' },
            'academic': { icon: '📚', title: 'Academic' },
            'note-taking': { icon: '✍️', title: 'Notes' },
            'life-skills': { icon: '🏠', title: 'Life Stuff' },
            'social': { icon: '👥', title: 'Social' },
            'money': { icon: '💰', title: 'Money' }
        };

        const config = viewConfig[viewName] || viewConfig['home'];
        
        if (headerIcon) headerIcon.textContent = config.icon;
        if (headerTitle) headerTitle.textContent = config.title;
    },

    /**
     * Load view content
     */
    loadView(viewName, params = {}) {
        const mainContent = document.getElementById('main-content');
        if (!mainContent) return;

        // Show/hide back button
        this.toggleBackButton(viewName !== 'home');

        switch(viewName) {
            case 'home':
                this.renderHomeView(mainContent);
                break;
            case 'academic':
                this.renderAcademicView(mainContent);
                break;
            case 'note-taking':
                this.renderNoteSkillView(mainContent);
                break;
            default:
                this.renderComingSoon(mainContent, viewName);
        }
    },

    /**
     * Render Home View
     */
    renderHomeView(container) {
        container.innerHTML = `
            <div class="skill-card" onclick="BrioRouter.navigate('academic')">
                <div class="skill-card-left">
                    <div class="skill-icon">📚</div>
                    <div class="skill-info">
                        <h3>Academic</h3>
                        <p>7 skills</p>
                    </div>
                </div>
                <div class="skill-arrow">→</div>
            </div>

            <div class="skill-card">
                <div class="skill-card-left">
                    <div class="skill-icon">🏠</div>
                    <div class="skill-info">
                        <h3>Life Stuff</h3>
                        <p>6 skills</p>
                    </div>
                </div>
                <div class="locked-badge">🔒 Soon</div>
            </div>

            <div class="skill-card">
                <div class="skill-card-left">
                    <div class="skill-icon">👥</div>
                    <div class="skill-info">
                        <h3>Social</h3>
                        <p>5 skills</p>
                    </div>
                </div>
                <div class="locked-badge">🔒 Soon</div>
            </div>

            <div class="skill-card">
                <div class="skill-card-left">
                    <div class="skill-icon">💰</div>
                    <div class="skill-info">
                        <h3>Money</h3>
                        <p>4 skills</p>
                    </div>
                </div>
                <div class="locked-badge">🔒 Soon</div>
            </div>
        `;
    },

    /**
     * Render Academic Skills View
     */
    renderAcademicView(container) {
        container.innerHTML = `
            <div class="skill-card" onclick="BrioRouter.navigate('note-taking')">
                <div class="skill-card-left">
                    <div class="skill-icon">✍️</div>
                    <div class="skill-info">
                        <h3>Notes</h3>
                        <p>Learn faster</p>
                    </div>
                </div>
                <div class="skill-arrow">→</div>
            </div>

            <div class="skill-card">
                <div class="skill-card-left">
                    <div class="skill-icon">📖</div>
                    <div class="skill-info">
                        <h3>Reading</h3>
                        <p>Get better</p>
                    </div>
                </div>
                <div class="locked-badge">🔒 Soon</div>
            </div>

            <div class="skill-card">
                <div class="skill-card-left">
                    <div class="skill-icon">🔬</div>
                    <div class="skill-info">
                        <h3>Research</h3>
                        <p>Find info</p>
                    </div>
                </div>
                <div class="locked-badge">🔒 Soon</div>
            </div>

            <div class="skill-card">
                <div class="skill-card-left">
                    <div class="skill-icon">📝</div>
                    <div class="skill-info">
                        <h3>Essays</h3>
                        <p>Write more</p>
                    </div>
                </div>
                <div class="locked-badge">🔒 Soon</div>
            </div>

            <div class="skill-card">
                <div class="skill-card-left">
                    <div class="skill-icon">💬</div>
                    <div class="skill-info">
                        <h3>Discussions</h3>
                        <p>Share ideas</p>
                    </div>
                </div>
                <div class="locked-badge">🔒 Soon</div>
            </div>
        `;
    },

    /**
     * Render Note Taking Skill View
     */
    renderNoteSkillView(container) {
        const progress = BrioState.getSkillProgress('note-taking');
        const xp = progress ? progress.xp : 0;
        const level = progress ? progress.level : 1;
        const xpForNext = level * 100;
        const xpPercent = (xp / xpForNext) * 100;

        container.innerHTML = `
            <div class="progress-card">
                <div class="progress-header">
                    <div class="level-badge">Level ${level}</div>
                    <div class="xp-large">${xp} XP</div>
                </div>
                <div class="progress-bar-wrapper">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${xpPercent}%"></div>
                    </div>
                    <div class="progress-label">${xp} / ${xpForNext} XP to Level ${level + 1}</div>
                </div>
            </div>

            <div class="learning-cards">
                <div class="learning-card" onclick="BrioNoteTaking.openCard('intro')">
                    <div class="learning-card-icon">📖</div>
                    <div class="learning-card-content">
                        <h4>Intro</h4>
                        <p>What & why</p>
                    </div>
                    <div class="learning-card-arrow">→</div>
                </div>

                <div class="learning-card" onclick="BrioNoteTaking.openCard('watch')">
                    <div class="learning-card-icon">👀</div>
                    <div class="learning-card-content">
                        <h4>Watch</h4>
                        <p>See examples</p>
                    </div>
                    <div class="learning-card-arrow">→</div>
                </div>

                <div class="learning-card" onclick="BrioNoteTaking.openCard('learn')">
                    <div class="learning-card-icon">🛠️</div>
                    <div class="learning-card-content">
                        <h4>Learn</h4>
                        <p>Step by step</p>
                    </div>
                    <div class="learning-card-arrow">→</div>
                </div>

                <div class="learning-card" onclick="BrioNoteTaking.openCard('try')">
                    <div class="learning-card-icon">✨</div>
                    <div class="learning-card-content">
                        <h4>Try</h4>
                        <p>Practice now</p>
                    </div>
                    <div class="learning-card-arrow">→</div>
                </div>

                <div class="learning-card" onclick="BrioNoteTaking.openCard('master')">
                    <div class="learning-card-icon">🎯</div>
                    <div class="learning-card-content">
                        <h4>Master</h4>
                        <p>Test yourself</p>
                    </div>
                    <div class="learning-card-arrow">→</div>
                </div>
            </div>
        `;
    },

    /**
     * Render Coming Soon View
     */
    renderComingSoon(container, viewName) {
        container.innerHTML = `
            <div style="text-align: center; padding: 60px 20px;">
                <div style="font-size: 80px; margin-bottom: 20px;">🚧</div>
                <h2 style="font-size: 24px; font-weight: 800; margin-bottom: 12px;">Coming Soon!</h2>
                <p style="color: var(--text-secondary); font-size: 16px;">
                    We're working on this skill.
                </p>
            </div>
        `;
    },

    /**
     * Toggle back button visibility
     */
    toggleBackButton(show) {
        const backBtn = document.querySelector('.back-btn');
        if (backBtn) {
            backBtn.style.display = show ? 'inline-flex' : 'none';
        }
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BrioRouter;
}
