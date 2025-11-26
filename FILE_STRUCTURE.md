# AIB Innovations Portfolio Website - File Structure

```
aib_website/
├── public/
│   ├── images/
│   ├── fonts/
│   └── favicon.ico
│
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Header.css
│   │   │   ├── Footer.jsx
│   │   │   ├── Footer.css
│   │   │   ├── Layout.jsx
│   │   │   └── Navbar.jsx
│   │   │
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── Button.css
│   │   │   ├── Card.jsx
│   │   │   ├── Card.css
│   │   │   ├── Input.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── Loader.jsx
│   │   │
│   │   └── sections/
│   │       ├── Hero.jsx
│   │       ├── Hero.css
│   │       ├── Services.jsx
│   │       ├── Services.css
│   │       ├── About.jsx
│   │       ├── About.css
│   │       ├── Portfolio.jsx
│   │       ├── Portfolio.css
│   │       ├── Testimonials.jsx
│   │       ├── Testimonials.css
│   │       ├── Contact.jsx
│   │       └── Contact.css
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Services.jsx
│   │   ├── About.jsx
│   │   ├── Portfolio.jsx
│   │   ├── Contact.jsx
│   │   └── NotFound.jsx
│   │
│   ├── hooks/
│   │   ├── useForm.js
│   │   ├── useScroll.js
│   │   ├── useWindowSize.js
│   │   └── useAnimation.js
│   │
│   ├── services/
│   │   ├── api.js
│   │   ├── emailService.js
│   │   └── analytics.js
│   │
│   ├── utils/
│   │   ├── helpers.js
│   │   ├── validators.js
│   │   └── constants.js
│   │
│   ├── constants/
│   │   ├── routes.js
│   │   ├── services.js
│   │   ├── portfolio.js
│   │   └── social.js
│   │
│   ├── styles/
│   │   ├── variables.css
│   │   ├── global.css
│   │   ├── animations.css
│   │   └── responsive.css
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
│
├── .gitignore
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

## Directory Descriptions

### `/components`
Reusable React components organized by type:
- **layout/** - Header, Footer, Navigation, Layout wrapper
- **ui/** - Reusable UI elements (buttons, cards, inputs, modals)
- **sections/** - Page sections (Hero, Services, About, Portfolio, Contact)

### `/pages`
Full page components for routing

### `/hooks`
Custom React hooks for shared logic

### `/services`
API calls and external service integrations

### `/utils`
Helper functions, validators, and constants

### `/constants`
Application-wide constants and configuration

### `/styles`
Global styles, CSS variables, animations
