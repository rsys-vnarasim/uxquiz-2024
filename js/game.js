// game.js
import { protectedQuizData, decryptQuestion, verifyAnswer } from './protected-data.js';
import { Confetti } from './confetti.js';

export default class QuizGame {
    
    constructor(container) {
        this.container = container;
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
        this.answeredQuestions = new Set();
    }

    init() {
        this.renderWelcomeScreen();
    }
    
    renderWelcomeScreen() {
        this.container.innerHTML = `
            <div class="slide active">
                <h1 class="title">The Ultimate UX Challenge</h1>
                <h2 class="subtitle">"Who Wants to Be a UX Expert?"</h2>
                <button class="control-btn" id="start-game-btn">Start Game</button>
            </div>
        `;
        
        // Add event listener with proper binding
        document.getElementById('start-game-btn').addEventListener('click', () => {
            this.startGame();
        });
    }

    renderError() {
        this.container.innerHTML = `
            <div class="slide active">
                <h1 class="title">Oops!</h1>
                <h2 class="subtitle">Something went wrong loading the quiz.</h2>
                <button class="control-btn" onclick="location.reload()">Try Again</button>
            </div>
        `;
    }

    startGame() {
        this.currentLevel = 0;
        this.currentQuestion = 0;
        this.score = 0;
        this.answeredQuestions.clear();
        this.lifelines = {
            fifty: true,
            skip: true,
            hint: true
        };
        this.renderQuestion();
    }
    
    renderLifelines() {
        return `
            <div class="lifeline ${this.lifelines.fifty ? '' : 'used'}" 
                 data-lifeline="fifty"
                 style="${this.lifelines.fifty ? '' : 'cursor: not-allowed;'}">
                50:50
            </div>
            <div class="lifeline ${this.lifelines.skip ? '' : 'used'}"
                 data-lifeline="skip"
                 style="${this.lifelines.skip ? '' : 'cursor: not-allowed;'}">
                Skip
            </div>
            <div class="lifeline ${this.lifelines.hint ? '' : 'used'}"
                 data-lifeline="hint"
                 style="${this.lifelines.hint ? '' : 'cursor: not-allowed;'}">
                Hint
            </div>
        `;
    }

    renderPrizeLevels() {
        return protectedQuizData.levels.map((level, index) => `
            <div class="${index === this.currentLevel ? 'level-reached' : ''}">
                ${level.name}: ${level.points} Points
            </div>
        `).reverse().join('');
    }
    
    async renderQuestion() {
        try {
            // First check if game is complete
            if (this.currentLevel >= protectedQuizData.levels.length) {
                this.endGame();
                return;
            }
    
            let currentLevelData = protectedQuizData.levels[this.currentLevel];
            
            // Check if we need to move to next level
            if (this.currentQuestion >= currentLevelData.questions.length) {
                await this.celebrateLevel();
                this.currentLevel++;
                this.currentQuestion = 0;
                
                // Check if game is complete after level increment
                if (this.currentLevel >= protectedQuizData.levels.length) {
                    this.endGame();
                    return;
                }
                
                currentLevelData = protectedQuizData.levels[this.currentLevel];
            }
    
            const questionId = `${this.currentLevel}-${this.currentQuestion}`;
            const encryptedQuestion = currentLevelData.questions[this.currentQuestion];
            const question = decryptQuestion(encryptedQuestion);

            if (!question) {
                console.error('Failed to decrypt question');
                this.endGame();
                return;
            }
    
            this.container.innerHTML = `
                <div class="slide active">
                    <div class="level-indicator">${currentLevelData.name}</div>
                    <div class="score-board">Score: ${this.score}</div>
                    
                    <div class="question">${question.text}</div>
                    
                    <div class="timer-bar">
                        <div class="timer-progress" style="width: 100%"></div>
                    </div>
    
                    <div class="options">
                        ${question.options.map((option, index) => `
                            <div class="option" data-index="${index}">${option}</div>
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
    
            this.addEventListeners(questionId);
            this.startTimer();
        } catch (error) {
            console.error('Error rendering question:', error);
            this.endGame();
        }
    }

    addEventListeners(questionId) {
        // Add option click listeners
        const options = this.container.querySelectorAll('.option');
        options.forEach(option => {
            option.addEventListener('click', () => {
                const index = parseInt(option.dataset.index);
                this.selectOption(questionId, index);
            });
        });

        // Add lifeline click listeners
        const lifelines = this.container.querySelectorAll('.lifeline');
        lifelines.forEach(lifeline => {
            lifeline.addEventListener('click', () => {
                const type = lifeline.dataset.lifeline;
                if (this.lifelines[type]) {
                    switch(type) {
                        case 'fifty':
                            this.useFiftyFifty();
                            break;
                        case 'skip':
                            this.useSkip();
                            break;
                        case 'hint':
                            this.useHint();
                            break;
                    }
                }
            });
        });
    }
    
    selectOption(questionId, index) {
        if (this.timer) {
            clearInterval(this.timer);
        }

        if (this.answeredQuestions.has(questionId)) return;

        const options = document.querySelectorAll('.option');
        const [levelIdx, questionIdx] = questionId.split('-').map(Number);
        const encryptedQuestion = protectedQuizData.levels[levelIdx].questions[questionIdx];

        // Disable all options
        options.forEach(option => {
            option.style.pointerEvents = 'none';
        });

        // Show selection
        options[index].classList.add('selected');

        const result = verifyAnswer(encryptedQuestion, index);
        this.answeredQuestions.add(questionId);

        setTimeout(() => {
            if (result.correct) {
                options[index].classList.add('correct');
                this.score += protectedQuizData.levels[levelIdx].points;
                this.showFeedback('Correct! ' + result.explanation, true);
            } else {
                options[index].classList.add('incorrect');
                const question = decryptQuestion(encryptedQuestion);
                if (question) {
                    options[question.correct].classList.add('correct');
                }
                this.showFeedback('Incorrect. ' + result.explanation, false);
            }

            setTimeout(() => {
                this.currentQuestion++;
                this.renderQuestion();
            }, 2000);
        }, 500);
    }

    nextQuestion() {
        if (this.currentQuestion + 1 < protectedQuizData.levels[this.currentLevel].questions.length) {
            this.currentQuestion++;
        } else if (this.currentLevel + 1 < protectedQuizData.levels.length) {
            this.currentLevel++;
            this.currentQuestion = 0;
        } else {
            this.endGame();
            return;
        }
        this.renderQuestion();
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
        this.showFeedback('Time\'s up!', false);
        setTimeout(() => {
            this.nextQuestion();
        }, 2000);
    }

    async celebrateLevel() {
        this.confetti.celebrate();
        const levelCompleteDiv = document.createElement('div');
        levelCompleteDiv.className = 'level-complete';
        levelCompleteDiv.innerHTML = `
            <h2>Level ${this.currentLevel + 1} Complete!</h2>
            <p>Moving to next level...</p>
        `;
        this.container.appendChild(levelCompleteDiv);
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        levelCompleteDiv.remove();
    }

    endGame() {
        const maxScore = protectedQuizData.levels.reduce((sum, level) => 
            sum + (level.points * level.questions.length), 0);
        const percentage = (this.score / maxScore) * 100;

        let feedback;
        if (percentage >= 90) feedback = "UX Master! Exceptional understanding of user experience principles!";
        else if (percentage >= 70) feedback = "UX Professional! Great knowledge of UX concepts!";
        else if (percentage >= 50) feedback = "UX Enthusiast! Good foundation in UX principles!";
        else feedback = "UX Learner! Keep studying and practicing!";

        this.container.innerHTML = `
            <div class="slide active">
                <h1 class="title">Game Complete!</h1>
                <h2 class="subtitle">Final Score: ${this.score}</h2>
                <div class="feedback">
                    ${feedback}
                </div>
                <button class="control-btn" onclick="location.reload()">Play Again</button>
            </div>
        `;
    }

    // Lifeline methods
    useFiftyFifty() {
        if (!this.lifelines.fifty) return;

        const question = decryptQuestion(
            protectedQuizData.levels[this.currentLevel].questions[this.currentQuestion]
        );
        if (!question) return;

        const options = document.querySelectorAll('.option');
        const wrongAnswers = Array.from(options)
            .map((_, index) => index)
            .filter(index => index !== question.correct);
        
        // Randomly remove two wrong answers
        for (let i = 0; i < 2; i++) {
            const randomIndex = Math.floor(Math.random() * wrongAnswers.length);
            options[wrongAnswers[randomIndex]].style.visibility = 'hidden';
            wrongAnswers.splice(randomIndex, 1);
        }

        this.lifelines.fifty = false;
        document.querySelector('.lifelines').innerHTML = this.renderLifelines();
    }

    useSkip() {
        if (!this.lifelines.skip) return;
        this.lifelines.skip = false;
        document.querySelector('.lifelines').innerHTML = this.renderLifelines();
        this.nextQuestion();
    }

    useHint() {
        if (!this.lifelines.hint) return;
        this.showFeedback('Consider the user experience principles!', true);
        this.lifelines.hint = false;
        document.querySelector('.lifelines').innerHTML = this.renderLifelines();
    }
}
