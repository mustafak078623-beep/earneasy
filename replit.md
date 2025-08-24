# EarnEasy Pro

## Overview

EarnEasy Pro is a futuristic earning platform that allows users to earn money by watching ads and withdraw their earnings through multiple payment methods. The application features a modern cyber-themed UI with neon colors, dark/light mode toggle, and smooth animations. Users can sign up, watch ads to earn money, track their earnings, and withdraw funds once they reach the minimum threshold of $10.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React 18** with TypeScript for type-safe development
- **Vite** for fast development and optimized builds
- **Tailwind CSS** with custom cyber theme for styling
- **shadcn/ui** component library for consistent UI components
- **Radix UI** primitives for accessible, unstyled components
- **Context API** for state management (Auth and Theme contexts)
- **React Hook Form** with Zod validation for form handling

### Authentication System
- **Firebase Authentication** for user management
- Email/password authentication with email verification
- Password reset functionality
- Protected routes requiring authentication

### Data Storage
- **Firebase Firestore** as the primary database
- User documents with structure: email, name, balance, adsWatched, withdrawnAmount, totalEarnings, streak, rank, createdAt
- Transactions subcollection for tracking earning and withdrawal history
- Real-time data synchronization

### Backend Architecture
- **Express.js** server with TypeScript
- **Drizzle ORM** configured for PostgreSQL (currently using in-memory storage)
- RESTful API structure with `/api` prefix
- Session handling with connect-pg-simple
- Development middleware for error handling and logging

### Design System
- **Cyber theme** with neon colors (blue, green, purple, gold)
- **Dark/light mode** with persistent theme storage
- **Responsive design** for mobile and desktop
- **Smooth animations** using CSS transitions and custom keyframes
- **Robot loader component** for enhanced user experience
- **Glass morphism effects** for modern UI aesthetics

### Key Features
- **Ad watching simulation** with random earnings ($0.10-$0.50 per ad)
- **Wallet system** with balance tracking and transaction history
- **Withdrawal system** supporting JazzCash, EasyPaisa, NayaPay, SadaPay, Bank Transfer
- **Statistics dashboard** showing platform metrics
- **Updates page** for platform announcements
- **Account management** with user profile and logout functionality

### Component Architecture
- **Layout component** providing navigation and shared UI elements
- **Page components** for Home, Wallet, Updates, and Account
- **Reusable UI components** from shadcn/ui library
- **Custom components** like RobotLoader and FloatingWhatsApp
- **Context providers** wrapping the application for global state

## External Dependencies

### Firebase Services
- **Firebase Authentication** for user management and security
- **Firebase Firestore** for real-time database operations
- **Firebase SDK** v9+ with modular imports

### UI and Styling
- **Tailwind CSS** for utility-first styling
- **shadcn/ui** component library
- **Radix UI** for accessible component primitives
- **Lucide React** for icons
- **Font Awesome** for social media icons

### Development Tools
- **Vite** for build tooling and development server
- **TypeScript** for type safety
- **ESBuild** for production builds
- **PostCSS** with Autoprefixer for CSS processing

### State Management
- **TanStack React Query** for server state management
- **React Hook Form** for form state and validation
- **Zod** for schema validation

### Database and ORM
- **Drizzle ORM** for database operations
- **Neon Database** (PostgreSQL) for production data storage
- **drizzle-kit** for database migrations

### Payment Integration
- **WhatsApp Business API** for customer support
- Multiple payment method support (implementation ready)