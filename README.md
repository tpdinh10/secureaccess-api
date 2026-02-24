# SecureAccess API
- Backend REST API built with Node.js and Express demonstrating secure authentication and Role-Based Access Control (RBAC).
- This project implements JWT authentication, role-based authorization (admin and user roles), and a modular MVC architecture using MongoDB Atlas.
## Features
- JWT-based authentication (register and login)
- Password hashing using bcrypt
- Role-Based Access Control (admin and user roles)
- Admin-only endpoints for user management
- Route-level authorization middleware
- Modular MVC architecture (models, controllers, middleware, routes)
- Security middleware (Helmet, rate limiting)
- MongoDB Atlas integration with indexed queries
## Tech Stack
- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JWT
- bcrypt
- Helmet
- express-rate-limit
## Project Structure
secureaccess-api/
├── src/
│ ├── config/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ └── server.js
├── .gitignore
├── package.json
└── README.md
## Setup
### 1. Install dependencies
```bash
npm install
```
### 2. Create a .env file in the project root
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret
JWT_EXPIRES_IN=7d
```
### 3. Run server
```bash
npm run dev
```
Server runs at: http://localhost:5000
## API Endpoints
### Health Check
`GET /health`
## Authentication
### 1. Register
`POST /api/auth/register`

Request Body:
```json
{
  "name" : "user",
  "email": "user@example.com",
  "password": "password123"
}
```
### 2. Login
`POST /api/auth/login`

Returns JWT token.
## Protected Routes
All protected routes require this header:

Authorization: Bearer <token>
### Get Profile
`GET /api/profile`

Accessible by any authenticated user.
### Admin Dashboard
`GET /api/admin`

Admin role required.
## Admin Management
### List All Users

`GET /api/admin/users`

Admin role required.
### Update User Role
`PATCH /api/admin/users/:id/role`

Request Body:
```json
{
"role": "admin"
}
```
Allowed values:
- "admin"
- "user"
## Testing
Use Thunder Client or Postman:
- Register a user
- Login to receive JWT token
- Add Authorization header
- Access protected endpoints
## License
This project was built for educational and portfolio purposes.