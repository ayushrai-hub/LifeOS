# Shiksha-Mitra

Shiksha-Mitra is a digital platform for personal growth and mutual accountability, inspired by the ancient Vedic concept of "Shiksha-Mitra" where learners shared responsibilities to develop empathy, discipline, and teamwork. In today's hyper-individualized world, Shiksha-Mitra connects you with a real person; your Mitra; to journey through life's challenges together.

## Overview

Shiksha-Mitra provides a supportive digital space where individuals form meaningful bonds rooted in:
- **Growth**: Continuous personal and professional development
- **Education**: Learning through shared experiences and feedback
- **Accountability**: Mutual commitment to goals and progress
- **Emotional Safety**: Compassionate support during difficult times
- **Personal Evolution**: Holistic development of character and resilience

### Key Features

Your Mitra relationship goes beyond casual friendship; it's about consistent growth through:
- **Daily Check-ins**: Share your day and receive encouragement
- **Goal Setting**: Set shared objectives and track progress together
- **Mutual Support**: Be there for each other during challenges and celebrations
- **Accountability Partnerships**: Gentle reminders and motivation when needed
- **Cultural Connection**: Bridge geographical and cultural gaps through shared human experiences

## Architecture & Technology

This project consists of a modern React-based application built with:

### Frontend Stack
- **React 18** with TypeScript for type safety
- **Vite 5** for fast development and optimized builds
- **Tailwind CSS** for utility-first styling
- **React Router DOM** for client-side routing
- **Lucide React** for consistent iconography
- **ESLint** + TypeScript-ESLint for code quality

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── ConceptOverview.tsx
│   ├── Benefits.tsx
│   ├── HowItWorks.tsx
│   ├── Activities.tsx
│   ├── Tools.tsx
│   ├── Compassion.tsx
│   ├── FindMitra.tsx
│   └── Footer.tsx
├── contexts/            # React contexts
│   └── ThemeContext.tsx
├── features/            # Feature-specific components
│   ├── ChallengeBoard.tsx
│   ├── FeatureShowcase.tsx
│   ├── GoalTracker.tsx
│   ├── Journal.tsx
│   ├── MoodStatus.tsx
│   ├── RestartTogether.tsx
│   └── SharedTodo.tsx
├── pages/               # Page components
│   ├── Dashboard.tsx
│   ├── FindMitra.tsx
│   └── NotFound.tsx
├── __tests__/           # Test files
├── App.tsx              # Main app component
├── index.css            # Global styles
└── main.tsx             # React entry point
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Shiksha-Mitra
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks
- `npm run test` - Run test suite
- `npm run test:watch` - Run tests in watch mode

## Development

### Code Quality
The project uses ESLint with TypeScript support. Run linting before commits:
```bash
npm run lint
```

### Testing
Tests are written using Vitest and React Testing Library:
```bash
npm run test
npm run test:watch
```

### Styling Guidelines
- Uses Tailwind CSS utility-first approach
- Follows BEM-like naming conventions within component classes
- Embraces design system with consistent color palette (emerald/blue/indigo)
- Responsive design with mobile-first approach

### Component Development
- Prefer functional components with TypeScript
- Keep components small and focused
- Use proper TypeScript types for props and state
- Follow accessibility best practices
- Import icons individually from `lucide-react`

## Features

### Landing Page Sections
- **Hero**: Main value proposition and call-to-actions
- **Concept Overview**: Explains Shiksha-Mitra philosophy
- **Benefits**: Key advantages of the platform
- **How It Works**: User journey explanation
- **Activities**: Suggested daily routines and practices
- **Tools**: Available features and functionality
- **Compassion**: Emphasis on supportive accountability
- **Find Mitra**: Matching flow explanation

### Interactive Components
- **Shared Todo**: Collaborative task management
- **Journal**: Personal and shared journaling
- **Goal Tracker**: Progress monitoring system
- **Mood Status**: Emotional check-in feature
- **Challenge Board**: Growth challenges and streaks
- **Restart Together**: Gentle accountability reminders

### Pages
- **Home/Dashboard**: Welcome screen and overview
- **Find Mitra**: Matching and onboarding flow
- **Not Found**: 404 error page

## Environment Configuration

Create a `.env` file in the project root (copy from `.env.example`):

```env
# Required API Keys for various AI providers
ANTHROPIC_API_KEY=your_anthropic_api_key_here
PERPLEXITY_API_KEY=your_perplexity_api_key_here
# ... other optional keys
```

## Deployment

The application can be deployed to any static hosting service:

### Build for Production
```bash
npm run build
```

This creates a `dist/` directory with optimized static files suitable for:
- Netlify
- Vercel
- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront

### SPA Routing Setup
When deploying, ensure your hosting provider serves `index.html` for all routes to support client-side routing.

## Roadmap

### Short Term
- [ ] Implement user authentication
- [ ] Add real-time chat functionality
- [ ] Develop Mitra matching algorithm
- [ ] Create user profiles and preferences

### Medium Term
- [ ] Persistent data storage (backend integration)
- [ ] Real-time collaboration features
- [ ] Mobile app development
- [ ] Email/push notifications

### Long Term
- [ ] Advanced analytics and insights
- [ ] Internationalization (i18n)
- [ ] Community features
- [ ] Premium features and subscriptions

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Follow existing TypeScript and React patterns
- Use semantic commit messages
- Ensure tests pass and linting is clean
- Update documentation as needed

## Accessibility

The application aims to be accessible to all users:
- Semantic HTML structure
- Proper heading hierarchy
- High contrast ratios
- Keyboard navigation support
- Screen reader friendly

## Testing

Comprehensive test coverage includes:
- Unit tests for individual components
- Integration tests for page functionality
- Hydration tests for client-server consistency
- Accessibility testing

## License

[Add appropriate license]

## Acknowledgments

- Inspired by Vedic educational traditions
- Built with modern web technologies
- Committed to fostering genuine human connections in the digital age

---

For questions or support, please reach out to the development team.

