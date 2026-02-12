# 🎨 UI-Library: Reusable React Component Library

A modern, customizable component library built with React and Vite, featuring production-ready UI components including Buttons, Cards, and Modals. Perfect for rapid application development and consistent design systems.

![React](https://img.shields.io/badge/React-18.x-61dafb?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.x-646cff?style=flat-square&logo=vite)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-f7df1e?style=flat-square&logo=javascript)
![CSS3](https://img.shields.io/badge/CSS3-Modern-1572b6?style=flat-square&logo=css3)

**Live Development Server:** http://localhost:5173/

**GitHub Repository:** https://github.com/M0hammad-yasin/React_Intern.git

**Project Location:** `phase-03/UI-Library`

---

## 📑 Table of Contents

- [Project Overview](#-project-overview)
  - [What is UI-Library?](#what-is-ui-library)
  - [Available Components](#available-components)
  - [Key Features](#key-features)
- [Installation Instructions](#-installation-instructions)
  - [Prerequisites](#prerequisites)
  - [Quick Start](#quick-start)
  - [Available Scripts](#available-scripts)
  - [Troubleshooting](#troubleshooting)
- [Usage Guidelines](#-usage-guidelines)
  - [Button Component](#1-button-component)
  - [Card Component](#2-card-component)
  - [Modal Component](#3-modal-component)
- [Project Structure](#-project-structure)
- [Component API Reference](#-component-api-reference)
- [Customization Guide](#-customization-guide)
- [Best Practices](#-best-practices)
- [Browser Compatibility](#-browser-compatibility)
- [Contributing](#-contributing)
- [License & Author](#-license--author)

---

## 🎯 Project Overview

### What is UI-Library?

UI-Library is a **standalone Vite + React project** containing a collection of reusable, customizable UI components. These components are designed to be:

- ✨ **Plug-and-play** - Easy to integrate into any React project
- 🎨 **Customizable** - Flexible props for different use cases
- ♿ **Accessible** - Built with accessibility in mind
- 📱 **Responsive** - Works seamlessly across all devices
- ⚡ **Performant** - Optimized for speed and efficiency

### Available Components

| Component | Description | Variants |
|-----------|-------------|----------|
| **Button** | Customizable button with multiple styles | Primary, Secondary, Danger, Success |
| **Card** | Content container with header, body, footer | Default, Bordered, Elevated |
| **Modal** | Overlay dialog for important content | Centered, Full-screen, Custom size |

### Key Features

✅ **Reusable Components** - Import and use anywhere in your project  
✅ **Props-based Customization** - Easy to configure via props  
✅ **Multiple Variants** - Different styles for different use cases  
✅ **Responsive Design** - Mobile-first approach  
✅ **Modern Styling** - Clean, professional UI  
✅ **TypeScript Ready** - (Can be extended with TypeScript)  
✅ **Zero Dependencies** - Only React required  
✅ **Well Documented** - Clear examples and API references  

---

## 💻 Installation Instructions

### Prerequisites

Ensure you have the following installed:

| Software | Minimum Version | Check Command |
|----------|----------------|---------------|
| **Node.js** | 16.0+ | `node --version` |
| **npm** | 8.0+ | `npm --version` |
| **Git** | Any | `git --version` |

### Quick Start

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/M0hammad-yasin/React_Intern.git
```

#### 2️⃣ Navigate to UI-Library

```bash
cd React_Intern/phase-03/UI-Library
```

**Important:** Make sure you're in the `UI-Library` folder, NOT `Todo_app`.

#### 3️⃣ Install Dependencies

```bash
npm install
```

#### 4️⃣ Start Development Server

```bash
npm run dev
```

#### 5️⃣ Open in Browser

Navigate to: **http://localhost:5173/**

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

### Troubleshooting

**Port already in use:**
```bash
# Vite will automatically use the next available port
# Or kill the process manually
```

**Dependencies not installing:**
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

---

## 📚 Usage Guidelines

### 1. Button Component

Customizable button component with multiple variants and sizes.

#### **Import**

```javascript
import Button from './components/Button';
```

#### **Basic Usage**

```jsx
<Button>Click Me</Button>
```

#### **Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | string | `'primary'` | Button style: `primary`, `secondary`, `danger`, `success` |
| `size` | string | `'medium'` | Button size: `small`, `medium`, `large` |
| `onClick` | function | - | Click handler |
| `disabled` | boolean | `false` | Disable button |
| `children` | node | - | Button content |

#### **Examples**

**Primary Button:**
```jsx
<Button variant="primary" onClick={handleClick}>
  Primary Action
</Button>
```

**Secondary Button:**
```jsx
<Button variant="secondary">
  Secondary Action
</Button>
```

**Danger Button (Delete/Remove):**
```jsx
<Button variant="danger" onClick={handleDelete}>
  Delete
</Button>
```

**Success Button:**
```jsx
<Button variant="success">
  Save Changes
</Button>
```

**Different Sizes:**
```jsx
<Button size="small">Small Button</Button>
<Button size="medium">Medium Button</Button>
<Button size="large">Large Button</Button>
```

**Disabled State:**
```jsx
<Button disabled>Disabled Button</Button>
```

#### **Visual Examples**

```
┌──────────────────┐
│ Primary Button   │  Blue background
└──────────────────┘

┌──────────────────┐
│ Secondary Button │  Gray background
└──────────────────┘

┌──────────────────┐
│ Danger Button    │  Red background
└──────────────────┘

┌──────────────────┐
│ Success Button   │  Green background
└──────────────────┘
```

---

### 2. Card Component

Versatile content container with header, body, and footer sections.

#### **Import**

```javascript
import Card from './components/Card';
```

#### **Basic Usage**

```jsx
<Card
  title="Card Title"
  footer="Card Footer"
>
  <p>Card content goes here</p>
</Card>
```

#### **Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | - | Card header title |
| `footer` | string/node | - | Card footer content |
| `variant` | string | `'default'` | Card style: `default`, `bordered`, `elevated` |
| `children` | node | - | Card body content |

#### **Examples**

**Basic Card:**
```jsx
<Card title="User Profile">
  <p>Name: John Doe</p>
  <p>Email: john@example.com</p>
</Card>
```

**Card with Footer:**
```jsx
<Card 
  title="Product Details"
  footer="Last updated: Feb 12, 2026"
>
  <p>Product description here...</p>
</Card>
```

**Bordered Card:**
```jsx
<Card variant="bordered" title="Settings">
  <p>Configuration options...</p>
</Card>
```

**Elevated Card (with shadow):**
```jsx
<Card variant="elevated" title="Dashboard">
  <p>Dashboard content...</p>
</Card>
```

**Card with Custom Footer:**
```jsx
<Card 
  title="Confirm Action"
  footer={
    <>
      <Button variant="primary">Confirm</Button>
      <Button variant="secondary">Cancel</Button>
    </>
  }
>
  <p>Are you sure you want to continue?</p>
</Card>
```

#### **Visual Structure**

```
┌─────────────────────────┐
│ Card Title              │ ← Header
├─────────────────────────┤
│                         │
│  Card body content      │ ← Body
│  goes here...           │
│                         │
├─────────────────────────┤
│ Footer content          │ ← Footer
└─────────────────────────┘
```

---

### 3. Modal Component

Overlay dialog for displaying important content or user interactions.

#### **Import**

```javascript
import Modal from './components/Modal';
```

#### **Basic Usage**

```jsx
const [isOpen, setIsOpen] = useState(false);

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
>
  <p>Modal content goes here</p>
</Modal>
```

#### **Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | boolean | `false` | Controls modal visibility |
| `onClose` | function | - | Called when modal should close |
| `title` | string | - | Modal header title |
| `size` | string | `'medium'` | Modal size: `small`, `medium`, `large`, `full` |
| `children` | node | - | Modal body content |

#### **Examples**

**Simple Modal:**
```jsx
const [showModal, setShowModal] = useState(false);

<Button onClick={() => setShowModal(true)}>
  Open Modal
</Button>

<Modal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  title="Welcome"
>
  <p>This is a simple modal example.</p>
</Modal>
```

**Confirmation Modal:**
```jsx
<Modal
  isOpen={isConfirmOpen}
  onClose={() => setIsConfirmOpen(false)}
  title="Confirm Delete"
>
  <p>Are you sure you want to delete this item?</p>
  <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
    <Button variant="danger" onClick={handleDelete}>
      Delete
    </Button>
    <Button variant="secondary" onClick={() => setIsConfirmOpen(false)}>
      Cancel
    </Button>
  </div>
</Modal>
```

**Different Sizes:**
```jsx
// Small modal
<Modal size="small" title="Small Modal" isOpen={isOpen} onClose={onClose}>
  <p>Compact content</p>
</Modal>

// Medium modal (default)
<Modal size="medium" title="Medium Modal" isOpen={isOpen} onClose={onClose}>
  <p>Standard content</p>
</Modal>

// Large modal
<Modal size="large" title="Large Modal" isOpen={isOpen} onClose={onClose}>
  <p>Expanded content with more space</p>
</Modal>

// Full-screen modal
<Modal size="full" title="Full Modal" isOpen={isOpen} onClose={onClose}>
  <p>Takes up entire viewport</p>
</Modal>
```

**Form Modal:**
```jsx
<Modal
  isOpen={isFormOpen}
  onClose={() => setIsFormOpen(false)}
  title="Add New User"
  size="medium"
>
  <form onSubmit={handleSubmit}>
    <input type="text" placeholder="Name" />
    <input type="email" placeholder="Email" />
    <Button type="submit" variant="primary">Submit</Button>
  </form>
</Modal>
```

#### **Modal Behavior**

- **Overlay:** Dark background overlay when open
- **Close Methods:** 
  - Click outside modal
  - Click close button (×)
  - Press Escape key
  - Call `onClose` callback
- **Focus Trap:** Keeps keyboard focus inside modal
- **Body Scroll:** Prevents page scroll when modal is open

---

## 📁 Project Structure

```
UI-Library/
│
├── node_modules/           # Dependencies
├── public/                 # Static assets
│   └── vite.svg
│
├── src/
│   ├── assets/            # Images, icons
│   │
│   ├── components/        # Reusable UI components
│   │   ├── Button.jsx    # Button component
│   │   ├── Card.jsx      # Card component
│   │   └── Modal.jsx     # Modal component
│   │
│   ├── App.jsx           # Demo/showcase app
│   ├── App.css           # Component styles
│   ├── index.css         # Global styles
│   └── main.jsx          # Entry point
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md             # This file
└── vite.config.js
```

---

## 📖 Component API Reference

### Button Component API

```javascript
Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired
};

Button.defaultProps = {
  variant: 'primary',
  size: 'medium',
  disabled: false
};
```

### Card Component API

```javascript
Card.propTypes = {
  title: PropTypes.string,
  footer: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'bordered', 'elevated']),
  children: PropTypes.node.isRequired
};

Card.defaultProps = {
  variant: 'default'
};
```

### Modal Component API

```javascript
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'full']),
  children: PropTypes.node.isRequired
};

Modal.defaultProps = {
  size: 'medium'
};
```

---

## 🎨 Customization Guide

### Styling Components

All components use CSS classes that can be overridden:

**Button Classes:**
```css
.btn                 /* Base button */
.btn-primary         /* Primary variant */
.btn-secondary       /* Secondary variant */
.btn-danger          /* Danger variant */
.btn-success         /* Success variant */
.btn-small           /* Small size */
.btn-medium          /* Medium size */
.btn-large           /* Large size */
```

**Card Classes:**
```css
.card                /* Base card */
.card-header         /* Card header */
.card-body           /* Card body */
.card-footer         /* Card footer */
.card-bordered       /* Bordered variant */
.card-elevated       /* Elevated variant */
```

**Modal Classes:**
```css
.modal-overlay       /* Background overlay */
.modal-container     /* Modal wrapper */
.modal-header        /* Modal header */
.modal-body          /* Modal body */
.modal-close         /* Close button */
.modal-small         /* Small size */
.modal-medium        /* Medium size */
.modal-large         /* Large size */
.modal-full          /* Full-screen size */
```

### Customizing Colors

**Override in your CSS:**

```css
/* Custom primary button color */
.btn-primary {
  background: #your-color;
}

/* Custom card border */
.card-bordered {
  border-color: #your-color;
}

/* Custom modal overlay */
.modal-overlay {
  background: rgba(0, 0, 0, 0.8);
}
```

---

## ✅ Best Practices

### Component Usage

✅ **Always provide required props**
```jsx
// Good
<Modal isOpen={true} onClose={handleClose} title="Title">
  Content
</Modal>

// Bad - missing required props
<Modal>Content</Modal>
```

✅ **Use semantic HTML**
```jsx
// Good
<Button onClick={handleSubmit}>Submit Form</Button>

// Bad
<div onClick={handleSubmit}>Submit Form</div>
```

✅ **Handle state properly**
```jsx
// Good
const [isOpen, setIsOpen] = useState(false);

// Bad - no state management
<Modal isOpen={true} onClose={() => {}} />
```

### Performance

✅ **Memoize callbacks in parent components**
```jsx
const handleClick = useCallback(() => {
  // handler logic
}, [dependencies]);
```

✅ **Use keys when rendering lists**
```jsx
{items.map(item => (
  <Card key={item.id} title={item.title}>
    {item.content}
  </Card>
))}
```

---

## 🌐 Browser Compatibility

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Supported |
| Firefox | 88+ | ✅ Supported |
| Safari | 14+ | ✅ Supported |
| Edge | 90+ | ✅ Supported |
| Opera | 76+ | ✅ Supported |

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/NewComponent`)
3. Commit your changes (`git commit -m 'Add NewComponent'`)
4. Push to branch (`git push origin feature/NewComponent`)
5. Open a Pull Request

### Adding New Components

When adding new components:
- Create component in `src/components/`
- Export from component file
- Add documentation to README
- Include usage examples
- Follow existing patterns

---

## 👨‍💻 License & Author

**Author:** Mohammad Yasin

**GitHub:** [@M0hammad-yasin](https://github.com/M0hammad-yasin)

**Repository:** https://github.com/M0hammad-yasin/React_Intern.git

**Project:** Phase 03 - UI-Library

**License:** MIT - Free to use for learning and personal projects

---

<div align="center">

### ⭐ Star this repository if you found it helpful!

**Made with ❤️ using React + Vite**

**Version:** 1.0.0  
**Last Updated:** February 2026

</div>