const quizData = {
    levels: [
        {
            name: "Level 1: UX Basics",
            points: 10,
            questions: [
                {
                    text: "You're designing a data table with 100 columns. Choose the best approach:",
                    options: [
                        "Show all columns by default",
                        "Show 10 most used columns with 'Add Columns' option",
                        "Show 50 columns with horizontal scroll",
                        "Let users pick columns during first use"
                    ],
                    correct: 1,
                    explanation: "Progressive disclosure helps manage complexity while maintaining access to all data."
                },
                {
                    text: "Which system status message is most effective?",
                    options: [
                        "Error 5XX detected in system",
                        "System currently experiencing issues",
                        "We're fixing a server issue - check back in 5 mins",
                        "Technical difficulties encountered"
                    ],
                    correct: 2,
                    explanation: "Clear, human language with specific timing sets proper expectations."
                }
            ]
        }
        // Add more levels and questions as needed
    ]
};

export default quizData;
