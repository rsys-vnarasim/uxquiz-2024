import { Confetti } from './confetti.js';

// game.js
export default class QuizGame {
    constructor(container, data) {
        this.container = container;
        this.data = data;
        this.currentLevel = 0;
        this.currentQuestion = 0;
        this.score = 0;
        this.lifelines = {
            fifty: true,
            skip: true,
            hint: true
        };
        this.timer = null;
        this.timeLimit = 30;
        this.confetti = new Confetti();
    }

    init() {
        this.renderWelcomeScreen();
    }

    renderWelcomeScreen() {
        this.container.innerHTML = `
            <div class="slide active">
                <h1 class="title">The Ultimate UX Challenge</h1>
                <h2 class="subtitle">"Who Wants to Be a UX Expert?"</h2>
                <button class="control-btn" onclick="game.startGame()">Start Game</button>
            </div>
        `;
    }

    startGame() {
        this.currentLevel = 0;
        this.currentQuestion = 0;
        this.score = 0;
        this.renderQuestion();
    }

    renderLifelines() {
        return `
            <div class="lifeline ${this.lifelines.fifty ? '' : 'used'}" 
                 onclick="${this.lifelines.fifty ? 'game.useFiftyFifty()' : ''}"
                 style="${this.lifelines.fifty ? '' : 'cursor: not-allowed;'}">
                50:50
            </div>
            <div class="lifeline ${this.lifelines.skip ? '' : 'used'}"
                 onclick="${this.lifelines.skip ? 'game.useSkip()' : ''}"
                 style="${this.lifelines.skip ? '' : 'cursor: not-allowed;'}">
                Skip
            </div>
            <div class="lifeline ${this.lifelines.hint ? '' : 'used'}"
                 onclick="${this.lifelines.hint ? 'game.useHint()' : ''}"
                 style="${this.lifelines.hint ? '' : 'cursor: not-allowed;'}">
                Hint
            </div>
        `;
    }

    renderPrizeLevels() {
        return this.data.levels.map((level, index) => `
            <div class="${index === this.currentLevel ? 'level-reached' : ''}">
                ${level.name}: ${level.points} Points
            </div>
        `).reverse().join('');
    }

    renderQuestion() {
        const currentLevelData = this.data.levels[this.currentLevel];
        
        if (this.currentQuestion >= currentLevelData.questions.length) {
            await this.celebrateLevel();
            this.currentLevel++;
            this.currentQuestion = 0;
            
            if (this.currentLevel >= this.data.levels.length) {
                this.endGame();
                return;
            }
        }
        
        // Check if game is complete
        if (this.currentLevel >= this.data.levels.length) {
            this.endGame();
            return;
        }

        // Check if level is complete
        const currentLevelData = this.data.levels[this.currentLevel];
        if (this.currentQuestion >= currentLevelData.questions.length) {
            this.currentLevel++;
            this.currentQuestion = 0;
            if (this.currentLevel >= this.data.levels.length) {
                this.endGame();
                return;
            }
        }

        const question = this.data.levels[this.currentLevel].questions[this.currentQuestion];

        this.container.innerHTML = `
            <div class="slide active">
                <div class="level-indicator">${this.data.levels[this.currentLevel].name}</div>
                <div class="score-board">Score: ${this.score}</div>
                
                <div class="question">${question.text}</div>
                
                <div class="timer-bar">
                    <div class="timer-progress" style="width: 100%"></div>
                </div>

                <div class="options">
                    ${question.options.map((option, index) => `
                        <div class="option" onclick="game.selectOption(${index})">${option}</div>
                    `).join('')}
                </div>

                <div class="lifelines">
                    ${this.renderLifelines()}
                </div>

                <div class="prize-levels">
                    ${this.renderPrizeLevels()}
                </div>
            </div>
        `;

        this.startTimer();
    }

    selectOption(index) {
        if (this.timer) {
            clearInterval(this.timer);
        }

        const options = document.querySelectorAll('.option');
        const currentQuestion = this.data.levels[this.currentLevel].questions[this.currentQuestion];

        // Disable all options
        options.forEach(option => {
            option.style.pointerEvents = 'none';
        });

        // Show selection
        options[index].classList.add('selected');

        setTimeout(() => {
            if (index === currentQuestion.correct) {
                options[index].classList.add('correct');
                this.score += this.data.levels[this.currentLevel].points;
                this.showFeedback('Correct! ' + currentQuestion.explanation, true);
            } else {
                options[index].classList.add('incorrect');
                options[currentQuestion.correct].classList.add('correct');
                this.showFeedback('Incorrect. ' + currentQuestion.explanation, false);
            }

            setTimeout(() => {
                this.currentQuestion++;
                this.renderQuestion();
            }, 2000);
        }, 500);
    }

    showFeedback(message, isCorrect) {
        const feedbackDiv = document.createElement('div');
        feedbackDiv.className = `feedback show ${isCorrect ? 'correct' : 'incorrect'}`;
        feedbackDiv.textContent = message;
        document.body.appendChild(feedbackDiv);

        setTimeout(() => {
            feedbackDiv.remove();
        }, 2000);
    }

    startTimer() {
        if (this.timer) {
            clearInterval(this.timer);
        }

        const progressBar = document.querySelector('.timer-progress');
        if (!progressBar) return;

        let timeLeft = this.timeLimit;
        
        this.timer = setInterval(() => {
            timeLeft--;
            const percentage = (timeLeft / this.timeLimit) * 100;
            progressBar.style.width = `${percentage}%`;

            if (timeLeft <= 0) {
                clearInterval(this.timer);
                this.timeUp();
            }
        }, 1000);
    }

    timeUp() {
        const currentQuestion = this.data.levels[this.currentLevel].questions[this.currentQuestion];
        this.showFeedback('Time\'s up! ' + currentQuestion.explanation, false);

        setTimeout(() => {
            this.currentQuestion++;
            this.renderQuestion();
        }, 2000);
    }

    useFiftyFifty() {
        if (!this.lifelines.fifty) return;

        const currentQuestion = this.data.levels[this.currentLevel].questions[this.currentQuestion];
        const options = document.querySelectorAll('.option');
        
        // Get indexes of wrong answers
        const wrongAnswers = Array.from(options)
            .map((_, index) => index)
            .filter(index => index !== currentQuestion.correct);
        
        // Randomly remove two wrong answers
        for (let i = 0; i < 2; i++) {
            const randomIndex = Math.floor(Math.random() * wrongAnswers.length);
            options[wrongAnswers[randomIndex]].style.visibility = 'hidden';
            wrongAnswers.splice(randomIndex, 1);
        }

        this.lifelines.fifty = false;
        this.renderLifelines();
    }

    useSkip() {
        if (!this.lifelines.skip) return;

        this.lifelines.skip = false;
        this.currentQuestion++;
        this.renderQuestion();
    }

    useHint() {
        if (!this.lifelines.hint) return;

        const currentQuestion = this.data.levels[this.currentLevel].questions[this.currentQuestion];
        this.showFeedback('Hint: Consider the user experience principles!', true);
        
        this.lifelines.hint = false;
        this.renderLifelines();
    }

    endGame() {
        this.container.innerHTML = `
            <div class="slide active">
                <h1 class="title">Game Complete!</h1>
                <h2 class="subtitle">Final Score: ${this.score}</h2>
                <div class="feedback">
                    ${this.getFinalFeedback()}
                </div>
                <button class="control-btn" onclick="location.reload()">Play Again</button>
            </div>
        `;
    }

    getFinalFeedback() {
        const maxScore = this.data.levels.reduce((sum, level) => 
            sum + (level.points * level.questions.length), 0);
        const percentage = (this.score / maxScore) * 100;

        if (percentage >= 90) return "UX Master! Exceptional understanding of user experience principles!";
        if (percentage >= 70) return "UX Professional! Great knowledge of UX concepts!";
        if (percentage >= 50) return "UX Enthusiast! Good foundation in UX principles!";
        return "UX Learner! Keep studying and practicing!";
    }

    async celebrateLevel() {
        const levelCompleteDiv = document.createElement('div');
        levelCompleteDiv.className = 'level-complete';
        levelCompleteDiv.innerHTML = `
            <h2>Level ${this.currentLevel + 1} Complete!</h2>
            <p>Moving to next level...</p>
        `;
        this.container.appendChild(levelCompleteDiv);

        // Trigger confetti
        this.confetti.celebrate();

        // Wait for animation
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        levelCompleteDiv.remove();
    }
}
