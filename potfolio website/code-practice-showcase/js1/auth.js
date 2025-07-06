let isAuthenticated = false;
const adminPassword = "20160268292@gautam"; // Change this to your desired password

function checkAuth() {
    const authStatus = document.getElementById('auth-status');
    const addBtn = document.getElementById('add-btn');

    if (isAuthenticated) {
        authStatus.style.display = 'block';
        addBtn.classList.remove('disabled');
        addBtn.title = 'Add new code example';
    } else {
        authStatus.style.display = 'none';
        addBtn.classList.remove('disabled');
        addBtn.title = 'Add new code example';
    }
}

function showLoginOverlay() {
    const loginOverlay = document.getElementById('login-overlay');
    loginOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    document.getElementById('password').focus();
}

function hideLoginOverlay() {
    const loginOverlay = document.getElementById('login-overlay');
    loginOverlay.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Clear form and error message
    const passwordInput = document.getElementById('password');
    const errorDiv = document.getElementById('login-error');
    if (passwordInput) passwordInput.value = '';
    if (errorDiv) errorDiv.style.display = 'none';
}

function login(password) {
    if (password === adminPassword) {
        isAuthenticated = true;
        
        // Hide login overlay immediately
        const loginOverlay = document.getElementById('login-overlay');
        loginOverlay.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        checkAuth();
        
        setTimeout(() => {
            openModal();
        }, 200);
        return true;
    } else {
        return false;
    }
}

function logout() {
    isAuthenticated = false;
    checkAuth();
}

function handleAddClick() {
    if (isAuthenticated) {
        openModal();
    } else {
        showLoginOverlay();
    }
}

// Event listeners for auth
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('login-error');
    
    if (login(password)) {
        errorDiv.style.display = 'none';
    } else {
        errorDiv.textContent = 'Incorrect password. Please try again.';
        errorDiv.style.display = 'block';
        document.getElementById('password').value = '';
        
        // Add shake animation to login card
        const loginCard = document.querySelector('.login-card');
        loginCard.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            loginCard.style.animation = '';
        }, 500);
    }
});

// Close login overlay when clicking outside
document.getElementById('login-overlay').addEventListener('click', function(e) {
    if (e.target === this) {
        hideLoginOverlay();
    }
});

// Add shake animation keyframes
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(shakeStyle);

// Make functions available globally
window.checkAuth = checkAuth;
window.logout = logout;
window.handleAddClick = handleAddClick;