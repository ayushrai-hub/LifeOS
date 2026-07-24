# Foodie Blog

A modern, responsive food blog website template built with Bootstrap 4, featuring a clean design, dark/light theme toggle, and Vercel-ready deployment configuration.

![Foodie Blog Banner](assets/images/banner-blog1.jpg)

## 🌟 Features

- **Responsive Design** - Works seamlessly on all devices (desktop, tablet, mobile)
- **Dark/Light Theme Toggle** - Built-in theme switcher with localStorage persistence
- **Blog Carousel** - Auto-playing featured posts slider
- **Contact Form** - Integrated with Formspree for easy form handling
- **Image Gallery** - Instagram-style photo grid
- **Testimonials Section** - Customer reviews carousel
- **Team Section** - Chef profiles with social links
- **Statistics Counter** - Animated number counters
- **Video Modal** - Vimeo video integration with popup
- **Search Functionality** - Built-in search bar
- **Smooth Animations** - Modern transitions and hover effects

## 🛠️ Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom styles with Bootstrap 4.4.1
- **JavaScript** - jQuery 3.3.1 with plugins
- **Bootstrap** - Responsive grid system
- **Owl Carousel** - Touch-friendly carousel slider
- **Magnific Popup** - Lightbox for videos and images
- **Font Awesome** - Icon library
- **Google Fonts** - Frank Ruhl Libre & Poppins

## 📁 Project Structure

```
Foodblogwebsite/
├── assets/
│   ├── css/
│   │   └── style-starter.css    # Main stylesheet (Bootstrap + custom)
│   ├── js/
│   │   ├── bootstrap.min.js     # Bootstrap JavaScript
│   │   ├── counter.js           # Animated counter plugin
│   │   ├── jquery-3.3.1.min.js  # jQuery library
│   │   ├── jquery.magnific-popup.min.js  # Lightbox plugin
│   │   ├── owl.carousel.js      # Carousel plugin
│   │   └── theme-change.js      # Dark/light theme toggle
│   └── images/
│       └── *.jpg, *.png         # All image assets
├── index.html                   # Homepage
├── about.html                   # About page
├── contact.html                 # Contact page
├── .gitignore                   # Git ignore file
├── vercel.json                  # Vercel deployment config
└── README.md                    # This file
```

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A code editor (VS Code, Sublime Text, etc.)
- Git (for version control)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ayushrai-hub/Foodblogwebsite.git
   cd Foodblogwebsite
   ```

2. **Open in browser:**
   Simply open `index.html` in your web browser, or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js (npx)
   npx serve
   ```

3. **View the site:**
   Navigate to `http://localhost:8000` in your browser.

## ⚙️ Configuration

### Contact Form Setup

The contact form uses [Formspree](https://formspree.io/) for handling submissions. To enable the form:

1. Go to [Formspree](https://formspree.io/) and create a free account
2. Create a new form and get your unique form ID
3. Update the form action in `contact.html`:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="post">
   ```

### Theme Customization

To customize colors and styles, edit `assets/css/style-starter.css`. Key CSS variables:

```css
:root {
  --primary-color: #f34235;
  --secondary-color: #131514;
  --font-color: #333;
}
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Follow the prompts:**
   - Login to your Vercel account
   - Confirm project settings
   - Deploy!

### Manual Deployment

Simply upload all files to any static hosting service:
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting

## 📱 Pages Overview

| Page | Description |
|------|-------------|
| **Home** | Featured blog posts, carousel, sidebar with recent posts, categories, and social links |
| **About** | Team section, statistics counter, testimonials, and company story |
| **Contact** | Contact form, location map, contact information, and working hours |

## 🎨 Customization Guide

### Changing Colors

Edit the CSS variables in `assets/css/style-starter.css`:

```css
:root {
  --primary-color: #your-color;
  --secondary-color: #your-color;
}
```

### Adding New Blog Posts

Copy the blog card structure from existing posts and update:
- Image source
- Title
- Author name
- Category
- Content

### Modifying the Team Section

In `about.html`, update the team member cards with:
- Team member photo
- Name and role
- Social media links

## 🔧 Troubleshooting

### Images Not Loading

Ensure all images are in the `assets/images/` folder and paths are correct:
```html
<img src="assets/images/your-image.jpg" alt="Description">
```

### Theme Toggle Not Working

Check that `theme-change.js` is loaded and the checkbox has the correct ID:
```html
<input type="checkbox" id="checkbox">
```

### Contact Form Not Submitting

1. Verify your Formspree form ID is correct
2. Check browser console for errors
3. Ensure all required fields have the `required` attribute

## 📄 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Changelog

### Version 2.0.0 (Current)
- ✅ Restructured project with proper asset folders
- ✅ Updated contact form to use Formspree
- ✅ Added Vercel deployment configuration
- ✅ Fixed broken copyright and inconsistent styling
- ✅ Added comprehensive documentation
- ✅ Added .gitignore for clean repository

### Version 1.0.0 (Original)
- Initial template release by W3Layouts

## 📧 Contact

For support or questions:
- **Email:** info@example.com
- **Website:** [Foodie Blog](https://example.com)

## 📜 License

This project is licensed under the Creative Commons Attribution 3.0 License.
See the [W3Layouts License](https://w3layouts.com/license) for more information.

## 🙏 Credits

- **Design:** [Ayush Rai](https://www.linkedin.com/in/ayushrai02/)
- **Icons:** [Font Awesome](https://fontawesome.com/)
- **Fonts:** [Google Fonts](https://fonts.google.com/)
- **Carousel:** [Owl Carousel](https://owlcarousel2.github.io/OwlCarousel2/)
- **Lightbox:** [Magnific Popup](https://dimsemenov.com/plugins/magnific-popup/)

---

**Made with ❤️ for food lovers everywhere**
