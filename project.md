# Build DP QUEST — Interactive Dynamic Programming Learning Platform

Act as a Senior Frontend Developer, UI/UX Designer, Software Architect, and Computer Science Educator.

Your task is to DESIGN AND BUILD a complete, polished, interactive educational web application called **DP QUEST**.

Do not create a generic admin dashboard or a static landing page. Build a real educational product that helps students understand Dynamic Programming through interactive visualizations, step-by-step algorithm execution, algorithm comparisons, and practical challenges.

The application must be fully functional on the frontend, with real JavaScript implementations of all algorithms. Do not use mock functionality for core features.

---

# 1. PROJECT IDENTITY

**Product Name:** DP QUEST

**Product Type:** Interactive Algorithm Learning Platform

**Tagline:** Don't Just Learn Algorithms. Experience How They Think.

**Main Objective:**

Help programming students understand Dynamic Programming concepts visually rather than memorizing formulas and code.

Users should be able to:

- Learn Dynamic Programming concepts.
- Explore algorithm execution visually.
- Enter their own inputs.
- Watch algorithms execute step by step.
- Understand DP states and transitions.
- Compare different approaches to solving the same problem.
- Test their knowledge through interactive challenges.

The application should feel like a modern educational technology startup product, not a university assignment.

---

# 2. TECHNOLOGY STACK

Use the following technologies:

- React.js with Vite.
- JavaScript (ES6+), JSX only.
- Tailwind CSS for styling.
- React Router for navigation.
- Lucide React for icons.
- Framer Motion for animations.
- Recharts for charts and performance comparisons.
- React Context API for global theme and application state where appropriate.
- LocalStorage for persisting user preferences and learning progress.

Important:

- Use JavaScript, NOT TypeScript.
- Do not introduce unnecessary backend services.
- Do not use Firebase or Supabase.
- All algorithms must execute locally in the browser.
- Do not use fake AI integrations.
- Do not add authentication unless absolutely necessary.
- Avoid unnecessary dependencies.

---

# 3. DESIGN SYSTEM AND VISUAL IDENTITY

This is one of the most important requirements.

Create a premium, modern, visually attractive, comfortable-to-use interface.

The design must be clean, sophisticated, minimal, and consistent across all pages.

Avoid generic AI-generated dashboard aesthetics.

## Light Mode — Primary Theme

Use a warm, bright, elegant color palette.

Suggested colors:

- Main background: #FFF9F3
- Secondary background: #FFFFFF
- Primary orange: #F28C28
- Secondary orange: #FFB15C
- Soft orange: #FFF0DF
- Primary text: #27231F
- Secondary text: #77716B
- Borders: #F0E6DC
- Success: #229B72
- Error: #D9534F

The orange color should be used strategically for:

- Primary buttons.
- Active navigation items.
- Selected algorithm states.
- Progress indicators.
- Important highlights.
- Interactive visualization elements.

Do not make the entire interface orange.

Use white surfaces, warm backgrounds, subtle borders, and carefully balanced shadows.

## Dark Mode — Premium Dark Theme

Create a completely designed dark mode, not simply inverted colors.

Suggested colors:

- Main background: #171513
- Secondary background: #211D19
- Cards: #29231E
- Primary orange: #E89A45
- Secondary orange: #C77B32
- Primary text: #F8F3ED
- Secondary text: #B4A99D
- Borders: #39312A
- Success: #48B58A
- Error: #E16F69

Use a combination of black, dark brown, warm charcoal, and subtle orange highlights.

Dark mode should feel elegant and comfortable for long study sessions.

## Theme Switching

Implement a fully functional theme switcher.

Requirements:

- Light and Dark modes.
- Smooth transition between themes.
- Persist selected theme in LocalStorage.
- A clear Sun/Moon Lucide icon.
- No flash of the wrong theme when refreshing the page.

## Typography

Use a professional font such as Inter or Plus Jakarta Sans.

Typography must have:

- Clear visual hierarchy.
- Comfortable line height.
- Consistent font weights.
- Readable code and mathematical expressions.

Use a monospace font for code snippets and algorithm expressions.

## Iconography

IMPORTANT:

Use Lucide React icons throughout the application.

Examples:

- LayoutDashboard
- BookOpen
- Brain
- Code2
- FlaskConical
- Trophy
- ChartNoAxesCombined
- Settings
- Sun
- Moon
- Play
- Pause
- RotateCcw
- ChevronRight
- ArrowRight
- Lightbulb
- CheckCircle
- Clock
- Layers
- GitBranch
- Database

NEVER use emojis as interface icons.

Do not use random Unicode symbols as icons.

All icons must have consistent sizes, stroke widths, and visual alignment.

---

# 4. APPLICATION STRUCTURE

Create a responsive application with a modern sidebar navigation and a clean main content area.

## Sidebar Navigation

Include:

1. Overview
2. DP Academy
3. DP Playground
4. Algorithm Battle
5. DP Challenges
6. My Progress
7. Settings

Sidebar requirements:

- Collapsible sidebar.
- Active navigation highlighting.
- Lucide icons.
- Smooth hover interactions.
- Tooltips when collapsed.
- Responsive mobile navigation.
- Product logo and DP QUEST branding.

The sidebar should look premium and spacious.

## Top Navigation

Include:

- Current page title.
- Breadcrumb navigation where appropriate.
- Theme switcher.
- Learning progress indicator.
- Optional profile avatar using initials (not an emoji).
- Responsive mobile menu.

---

# 5. PAGE ONE — OVERVIEW DASHBOARD

Create a beautiful educational dashboard.

The dashboard should immediately communicate the purpose of the platform.

### Welcome Section

Display:

"Welcome to DP QUEST"

Subtitle:

"Master Dynamic Programming by visualizing how algorithms think."

Add a prominent CTA:

"Start Learning"

Secondary CTA:

"Explore Playground"

### Statistics Cards

Display:

- Algorithms Explored.
- Challenges Completed.
- Learning Progress.
- Total Learning Time.

These statistics should be calculated from actual application state and saved progress, not hardcoded random values.

### Continue Learning

Show the last visited algorithm or learning section.

### Featured Algorithms

Create attractive cards for:

- Fibonacci Sequence.
- Climbing Stairs.
- Coin Change.
- 0/1 Knapsack.

Each card should contain:

- Algorithm name.
- Short description.
- Difficulty badge.
- Relevant Lucide icon.
- Estimated learning time.
- Explore button.

### Learning Roadmap

Create a visual learning roadmap:

1. DP Fundamentals.
2. Recursion.
3. Memoization.
4. Tabulation.
5. State Transitions.
6. Optimization.

Show completed, current, and upcoming topics.

---

# 6. PAGE TWO — DP ACADEMY

Build an educational section with structured lessons.

Topics:

## Lesson 1: What is Dynamic Programming?

Explain:

- The main idea of DP.
- Why we use it.
- How it differs from ordinary recursion.

## Lesson 2: Overlapping Subproblems

Show a visual recursion tree where repeated subproblems are highlighted.

## Lesson 3: Optimal Substructure

Show how a larger problem can be solved using optimal solutions to smaller subproblems.

## Lesson 4: Memoization vs Tabulation

Provide an interactive comparison.

## Lesson 5: DP States and State Transitions

Explain:

- What a DP state means.
- How to define a state.
- How to formulate transitions.
- How to identify base cases.

## Lesson 6: Time and Space Complexity

Explain the complexity of different approaches with examples.

Educational requirements:

- Simple explanations.
- Code snippets.
- Visual examples.
- Previous/Next lesson navigation.
- Mark lesson as completed.
- Persist learning progress.

Do not fill the pages with long paragraphs. Prefer interactive examples, diagrams, short explanations, and clear visual hierarchy.

---

# 7. PAGE THREE — DP PLAYGROUND

This is the CORE feature of the entire application.

Build a fully interactive algorithm visualization environment.

Users should select an algorithm, configure input values, and watch its execution.

Each algorithm must have:

1. Problem Description.
2. Input Configuration.
3. Algorithm Selection.
4. Visualization Area.
5. Step-by-Step Explanation.
6. DP State Display.
7. Complexity Analysis.
8. Final Result.

## ALGORITHM 01 — FIBONACCI SEQUENCE

Implement three approaches:

- Recursive.
- Memoization.
- Tabulation.

Input:

Allow users to enter N.

Visualization:

### Recursive Approach

Display a recursion tree.

Requirements:

- Show recursive function calls.
- Highlight repeated calculations.
- Animate the execution.
- Distinguish completed and active nodes.

### Memoization Approach

Display a cache table.

Requirements:

- Show cached values.
- Highlight cache hits.
- Highlight newly calculated values.
- Explain when an existing result is reused.

### Tabulation Approach

Display a DP array.

Requirements:

- Fill the array step by step.
- Highlight the current index.
- Show the mathematical transition.
- Explain each step.

Display:

- Final Fibonacci number.
- Number of function calls.
- Number of calculated states.
- Time complexity.
- Space complexity.

Add playback controls:

- Play.
- Pause.
- Next Step.
- Previous Step.
- Reset.
- Speed Control.

## ALGORITHM 02 — CLIMBING STAIRS

Problem:

A person can climb either one or two steps at a time. Calculate the number of possible ways to reach the top.

Input:

- Number of stairs.

Visualization:

- Display a staircase.
- Animate possible transitions.
- Show the DP array.
- Highlight current state.
- Explain how the previous two states contribute to the current state.

Implement:

- Recursive.
- Memoization.
- Tabulation.
- Space Optimized approach.

Display the final number of ways.

## ALGORITHM 03 — COIN CHANGE

Problem:

Given coin denominations and a target amount, calculate the minimum number of coins required.

Inputs:

- Coin denominations.
- Target amount.

Visualization:

- Display available coins.
- Display a DP array.
- Highlight the current amount.
- Show the decision process.
- Explain how each denomination is evaluated.

Implement a correct bottom-up DP solution.

Handle impossible amounts properly.

Display:

- Minimum number of coins.
- Selected coins.
- DP array.
- Number of calculated states.
- Complexity analysis.

## ALGORITHM 04 — 0/1 KNAPSACK

Problem:

Given items with weights and values, maximize total value without exceeding the capacity.

Inputs:

- Knapsack capacity.
- List of items.
- Each item has a name, weight, and value.

Allow users to:

- Add items.
- Remove items.
- Edit item values.
- Change capacity.

Visualization:

- Display the items.
- Display a 2D DP matrix.
- Highlight the current cell.
- Show the Include vs Exclude decision.
- Animate matrix construction.
- Explain each transition.

Use the recurrence:

dp[i][w] = max(
    dp[i-1][w],
    value[i] + dp[i-1][w-weight[i]]
)

Handle the case where an item cannot fit.

Display:

- Maximum achievable value.
- Selected items.
- Total weight.
- Final DP matrix.

Provide a clear explanation of the selected items.

---

# 8. STEP-BY-STEP VISUALIZATION ENGINE

Do not implement a separate playback system from scratch for every page.

Create a reusable visualization engine.

It should support:

- Current step.
- Total steps.
- Play/Pause.
- Next/Previous.
- Reset.
- Adjustable playback speed.
- Progress bar.
- Step explanation.
- Highlighted states.
- Auto-play.

Important architecture:

The algorithm should generate a sequence of execution steps.

Each step should contain:

- Current state.
- Relevant DP values.
- Explanation.
- Highlighted cells or nodes.
- Decision being made.

The visualization component should render the current step.

Use React state and clean reusable components.

Ensure that moving backward and forward works correctly.

Avoid animation bugs and stale state issues.

---

# 9. PAGE FOUR — ALGORITHM BATTLE

Build a comparison environment.

Users can compare different approaches to solving the same problem.

For Fibonacci, compare:

- Recursion.
- Memoization.
- Tabulation.

Display:

### Performance Comparison

- Execution time measured in the browser.
- Function calls.
- Number of calculated states.
- Cache hits.
- Memory usage estimate.
- Time complexity.
- Space complexity.

Create:

- Comparison cards.
- Bar charts.
- Performance tables.
- Short explanations.

Allow users to change the input size and rerun the comparison.

IMPORTANT:

Do not fabricate benchmark results.

Clearly distinguish theoretical complexity from measured browser execution time.

Use safe input limits to prevent browser freezing.

---

# 10. PAGE FIVE — DP CHALLENGES

Create an interactive challenge section.

Include:

### Challenge Types

1. Find the Missing DP State.
2. Complete the DP Array.
3. Predict the Next State.
4. Identify the Correct Transition.
5. Find the Algorithm Error.
6. Choose the Optimal Solution.

Each challenge should have:

- Question.
- Multiple-choice or interactive answer.
- Submit button.
- Immediate feedback.
- Explanation.
- Score.
- Difficulty level.

Create at least 10 meaningful challenges based on the four implemented algorithms.

Do not use random placeholder questions.

Store completed challenges and scores in LocalStorage.

---

# 11. PAGE SIX — MY PROGRESS

Build a personal learning analytics page.

Display:

- Completed lessons.
- Algorithms explored.
- Challenges completed.
- Correct answers.
- Learning progress percentage.
- Recent activities.
- Achievement badges.

Use Recharts where useful.

All information must come from actual user interactions and persisted local state.

---

# 12. INTERACTION AND USER EXPERIENCE

The application must feel alive and responsive.

Implement:

- Smooth page transitions.
- Subtle card hover effects.
- Button interaction feedback.
- Animated DP cells.
- Animated recursion tree nodes.
- Loading states when simulations start.
- Empty states.
- Success and error feedback.
- Helpful tooltips.
- Confirmation dialogs when necessary.
- Responsive layouts.

Animations should be smooth and purposeful.

Avoid excessive motion, flashy effects, gradients everywhere, and unnecessary decoration.

Respect the user's reduced-motion preference.

---

# 13. RESPONSIVE DESIGN

Support:

- Desktop.
- Laptop.
- Tablet.
- Mobile.

On smaller screens:

- Collapse the sidebar.
- Stack content sections.
- Make tables horizontally scrollable when necessary.
- Keep algorithm controls accessible.
- Ensure visualization remains usable.

Do not simply shrink the desktop layout.

Redesign the layout intelligently for mobile.

---

# 14. CODE ARCHITECTURE

Use a clean, modular React structure.

Suggested structure:

src/
  components/
    layout/
      Sidebar.jsx
      Topbar.jsx
      MainLayout.jsx
    common/
      Button.jsx
      Card.jsx
      Badge.jsx
      ProgressBar.jsx
      EmptyState.jsx
    visualization/
      VisualizationControls.jsx
      StepProgress.jsx
      DPArray.jsx
      DPMatrix.jsx
      RecursionTree.jsx
      StepExplanation.jsx
  pages/
    Overview.jsx
    Academy.jsx
    Playground.jsx
    AlgorithmBattle.jsx
    Challenges.jsx
    MyProgress.jsx
    Settings.jsx
  algorithms/
    fibonacci.js
    climbingStairs.js
    coinChange.js
    knapsack.js
  hooks/
    useTheme.js
    usePlayback.js
    useProgress.js
  context/
    ThemeContext.jsx
    ProgressContext.jsx
  data/
    lessons.js
    challenges.js
    algorithms.js
  utils/
    complexity.js
    storage.js
  App.jsx
  main.jsx

You can adjust this structure when necessary, but keep the code modular and maintainable.

Do not create excessive files or unnecessary abstraction.

---

# 15. FUNCTIONAL REQUIREMENTS

These requirements are mandatory:

- All navigation links must work.
- All algorithm inputs must work.
- All algorithms must return correct results.
- Visualizations must reflect actual algorithm execution.
- Playback controls must work.
- Theme switching must work.
- User progress must persist after refreshing.
- Challenges must be interactive.
- Algorithm comparison must use real measurements.
- Forms must have validation.
- Prevent invalid inputs.
- Prevent excessively large inputs that could freeze the browser.

Add unit tests for core algorithm implementations if practical.

---

# 16. IMPORTANT DESIGN RULES

Follow these rules strictly:

1. Do not use emojis anywhere in the UI.
2. Use Lucide React icons exclusively for interface iconography.
3. Do not create a generic admin dashboard.
4. Do not use excessive gradients.
5. Do not use huge empty spaces.
6. Do not use tiny text.
7. Do not use inconsistent border radiuses.
8. Do not create non-functional buttons.
9. Do not display fake statistics.
10. Do not use static screenshots instead of actual algorithm visualizations.
11. Do not use placeholder content for core functionality.
12. Maintain visual consistency between Light and Dark themes.
13. Make the interface comfortable for long study sessions.
14. Use clear and meaningful English interface labels.

---

# 17. DEVELOPMENT WORKFLOW

Before implementation:

1. Inspect the existing project directory.
2. Understand the existing setup.
3. Reuse existing configuration when possible.
4. Avoid overwriting useful existing code without a reason.
5. Plan the application architecture.

Then implement the project in logical phases:

Phase 1:
- Project setup.
- Design system.
- Responsive layout.
- Sidebar and navigation.
- Light/Dark themes.

Phase 2:
- Overview dashboard.
- DP Academy.
- Educational content.

Phase 3:
- Fibonacci visualization.
- Climbing Stairs visualization.

Phase 4:
- Coin Change visualization.
- Knapsack visualization.

Phase 5:
- Algorithm Battle.
- Performance comparisons.

Phase 6:
- Challenges.
- Progress tracking.
- LocalStorage persistence.

Phase 7:
- Responsive testing.
- Functional testing.
- Bug fixing.
- Visual polish.

Do not stop after generating a design or a few sample components.

Actually implement the application.

After implementation:

- Run the development server.
- Run the production build.
- Fix all compilation errors.
- Check all routes.
- Test algorithm correctness.
- Test both themes.
- Test the main interactions.
- Verify that no important buttons are decorative or non-functional.

If you cannot complete all features in one pass, prioritize a fully functional core experience over superficial implementation of every page.

# FINAL EXPECTATION

Deliver a complete, professional, responsive, interactive React application.

The final result should look and feel like a real educational technology product that could be publicly launched.

The most important priority is the combination of:

**Beautiful UI + Real Dynamic Programming Algorithms + Interactive Visual Explanations + Excellent User Experience.**

Build something that makes a student say:

"I finally understand how Dynamic Programming works because I can actually see it."