// quiz-protection.js
export class QuizProtection {
    constructor() {
        this.currentLevel = 0;
        this.currentQuestion = 0;
        this.answeredQuestions = new Set();
        this.sessionKey = this.generateSessionKey();
    }

    generateSessionKey() {
        return CryptoJS.lib.WordArray.random(128/8).toString();
    }

    decryptQuestion(encryptedQuestion) {
        try {
            const bytes = CryptoJS.AES.decrypt(encryptedQuestion, this.sessionKey);
            return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        } catch (error) {
            console.error('Failed to decrypt question');
            return null;
        }
    }

    getCurrentQuestion() {
        const level = window.protectedQuizData.levels[this.currentLevel];
        if (!level) return null;

        const encryptedQuestion = level.questions[this.currentQuestion];
        if (!encryptedQuestion) return null;

        const questionId = `${this.currentLevel}-${this.currentQuestion}`;
        if (this.answeredQuestions.has(questionId)) return null;

        const decryptedQuestion = this.decryptQuestion(encryptedQuestion);
        if (!decryptedQuestion) return null;

        return {
            id: questionId,
            text: decryptedQuestion.text,
            options: decryptedQuestion.options,
            level: level.name,
            points: level.points
        };
    }

    verifyAnswer(questionId, selectedAnswer) {
        if (this.answeredQuestions.has(questionId)) {
            return { correct: false, explanation: "Question already answered" };
        }

        const [levelIdx, questionIdx] = questionId.split('-').map(Number);
        const encryptedQuestion = window.protectedQuizData.levels[levelIdx]?.questions[questionIdx];
        if (!encryptedQuestion) return { correct: false, explanation: "Invalid question" };

        const question = this.decryptQuestion(encryptedQuestion);
        if (!question) return { correct: false, explanation: "Invalid question" };

        this.answeredQuestions.add(questionId);

        return {
            correct: selectedAnswer === question.correct,
            explanation: question.explanation,
            points: window.protectedQuizData.levels[levelIdx].points
        };
    }

    nextQuestion() {
        const currentLevel = window.protectedQuizData.levels[this.currentLevel];
        if (!currentLevel) return false;

        if (this.currentQuestion + 1 < currentLevel.questions.length) {
            this.currentQuestion++;
            return true;
        } else if (this.currentLevel + 1 < window.protectedQuizData.levels.length) {
            this.currentLevel++;
            this.currentQuestion = 0;
            return true;
        }
        return false;
    }

    getLevelsProgress() {
        return window.protectedQuizData.levels.map((level, index) => ({
            name: level.name,
            points: level.points,
            isCurrentLevel: index === this.currentLevel
        }));
    }
}
