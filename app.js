// Main application logic
class PubCrawlApp {
    constructor() {
        this.challengeCount = 0;
        this.currentBar = 1;
        this.maxBars = 4;
        this.usedChallenges = new Set();
        this.completedChallenges = [];
        this.hasShownSharePrompt = false;
        
        // Bar names
        this.barNames = [
            'City of London',
            'Crafty Cat',
            'Dubliners',
            'Saddles',
            'The Adventure Continues...'
        ];
        
        this.init();
        this.loadState();
        this.updateUI();
    }
    
    init() {
        // Get DOM elements
        this.challengeCard = document.getElementById('challengeCard');
        this.challengeText = document.getElementById('challengeText');
        this.challengeCountElement = document.getElementById('challengeCount');
        this.currentBarElement = document.getElementById('currentBar');
        this.barIndicator = document.getElementById('barIndicator');
        this.barNameElement = document.getElementById('barName');
        this.progressFill = document.getElementById('progressFill');
        this.newChallengeBtn = document.getElementById('newChallengeBtn');
        this.nextBarBtn = document.getElementById('nextBarBtn');
        this.prevBarBtn = document.getElementById('prevBarBtn');
        this.completeBtn = document.getElementById('completeBtn');
        this.skipBtn = document.getElementById('skipBtn');
        this.actionButtons = document.getElementById('actionButtons');
        this.challengeActions = document.getElementById('challengeActions');
        
        // Track if a challenge is currently active
        this.activeChallengeShown = false;
        
        // Add event listeners
        this.newChallengeBtn.addEventListener('click', () => this.getNewChallenge());
        this.completeBtn.addEventListener('click', () => this.completeChallenge());
        this.skipBtn.addEventListener('click', () => this.skipChallenge());
        this.nextBarBtn.addEventListener('click', () => this.nextBar());
        this.prevBarBtn.addEventListener('click', () => this.previousBar());
        
        // Add touch feedback
        this.addTouchFeedback();
    }
    
    addTouchFeedback() {
        const buttons = document.querySelectorAll('button');
        buttons.forEach(btn => {
            btn.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });
            btn.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }
    
    getNewChallenge() {
        // Add flip animation
        this.challengeCard.classList.add('flipping');
        
        // Get a random challenge
        const challenge = getRandomChallenge();
        
        // Store current challenge
        this.currentChallenge = challenge;
        
        // Update challenge text and icon
        setTimeout(() => {
            const icon = this.challengeCard.querySelector('.challenge-icon');
            icon.textContent = challenge.icon;
            this.challengeText.textContent = challenge.text;
            
            // Mark that a challenge is now active
            this.activeChallengeShown = true;
            
            // Show complete/skip buttons, hide get challenge button
            this.actionButtons.classList.add('hidden');
            this.challengeActions.classList.remove('hidden');
            
            // Remove animation class
            setTimeout(() => {
                this.challengeCard.classList.remove('flipping');
            }, 600);
        }, 100);
        
        // Haptic feedback if available
        if (window.navigator && window.navigator.vibrate) {
            window.navigator.vibrate(50);
        }
    }
    
    completeChallenge() {
        // Store completed challenge
        if (this.currentChallenge) {
            this.completedChallenges.push(this.currentChallenge.text);
        }
        
        // Increment challenge count only when completed
        this.challengeCount++;
        this.updateUI();
        this.saveState();
        
        // Trigger celebration
        if (confetti) {
            confetti.fire(window.innerWidth / 2, window.innerHeight / 2, 60);
        }
        
        // Show success message
        this.showToast('🎉 Challenge completed!');
        
        // Check if we should show WhatsApp share prompt
        if (this.challengeCount === 4 && !this.hasShownSharePrompt) {
            setTimeout(() => {
                this.showWhatsAppSharePrompt();
                this.hasShownSharePrompt = true;
                this.saveState();
            }, 1000);
        }
        
        // Reset to get new challenge
        this.resetChallengeView();
        
        // Haptic feedback
        if (window.navigator && window.navigator.vibrate) {
            window.navigator.vibrate([50, 100, 50]);
        }
    }
    
    skipChallenge() {
        // Just reset without incrementing counter
        this.showToast('Skipped - Get a new one!');
        this.resetChallengeView();
        
        // Haptic feedback
        if (window.navigator && window.navigator.vibrate) {
            window.navigator.vibrate(30);
        }
    }
    
    resetChallengeView() {
        // Reset challenge text
        this.challengeText.textContent = 'Tap the button below to reveal your challenge!';
        const icon = this.challengeCard.querySelector('.challenge-icon');
        icon.textContent = '🍻';
        
        // Hide complete/skip buttons, show get challenge button
        this.challengeActions.classList.add('hidden');
        this.actionButtons.classList.remove('hidden');
        
        this.activeChallengeShown = false;
    }
    
    nextBar() {
        this.currentBar++;
        this.updateUI();
        this.saveState();
        
        // Get bar name
        const barName = this.getBarName(this.currentBar);
        
        // Celebration when moving to next bar
        if (confetti) {
            confetti.fire(window.innerWidth / 2, window.innerHeight / 2, 60);
        }
        
        // Haptic feedback
        if (window.navigator && window.navigator.vibrate) {
            window.navigator.vibrate([50, 100, 50]);
        }
        
        // Show success message
        if (this.currentBar <= this.maxBars) {
            this.showToast(`🎉 Welcome to ${barName}!`);
        } else {
            this.showToast(`🎊 ${barName}`);
        }
    }
    
    previousBar() {
        if (this.currentBar > 1) {
            this.currentBar--;
            this.updateUI();
            this.saveState();
            
            // Haptic feedback
            if (window.navigator && window.navigator.vibrate) {
                window.navigator.vibrate(30);
            }
            
            const barName = this.getBarName(this.currentBar);
            this.showToast(`← Back to ${barName}`);
        }
    }
    
    getBarName(barNumber) {
        if (barNumber <= this.barNames.length - 1) {
            return this.barNames[barNumber - 1];
        } else {
            return this.barNames[this.barNames.length - 1];
        }
    }
    
    updateUI() {
        // Update stats
        this.challengeCountElement.textContent = this.challengeCount;
        document.getElementById('currentBar').textContent = this.currentBar;
        
        // Update bar name
        this.barNameElement.textContent = this.getBarName(this.currentBar);
        
        // Update bar progress
        const progress = Math.min((this.currentBar / this.maxBars) * 100, 100);
        this.progressFill.style.width = `${progress}%`;
        
        // Update bar indicator
        if (this.currentBar <= this.maxBars) {
            this.barIndicator.textContent = `Bar ${this.currentBar} of ${this.maxBars}`;
        } else {
            this.barIndicator.textContent = `Bar ${this.currentBar}`;
        }
        
        // Enable/disable navigation buttons
        this.prevBarBtn.disabled = this.currentBar <= 1;
        
        // Update next button text
        if (this.currentBar < this.maxBars) {
            this.nextBarBtn.textContent = 'Next Bar →';
        } else if (this.currentBar === this.maxBars) {
            this.nextBarBtn.textContent = 'Continue Adventure →';
        } else {
            this.nextBarBtn.textContent = 'Next Bar →';
        }
    }
    
    showToast(message) {
        // Create toast element
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(-100px);
            background: var(--secondary-color);
            color: var(--primary-color);
            padding: 16px 24px;
            border-radius: 50px;
            font-weight: 700;
            box-shadow: 0 8px 30px rgba(44, 6, 3, 0.3);
            z-index: 10000;
            transition: transform 0.5s ease;
            font-size: 1rem;
            text-align: center;
            max-width: 80%;
        `;
        
        document.body.appendChild(toast);
        
        // Animate in
        setTimeout(() => {
            toast.style.transform = 'translateX(-50%) translateY(0)';
        }, 10);
        
        // Animate out and remove
        setTimeout(() => {
            toast.style.transform = 'translateX(-50%) translateY(-100px)';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 500);
        }, 3000);
    }
    
    showWhatsAppSharePrompt() {
        // Create modal overlay
        const overlay = document.createElement('div');
        overlay.className = 'share-modal-overlay';
        
        // Create modal content
        const modal = document.createElement('div');
        modal.className = 'share-modal';
        modal.innerHTML = `
            <div class="share-modal-icon">🎉</div>
            <h2 class="share-modal-title">4 Challenges Completed!</h2>
            <p class="share-modal-text">Share your achievements with the team!</p>
            <button class="btn-whatsapp" id="shareWhatsAppBtn">
                <span class="whatsapp-icon">📱</span>
                <span>Share on WhatsApp</span>
            </button>
            <button class="btn-close-modal" id="closeModalBtn">Maybe Later</button>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        // Trigger confetti
        if (confetti) {
            confetti.celebration();
        }
        
        // Animate in
        setTimeout(() => {
            overlay.classList.add('show');
        }, 10);
        
        // Add event listeners
        document.getElementById('shareWhatsAppBtn').addEventListener('click', () => {
            this.shareToWhatsApp();
            this.closeModal(overlay);
        });
        
        document.getElementById('closeModalBtn').addEventListener('click', () => {
            this.closeModal(overlay);
        });
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.closeModal(overlay);
            }
        });
    }
    
    shareToWhatsApp() {
        // Create message with completed challenges
        let message = `🍻 KonnektTalexio Pub Crawl 2025! 🍻\n\nI just completed ${this.challengeCount} challenges:\n\n`;
        
        // Add first 4 completed challenges
        const challengesToShare = this.completedChallenges.slice(0, 4);
        challengesToShare.forEach((challenge, index) => {
            message += `${index + 1}. ${challenge}\n`;
        });
        
        message += `\n🎉 Join us at ${this.getBarName(this.currentBar)}!\n#KTPubCrawl2025`;
        
        // Encode message for URL
        const encodedMessage = encodeURIComponent(message);
        
        // WhatsApp URL scheme
        const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
        
        // Open WhatsApp
        window.open(whatsappUrl, '_blank');
        
        // Haptic feedback
        if (window.navigator && window.navigator.vibrate) {
            window.navigator.vibrate(50);
        }
    }
    
    closeModal(overlay) {
        overlay.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(overlay);
        }, 300);
    }
    
    saveState() {
        const state = {
            challengeCount: this.challengeCount,
            currentBar: this.currentBar,
            activeChallengeShown: this.activeChallengeShown,
            completedChallenges: this.completedChallenges,
            hasShownSharePrompt: this.hasShownSharePrompt,
            timestamp: new Date().toISOString()
        };
        // Use both localStorage and sessionStorage for redundancy
        localStorage.setItem('pubCrawlState', JSON.stringify(state));
        sessionStorage.setItem('pubCrawlState', JSON.stringify(state));
    }
    
    loadState() {
        // Try sessionStorage first (for current session), then localStorage
        let saved = sessionStorage.getItem('pubCrawlState');
        if (!saved) {
            saved = localStorage.getItem('pubCrawlState');
        }
        
        if (saved) {
            const state = JSON.parse(saved);
            
            // Check if state is from today
            const savedDate = new Date(state.timestamp);
            const today = new Date();
            const isToday = savedDate.getDate() === today.getDate() &&
                          savedDate.getMonth() === today.getMonth() &&
                          savedDate.getFullYear() === today.getFullYear();
            
            if (isToday) {
                this.challengeCount = state.challengeCount || 0;
                this.currentBar = state.currentBar || 1;
                this.activeChallengeShown = state.activeChallengeShown || false;
                this.completedChallenges = state.completedChallenges || [];
                this.hasShownSharePrompt = state.hasShownSharePrompt || false;
                
                // Restore button state if challenge was active
                if (this.activeChallengeShown) {
                    this.actionButtons.classList.add('hidden');
                    this.challengeActions.classList.remove('hidden');
                }
            } else {
                // Reset if it's a new day
                localStorage.removeItem('pubCrawlState');
                sessionStorage.removeItem('pubCrawlState');
            }
        }
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new PubCrawlApp();
    
    // Add PWA install prompt handling
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
    });
    
    // Prevent pull-to-refresh on mobile
    document.body.addEventListener('touchmove', function(e) {
        if (e.target === document.body) {
            e.preventDefault();
        }
    }, { passive: false });
});
