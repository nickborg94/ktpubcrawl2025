# KonnektTalexio Pub Crawl 2025 🍻

A fun, interactive mobile web app for the KonnektTalexio pub crawl featuring random challenges and tasks to enhance the social experience.

## Features

- 🎯 **Random Challenges**: 45+ unique challenges across 3 difficulty levels (Easy, Medium, Hard)
- 📊 **Progress Tracking**: Track challenges completed and bars visited
- 🎨 **Mobile-First Design**: Optimized exclusively for mobile browsers
- 🎉 **Confetti Celebrations**: Visual celebrations for completing challenges
- 💾 **Progress Persistence**: Your progress is saved locally throughout the night
- 🎨 **Brand Colors**: Uses KonnektTalexio's brand palette (#2C0603 primary, #EFEBE2 secondary)

## How to Use

1. Scan the QR code on your business card
2. Tap "Get Challenge" to receive a random task
3. Complete the challenge (they're all optional and just for fun!)
4. Track your progress through the 4 bars
5. Have fun and stay safe! 🎊

## Deployment to GitHub Pages

1. Push this repository to GitHub
2. Go to Settings → Pages
3. Select the `main` branch as the source
4. Your site will be live at: `https://nickborg94.github.io/ktpubcrawl2025/`

## Files Structure

```
ktpubcrawl2025/
├── index.html          # Main HTML structure
├── style.css           # All styling and animations
├── app.js             # Main application logic
├── challenges.js      # Challenge database
├── confetti.js        # Confetti animation effects
└── README.md          # This file
```

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern animations, gradients, and responsive design
- **Vanilla JavaScript**: No dependencies, pure JS for maximum performance
- **LocalStorage API**: Progress persistence
- **Canvas API**: Confetti animations

## Browser Support

Optimized for modern mobile browsers:

- iOS Safari (12+)
- Chrome Mobile
- Firefox Mobile
- Samsung Internet

## Customization

### Adding New Challenges

Edit `challenges.js` and add entries to the appropriate difficulty array:

```javascript
easy: [{ text: "Your challenge text", icon: "🎉" }];
```

### Changing Colors

Edit CSS variables in `style.css`:

```css
:root {
  --primary-color: #2c0603;
  --secondary-color: #efebe2;
}
```

### Adjusting Bar Count

Modify the `maxBars` value in `app.js`:

```javascript
this.maxBars = 4;
```

## License

Created for KonnektTalexio internal use. Have fun! 🎉

---

**Remember**: All challenges are optional and just for fun. Drink responsibly and stay safe!
