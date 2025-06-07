# Cee's Mobile Detailing & Car Wash

A modern, responsive website for Cee's Mobile Detailing and Car Wash - a professional mobile car detailing service that brings showroom quality results directly to your location.

## Features

- **Responsive Design**: Optimized for all devices with mobile-first approach
- **Smooth Navigation**: Single-page application with smooth scrolling between sections
- **Professional Services**: Comprehensive car detailing and wash services
- **Contact Integration**: Direct phone integration and quote request form
- **Modern UI**: Contemporary design with smooth animations and interactions

## Services Offered

- **Exterior Detailing**: Complete wash, clay bar treatment, polishing, and protective wax
- **Interior Detailing**: Deep cleaning and conditioning of all interior surfaces
- **Full Detail Package**: Complete interior and exterior detailing service
- **Express Wash**: Quick maintenance wash service
- **Paint Protection**: Advanced protective coatings and treatments
- **Maintenance Plans**: Regular scheduled detailing services

## Contact Information

- **Phone**: (312) 898-4141
- **Hours**: 
  - Monday-Friday: Open 24 hours
  - Saturday: 7:00 AM - 7:30 PM
  - Sunday: Closed
- **Service Area**: Mobile service - we come to you

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Shadcn/ui component library
- **Icons**: Font Awesome and Lucide React
- **Build Tool**: Vite
- **Backend**: Express.js with TypeScript
- **State Management**: TanStack Query for data fetching
- **Routing**: Wouter for client-side routing

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd cees-mobile-detailing
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Project Structure

```
├── client/                 # Frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── lib/            # Utility functions and configurations
│   │   └── hooks/          # Custom React hooks
│   └── index.html          # HTML entry point
├── server/                 # Backend application
│   ├── index.ts            # Server entry point
│   ├── routes.ts           # API routes
│   └── storage.ts          # Data storage interface
├── shared/                 # Shared types and schemas
└── README.md              # Project documentation
```

## Features in Detail

### Navigation
- Fixed header with smooth scroll navigation
- Active section highlighting
- Mobile-responsive hamburger menu

### Hero Section
- Eye-catching background with car detailing imagery
- Clear call-to-action buttons
- Direct phone integration

### Services Section
- Detailed service descriptions
- Feature highlights for each service
- Professional iconography

### Customer Reviews
- Testimonials from satisfied customers
- Star ratings and customer information
- Social proof for service quality

### Contact Form
- Comprehensive quote request form
- Service selection dropdown
- Vehicle information collection
- Location specification for mobile service

## Customization

The design uses CSS custom properties for easy theming. Main colors can be modified in `client/src/index.css`:

```css
:root {
  --primary: 221 83% 53%;      /* Primary blue */
  --secondary: 222 84% 5%;     /* Dark text */
  --accent: 43 74% 66%;        /* Yellow accent */
}
```

## Deployment

The application is ready for deployment on platforms like:
- Replit Deployments
- Vercel
- Netlify
- Railway
- Heroku

Ensure environment variables are properly configured for production deployment.

## License

This project is private and proprietary to Cee's Mobile Detailing and Car Wash.

## Support

For technical support or questions about the website, please contact the development team.

---

Built with ❤️ for professional mobile car detailing services.