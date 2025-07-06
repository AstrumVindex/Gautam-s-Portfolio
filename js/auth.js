// Admin password (in a real application, this would be stored securely on a server)
const ADMIN_PASSWORD = 'admin123'; // Change this to your desired password

// Check if user is authenticated
export function isAuthenticated() {
    return localStorage.getItem('isAuthenticated') === 'true';
}

// Set authentication status
function setAuthenticated(status) {
    localStorage.setItem('isAuthenticated', status.toString());
}

// Verify admin password
export function verifyPassword(password) {
    return password === ADMIN_PASSWORD;
}

// Login function
export function login(password) {
    if (verifyPassword(password)) {
        setAuthenticated(true);
        return true;
    }
    return false;
}

// Logout function
export function logout() {
    setAuthenticated(false);
}

// Check authentication status and redirect if needed
export function checkAuth() {
    if (!isAuthenticated()) {
        showLoginModal();
    }
}

// Show login modal
function showLoginModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    
    const content = document.createElement('div');
    content.className = 'modal-content';
    
    const header = document.createElement('div');
    header.className = 'modal-header';
    header.innerHTML = `
        <h2>🔒 Admin Access Required</h2>
        <button class="close-btn" onclick="this.parentElement.parentElement.parentElement.remove()">&times;</button>
    `;
    
    const form = document.createElement('form');
    form.onsubmit = handleLogin;
    
    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.placeholder = 'Enter admin password';
    passwordInput.required = true;
    
    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Login';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.display = 'none';
    
    form.appendChild(passwordInput);
    form.appendChild(submitBtn);
    form.appendChild(errorDiv);
    
    content.appendChild(header);
    content.appendChild(form);
    modal.appendChild(content);
    
    document.body.appendChild(modal);
}

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();
    
    const form = event.target;
    const password = form.querySelector('input[type="password"]').value;
    const errorDiv = form.querySelector('.error-message');
    
    if (login(password)) {
        form.parentElement.parentElement.remove();
        window.location.reload();
    } else {
        errorDiv.textContent = 'Invalid password';
        errorDiv.style.display = 'block';
    }
}

// Make functions available globally
window.logout = logout; 