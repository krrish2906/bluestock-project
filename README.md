# Bluestocks - Stock Market Analysis Platform

## Table of Contents
1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Backend Documentation](#backend-documentation)
   - [API Endpoints](#api-endpoints)
   - [Authentication](#authentication)
   - [Models](#models)
   - [Middleware](#middleware)
4. [Frontend Documentation](#frontend-documentation)
   - [Project Structure](#project-structure)
   - [Components](#components)
   - [State Management](#state-management)
5. [Database Schema](#database-schema)
6. [Environment Variables](#environment-variables)
7. [Setup & Installation](#setup--installation)
8. [Deployment](#deployment)
9. [Testing](#testing)
10. [API Documentation](#api-documentation)

## Project Overview
Bluestocks is a comprehensive stock market analysis platform that provides real-time market data, company information, and investment tools for traders and investors.

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens)
- **API Documentation**: Swagger/OpenAPI
- **Validation**: Joi
- **Security**: Helmet, CORS, Rate Limiting

### Frontend
- **Framework**: React.js
- **State Management**: Redux Toolkit, React Query
- **UI Library**: Material-UI (MUI), TailwindCSS
- **Routing**: React Router
- **Form Handling**: React Hook Form
- **HTTP Client**: Axios
- **Notifications**: React Toastify

## Backend Documentation

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `GET /api/auth/verify-email` - Verify email address
- `POST /api/auth/refresh-token` - Refresh access token
- `POST /api/auth/logout` - Logout user

#### Company
- `GET /api/companies` - Get all companies
- `POST /api/companies` - Create a new company
- `GET /api/companies/:id` - Get company by ID
- `PUT /api/companies/:id` - Update company
- `DELETE /api/companies/:id` - Delete company

#### User
- `GET /api/users/me` - Get current user profile
- `PUT /api/users/me` - Update user profile
- `GET /api/users` - Get all users (admin only)

### Models

#### User
```javascript
{
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  isEmailVerified: { type: Boolean, default: false },
  refreshToken: String,
  lastLogin: Date
}
```

#### Company
```javascript
{
  name: { type: String, required: true },
  ticker: { type: String, required: true, unique: true },
  description: String,
  sector: String,
  industry: String,
  website: String,
  logo: String,
  employees: Number,
  foundedYear: Number,
  marketCap: Number,
  priceHistory: [{
    date: Date,
    open: Number,
    high: Number,
    low: Number,
    close: Number,
    volume: Number
  }]
}
```

### Middleware
- `auth.js` - JWT authentication
- `validateRequest.js` - Request validation using Joi
- `errorHandler.js` - Global error handling
- `rateLimiter.js` - Rate limiting for API endpoints

## Frontend Documentation

### Project Structure
```
frontend/
├── public/           # Static files
├── src/
│   ├── api/          # API service layer
│   ├── assets/       # Images, fonts, etc.
│   ├── components/   # Reusable UI components
│   ├── config/       # App configuration
│   ├── hooks/        # Custom React hooks
│   ├── layouts/      # Layout components
│   ├── pages/        # Page components
│   ├── store/        # Redux store configuration
│   ├── styles/       # Global styles
│   ├── utils/        # Utility functions
│   ├── App.jsx       # Main App component
│   └── main.jsx      # Entry point
```

### Key Components

#### Authentication
- `Login.jsx` - User login form
- `Register.jsx` - User registration form
- `AuthLayout.jsx` - Layout for auth pages

#### Company
- `CompanyList.jsx` - List of all companies
- `CompanyDetail.jsx` - Company details page
- `CreateCompanyForm.jsx` - Form to add new company

### State Management
- **Redux Toolkit** for global state
- **React Query** for server state management
- **Local State** for component-specific state

## Database Schema

### Collections
1. **users** - User accounts and authentication
2. **companies** - Company information and stock data
3. **watchlists** - User watchlists
4. **transactions** - User stock transactions

### Indexes
- `users.email`: Unique index
- `companies.ticker`: Unique index
- `transactions.userId`: Non-unique index

## Environment Variables

### Backend (`.env`)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bluestocks
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30
FRONTEND_URL=http://localhost:3000
```

### Frontend (`.env`)
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

## Setup & Installation

### Prerequisites
- Node.js (v14+)
- MongoDB (v4.4+)
- npm or yarn

### Backend Setup
```bash
# Install dependencies
cd backend
npm install

# Set environment variables
cp .env.example .env

# Start development server
npm run dev
```

### Frontend Setup
```bash
# Install dependencies
cd frontend
npm install

# Set environment variables
cp .env.example .env

# Start development server
npm start
```

## Deployment

### Backend
```bash
# Build for production
npm run build

# Start production server
npm start
```

### Frontend
```bash
# Build for production
npm run build

# Serve static files
serve -s build
```

## Testing

### Backend Tests
```bash
npm test
```

### Frontend Tests
```bash
npm test
```

## API Documentation

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Company

#### Get All Companies
```http
GET /api/companies
Authorization: Bearer <token>
```

#### Create Company
```http
POST /api/companies
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Apple Inc.",
  "ticker": "AAPL",
  "sector": "Technology",
  "industry": "Consumer Electronics",
  "website": "https://www.apple.com"
}
```

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Project Link: [https://github.com/krrish2906/bluestock-project](https://github.com/krrish2906/bluestock-project)