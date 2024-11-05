// questions.js
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
                    explanation: "Progressive disclosure helps manage complexity. Starting with most used columns reduces cognitive load while maintaining functionality."
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
                },
                {
                    text: "Best practice for form validation:",
                    options: [
                        "Validate all fields on submit",
                        "Validate each field as user types",
                        "Validate after field loses focus",
                        "Validate on page load"
                    ],
                    correct: 2,
                    explanation: "Real-time validation provides immediate feedback and prevents errors before submission."
                }
            ]
        },
        {
            name: "Level 2: User Psychology",
            points: 25,
            questions: [
                {
                    text: "All notifications use red icons. What's the biggest issue?",
                    options: [
                        "Red is too aggressive",
                        "Creates alert fatigue",
                        "Not accessible",
                        "Too much contrast"
                    ],
                    correct: 1,
                    explanation: "When everything is urgent, nothing is urgent. Alert fatigue leads to important notifications being missed."
                },
                {
                    text: "Users report losing work often. Best solution?",
                    options: [
                        "Add more save buttons",
                        "Auto-save with status indicator",
                        "Confirmation dialogs",
                        "Regular reminders to save"
                    ],
                    correct: 1,
                    explanation: "Auto-save with clear status removes user anxiety and prevents data loss without adding friction."
                }
            ]
        },
        {
            name: "Level 3: Critical Thinking",
            points: 50,
            questions: [
                {
                    text: "Dashboard analytics show 80% of users never scroll. Why?",
                    options: [
                        "Content is too long",
                        "Users are lazy",
                        "Important info isn't visible",
                        "Scrolling is broken"
                    ],
                    correct: 2,
                    explanation: "Key information should be immediately visible. Users make quick decisions about content relevance."
                },
                {
                    text: "Which is worse for enterprise software?",
                    options: [
                        "Complex UI with many features",
                        "Simple UI with limited features",
                        "Inconsistent UI with medium features",
                        "Basic UI with core features"
                    ],
                    correct: 2,
                    explanation: "Inconsistency creates cognitive load and makes the system unpredictable, harder to learn than complexity."
                }
            ]
        },
        {
            name: "Level 4: Advanced UX",
            points: 100,
            questions: [
                {
                    text: "Data shows: High task completion but low satisfaction. What's happening?",
                    options: [
                        "Users are complaining too much",
                        "Tasks are too simple",
                        "Process is inefficient but functional",
                        "Metrics are wrong"
                    ],
                    correct: 2,
                    explanation: "Users can complete tasks but the process is frustrating. Success metrics need to include efficiency and satisfaction."
                },
                {
                    text: "Best approach for power users vs new users?",
                    options: [
                        "Separate interfaces for each",
                        "Progressive complexity with shortcuts",
                        "Focus on power users only",
                        "Focus on new users only"
                    ],
                    correct: 1,
                    explanation: "Progressive complexity allows users to grow while maintaining efficiency for power users."
                }
            ]
        },
        {
            name: "Level 5: UX Strategy",
            points: 150,
            questions: [
                {
                    text: "Product has 100 features, 20% used regularly. Best strategy?",
                    options: [
                        "Remove unused features",
                        "Promote unused features",
                        "Reorganize based on usage patterns",
                        "Add more features"
                    ],
                    correct: 2,
                    explanation: "Focus on user patterns and organize interface accordingly while maintaining functionality for edge cases."
                },
                {
                    text: "Users need complex features but simple interface. Solution?",
                    options: [
                        "Reduce feature set",
                        "Progressive disclosure with good information architecture",
                        "Multiple interfaces",
                        "Extensive documentation"
                    ],
                    correct: 1,
                    explanation: "Progressive disclosure with clear organization allows complexity while maintaining usability."
                }
            ]
        }
    ]
};

export default quizData;
