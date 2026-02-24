# SecureAccess API

Node.js and Express backend API with MongoDB Atlas, JWT authentication, and RBAC (admin and user roles).

## Tech Stack
Node.js
Express
MongoDB Atlas
Mongoose
JWT
bcrypt
Helmet
Rate limiting

## Setup
1. Install dependencies
   npm install

2. Create a .env file in the project root

## Environment Variables
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret
JWT_EXPIRES_IN=7d

## Run
npm run dev

## Endpoints
http://localhost:5000/health

### Auth
POST /api/auth/register
Body: { "email": "...", "password": "..." }

POST /api/auth/login
Body: { "email": "...", "password": "..." }

### Protected
GET /api/profile
Header: Authorization: Bearer token

GET /api/admin
Header: Authorization: Bearer token
Admin role required

### Admin Management
GET /api/admin/users
Header: Authorization: Bearer token
Admin role required

PATCH /api/admin/users/:id/role
Header: Authorization: Bearer token
Body: { "role": "admin" } or { "role": "user" }

## Testing
Use Thunder Client in VS Code.
1. Register a user
2. Login to get JWT token
3. Add Authorization header as Bearer token to call protected routes

## Notes
To make a user admin, update the user's role field in MongoDB Atlas to "admin", then login again to get a new token.