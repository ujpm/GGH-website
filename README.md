# Global Grants Hub

A comprehensive platform designed to empower civil society organizations, NGOs, entrepreneurs, and students by providing daily funding opportunities, resources, and support for grant applications.

## 🌟 Features

- **User Authentication & Authorization**
  - Secure login/register system with Google OAuth integration
  - Role-based access control (Admin, User)
  - Protected routes and content

- **Funding Opportunities**
  - Daily updated funding calls
  - Detailed grant information
  - Search and filter capabilities
  - Application guidance resources

- **Content Management**
  - Admin dashboard for content creation and management
  - Rich text editor for content creation
  - User management interface
  - Profile management

- **Technical Features**
  - MongoDB integration for data persistence
  - TypeScript implementation for type safety
  - Responsive design for all devices
  - Modern UI with animations

## 🛠️ Tech Stack

### Frontend
- **Core**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Styled Components, TailwindCSS
- **Routing**: React Router DOM v6
- **State Management**: React Query
- **UI/UX**: Framer Motion
- **Authentication**: @react-oauth/google
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form
- **Notifications**: React Hot Toast

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, Google Auth Library
- **File Upload**: Multer
- **Security**: bcryptjs, CORS
- **Validation**: Express Validator

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.0.0
- MongoDB instance
- Google OAuth credentials

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ujpm/GGH-website.git
   cd GGH-website
   ```

2. **Frontend Setup**
   ```bash
   # Install dependencies
   npm install

   # Create .env file
   cp .env.example .env
   # Add your environment variables
   ```

3. **Backend Setup**
   ```bash
   cd backend
   npm install

   # Create .env file
   cp .env.example .env
   # Add your environment variables
   ```

### Environment Variables

#### Frontend (.env)
```
VITE_API_URL=your_backend_url
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

#### Backend (.env)
```
PORT=8000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
```

### Running the Application

1. **Start Backend**
   ```bash
   cd backend
   npm run dev   # For development
   # OR
   npm run build && npm start   # For production
   ```

2. **Start Frontend**
   ```bash
   # In another terminal
   npm run dev   # For development
   # OR
   npm run build && npm run preview   # For production
   ```

## 📦 Project Structure

```
global-grants-hub/
├── src/
│   ├── components/
│   │   ├── auth/          # Authentication components
│   │   ├── dashboard/     # Dashboard components
│   │   └── layout/        # Layout components
│   ├── context/           # React context providers
│   ├── pages/             # Page components
│   ├── styles/            # Global styles
│   └── types/             # TypeScript type definitions
├── backend/
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Custom middleware
│   │   ├── models/        # Mongoose models
│   │   ├── routes/        # API routes
│   │   └── utils/         # Utility functions
│   └── config/            # Backend configuration
└── public/                # Static assets
```

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- CORS protection
- Protected API endpoints
- Role-based access control
- Secure environment variable handling

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop (1024px and above)
- Tablet (768px to 1023px)
- Mobile (below 768px)

## 🚀 Production Deployment Guide

### Building for Production

1. **Build Frontend**
   ```bash
   # In the root directory
   npm run build
   ```
   This will create a `dist` directory with optimized production files.

2. **Build Backend**
   ```bash
   cd backend
   npm run build
   ```
   This will create a `dist` directory with compiled TypeScript files.

### Deployment Requirements

1. **Server Requirements**
   - Node.js >= 18.0.0
   - MongoDB instance (can be local or cloud-hosted)
   - Nginx or Apache for reverse proxy (recommended)
   - SSL certificate for HTTPS

2. **Configuration**
   - Set up proper environment variables
   - Configure MongoDB connection
   - Set up proper CORS settings
   - Configure reverse proxy
   - Enable SSL/HTTPS



### Monitoring and Maintenance

- Set up application logging
- Monitor server resources
- Regular database backups
- Regular security updates
- Performance monitoring


## 👥 developed by JP


## 📞 Support

For more enquiries, email me on[MY EMAIL](mailto:uwizeyimanajp2@gmail.com) or create an issue in the repository.
