// DOM Elements
const body = document.getElementById("body");
const h1 = document.getElementById("h1");
const themeToggle = document.getElementById("theme-toggle");
const btns = document.getElementsByClassName("button");
const posts = document.querySelectorAll('.post');

// Theme Toggle
themeToggle.addEventListener("click", switchTheme);

function switchTheme() {
    // Add a subtle animation to the toggle
    themeToggle.style.transform = 'scale(0.9)';
    setTimeout(() => {
        themeToggle.style.transform = 'scale(1)';
    }, 150);
    
    body.classList.toggle("rain");
    h1.classList.toggle("rain");
    themeToggle.classList.toggle("rain");
    
    // Apply theme to all buttons
    for(let i = 0; i < btns.length; i++) {   
       btns[i].classList.toggle("rain");
    }
    
    // Ensure h1 gradient is always visible
    if (h1) {
        h1.style.webkitTextFillColor = 'transparent';
        h1.style.webkitBackgroundClip = 'text';
        h1.style.backgroundClip = 'text';
    }
    
    // Store theme preference
    const isRainTheme = body.classList.contains("rain");
    localStorage.setItem('theme', isRainTheme ? 'rain' : 'default');
}

// Load saved theme on page load
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'rain') {
        body.classList.add("rain");
        h1.classList.add("rain");
        themeToggle.classList.add("rain");
        for(let i = 0; i < btns.length; i++) {   
           btns[i].classList.add("rain");
        }
    }
    
    // Ensure h1 gradient is always visible regardless of theme
    if (h1) {
        h1.style.webkitTextFillColor = 'transparent';
        h1.style.webkitBackgroundClip = 'text';
        h1.style.backgroundClip = 'text';
    }
}

// Button interactions
function setupButtonInteractions() {
    for(let i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = 60;
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Simulate navigation (you can replace this with actual navigation)
            console.log(`Reading more about: ${this.parentElement.querySelector('h2').textContent}`);
        });
    }
}

// Intersection Observer for scroll animations
function setupScrollAnimations() {
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

    posts.forEach((post, index) => {
        post.style.opacity = '0';
        post.style.transform = 'translateY(50px)';
        post.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(post);
    });
}

// Improved header scroll effects
function setupHeaderEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.site-header');
        
        if (header) {
            // Add shadow and opacity changes based on scroll
            if (scrolled > 50) {
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
                header.style.background = 'rgba(255, 255, 255, 0.15)';
            } else {
                header.style.boxShadow = 'none';
                header.style.background = 'rgba(255, 255, 255, 0.1)';
            }
        }
    });
}

// Loading screen management
function hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        setTimeout(() => {
            loading.classList.add('hidden');
            setTimeout(() => {
                loading.remove();
            }, 500);
        }, 1500); // Show loading for 1.5 seconds
    }
}

// Reset any inline transforms that might interfere
function resetHeaderPosition() {
    const header = document.querySelector('.site-header');
    if (header) {
        // Remove any inline transform styles
        header.style.transform = 'translateY(0px)';
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    resetHeaderPosition();
    loadTheme();
    setupButtonInteractions();
    setupScrollAnimations();
    setupHeaderEffects();
    hideLoading();
    
    // Add smooth reveal animation to header
    setTimeout(() => {
        if (h1) {
            h1.style.opacity = '1';
            h1.style.transform = 'translateY(0)';
        }
    }, 2000); // Delay to show after loading
});

// Initial header animation setup
if (h1) {
    h1.style.opacity = '0';
    h1.style.transform = 'translateY(-30px)';
    h1.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
}