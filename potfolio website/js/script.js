// Theme toggle functionality
function toggleTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
    
    // Update theme toggle icon
    const themeIcon = document.querySelector('.theme-toggle i');
    themeIcon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
    
    // Save theme preference
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
}

// Initialize theme
document.addEventListener('DOMContentLoaded', () => {
    // Set initial theme based on saved preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Set initial theme icon
    const themeIcon = document.querySelector('.theme-toggle i');
    themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
});

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('animated');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Navigation background on scroll
function setupNavScrollEffect() {
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(255, 255, 255, 0.1)';
            nav.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
            nav.style.backdropFilter = 'blur(20px)';
        } else {
            nav.style.background = 'var(--glass-bg)';
            nav.style.boxShadow = 'none';
        }
    });
}

// Floating animation for project cards
function setupFloatingCards() {
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.style.animation = 'float 6s ease-in-out infinite';
    });
}

// Form submission
function setupFormSubmission() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const formStatus = document.getElementById('form-status');

    if (!form || !submitBtn) {
        console.error('Form or submit button not found!');
        return;
    }

    // Check if EmailJS is properly initialized
    if (typeof emailjs === 'undefined') {
        console.error('EmailJS is not loaded!');
        formStatus.textContent = 'Error: Email service is not available. Please try again later.';
        formStatus.className = 'form-status error';
        formStatus.style.display = 'block';
        return;
    }

    submitBtn.addEventListener('click', function() {
        console.log('Submit button clicked');
        
        // Validate form
        const name = form.querySelector('#name').value.trim();
        const email = form.querySelector('#email').value.trim();
        const message = form.querySelector('#message').value.trim();

        if (!name || !email || !message) {
            formStatus.textContent = 'Please fill in all fields';
            formStatus.className = 'form-status error';
            formStatus.style.display = 'block';
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            formStatus.textContent = 'Please enter a valid email address';
            formStatus.className = 'form-status error';
            formStatus.style.display = 'block';
            return;
        }
        
        console.log('Form data:', { name, email, message });
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        formStatus.textContent = 'Sending message...';
        formStatus.className = 'form-status';
        formStatus.style.display = 'block';
        
        // Send email using EmailJS
        emailjs.send('service_b10ngvt', 'template_7rfsv0b', {
            from_name: name,
            from_email: email,
            message: message,
            to_email: 'motionninja49@gmail.com',
            sent_at: new Date().toLocaleString()
        })
        .then(function(response) {
            console.log('Email sent successfully:', response);
            // Show success message
            formStatus.textContent = 'Message sent successfully! I\'ll get back to you soon.';
            formStatus.className = 'form-status success';
            form.reset();
        })
        .catch(function(error) {
            console.error('Error sending email:', error);
            // Show detailed error message
            let errorMessage = 'Sorry, there was an error sending your message. ';
            if (error.text) {
                errorMessage += error.text;
            }
            formStatus.textContent = errorMessage;
            formStatus.className = 'form-status error';
        })
        .finally(function() {
            // Remove loading state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        });
    });
}

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded, initializing form...');
    // Check if EmailJS is loaded
    if (typeof emailjs === 'undefined') {
        console.error('EmailJS is not loaded!');
    } else {
        console.log('EmailJS is loaded and ready');
    }
    initializeTheme();
    setupSmoothScrolling();
    setupNavScrollEffect();
    setupFloatingCards();
    setupFormSubmission();
    
    // Initialize typing effect
    const heroTitle = document.querySelector('.hero-title');
    const originalText = heroTitle.textContent;
    typeWriter(heroTitle, originalText, 80);
});

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const status = document.getElementById('form-status');
        const data = new FormData(contactForm);
        fetch('contact.php', {
            method: 'POST',
            body: data
        })
        .then(response => response.text())
        .then(msg => {
            status.textContent = msg;
            status.style.color = msg.startsWith('Thank you') ? '#27ae60' : '#e74c3c';
            status.style.display = 'block';
            contactForm.reset();
            setTimeout(() => { status.style.display = 'none'; }, 4000);
        })
        .catch(() => {
            status.textContent = "Oops! Something went wrong. Please try again.";
            status.style.color = '#e74c3c';
            status.style.display = 'block';
        });
    });
}