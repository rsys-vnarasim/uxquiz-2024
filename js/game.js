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
        this.renderQuestion();
        this.startTimer();
    }

    renderQuestion() {
        if (this.currentLevel >= this.data.levels.length) {
            this.endGame();
            return;
        }

        const level = this.data.levels[this.currentLevel];
        if (this.currentQuestion >= level.questions.length) {
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
    }

    renderLifelines() {
        return `
            ${this.lifelines.fifty ? 
                `<div class="lifeline" onclick="game.useFiftyFifty()">50:50</div>` : 
                `<div class="lifeline used">50:50</div>`}
            ${this.lifelines.skip ? 
                `<div class="lifeline" onclick="game.useSkip()">Skip</div>` : 
                `<div class="lifeline used">Skip</div>`}
            ${this.lifelines.hint ? 
                `<div class="lifeline" onclick="game.useHint()">Hint</div>` : 
                `<div class="lifeline used">Hint</div>`}
        `;
    }

    renderPrizeLevels() {
        return this.data.levels.map((level, index) => `
            <div class="${index === this.currentLevel ? 'level-reached' : ''}">
                Level ${index + 1}: ${level.points} Points
            </div>
        `).reverse().join('');
    }

    selectOption(index) {
        clearInterval(this.timer);
        const options = document.querySelectorAll('.option');
        const currentQuestion = this.data.levels[this.currentLevel].questions[this.currentQuestion];
        
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
                this.startTimer();
            }, 3000);
        }, 500);
    }

    showFeedback(message, isCorrect) {
        const feedback = document.getElementById('feedback');
        feedback.textContent = message;
        feedback.className = `feedback show ${isCorrect ? 'correct' : 'incorrect'}`;
        
        setTimeout(() => {
            feedback.className = 'feedback';
        }, 3000);
    }

    startTimer() {
        if (this.timer) clearInterval(this.timer);
        
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
            this.startTimer();
        }, 3000);
    }

    useFiftyFifty() {
        if (!this.lifelines.fifty) return;
        
        const currentQuestion = this.data.levels[this.currentLevel].questions[this.currentQuestion];
        const options = document.querySelectorAll('.option');
        const incorrectIndexes = [...Array(options.length).keys()]
            .filter(i => i !== currentQuestion.correct)
            .sort(() => Math.random() - 0.5)
            .slice(0, 2);
        
        incorrectIndexes.forEach(index => {
            options[index].style.visibility = 'hidden';
        });
        
        this.lifelines.fifty = false;
        this.renderLifelines();
    }

    useSkip() {
        if (!this.lifelines.skip) return;
        
        this.lifelines.skip = false;
        this.currentQuestion++;
        this.renderQuestion();
        this.startTimer();
    }

    useHint() {
        if (!this.lifelines.hint) return;
        
        const currentQuestion = this.data.levels[this.currentLevel].questions[this.currentQuestion];
        this.showFeedback('Hint: ' + currentQuestion.explanation, true);
        
        this.lifelines.hint = false;
        this.renderLifelines();
    }

    endGame() {
        this.container.innerHTML = `
            <div class="slide active">
                <h1 class="title">Game Complete!</h1>
                <h2 class="subtitle">Final Score: ${this.score}</h2>
                <button class="control-btn" onclick="location.reload()">Play Again</button>
            </div>
        `;
    }
}
