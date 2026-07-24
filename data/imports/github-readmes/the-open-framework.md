# The Open Framework

A modern web application built with React, TypeScript, and Vite for connecting NGOs, Donors, and Talent.

## Technologies

This project is built with:

- **Vite** - Next generation frontend tooling
- **TypeScript** - Type-safe JavaScript
- **React** - UI library
- **shadcn-ui** - High-quality component library
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **TanStack Query** - Data fetching and state management

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended) - [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- npm or bun package manager

### Local Development

1. **Clone the repository**
   ```sh
   git clone <YOUR_GIT_URL>
   cd the-open-framework
   ```

2. **Install dependencies**
   ```sh
   npm install
   # or
   bun install
   ```

3. **Start the development server**
   ```sh
   npm run dev
   # or
   bun run dev
   ```

   The application will be available at `http://localhost:8080`

4. **Build for production**
   ```sh
   npm run build
   # or
   bun run build
   ```

5. **Preview production build**
   ```sh
   npm run preview
   # or
   bun run preview
   ```

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (outputs to `dist/`)
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## Deployment to Vercel

### Option 1: Deploy via Vercel CLI

1. **Install Vercel CLI** (if not already installed)
   ```sh
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```sh
   vercel login
   ```

3. **Deploy to production**
   ```sh
   vercel --prod
   ```

   Or deploy a preview:
   ```sh
   vercel
   ```

### Option 2: Deploy via Vercel Dashboard

1. **Push your code to GitHub/GitLab/Bitbucket**

2. **Import your repository**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New..." → "Project"
   - Import your Git repository
   - Vercel will auto-detect the project settings (they're configured in `vercel.json`)

3. **Deploy**
   - Vercel will automatically build and deploy your project
   - Future pushes to your main branch will trigger automatic deployments

### Vercel Configuration

The project includes a `vercel.json` configuration file that:
- Sets the build command and output directory
- Configures SPA routing (all routes redirect to `index.html` for client-side routing)

### Environment Variables

If you need environment variables:
1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add your variables
4. Redeploy your application

## Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── layout/    # Layout components (Header, Footer, etc.)
│   └── ui/        # shadcn-ui components
├── contexts/      # React contexts (Auth, etc.)
├── hooks/         # Custom React hooks
├── lib/           # Utility functions
├── pages/         # Page components organized by feature
└── main.tsx       # Application entry point
```

## Custom Domain

You can connect a custom domain to your Vercel deployment:

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

## Contributing

1. Create a feature branch
2. Make your changes
3. Test locally
4. Submit a pull request

## License

[Add your license here]

