# Ramanujan Research Society

A modern, responsive single-page website for the Ramanujan Research Society; an organization dedicated to advancing mathematical research and education inspired by the legendary mathematician Srinivasa Ramanujan.

![Ramanujan Research Society](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)

## 🌟 Features

- **Responsive Design**; Beautiful layout that works on all devices (desktop, tablet, mobile)
- **Modern UI/UX**; Clean design with smooth animations and transitions
- **Accessibility**; WCAG 2.1 compliant with ARIA labels, keyboard navigation, and screen reader support
- **SEO Optimized**; Meta tags, Open Graph, Twitter Cards, and structured data (JSON-LD)
- **Performance**; Optimized CSS/JS, lazy loading, minimal dependencies
- **No Framework Dependencies**; Pure HTML, CSS, and vanilla JavaScript

## 🚀 Quick Start

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, for development)

### Running Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/ayushrai-hub/rasor.git
   cd rasor
   ```

2. **Open directly in browser**
   ```bash
   # Simply open the index.html file
   open index.html
   ```

3. **Or use a local server**
   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js (npx)
   npx serve

   # Using PHP
   php -S localhost:8000
   ```
   Then visit `http://localhost:8000`

## 📁 Project Structure

```
rasor/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All styles (CSS variables, components, responsive)
├── js/
│   └── main.js         # All JavaScript functionality
├── assets/
│   └── favicon.svg     # Site favicon
├── .gitignore          # Git ignore rules
├── README.md           # This file
├── ARCHITECTURE.md     # Technical architecture documentation
├── CONTRIBUTING.md     # Contribution guidelines
├── CHANGELOG.md        # Version history
└── CODEBASE_GUIDE.md   # Detailed codebase walkthrough
```

## 🎨 Design System

### Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Primary | `#1a365d` | Main brand color, headings |
| Primary Light | `#2c5282` | Hover states, gradients |
| Accent | `#dd6b20` | CTAs, highlights |
| Accent Light | `#ed8936` | Hover states |
| Gold | `#c9a227` | Decorative elements |
| Cream | `#faf8f5` | Background |
| Gray 800 | `#2d3748` | Body text |

### Typography

- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

### Components

- Navigation bar with scroll effect
- Hero section with animated formula card
- Mission cards with hover effects
- Program cards with gradient images
- Event cards with date badges
- Testimonial grid
- Newsletter subscription form
- Footer with multi-column layout

## 🛠️ Development

### Making Changes

1. **CSS Changes**; Edit `css/style.css`
2. **JavaScript Changes**; Edit `js/main.js`
3. **Content Changes**; Edit `index.html`

### Best Practices

- Use CSS custom properties (variables) for colors and spacing
- Follow BEM naming convention for CSS classes
- Keep JavaScript modular with IIFE pattern
- Test on multiple browsers and screen sizes
- Maintain accessibility standards

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## 🔧 Customization

### Changing Colors

Edit the CSS custom properties in `css/style.css`:

```css
:root {
    --primary: #1a365d;
    --accent: #dd6b20;
    /* ... other colors */
}
```

### Adding New Sections

1. Add HTML structure in `index.html`
2. Add styles in `css/style.css`
3. Add any JavaScript functionality in `js/main.js`

### Updating Content

All content is directly in `index.html`. Update text, links, and images as needed.

## 📊 Performance

- **No external JS frameworks**; Only vanilla JavaScript
- **Minimal CSS**; Single stylesheet, no CSS frameworks
- **Optimized fonts**; Preconnect to Google Fonts
- **Lazy animations**; Intersection Observer for scroll animations

## 🔒 Security

- No user data collection (newsletter form is demo-only)
- No third-party tracking scripts
- HTTPS recommended for production
- External links use `rel="noopener noreferrer"`

## 📄 License

MIT License; see [LICENSE](LICENSE) for details.

## 🤝 Contributing

Please read our [Contributing Guide](CONTRIBUTING.md) before submitting a Pull Request.

## 📧 Contact

- **Website**: [ramanujansociety.org](https://ramanujansociety.org)
- **Email**: info@ramanujansociety.org
- **Location**: Chennai, India

## 🙏 Acknowledgments

- Inspired by the legendary mathematician **Srinivasa Ramanujan**
- Built with ❤️ for the mathematical community

---

*Last updated: April 2026*
