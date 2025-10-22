// Challenge database - all fun pub crawl prompts
const challenges = {
    easy: [
        { text: "Make a toast to the group.", icon: "🥂" },
        { text: "Start a group 'cheers' — the louder the better.", icon: "🍻" },
        { text: "Introduce yourself to someone you haven't spoken to tonight.", icon: "👋" },
        { text: "Organise a group selfie and post it in the work chat.", icon: "📸" },
        { text: "Find someone wearing the same colour as you and toast with them.", icon: "🎨" },
        { text: "High-five five different people in one minute.", icon: "✋" },
        { text: "Toast with someone outside your usual circle.", icon: "🤝" },
        { text: "Clink glasses with at least five people.", icon: "🥃" },
        { text: "Toast with someone holding the same drink as you.", icon: "🍺" },
    ],
    medium: [
        { text: "Chug your next drink.", icon: "🍺" },
        { text: "Get someone to join you for a quick shot.", icon: "🥃" },
        { text: "Arm wrestle someone for no reason.", icon: "💪" },
        { text: "Get someone to match your drink and toast with you.", icon: "🍻" },
        { text: "Get someone to pick your next drink — no take-backs.", icon: "🎲" },
        { text: "Down a half pint (or your current drink) in one go.", icon: "🍻" },
        { text: "Order something you've never had before.", icon: "🍹" },
        { text: "Finish your drink using your non-dominant hand.", icon: "✋" },
        { text: "Let someone else order your next drink.", icon: "🎯" },
        { text: "Pick someone else's drink for them — they must accept!", icon: "👆" },
        { text: "Finish your drink while making eye contact with someone the whole time.", icon: "👁️" },
        { text: "Convince someone to swap drinks with you.", icon: "🔄" },
    ],
    hard: [
        { text: "Do a Baby Guinness with someone you've just met.", icon: "🍷" },
        { text: "Order two Baby Guinnesses. Give one away.", icon: "🎁" },
        { text: "Pretend it's your birthday tomorrow and see how long it takes for someone to believe you.", icon: "🎂" },
        { text: "Ask the bartender for their favourite drink and order it.", icon: "🍸" },
        { text: "Take a selfie with someone here and share it on the work chat (#annualpubcrawl).", icon: "📱" },
    ]
};

// Get a random challenge from a specific difficulty
function getRandomChallenge(difficulty = null) {
    let difficultyLevel = difficulty;
    
    // If no difficulty specified, randomly choose one with weighted probability
    if (!difficultyLevel) {
        const random = Math.random();
        if (random < 0.5) {
            difficultyLevel = 'easy';
        } else if (random < 0.85) {
            difficultyLevel = 'medium';
        } else {
            difficultyLevel = 'hard';
        }
    }
    
    const challengeArray = challenges[difficultyLevel];
    const randomIndex = Math.floor(Math.random() * challengeArray.length);
    const challenge = challengeArray[randomIndex];
    
    return {
        ...challenge,
        difficulty: difficultyLevel
    };
}

// Get all challenges count
function getTotalChallengesCount() {
    return challenges.easy.length + challenges.medium.length + challenges.hard.length;
}

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { getRandomChallenge, getTotalChallengesCount, challenges };
}
