// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// DOM Elements
const loginSection = document.getElementById('loginSection');
const registerSection = document.getElementById('registerSection');
const dashboardSection = document.getElementById('dashboardSection');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const createPostForm = document.getElementById('createPostForm');
const userInfo = document.getElementById('userInfo');
const logoutBtn = document.getElementById('logoutBtn');
const loadingOverlay = document.getElementById('loadingOverlay');
const postsContainer = document.getElementById('postsContainer');
const refreshPostsBtn = document.getElementById('refreshPostsBtn');
const searchInput = document.getElementById('searchInput');
const statusFilter = document.getElementById('statusFilter');

// Auth Links
const showRegisterLink = document.getElementById('showRegisterLink');
const showLoginLink = document.getElementById('showLoginLink');

// State Management
let currentUser = null;
let authToken = localStorage.getItem('authToken');
let posts = [];

// Utility Functions
function showLoading() {
    loadingOverlay.classList.remove('hidden');
}

function hideLoading() {
    loadingOverlay.classList.add('hidden');
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
    setTimeout(() => {
        errorElement.classList.add('hidden');
    }, 5000);
}

function showSuccess(elementId, message) {
    const successElement = document.getElementById(elementId);
    successElement.textContent = message;
    successElement.classList.remove('hidden');
    setTimeout(() => {
        successElement.classList.add('hidden');
    }, 3000);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}

function truncateText(text, maxLength = 200) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// API Functions
async function apiCall(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        },
        ...options
    };

    if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
    }

    try {
        const response = await fetch(url, config);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || `HTTP error! status: ${response.status}`);
        }

        return data;
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
}

// Authentication Functions
async function login(identifier, password) {
    try {
        showLoading();
        const response = await apiCall('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ identifier, password })
        });

        authToken = response.token;
        currentUser = response.user;
        localStorage.setItem('authToken', authToken);
        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        showDashboard();
        loadPosts();
        return response;
    } catch (error) {
        showError('loginError', error.message);
        throw error;
    } finally {
        hideLoading();
    }
}

async function register(username, email, password) {
    try {
        showLoading();
        const response = await apiCall('/auth/register', {
            method: 'POST',
            body: JSON.stringify({ username, email, password })
        });

        authToken = response.token;
        currentUser = response.user;
        localStorage.setItem('authToken', authToken);
        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        showDashboard();
        loadPosts();
        return response;
    } catch (error) {
        showError('registerError', error.message);
        throw error;
    } finally {
        hideLoading();
    }
}

function logout() {
    authToken = null;
    currentUser = null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    showLogin();
}

// Post Functions
async function createPost(title, content, tags, status) {
    try {
        showLoading();
        const tagsArray = tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [];
        
        const response = await apiCall('/posts', {
            method: 'POST',
            body: JSON.stringify({ title, content, tags: tagsArray, status })
        });

        showSuccess('createPostSuccess', 'Post created successfully!');
        createPostForm.reset();
        loadPosts();
        return response;
    } catch (error) {
        showError('createPostError', error.message);
        throw error;
    } finally {
        hideLoading();
    }
}

async function loadPosts(search = '', status = '') {
    try {
        let endpoint = '/posts?limit=20';
        if (search) endpoint += `&q=${encodeURIComponent(search)}`;
        if (status) endpoint += `&status=${status}`;

        const response = await apiCall(endpoint);
        posts = response.data;
        displayPosts(posts);
        return response;
    } catch (error) {
        showError('postsError', 'Failed to load posts: ' + error.message);
        postsContainer.innerHTML = '<div class="error-message">Failed to load posts</div>';
        throw error;
    }
}

async function deletePost(postId) {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
        showLoading();
        await apiCall(`/posts/${postId}`, { method: 'DELETE' });
        loadPosts();
    } catch (error) {
        showError('postsError', 'Failed to delete post: ' + error.message);
    } finally {
        hideLoading();
    }
}

async function toggleLike(postId) {
    try {
        await apiCall(`/posts/${postId}/like`, { method: 'PUT' });
        loadPosts();
    } catch (error) {
        showError('postsError', 'Failed to toggle like: ' + error.message);
    }
}

// UI Functions
function showLogin() {
    loginSection.classList.remove('hidden');
    registerSection.classList.add('hidden');
    dashboardSection.classList.add('hidden');
    userInfo.classList.add('hidden');
    logoutBtn.classList.add('hidden');
}

function showRegister() {
    loginSection.classList.add('hidden');
    registerSection.classList.remove('hidden');
    dashboardSection.classList.add('hidden');
    userInfo.classList.add('hidden');
    logoutBtn.classList.add('hidden');
}

function showDashboard() {
    loginSection.classList.add('hidden');
    registerSection.classList.add('hidden');
    dashboardSection.classList.remove('hidden');
    userInfo.classList.remove('hidden');
    logoutBtn.classList.remove('hidden');
    
    if (currentUser) {
        userInfo.textContent = `Welcome, ${currentUser.username}`;
    }
}

function displayPosts(postsToDisplay) {
    if (!postsToDisplay || postsToDisplay.length === 0) {
        postsContainer.innerHTML = '<div class="loading">No posts found</div>';
        return;
    }

    const postsHTML = postsToDisplay.map(post => {
        const isOwner = currentUser && post.authorId._id === currentUser.id;
        const isAdmin = currentUser && currentUser.role === 'admin';
        const canDelete = isOwner || isAdmin;

        return `
            <div class="post-item" data-post-id="${post._id}">
                <div class="post-header">
                    <div>
                        <h3 class="post-title">${escapeHtml(post.title)}</h3>
                        <div class="post-meta">
                            <span>By: ${escapeHtml(post.authorId.username)}</span>
                            <span>Created: ${formatDate(post.createdAt)}</span>
                            <span class="status-badge status-${post.status}">${post.status}</span>
                        </div>
                    </div>
                </div>
                <div class="post-content">
                    ${escapeHtml(truncateText(post.content))}
                </div>
                ${post.tags && post.tags.length > 0 ? `
                    <div class="post-tags">
                        ${post.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}
                    </div>
                ` : ''}
                <div class="post-stats">
                    <span>👁️ ${post.viewCount || 0} views</span>
                    <span>❤️ ${post.likeCount || 0} likes</span>
                    <span>💬 ${post.commentCount || 0} comments</span>
                </div>
                <div class="post-actions">
                    <button class="btn btn-secondary" onclick="toggleLike('${post._id}')">
                        ${post.isLikedBy && post.isLikedBy(currentUser?.id) ? '❤️ Unlike' : '🤍 Like'}
                    </button>
                    ${canDelete ? `
                        <button class="btn btn-danger" onclick="deletePost('${post._id}')">
                            🗑️ Delete
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');

    postsContainer.innerHTML = postsHTML;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Event Listeners
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const identifier = formData.get('identifier');
    const password = formData.get('password');
    
    try {
        await login(identifier, password);
    } catch (error) {
        // Error already handled in login function
    }
});

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');
    
    try {
        await register(username, email, password);
    } catch (error) {
        // Error already handled in register function
    }
});

createPostForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get('title');
    const content = formData.get('content');
    const tags = formData.get('tags');
    const status = formData.get('status');
    
    try {
        await createPost(title, content, tags, status);
    } catch (error) {
        // Error already handled in createPost function
    }
});

logoutBtn.addEventListener('click', logout);

showRegisterLink.addEventListener('click', (e) => {
    e.preventDefault();
    showRegister();
});

showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    showLogin();
});

refreshPostsBtn.addEventListener('click', () => {
    loadPosts(searchInput.value, statusFilter.value);
});

// Search and Filter
let searchTimeout;
searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        loadPosts(e.target.value, statusFilter.value);
    }, 500);
});

statusFilter.addEventListener('change', (e) => {
    loadPosts(searchInput.value, e.target.value);
});

// Initialize App
function initApp() {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (authToken && savedUser) {
        try {
            currentUser = JSON.parse(savedUser);
            showDashboard();
            loadPosts();
        } catch (error) {
            console.error('Failed to parse saved user data:', error);
            logout();
        }
    } else {
        showLogin();
    }
}

// Global functions for onclick handlers
window.deletePost = deletePost;
window.toggleLike = toggleLike;

// Start the app
document.addEventListener('DOMContentLoaded', initApp);

// Handle network errors
window.addEventListener('online', () => {
    console.log('Connection restored');
    if (currentUser) {
        loadPosts();
    }
});

window.addEventListener('offline', () => {
    console.log('Connection lost');
    showError('postsError', 'Connection lost. Please check your internet connection.');
});
