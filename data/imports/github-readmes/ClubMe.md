# CLUB XO - Premium Nightlife Booking Platform

<div align="center">
  <h3>✨ Your Gateway to Gurgaon's Exclusive Nightlife ✨</h3>
  <p>Skip the queues. Book your slots. Get VIP treatment.</p>
</div>

---

## 📖 Overview

CLUB XO is a premium nightlife booking platform that connects party-goers with exclusive clubs, lounges, and events in Gurgaon, India. The platform enables seamless booking, instant confirmations, and VIP access to the city's best venues.

**Current Status**: Pre-launch marketing website with waitlist signup and partner recruitment.

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 18.2 |
| **Build Tool** | Vite 5 |
| **Styling** | Tailwind CSS 3.3 |
| **UI Components** | Radix UI (shadcn/ui style) |
| **Animations** | Framer Motion 10 |
| **Routing** | React Router 6 |
| **Icons** | Lucide React |
| **Notifications** | Sonner |
| **Form Handling** | Native React state + Formsfree |

---

## 📁 Project Structure

```
CLUB-XO-WEBSITE/
├── index.html              # Vite HTML entry point
├── src/
│   ├── components/
│   │   ├── Navigation.jsx  # Main navigation component
│   │   ├── Footer.jsx      # Site footer
│   │   └── ui/             # Reusable UI components
│   │       ├── button.jsx
│   │       ├── card.jsx
│   │       ├── input.jsx
│   │       ├── label.jsx
│   │       ├── select.jsx
│   │       ├── tabs.jsx
│   │       ├── textarea.jsx
│   │       ├── badge.jsx
│   │       └── sonner.jsx
│   ├── pages/
│   │   ├── HomePage.jsx     # Landing page
│   │   ├── AboutPage.jsx    # About us
│   │   ├── HowItWorksPage.jsx # Booking process
│   │   ├── ClubsPage.jsx    # Partner venues
│   │   ├── EventsPage.jsx   # Events listing
│   │   ├── ContactsPage.jsx # Contact form
│   │   ├── CareersPage.jsx  # Job listings
│   │   ├── PrivacyPage.jsx  # Privacy policy
│   │   └── TermsPage.jsx    # Terms of service
│   ├── images/              # Local image assets
│   ├── lib/
│   │   └── utils.js         # Utility functions (cn)
│   ├── App.js               # Root component with routing
│   ├── App.css              # App-level styles
│   ├── main.jsx             # React entry point
│   └── index.css            # Global styles & Tailwind config
├── vite.config.js           # Vite configuration
├── postcss.config.js         # PostCSS configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── package.json             # Dependencies & scripts
├── PRD.md                   # Product Requirements Document
└── README.md                # This file
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd CLUB-XO-WEBSITE

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# The app will open at http://localhost:3000
```

### Production Build

```bash
# Create optimized production build
npm run build

# Build outputs to /build directory
```

---

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Optional - Formsfree endpoint (defaults to a placeholder endpoint)
VITE_FORMSFREE_ENDPOINT=https://formsfree.io/f/your-form-id
# Optional - Newsletter endpoint (falls back to VITE_FORMSFREE_ENDPOINT)
VITE_FORMSFREE_NEWSLETTER_ENDPOINT=https://formsfree.io/f/your-newsletter-id
```

---

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run preview` | Preview production build |

---

## 🎨 Design System

### Color Palette

| Color | Value | Usage |
|-------|-------|-------|
| **Primary (Gold)** | `hsl(49, 67%, 49%)` | CTAs, accents |
| **Background** | `hsl(180, 54%, 5%)` | Page background |
| **Card** | `hsl(207, 77%, 8%)` | Card surfaces |
| **Accent (Neon Blue)** | `hsl(220, 65%, 50%)` | Highlights |
| **Neon Purple** | `hsl(280, 70%, 55%)` | Gradients |
| **Neon Pink** | `hsl(353, 70%, 65%)` | Gradients |

### Typography

- **Display**: Bebas Neue (headlines, branding)
- **Headings**: Space Grotesk (section titles)
- **Body**: Inter (paragraph text)

### Special Effects

- Glassmorphism (`glass`, `glass-dark` classes)
- Neon glows (`glow-gold`, `glow-neon` classes)
- Gradient text (`text-gradient-gold`, `text-gradient-neon`)

---

## 📄 Pages

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | HomePage | Landing page with hero section |
| `/about` | AboutPage | Company information |
| `/how-it-works` | HowItWorksPage | Booking process guide |
| `/clubs` | ClubsPage | Partner venue listings |
| `/events` | EventsPage | Upcoming events |
| `/contact` | ContactsPage | Contact form |
| `/careers` | CareersPage | Job listings |
| `/privacy` | PrivacyPage | Privacy policy |
| `/terms` | TermsPage | Terms of service |

---

## 🔌 Integrations

### Form Handling (Formsfree)
The contact form integrates with [Formsfree](https://formsfree.io/) for form submissions without backend code.

To configure:
1. Create a Formsfree account
2. Get your form endpoint
3. Set `REACT_APP_FORMSFREE_ENDPOINT` in `.env`

---

## 🚢 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify
```bash
# Build
npm run build

# Deploy /build folder to Netlify
```

### Other Platforms
The build output in `/build` is a static site that can be deployed to any static hosting service.

---

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

---

## 📋 Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)  
- Safari (last 2 versions)
- Edge (last 2 versions)

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📜 License

This project is proprietary software. All rights reserved by CLUB XO.

---

## 📞 Contact

- **Email**: info@clubxo.com
- **Phone**: +91 123 456 7890
- **Address**: DLF Cyber City, Gurgaon, Haryana 122002

---

<div align="center">
  <p>Built with ❤️ by the CLUB XO Team</p>
</div>
# Vercel Build Fix

