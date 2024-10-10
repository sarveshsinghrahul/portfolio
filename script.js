// Navbar color change and slide down on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrollPosition = window.scrollY;

    navbar.classList.toggle('scrolled', scrollPosition > 50);

    if (scrollPosition > 50) {
        navbar.style.transform = 'translateY(0)'; // Show navbar
    } else {
        navbar.style.transform = 'translateY(-100%)'; // Hide navbar
    }
});

// Function to check if an element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to add 'in-view' class when the section enters the viewport
function checkSectionsInView() {
    const sections = document.querySelectorAll('.about-section, .skills-section, .projects-section, .contact-section');
    sections.forEach(section => {
        if (isInViewport(section)) {
            section.classList.add('in-view');
        } else {
            section.classList.remove('in-view'); // Remove class if out of view
        }
    });

    // Check for project cards
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        if (isInViewport(card)) {
            card.classList.add('in-view');
        } else {
            card.classList.remove('in-view'); // Remove class if out of view
        }
    });
}

// Event listener to check the position of the sections on scroll
window.addEventListener('scroll', checkSectionsInView);

// Triggering fade-in animation on initial load
window.onload = () => {
    const content = document.querySelector('.content');
    content.style.opacity = 1;
    content.style.transform = 'translateY(0)';
    checkSectionsInView(); // Check for sections in view on load
};

// Contact form submission (optional)
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    alert('Thank you for your message!'); // Placeholder for form submission
    this.reset(); // Reset the form fields
});

const navLinks = document.querySelectorAll('nav ul li a');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

window.onload = () => {
    const content = document.querySelector('.content');
    content.style.opacity = 1;
    content.style.animation = 'bounceIn 1s ease forwards'; // Add animation on load
    checkSectionsInView(); // Check for sections in view on load
};
