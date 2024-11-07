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
                        "Show all 100 columns by default for complete visibility",
                        "Show 10 most used columns with option to add more",
                        "Display random 25 columns that rotate periodically",
                        "Let users manually select columns every time"
                    ],
                    correct: 1,
                    explanation: "Progressive disclosure helps reduce cognitive load while maintaining functionality."
                },
                {
                    text: "A user needs to delete their account. Better approach?",
                    options: [
                        "Multiple confirmation popups for security",
                        "One clear warning with consequences + 30-day recovery period",
                        "Immediate deletion without warning",
                        "Require admin approval for deletion"
                    ],
                    correct: 1,
                    explanation: "Single clear warning with recovery option balances security with user experience."
                },
                {
                    text: "System status indicator shows:",
                    options: [
                        "System Status: Error Code 5XX",
                        "Having trouble connecting to servers - we're fixing it! Check back in 5 mins",
                        "System currently experiencing technical difficulties",
                        "Error detected - contact system administrator"
                    ],
                    correct: 1,
                    explanation: "Human-readable messages with clear timeframes provide better user experience."
                },
                {
                    text: "Search results should show:",
                    options: [
                        "Most recent results first",
                        "Most relevant results first",
                        "Alphabetically ordered results",
                        "Random order to avoid bias"
                    ],
                    correct: 1,
                    explanation: "Relevance typically matters more than recency for search functionality."
                },
                {
                    text: "Enterprise dashboard layout:",
                    options: [
                        "All metrics visible at once (requires scrolling)",
                        "Categorized metrics in expandable sections",
                        "Rotating dashboard showing different metrics",
                        "Single metric at a time with navigation"
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
                        "Show errors on field focus",
                        "Show errors on page load"
                    ],
                    correct: 1,
                    explanation: "Immediate feedback helps users correct errors as they go, reducing frustration."
                },
                {
                    text: "Feature updates:",
                    options: [
                        "What's New popup at every login",
                        "Subtle indicator with option to view changes",
                        "Email notifications for all updates",
                        "Force users to view updates before continuing"
                    ],
                    correct: 1,
                    explanation: "Non-intrusive notifications respect user focus while maintaining awareness."
                },
                {
                    text: "Data export options:",
                    options: [
                        "One 'Export' button with format selection in dropdown",
                        "Separate buttons for each export format",
                        "Export options in a separate page",
                        "Export options in context menu only"
                    ],
                    correct: 0,
                    explanation: "Consolidated actions reduce interface clutter and improve scalability."
                },
                {
                    text: "Task assignment:",
                    options: [
                        "Bulk assign without details",
                        "One-by-one assignment with required details",
                        "Template-based bulk assignment",
                        "Automated assignment based on rules"
                    ],
                    correct: 1,
                    explanation: "Detailed individual assignments reduce errors and improve task clarity."
                },
                {
                    text: "Filter interface:",
                    options: [
                        "All filters visible at once",
                        "Most used filters visible, others in 'More Filters'",
                        "Search-based filter discovery",
                        "AI-powered automatic filtering"
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
                    text: "What's wrong with showing 15 tooltip popups in sequence during onboarding?",
                    options: [
                        "Takes too much time",
                        "Information overload reduces retention",
                        "Some users might skip it",
                        "Too few tooltips for complete guidance"
                    ],
                    correct: 1,
                    explanation: "Users can't retain so much information at once; better to provide contextual help when needed."
                },
                {
                    text: "What's wrong with marking every form field with a red asterisk?",
                    options: [
                        "Not colorblind friendly",
                        "Visual meaning is lost when everything is required",
                        "Red is too aggressive",
                        "Asterisks are hard to see"
                    ],
                    correct: 1,
                    explanation: "When everything is marked as required, the visual indicator loses its meaning and purpose."
                },
                {
                    text: "A dashboard auto-refreshes every 30 seconds, resetting scroll position. Problem?",
                    options: [
                        "Too frequent updates",
                        "Disrupts user focus and reading",
                        "High server load",
                        "Data might be inaccurate"
                    ],
                    correct: 1,
                    explanation: "Resetting scroll position disrupts user focus and workflow."
                },
                {
                    text: "All notifications use the same bell icon. Issue?",
                    options: [
                        "Lack of priority differentiation",
                        "Icon choice is too generic",
                        "Notifications might be missed",
                        "Too many notifications"
                    ],
                    correct: 0,
                    explanation: "Users can't quickly distinguish between critical and non-critical notifications."
                },
                {
                    text: "The 'Save' button location changes on different pages. Problem?",
                    options: [
                        "Inconsistent visual design",
                        "Breaks user muscle memory",
                        "Takes up extra space",
                        "Might be overlooked"
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
                    text: "Settings are split between 'Preferences,' 'Settings,' and 'Configuration.' Issue?",
                    options: [
                        "Too many options",
                        "Confusing terminology",
                        "Poor information architecture",
                        "Settings might conflict"
                    ],
                    correct: 2,
                    explanation: "Poor information architecture creates confusion and makes settings hard to find."
                },
                {
                    text: "Every team member can see all data by default. Problem?",
                    options: [
                        "Information overload",
                        "Security vulnerability",
                        "Slow system performance",
                        "Difficult to manage"
                    ],
                    correct: 1,
                    explanation: "Default access to all data creates security risks and violates least-privilege principle."
                },
                {
                    text: "12 different ways to create a new project. Issue?",
                    options: [
                        "Too many features to maintain",
                        "Creates decision paralysis",
                        "Inconsistent project creation",
                        "Training difficulty"
                    ],
                    correct: 1,
                    explanation: "Too many options create decision paralysis and confusion rather than flexibility."
                },
                {
                    text: "Error messages show technical database codes. Problem?",
                    options: [
                        "Security risk",
                        "Developer-centric approach",
                        "Unhelpful for users",
                        "Localization issues"
                    ],
                    correct: 2,
                    explanation: "Technical error codes don't help users understand or resolve the issue."
                },
                {
                    text: "8 different blue shades for clickable items. Issue?",
                    options: [
                        "Inconsistent visual cues",
                        "Color management complexity",
                        "Accessibility concerns",
                        "Design system violations"
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
                    text: "Users accidentally delete important files. Your fix?",
                    options: [
                        "Add confirmation dialogs",
                        "Implement 30-day soft delete with recovery",
                        "Require manager approval",
                        "Remove delete option"
                    ],
                    correct: 1,
                    explanation: "Soft delete with recovery period provides safety net without adding friction."
                },
                {
                    text: "Users are overwhelmed by the complex interface. Solution?",
                    options: [
                        "Progressive feature disclosure",
                        "Mandatory training sessions",
                        "Simplified interface for everyone",
                        "Extensive documentation"
                    ],
                    correct: 0,
                    explanation: "Progressive disclosure allows users to learn and grow with the interface."
                },
                {
                    text: "Users can't find recently accessed items. Solution?",
                    options: [
                        "Add 'Recent Items' section",
                        "Improve search functionality",
                        "Add bookmarking feature",
                        "Send email summaries"
                    ],
                    correct: 0,
                    explanation: "Recent items section provides quick access to frequently used content."
                },
                {
                    text: "'Where do I find X' support tickets flood. Fix?",
                    options: [
                        "Add more documentation",
                        "Redesign navigation",
                        "Add search function",
                        "Implement contextual help"
                    ],
                    correct: 3,
                    explanation: "Contextual help provides assistance when and where users need it."
                },
                {
                    text: "Too many mandatory fields complaint. Solution?",
                    options: [
                        "Keep only essential required fields",
                        "Split form into steps",
                        "Add field explanations",
                        "Make all fields optional"
                    ],
                    correct: 0,
                    explanation: "Only require truly essential information to reduce user friction."
                }
            ]
        }
    ]
};

export default quizData;
