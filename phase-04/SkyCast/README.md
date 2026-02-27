# 🌤️ SkyCast — Weather Dashboard

A real-time weather dashboard built with **React + Vite**, featuring a dark neumorphic UI, glassmorphism cards, animated backgrounds, and live data from the OpenWeatherMap API.

---

## 📸 Preview

> Search any city to instantly see current temperature, humidity, wind speed, pressure, visibility, and daily min/max — all wrapped in a sleek animated interface.

---

## ✨ Features

- **Real-time weather data** — current conditions fetched live from OpenWeatherMap
- **5-day / 3-hour forecast** — full forecast payload available for extension
- **City autocomplete** — geo-search powered by the OpenWeatherMap Geocoding API
- **Dark neumorphic design** — inset shadows, glassmorphism cards, and subtle gradients
- **Animated background orbs** — floating radial-gradient blobs for visual depth
- **Weather-specific gradients** — card overlay shifts based on weather condition (Clear, Rain, Snow, etc.)
- **Responsive layout** — works on mobile, tablet, and desktop
- **Accessible** — semantic HTML, ARIA labels, reduced-motion support
- **Error handling** — typed error states for city-not-found, network failures, and API quota limits

---

## 🗂️ Project Structure

```
SkyCast/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── BackgroundOrbs.jsx / .css   # Animated floating background blobs
│   │   ├── DataBox.jsx / .css          # Individual stat card (humidity, wind, etc.)
│   │   ├── ErrorCard.jsx / .css        # Typed error display with dismiss
│   │   ├── Icons.jsx                   # All SVG icons + weather emoji/gradient maps
│   │   ├── InitialState.jsx / .css     # Landing prompt with city suggestions
│   │   ├── LoadingSpinner.jsx / .css   # Animated dual-ring spinner
│   │   ├── SearchBar.jsx / .css        # Search input with city dropdown
│   │   └── WeatherCard.jsx / .css      # Main weather display card
│   ├── hooks/
│   │   ├── useWeatherAPI.js            # Fetches current weather + forecast
│   │   └── useCity.js                  # Fetches city suggestions (geocoding)
│   ├── App.jsx                         # Root component, state orchestration
│   ├── App.css                         # Global layout + neumorphic utility classes
│   ├── index.css                       # CSS variables, resets, keyframe animations
│   └── main.jsx                        # React DOM entry point
├── .env                                # API key (not committed — see setup below)
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** `>= 20.19.0` or `>= 22.12.0`
- **npm** `>= 8`
- A free [OpenWeatherMap API key](https://openweathermap.org/api)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/M0hammad-yasin/React_Intern.git
cd React_Intern/phase-04/SkyCast

# 2. Install dependencies
npm install

# 3. Create your environment file
cp .env.example .env
```

### Environment Variables

Create a `.env` file in the project root (same level as `package.json`):

```env
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

> ⚠️ Never commit your `.env` file. It is already listed in `.gitignore`.

### Running the Dev Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
npm run build
```

Output is placed in the `dist/` directory. Preview it locally with:

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

---

## 🔌 API Reference

SkyCast uses two OpenWeatherMap endpoints:

| Endpoint | Purpose |
|---|---|
| `GET /data/2.5/weather?q={city}&appid={key}&units=metric` | Current weather conditions |
| `GET /data/2.5/forecast?q={city}&appid={key}&units=metric` | 5-day / 3-hour forecast |
| `GET /geo/1.0/direct?q={query}&limit=5&appid={key}` | City name autocomplete |

All temperature values are returned in **Celsius** (`units=metric`).

---

## 🎨 Design System

CSS custom properties are defined in `src/index.css`:

| Variable | Value | Usage |
|---|---|---|
| `--bg-primary` | `#0a0f1a` | Page background |
| `--bg-secondary` | `#111827` | Card backgrounds |
| `--glass-bg` | `rgba(30,41,59,0.4)` | Glassmorphism surfaces |
| `--accent` | `#06b6d4` | Cyan highlight / focus rings |
| `--accent-glow` | `rgba(6,182,212,0.4)` | Box-shadow glows |
| `--error` | `#ef4444` | City-not-found errors |
| `--warning` | `#f59e0b` | Network / API errors |

**Utility classes** (defined in `App.css`):
- `.glass-card` — backdrop blur + border + shadow
- `.neu-input` — neumorphic inset input field
- `.neu-button` — neumorphic raised button with hover lift

**Animation classes** (defined in `index.css`):
- `.animate-slide-up` — fade + translateY entrance
- `.animate-fade-in` — opacity fade
- `.animate-shake` — horizontal shake for error states
- `.animate-float` — continuous gentle float

---

## 🧩 Component Overview

### `useWeatherAPI` hook
Manages fetching, loading, and error state for weather data. Returns `{ data, loading, error, fetchWeather, setError }`. The `data` object shape:

```js
{
  current: { /* OpenWeatherMap /weather response */ },
  forecast: { /* OpenWeatherMap /forecast response */ }
}
```

### `useCity` hook
Debounce-friendly hook for the Geocoding API. Returns `{ cityData, loadingCity, errorCity, fetchCity }`.

### `ErrorCard`
Accepts a `type` prop (`"city"` | `"network"` | `"api"`) and renders the appropriate icon, title colour, and message.

### `WeatherCard`
Reads from `data.current` to render the city name, weather emoji, temperature, feels-like, and a 2×2 grid of `DataBox` components.

### `SearchBar`
Controlled input that calls `onSearch(city)` on form submit. Also calls `fetchCity` on each keystroke to populate a `Cities` dropdown.

---

## 🛠️ Tech Stack

| Tool | Version | Role |
|---|---|---|
| React | 19.x | UI library |
| Vite | 7.x | Build tool & dev server |
| lucide-react | 0.575 | Icon library |
| OpenWeatherMap API | v2.5 / geo v1 | Weather data |
| ESLint | 9.x | Linting |

---

## 🗺️ Roadmap

- [ ] Wire up city autocomplete dropdown (click to search)
- [ ] Add search history with localStorage persistence
- [ ] 5-day forecast carousel using `data.forecast`
- [ ] Toggle between °C and °F
- [ ] Geolocation support ("Use my location")
- [ ] Hourly chart using Recharts or Chart.js
- [ ] PWA support with offline caching

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "feat: add my feature"`
4. Push: `git push origin feature/my-feature`
5. Open a Pull Request

Please run `npm run lint` before submitting.

---

## 📄 License

MIT © 2025 SkyCast Contributors