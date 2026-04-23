# Registration and Login System with Member Management

A full-stack web application with user authentication and member management functionality using Node.js, Express, MongoDB, and React.

## Features

- **User Authentication**
  - User registration
  - User login with JWT tokens
  - Secure password hashing with bcrypt
  - Token-based authentication

- **Member Management**
  - Add new members
  - View all members
  - Delete members
  - Track who added each member

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- CORS for cross-origin requests

### Frontend
- React
- Axios for HTTP requests
- CSS3 for styling

## Installation

### Prerequisites
- Node.js installed
- MongoDB Atlas account (or local MongoDB)

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd registerlo
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Environment Configuration**
   
   The `.env` file is already configured with your MongoDB connection string:
   ```
   MONGODB_URI=mongodb+srv://viruthika:Viruthika2006@cluster0.zc8zpbn.mongodb.net/?appName=Cluster0
   JWT_SECRET=your_jwt_secret_key_here_change_in_production
   PORT=5000
   ```

   **Important**: Change the `JWT_SECRET` to a secure random string for production.

## Running the Application

### Option 1: Run both servers simultaneously

1. **Start the backend server**
   ```bash
   npm start
   ```
   The backend will run on `http://localhost:5000`

2. **Start the frontend development server** (in a new terminal)
   ```bash
   cd client
   npm start
   ```
   The frontend will run on `http://localhost:3000`

### Option 2: Using npm scripts

```bash
# Start backend
npm run dev

# Start frontend (in separate terminal)
npm run client
```

## API Endpoints

### Authentication
- `POST /api/register` - Register a new user
- `POST /api/login` - Login user and get JWT token

### Members (Protected routes - require JWT token)
- `GET /api/members` - Get all members
- `POST /api/members` - Add a new member
- `DELETE /api/members/:id` - Delete a member

## Database Schema

### Users Collection
```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (default: 'user'),
  createdAt: Date
}
```

### Members Collection
```javascript
{
  name: String (required),
  email: String (required, unique),
  phone: String,
  addedBy: ObjectId (ref: 'User'),
  createdAt: Date
}
```

## Usage

1. **Register a new account**
   - Visit `http://localhost:3000`
   - Click "Register" and fill in your details

2. **Login**
   - Use your email and password to login

3. **Manage Members**
   - Add new members using the form
   - View all members in the grid
   - Delete members using the delete button

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- CORS configuration
- Input validation

## Development

### Project Structure
```
registerlo/
├── server.js              # Main server file
├── package.json           # Backend dependencies
├── .env                   # Environment variables
├── client/                # React frontend
│   ├── src/
│   │   ├── App.js         # Main React component
│   │   ├── App.css        # Styles
│   │   └── ...            # Other React files
│   └── package.json       # Frontend dependencies
└── README.md              # This file
```

### Adding New Features

1. **Backend**: Add new routes in `server.js`
2. **Frontend**: Modify components in `client/src/App.js`
3. **Styling**: Update `client/src/App.css`

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check your MongoDB connection string
   - Ensure your IP is whitelisted in MongoDB Atlas

2. **CORS Issues**
   - Backend is configured to allow requests from localhost:3000
   - For different domains, update the CORS configuration

3. **JWT Token Issues**
   - Ensure JWT_SECRET is set in .env file
   - Tokens expire after 24 hours

## License

This project is for educational purposes.
