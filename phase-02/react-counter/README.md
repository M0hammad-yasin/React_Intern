# React Counter Application

A clean, production-ready React counter application demonstrating core React concepts: props, state management, and component composition.

## 📋 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Core Concepts](#core-concepts)
- [Learning Outcomes](#learning-outcomes)
- [Accessibility](#accessibility)
- [Available Scripts](#available-scripts)
- [License](#license)

## ✨ Features

- ➕➖ Increment/Decrement counter with button controls
- 🔄 Reset functionality to return to zero
- 🎨 Visual feedback for negative values
- 🔒 Min/Max limits (-10 to 10) with disabled states
- 📱 Fully responsive design with modern UI
- ♿ Accessible components (ARIA labels, keyboard navigation)
- 🏗️ Clean component architecture (smart/dumb component separation)

## 📦 Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## 🚀 Installation

1. **Clone the repository:**
```bash
git clone https://github.com/M0hammad-yasin/React_Intern.git
cd phase-02/react-counter
```

2. **Install dependencies:**
```bash
npm install
# or
yarn install
```

3. **Start the development server:**
```bash
npm start
# or
yarn start
```

4. Open [http://localhost:3517](http://localhost:5173) in your browser.

## 📁 Project Structure
```
react-counter/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   ├── App.css
│   ├── App.jsx
│   ├── CounterControls.css
│   ├── CounterControls.jsx
│   ├── CounterDisplay.css
│   ├── CounterDisplay.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
└── README.md
```

## 🧠 Core Concepts

### State Management (useState)

State is managed in the parent component (`App.js`) as the single source of truth:
```jsx
const [count, setCount] = useState(0);
```

- State updates trigger automatic re-renders
- Functional updates prevent stale state: `setCount(prev => prev + 1)`
- State lives closest to where it's consumed (lifted state pattern)

### Props (Data Flow)

Props enable unidirectional data flow from parent to children:

| Component | Props Received | Purpose |
|-----------|---------------|---------|
| `CounterDisplay` | `count`, `isNegative` | Display current value with visual feedback |
| `CounterControls` | `onIncrement`, `onDecrement`, `onReset`, `canDecrement`, `canIncrement` | Trigger state updates + enforce business logic |

### Component Architecture

- **Smart Component** (`App`): Manages state and business logic
- **Dumb Components** (`CounterDisplay`, `CounterControls`): Pure presentation, receive data via props

## 🎯 Learning Outcomes

By studying this application, you will understand:

- ✅ **React State**: How to manage and update component state using `useState`
- ✅ **Props**: How to pass data and callbacks from parent to child components
- ✅ **Unidirectional Data Flow**: Parent → Props → Child → Callback → Parent
- ✅ **Component Composition**: Separating logic from presentation
- ✅ **Event Handling**: Managing user interactions with callback functions
- ✅ **Conditional Rendering**: Disabling buttons based on state constraints
- ✅ **React Re-rendering**: How state changes trigger UI updates

## ♿ Accessibility Features

- **Semantic HTML**: Proper button elements with descriptive text
- **ARIA Labels**: `aria-label` attributes for icon-only buttons
- **Focus Indicators**: Visible outlines for keyboard navigation
- **Disabled States**: Visual feedback when buttons are inactive
- **Color Contrast**: WCAG-compliant text/background ratios
- **Responsive Design**: Works on mobile, tablet, and desktop

## 📝 Key Code Patterns

### State Update Pattern
```jsx
const handleIncrement = () => setCount(prev => prev + 1);
const handleDecrement = () => setCount(prev => prev - 1);
```

### Prop Validation (Recommended for Production)
```jsx
CounterDisplay.propTypes = {
  count: PropTypes.number.isRequired,
  isNegative: PropTypes.bool.isRequired
};
```

### Business Logic in Props
```jsx
<CounterControls
  canIncrement={count < 10}
  canDecrement={count > -10}
  onIncrement={handleIncrement}
/>
```

## 🛠️ Available Scripts
```bash
npm start       # Start development server
npm run build   # Build for production
npm test        # Run tests
npm run lint    # Lint code
```

## 📄 License

This project is open-source and available for educational purposes.

## 🤝 Contributing

This is a learning project. Feel free to:

- Fork and experiment
- Add new features (e.g., step controls, persistence)
- Refactor with TypeScript
- Implement testing with Jest/React Testing Library

## 📧 Contact

Built with ❤️ using React

---

**State lives in `App` component**  
**Props flow: Parent → Children (unidirectional data flow)**