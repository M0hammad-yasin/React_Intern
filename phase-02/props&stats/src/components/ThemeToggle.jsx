import './ThemeToggle.css';

function ThemeToggle({ isDarkMode, onToggle }) {
    return (
        <button
            className={`theme-toggle ${isDarkMode ? 'theme-toggle--dark' : ''}`}
            onClick={onToggle}
            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
        >
            <span className="theme-toggle__icon theme-toggle__icon--sun">☀️</span>
            <span className="theme-toggle__icon theme-toggle__icon--moon">🌙</span>
            <span className="theme-toggle__slider"></span>
        </button>
    );
}

export default ThemeToggle;
