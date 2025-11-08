// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

if (themeToggle) {
    const themeIcon = themeToggle.querySelector('.theme-icon');
    
    // Check for saved theme preference or default to light mode
    let currentTheme = 'light';
    try {
        currentTheme = localStorage.getItem('theme') || 'light';
    } catch (e) {
        // If localStorage is not available, just use light theme
        currentTheme = 'light';
    }
    
    html.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        
        try {
            localStorage.setItem('theme', newTheme);
        } catch (e) {
            // If localStorage is not available, just update the attribute
            console.log('Theme preference not saved');
        }
        
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (themeIcon) {
            themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }
}

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Active Navigation Link Highlighting
const sections = document.querySelectorAll('.section, .hero');
const navLinksArray = document.querySelectorAll('.nav-link');

function highlightActiveNav() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinksArray.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightActiveNav);

// Form Submission
const registerForm = document.getElementById('registerForm');

if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Check if all required fields are filled
        const requiredFields = registerForm.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#ff4444';
                // Reset border color after user starts typing
                field.addEventListener('input', function() {
                    this.style.borderColor = '';
                }, { once: true });
            }
        });
        
        if (!isValid) {
            alert('Please fill in all required fields marked with *.');
            return;
        }
        
        const formData = new FormData(registerForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Registration data:', data);
        
        // Show success message
        alert('Thank you for registering! We will contact you soon.');
        
        // Reset form
        registerForm.reset();
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.gallery-item, .feature-card, .register-form, .agenda-table').forEach(el => {
    if (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    }
});

// Gallery item click handler (for future modal implementation)
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        // Future: Open image in modal
        console.log('Gallery item clicked');
    });
});