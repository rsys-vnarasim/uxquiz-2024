# UX Quiz Game

An interactive quiz game focused on User Experience (UX) principles and best practices. Perfect for team training, workshops, or self-learning.

## Features

- 5 difficulty levels
- 25+ UX-focused questions
- Interactive UI with animations
- Score tracking
- Lifelines system
- Timer for each question
- Responsive design
- Detailed explanations for answers

## Quick Start

### Option 1: GitHub Pages (Recommended)

1. Fork this repository
2. Go to repository Settings > Pages
3. Enable GitHub Pages from the main branch
4. Your site will be live at `https://yourusername.github.io/ux-quiz-game`

### Option 2: Local Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ux-quiz-game.git
```

2. Navigate to the project directory:
```bash
cd ux-quiz-game
```

3. Open `index.html` in your browser or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve
```

### Option 3: Netlify Drop

1. Go to [Netlify Drop](https://app.netlify.com/drop)
2. Drag and drop the entire folder
3. Your site will be live instantly

## File Structure

```
quiz-game/
├── index.html          # Main HTML file
├── css/
│   └── style.css      # Styles
├── js/
│   ├── questions.js   # Question database
│   └── game.js        # Game logic
└── README.md          # This file
```

## Customizing Questions

Edit `js/questions.js` to modify or add questions. Each question follows this format:

```javascript
{
    text: "Question text",
    options: [
        "Option 1",
        "Option 2",
        "Option 3",
        "Option 4"
    ],
    correct: 2,  // Index of correct answer (0-based)
    explanation: "Explanation of the correct answer"
}
```

## Game Mechanics

### Scoring
- Level 1: 10 points per question
- Level 2: 25 points per question
- Level 3: 50 points per question
- Level 4: 100 points per question
- Level 5: 150 points per question

### Lifelines
- 50:50: Removes two incorrect options
- Skip: Skip current question
- Hint: Shows a hint for current question

### Timer
- 30 seconds per question
- Timer bar shows remaining time
- Question auto-submits when time runs out

## Mobile Support

The game is fully responsive and works on:
- Desktop browsers
- Tablets
- Mobile phones

## Browser Support

Tested and working on:
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Customization

### Changing Colors

Edit `css/style.css` to modify the color scheme:

```css
/* Main background gradient */
.slide {
    background: linear-gradient(135deg, #1a1a2e, #16213e);
}

/* Correct answer color */
.option.correct {
    background: rgba(76, 175, 80, 0.5);
}

/* Incorrect answer color */
.option.incorrect {
    background: rgba(244, 67, 54, 0.5);
}
```

### Adjusting Timing

Edit `js/game.js` to modify timings:

```javascript
this.timeLimit = 30; // Seconds per question
```

## Running Workshops

### Recommended Setup
1. Use a main display for the quiz
2. Have participants use their phones/devices to submit answers
3. Encourage discussion after each question
4. Use the explanations as teaching moments

### Workshop Formats
1. **Individual Play**: Each person plays independently
2. **Team Competition**: Split into teams, track team scores
3. **Learning Session**: Go through questions as a group, discuss each answer

## Contributing

Feel free to submit issues and enhancement requests!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see below for details:

```
MIT License

Copyright (c) 2024 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Support

For support, please open an issue in the GitHub repository or contact [your-email@example.com]

## Acknowledgments

- Questions curated from real-world UX principles and best practices
- Inspired by "Who Wants to Be a Millionaire" game format
- Built with vanilla JavaScript for maximum compatibility
