import { addCodeExample } from '../data/code-examples.js';

function openModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    document.getElementById('title').focus();
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    document.getElementById('code-form').reset();
}

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (document.getElementById('login-overlay').style.display === 'flex') {
            hideLoginOverlay();
        } else if (document.getElementById('modal').style.display === 'block') {
            closeModal();
        }
    }
});

// Form submission
document.getElementById('code-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const language = document.getElementById('language').value;
    const code = document.getElementById('code').value;
    const description = document.getElementById('description').value;
    
    // Create new code example
    const newExample = {
        id: Date.now(),
        title,
        language,
        code,
        description: description || 'No description provided'
    };
    
    // Add to codeExamples array
    addCodeExample(newExample);
    
    // Update UI
    updateCodeDisplay();
    
    // Close modal and reset form
    closeModal();
});

// Make functions available globally
window.openModal = openModal;
window.closeModal = closeModal;