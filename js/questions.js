// questions.js
const quizData = {
    levels: [
        {
            name: "Level 1: Trust Your Gut",
            points: 10,
            questions: [
                {
                    text: "You're designing a data table. Which is better?",
                    options: [
                        "Show all 100 columns by default",
                        "Show 10 most used columns with option to add more",
                    ],
                    correct: 1,
                    explanation: "Progressive disclosure helps reduce cognitive load while maintaining functionality."
                },
                {
                    text: "A user needs to delete their account. Better approach?",
                    options: [
                        "Three confirmation popups",
                        "One clear warning with consequences + 30-day recovery period",
                    ],
                    correct: 1,
                    explanation: "Single clear warning with recovery option balances security with user experience."
                },
                {
                    text: "System status indicator shows:",
                    options: [
                        "System Status: Error Code 5XX",
                        "Having trouble connecting to servers - we're fixing it! Check back in 5 mins",
                    ],
                    correct: 1,
                    explanation: "Human-readable messages with clear timeframes provide better user experience."
                },
                {
                    text: "Search results should show:",
                    options: [
                        "Most recent results first",
                        "Most relevant results first",
                    ],
                    correct: 1,
                    explanation: "Relevance typically matters more than recency for search functionality."
                },
                {
                    text: "Enterprise dashboard layout:",
                    options: [
                        "All metrics visible at once (requires scrolling)",
                        "Categorized metrics in expandable sections",
                    ],
                    correct: 1,
                    explanation: "Organized, categorized information helps users find what they need more efficiently."
                }
            ]
        },
        {
            name: "Level 2: More Gut Decisions",
            points: 15,
            questions: [
                {
                    text: "Form validation:",
                    options: [
                        "Show all errors after submit",
                        "Show errors as user types",
                    ],
                    correct: 1,
                    explanation: "Immediate feedback helps users correct errors as they go, reducing frustration."
                },
                {
                    text: "Feature updates:",
                    options: [
                        "What's New popup at every login",
                        "Subtle indicator with option to view changes",
                    ],
                    correct: 1,
                    explanation: "Non-intrusive notifications respect user focus while maintaining awareness."
                },
                {
                    text: "Data export options:",
                    options: [
                        "One 'Export' button with format selection in dropdown",
                        "Separate buttons for each export format",
                    ],
                    correct: 0,
                    explanation: "Consolidated actions reduce interface clutter and improve scalability."
                },
                {
                    text: "Task assignment:",
                    options: [
                        "Can assign multiple tasks at once without details",
                        "Must assign tasks one by one with required details",
                    ],
                    correct: 1,
                    explanation: "Detailed individual assignments reduce errors and improve task clarity."
                },
                {
                    text: "Filter interface:",
                    options: [
                        "All filter options visible at once",
                        "Most used filters visible, others in 'More Filters'",
                    ],
                    correct: 1,
                    explanation: "Progressive disclosure of filters balances power with simplicity."
                }
            ]
        },
        {
            name: "Level 3: Spot the Issue",
            points: 20,
            questions: [
                {
                    text: "A B2B platform's onboarding shows 15 tooltip popups in sequence. What's the problem?",
                    options: [
                        "Too many popups overwhelm users",
                        "Information overload reduces retention",
                        "Disrupts user's learning flow",
                        "Forces linear learning path"
                    ],
                    correct: 1,
                    explanation: "Users can't retain so much information at once; better to provide contextual help when needed."
                },
                {
                    text: "Every field in a form is marked with a red asterisk. What's the issue?",
                    options: [
                        "Too much red color",
                        "Visual meaning is lost",
                        "Causes user anxiety",
                        "Poor accessibility"
                    ],
                    correct: 1,
                    explanation: "When everything is required, the visual indicator loses its meaning and purpose."
                },
                {
                    text: "A dashboard auto-refreshes every 30 seconds, resetting scroll position. What's the problem?",
                    options: [
                        "Data might change too frequently",
                        "Disrupts user focus and reading",
                        "Wastes system resources",
                        "Could miss important updates"
                    ],
                    correct: 1,
                    explanation: "Resetting scroll position disrupts user focus and workflow."
                },
                {
                    text: "All notifications use the same bell icon. What's the issue?",
                    options: [
                        "No priority differentiation",
                        "Creates notification fatigue",
                        "Hard to scan quickly",
                        "Misses important alerts"
                    ],
                    correct: 0,
                    explanation: "Users can't quickly distinguish between critical and non-critical notifications."
                },
                {
                    text: "A 'Save' button is placed in different locations on different pages. What's the problem?",
                    options: [
                        "Inconsistent UI pattern",
                        "Breaks muscle memory",
                        "Increases cognitive load",
                        "Reduces efficiency"
                    ],
                    correct: 1,
                    explanation: "Inconsistent button placement prevents users from developing muscle memory."
                }
            ]
        },
        {
            name: "Level 4: More Issues",
            points: 25,
            questions: [
                {
                    text: "User settings are split between 'Preferences,' 'Settings,' and 'Configuration.' What's the issue?",
                    options: [
                        "Confusing navigation",
                        "Redundant categories",
                        "Poor information architecture",
                        "Cognitive overload"
                    ],
                    correct: 2,
                    explanation: "Poor information architecture creates confusion and makes settings hard to find."
                },
                {
                    text: "Every team member can see all data by default. What's the problem?",
                    options: [
                        "Privacy concerns",
                        "Security vulnerability",
                        "Information overload",
                        "Potential data misuse"
                    ],
                    correct: 1,
                    explanation: "Default access to all data creates security risks and violates least-privilege principle."
                },
                {
                    text: "The platform has 12 different ways to create a new project. What's the issue?",
                    options: [
                        "Feature bloat",
                        "Decision paralysis",
                        "Maintenance nightmare",
                        "User confusion"
                    ],
                    correct: 1,
                    explanation: "Too many options create decision paralysis and confusion rather than flexibility."
                },
                {
                    text: "Error messages show technical database codes. What's the problem?",
                    options: [
                        "Technical jargon",
                        "User confusion",
                        "Unhelpful feedback",
                        "Poor user experience"
                    ],
                    correct: 2,
                    explanation: "Technical error codes don't help users understand or resolve the issue."
                },
                {
                    text: "The UI uses 8 different blue shades for clickable items. What's the issue?",
                    options: [
                        "Visual inconsistency",
                        "Cognitive load",
                        "Poor accessibility",
                        "User confusion"
                    ],
                    correct: 0,
                    explanation: "Inconsistent visual indicators make it harder to identify interactive elements."
                }
            ]
        },
        {
            name: "Level 5: Problem Solving",
            points: 30,
            questions: [
                {
                    text: "Users keep accidentally deleting important files. What's your fix?",
                    options: [
                        "Add multiple confirmation dialogs",
                        "Implement 30-day soft delete with recovery option",
                        "Require admin approval for deletions",
                        "Hide delete option in submenu"
                    ],
                    correct: 1,
                    explanation: "Soft delete with recovery period provides safety net without adding friction."
                },
                {
                    text: "New users are overwhelmed by the complex interface. What's your solution?",
                    options: [
                        "Progressive feature disclosure",
                        "Extensive tutorial system",
                        "Simplified interface for everyone",
                        "Better documentation"
                    ],
                    correct: 0,
                    explanation: "Progressive disclosure allows users to learn and grow with the interface."
                },
                {
                    text: "Users can't find recently accessed items. What's your solution?",
                    options: [
                        "Add a 'Recent Items' section",
                        "Implement better search",
                        "Add more navigation options",
                        "Improve file organization"
                    ],
                    correct: 0,
                    explanation: "Recent items section provides quick access to frequently used content."
                },
                {
                    text: "Support gets flooded with 'where do I find X' tickets. What's your fix?",
                    options: [
                        "Improve navigation structure",
                        "Add better search functionality",
                        "Create more documentation",
                        "Implement contextual help"
                    ],
                    correct: 3,
                    explanation: "Contextual help provides assistance when and where users need it."
                },
                {
                    text: "Users complain about too many mandatory fields. What's your solution?",
                    options: [
                        "Reduce required fields to essential only",
                        "Split form into multiple steps",
                        "Add field requirements explanation",
                        "Make fields optional but highlighted"
                    ],
                    correct: 0,
                    explanation: "Only require truly essential information to reduce user friction."
                }
            ]
        }
    ]
};

export default quizData;
