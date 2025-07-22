# Backend API - Node.js + Express + MongoDB

A robust and scalable backend API built with Node.js, Express, and MongoDB. Features JWT authentication, CRUD operations for posts, user management, and comprehensive security measures.

## 🚀 Features

### Authentication & Authorization
- **JWT-based authentication** with secure token generation
- **Role-based access control** (User/Admin)
- **Password hashing** with bcryptjs
- **Protected routes** with middleware
- **User registration and login**
- **Profile management** and password updates

### Post Management
- **Full CRUD operations** for posts
- **Rich post features**: likes, comments, tags, view counts
- **Post status management** (draft, published, archived)
- **Search functionality** with text indexing
- **Pagination and sorting**
- **Slug-based URLs** for SEO-friendly posts

### Security & Performance
- **Rate limiting** to prevent abuse
- **CORS configuration** for cross-origin requests
- **Helmet.js** for security headers
- **Input validation** with express-validator
- **Error handling** with custom middleware
- **MongoDB injection protection**

### API Features
- **RESTful API design**
- **Comprehensive error responses**
- **Pagination support**
- **Search and filtering**
- **Admin dashboard endpoints**
- **Statistics and analytics**

## 📦 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **Security**: Helmet, CORS, Rate Limiting
- **Development**: Nodemon

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (free tier available)

### 1. Clone and Install Dependencies

```bash
# Navigate to the backend-api directory
cd backend-api

# Install dependencies
npm install
```

### 2. MongoDB Atlas Setup

#### Step 1: Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Try Free" and create an account
3. Verify your email address

#### Step 2: Create a New Cluster
1. After logging in, click "Build a Database"
2. Choose "M0 Sandbox" (Free tier)
3. Select your preferred cloud provider and region
4. Click "Create Cluster"
5. Wait for the cluster to be created (2-3 minutes)

#### Step 3: Create Database User
1. In the left sidebar, click "Database Access"
2. Click "Add New Database User"
3. Choose "Password" authentication method
4. Enter a username and secure password
5. Under "Database User Privileges", select "Read and write to any database"
6. Click "Add User"

#### Step 4: Configure Network Access
1. In the left sidebar, click "Network Access"
2. Click "Add IP Address"
3. For development, click "Allow Access from Anywhere" (0.0.0.0/0)
4. For production, add your specific IP addresses
5. Click "Confirm"

#### Step 5: Get Connection String
1. Go back to "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Select "Node.js" as driver and version "4.1 or later"
5. Copy the connection string

### 3. Environment Configuration

Create a `.env` file in the backend-api directory:

```bash
# Copy the example file
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration (Replace with your Atlas connection string)
MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/your_database_name?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random_at_least_32_characters
JWT_EXPIRE=7d

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

**Important**: 
- Replace `your_username` and `your_password` with your MongoDB Atlas credentials
- Replace `your_database_name` with your desired database name
- Generate a strong JWT secret (at least 32 characters)

### 4. Start the Server

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "role": "user"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "identifier": "john@example.com",
  "password": "SecurePass123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <your_jwt_token>
```

#### Update Profile
```http
PUT /api/auth/me
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "username": "newusername",
  "email": "newemail@example.com"
}
```

### Post Endpoints

#### Get All Posts
```http
GET /api/posts?page=1&limit=10&status=published&q=search_term
```

#### Get Single Post
```http
GET /api/posts/:id
```

#### Create Post
```http
POST /api/posts
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "title": "My First Post",
  "content": "This is the content of my post...",
  "status": "published",
  "tags": ["technology", "nodejs"]
}
```

#### Update Post
```http
PUT /api/posts/:id
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content..."
}
```

#### Delete Post
```http
DELETE /api/posts/:id
Authorization: Bearer <your_jwt_token>
```

#### Like/Unlike Post
```http
PUT /api/posts/:id/like
Authorization: Bearer <your_jwt_token>
```

#### Add Comment
```http
POST /api/posts/:id/comments
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "content": "Great post!"
}
```

## 🏗️ Project Structure

```
backend-api/
├── controllers/           # Route controllers
│   ├── authController.js  # Authentication logic
│   └── postController.js  # Post management logic
├── middleware/            # Custom middleware
│   ├── auth.js           # JWT authentication
│   ├── errorHandler.js   # Error handling
│   └── validation.js     # Input validation
├── models/               # Mongoose models
│   ├── User.js          # User schema
│   └── Post.js          # Post schema
├── routes/              # API routes
│   ├── auth.js         # Authentication routes
│   └── posts.js        # Post routes
├── .env.example        # Environment variables template
├── .gitignore         # Git ignore file
├── package.json       # Dependencies and scripts
├── server.js         # Main server file
└── README.md        # This file
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs with salt rounds
- **Rate Limiting**: Prevents brute force attacks
- **CORS Protection**: Configurable cross-origin requests
- **Helmet Security**: Sets various HTTP headers
- **Input Validation**: Comprehensive request validation
- **MongoDB Injection Protection**: Mongoose built-in protection
- **Error Handling**: Secure error responses

## 🚀 Deployment

### Environment Variables for Production

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
```

### Deployment Platforms

#### Heroku
1. Create a Heroku app
2. Set environment variables in Heroku dashboard
3. Deploy using Git or GitHub integration

#### Railway
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically

#### DigitalOcean App Platform
1. Create a new app
2. Connect your repository
3. Configure environment variables
4. Deploy

## 🧪 Testing the API

### Using curl

```bash
# Register a new user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"Test123456"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"identifier":"test@example.com","password":"Test123456"}'

# Create a post (replace TOKEN with actual JWT)
curl -X POST http://localhost:5000/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"title":"Test Post","content":"This is a test post content"}'
```

### Using Postman

1. Import the API endpoints into Postman
2. Set up environment variables for base URL and token
3. Test all endpoints with different scenarios

## 📊 Database Schema

### User Model
```javascript
{
  username: String (unique, required),
  email: String (unique, required),
  password: String (hashed, required),
  role: String (enum: ['user', 'admin']),
  isActive: Boolean,
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Post Model
```javascript
{
  title: String (required),
  content: String (required),
  authorId: ObjectId (ref: User),
  slug: String (unique),
  status: String (enum: ['draft', 'published', 'archived']),
  tags: [String],
  viewCount: Number,
  likes: [{ user: ObjectId, createdAt: Date }],
  comments: [{ user: ObjectId, content: String, createdAt: Date }],
  createdAt: Date,
  updatedAt: Date
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 🆘 Troubleshooting

### Common Issues

#### MongoDB Connection Error
- Verify your connection string is correct
- Check if your IP is whitelisted in MongoDB Atlas
- Ensure your database user has proper permissions

#### JWT Token Issues
- Make sure JWT_SECRET is set in environment variables
- Check if the token is being sent in the Authorization header
- Verify the token format: `Bearer <token>`

#### Validation Errors
- Check the API documentation for required fields
- Ensure data types match the schema requirements
- Verify password strength requirements

### Getting Help

If you encounter issues:
1. Check the console logs for detailed error messages
2. Verify your environment variables are set correctly
3. Ensure MongoDB Atlas is properly configured
4. Check the API documentation for correct request formats

---

**Built with ❤️ using Node.js, Express, and MongoDB**
