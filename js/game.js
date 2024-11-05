// game.js
class QuizGame {
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
        this.timeLimit = 30; // seconds per question
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
    }

    renderQuestion() {
        const level = this.data.levels[this.currentLevel];
        const question = level.questions[this.currentQuestion];

        this.container.innerHTML = `
            <div class="slide active">
                <div class="level-indicator">${level.name}</div>
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

    startTimer() {
        if (this.timer) clearInterval(this.timer);
        
        const progressBar = document.querySelector('.timer-progress');
        let timeLeft = this.timeLimit;
        
        progressBar.style.width = '100%';
        
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

    selectOption(index) {
        const options = document.querySelectorAll('.option');
        const currentQuestion = this.data.levels[this.currentLevel].questions[this.currentQuestion];
        
        clearInterval(this.timer);
        
        options.forEach(option => option.classList.remove('selected'));
        options[index].classList.add('selected');
        
        if (index === currentQuestion.correct) {
            options[index].classList.add('correct');
            this.score += this.data.levels[this.currentLevel].points;
            this.showFeedback('Correct! ' + currentQuestion.explanation, true);
        } else {
            options[index].classList.add('incorrect');
            options[currentQuestion.correct].classList.add('correct');
            this.showFeedback('Incorrect. ' + currentQuestion.explanation, false);
        }
        
        setTimeout(() => this.nextQuestion(), 3000);
    }

    showFeedback(message, isCorrect) {
        const feedback = document.createElement('div');
        feedback.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;
        feedback.textContent = message;
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.remove();
        }, 3000);
