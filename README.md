# Travel Package Booking - Client

A modern, responsive React application for booking travel packages. Built with Vite, TypeScript, and Tailwind CSS.

## 🚀 Tech Stack

- **React 19** with TypeScript
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for styling
- **React Router v7** for navigation
- **Firebase** for Google OAuth authentication
- **Radix UI** for accessible, unstyled components
- **Axios** for API requests
- **date-fns** for date manipulation
- **shadcn/ui** component library


## ✨ Features

- User authentication (Email/Password and Google OAuth)
- Browse available travel packages
- Search and filter packages by location, date, and price
- View detailed package information
- Customize and book travel packages
- User dashboard to view and manage bookings
- Admin panel for managing packages and users
- Responsive design for all devices

## 📁 Project Structure

```
/src
  /assets        # Static assets (images, fonts)
  /components    # Reusable UI components
  /contexts      # React contexts (auth, theme)
  /hooks         # Custom React hooks
  /layouts       # Page layout components
  /pages         # Page components
  /services      # API services
  /types         # TypeScript type definitions
  /utils         # Utility functions
  App.tsx        # Main application component
  main.tsx       # Entry point
```

## 🛠️ Setup Instructions

1. Clone the repository
```bash
git clone https://github.com/mammenmathewz/Travel-Package-Booking-Task---Client.git
cd Travel-Package-Booking-Task---Client
```

2. Install dependencies
```bash
npm install
```

3. Create environment variables
Create a `.env` file in the project root with the following:
```env
VITE_API_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

4. Start the development server
```bash
npm run dev
```

## 📦 Build for Production

```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```

## 🔧 UI Components

This project utilizes Radix UI primitives for accessible components:

- Dialog/Modal windows
- Tabs for navigation
- Tooltips for additional information
- Avatar components
- Checkboxes and form elements
- Alert dialogs for confirmations

All components are styled with Tailwind CSS for consistent design.

## 🔐 Authentication

The application supports:
- Email and password registration/login
- Google OAuth login via Firebase
- JWT token storage and authentication
- Protected routes for authenticated users

## 🌐 API Integration

The client connects to the [Travel Package Booking API Server](https://github.com/mammenmathewz/Travel-Package-Booking-Task---Server) for all data operations:

- User authentication
- Fetching travel packages
- Managing bookings
- User profile operations
- Admin functionalities

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first design approach
- Tailwind breakpoints for different screen sizes
- Optimized layouts for desktop, tablet, and mobile

## 🧪 Linting and Type Checking

```bash
npm run lint     # Run ESLint
tsc --noEmit     # Type checking only
```

## 🔄 Version Information

- React: 19.0.0
- TypeScript: 5.7.2
- Vite: 6.3.1
- Tailwind CSS: 4.1.4

## 📄 License

This project is submitted as part of a technical assessment for Cochin Computing.

## 🔗 Related Links

- [Backend API Repository](https://github.com/mammenmathewz/Travel-Package-Booking-Task---Server)
- [Live Demo](#) (https://travalpackage.netlify.app/)
