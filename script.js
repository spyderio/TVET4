// Scroll animations
let scrollY = 0;

window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
    updateMovingBoard();
    updateFadeInElements();
});

// Update moving board position based on scroll
function updateMovingBoard() {
    const movingBoard = document.getElementById('movingBoard');
    if (!movingBoard) return;
    
    const windowHeight = window.innerHeight;
    
    if (window.location.pathname.includes('student-projects')) {
        // Student projects page - simpler animation
        if (scrollY < windowHeight) {
            movingBoard.style.width = '75%';
        } else {
            movingBoard.style.width = '100%';
        }
        movingBoard.style.left = '0';
        return;
    }
    
    // Home page complex animation
    if (scrollY < windowHeight) {
        movingBoard.style.width = '75%';
        movingBoard.style.left = '0';
    } else if (scrollY < windowHeight * 2) {
        movingBoard.style.width = '100%';
        movingBoard.style.left = '0';
    } else if (scrollY < windowHeight * 3) {
        movingBoard.style.width = '50%';
        movingBoard.style.left = '0';
    } else if (scrollY < windowHeight * 4) {
        movingBoard.style.width = '50%';
        movingBoard.style.left = '50%';
    } else {
        movingBoard.style.width = '100%';
        movingBoard.style.left = '0';
    }
}

// Fade in elements based on scroll position
function updateFadeInElements() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    fadeElements.forEach((element, index) => {
        const elementTop = element.offsetTop;
        const elementHeight = element.offsetHeight;
        const windowHeight = window.innerHeight;
        
        // Calculate when element should be visible
        const triggerPoint = elementTop - windowHeight + (elementHeight / 3);
        
        if (scrollY >= triggerPoint) {
            element.classList.add('visible');
        }
    });
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Accordion functionality
function toggleAccordion(trigger) {
    const content = trigger.nextElementSibling;
    const isActive = trigger.classList.contains('active');
    
    // Close all accordions
    document.querySelectorAll('.accordion-trigger').forEach(t => {
        t.classList.remove('active');
        t.nextElementSibling.classList.remove('show');
    });
    
    // Open clicked accordion if it wasn't active
    if (!isActive) {
        trigger.classList.add('active');
        content.classList.add('show');
    }
}

// Career collapsible functionality
function toggleCareer() {
    const button = document.querySelector('.career-button');
    const content = document.getElementById('career-content');
    const icon = document.getElementById('career-icon');
    
    const isActive = button.classList.contains('active');
    
    if (isActive) {
        button.classList.remove('active');
        content.classList.remove('show');
    } else {
        button.classList.add('active');
        content.classList.add('show');
    }
}

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Trigger initial fade-in check
    updateFadeInElements();
    
    // For pages that need scroll to top
    if (window.location.pathname.includes('web-development') || 
        window.location.pathname.includes('marketing') || 
        window.location.pathname.includes('student-projects')) {
        window.scrollTo(0, 0);
    }
    
    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Handle resize events to recalculate animations
window.addEventListener('resize', () => {
    updateMovingBoard();
    updateFadeInElements();
});

// Intersection Observer for better performance on fade-in animations
if ('IntersectionObserver' in window) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    });
}

