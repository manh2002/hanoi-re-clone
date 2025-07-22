# Frontend - Blog Application

A clean and minimal frontend application that connects to the Node.js + Express + MongoDB backend API. Built with vanilla HTML, CSS, and JavaScript.

## 🚀 Features

### Authentication
- **Login Form** - Calls `POST /api/auth/login` and stores JWT token in localStorage
- **Registration Form** - Calls `POST /api/auth/register` for new users
- **Automatic Token Management** - Persists login state across browser sessions
- **Logout Functionality** - Clears stored tokens and redirects to login

### Post Management
- **Create Post Form** - Calls `POST /api/posts` with authentication
- **Posts Display** - Fetches and displays posts from `GET /api/posts`
- **Search Functionality** - Real-time search through posts
- **Filter by Status** - Filter posts by published/draft status
- **Like/Unlike Posts** - Interactive like system
- **Delete Posts** - Owner and admin can delete posts

### User Experience
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Clean UI** - Minimal and modern interface
- **Real-time Updates** - Automatic refresh after actions
- **Error Handling** - User-friendly error messages
- **Loading States** - Visual feedback during API calls

## 📁 Project Structure

```
frontend/
├── index.html          # Main HTML file with all UI components
├── styles.css          # Clean and responsive CSS styling
├── script.js           # JavaScript for API interactions
└── README.md          # This documentation
```

## 🛠️ Setup Instructions

### Prerequisites
- Backend API running on `http://localhost:5000`
- Modern web browser with JavaScript enabled

### Quick Start

1. **Ensure Backend is Running**
   ```bash
   cd backend-api
   npm run dev
   ```

2. **Open Frontend**
   - Simply open `index.html` in your web browser
   - Or use a local server for better development experience:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Access the Application**
   - Direct file: `file:///path/to/frontend/index.html`
   - Local server: `http://localhost:8000`

## 🔧 Configuration

### API Base URL
The frontend is configured to connect to the backend at `http://localhost:5000`. To change this:

1. Open `script.js`
2. Modify the `API_BASE_URL` constant:
   ```javascript
   const API_BASE_URL = 'https://your-backend-url.com/api';
   ```

### CORS Configuration
Make sure your backend allows requests from your frontend domain. The backend should include your frontend URL in the CORS configuration.

## 📱 User Interface

### Login/Register
- Clean form design with validation
- Toggle between login and registration
- Error messages for failed attempts
- Automatic redirect after successful authentication

### Dashboard
- Welcome message with username
- Create post form with title, content, tags, and status
- Posts list with search and filter capabilities
- Responsive layout for all screen sizes

### Post Display
- Card-based layout for each post
- Author information and timestamps
- Tag display and post statistics
- Action buttons for like/delete (when authorized)

## 🔐 Authentication Flow

1. **Login Process**:
   - User enters credentials
   - Frontend calls `POST /api/auth/login`
   - JWT token stored in localStorage
   - User redirected to dashboard

2. **Token Management**:
   - Token automatically included in API requests
   - Persistent login across browser sessions
   - Automatic logout on token expiration

3. **Protected Actions**:
   - Create posts requires authentication
   - Delete posts requires ownership or admin role
   - Like functionality requires authentication

## 📊 API Integration

### Authentication Endpoints
```javascript
// Login
POST /api/auth/login
Body: { identifier, password }
Response: { token, user }

// Register
POST /api/auth/register
Body: { username, email, password }
Response: { token, user }
```

### Post Endpoints
```javascript
// Get Posts
GET /api/posts?page=1&limit=20&q=search&status=published

// Create Post
POST /api/posts
Headers: { Authorization: Bearer <token> }
Body: { title, content, tags, status }

// Delete Post
DELETE /api/posts/:id
Headers: { Authorization: Bearer <token> }

// Like Post
PUT /api/posts/:id/like
Headers: { Authorization: Bearer <token> }
```

## 🎨 Styling

### Design Principles
- **Minimal and Clean** - Focus on content and functionality
- **Modern Typography** - Inter font family for readability
- **Consistent Spacing** - Uniform margins and padding
- **Subtle Animations** - Smooth transitions and hover effects

### Color Scheme
- **Primary**: #3b82f6 (Blue)
- **Secondary**: #6b7280 (Gray)
- **Success**: #16a34a (Green)
- **Error**: #dc2626 (Red)
- **Background**: #f8fafc (Light Gray)

### Responsive Breakpoints
- **Desktop**: 1200px and above
- **Tablet**: 768px to 1199px
- **Mobile**: Below 768px

## 🔍 Features in Detail

### Search Functionality
- Real-time search with 500ms debounce
- Searches through post titles and content
- Maintains filter state during search

### Post Creation
- Rich form with validation
- Tag support (comma-separated)
- Status selection (published/draft)
- Success/error feedback

### Post Display
- Truncated content with full text available
- Author information and metadata
- View count, likes, and comments
- Conditional action buttons based on permissions

## 🐛 Error Handling

### Network Errors
- Automatic retry suggestions
- Offline/online detection
- User-friendly error messages

### Authentication Errors
- Token expiration handling
- Invalid credentials feedback
- Automatic logout on auth failure

### Validation Errors
- Form validation feedback
- API error message display
- Field-specific error highlighting

## 🚀 Deployment

### Static Hosting
Deploy to any static hosting service:
- **Netlify**: Drag and drop the frontend folder
- **Vercel**: Connect GitHub repository
- **GitHub Pages**: Push to gh-pages branch
- **AWS S3**: Upload files to S3 bucket

### Configuration for Production
1. Update `API_BASE_URL` to production backend URL
2. Ensure CORS is configured for production domain
3. Test all functionality in production environment

## 🔧 Development

### Local Development
1. Use a local server for better development experience
2. Enable browser dev tools for debugging
3. Check console for API errors and logs

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ features used (async/await, fetch, arrow functions)
- No external dependencies required

## 📝 License

This project is for educational and demonstration purposes.

---

**Built with vanilla HTML, CSS, and JavaScript for simplicity and performance**
