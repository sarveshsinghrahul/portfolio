// Navbar color change and slide down on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrollPosition = window.scrollY;

    // Apply the 'scrolled' class when user scrolls down beyond 50px
    if (scrollPosition > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
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

// Loader and background display
window.onload = () => {
    const loader = document.getElementById('loader');
    const backgroundContainer = document.querySelector('.svg-background');

    // Hide loader after a delay
    setTimeout(() => {
        loader.style.display = 'none'; // Hide loader
        backgroundContainer.style.display = 'block'; // Show animated background
        fadeInContent(); // Fade in the content after loader
    }, 3000); // Adjust the duration as needed
};

// Fade-in effect for content
function fadeInContent() {
    const content = document.querySelectorAll('.navbar, .landing-page, .about-section, .skills-section, .projects-section, .contact-section');
    const backgroundContainer = document.querySelector('.svg-background');

    // Start with SVG background hidden
    backgroundContainer.style.opacity = 0;

    // Fade in content sections
    content.forEach(section => {
        section.style.opacity = 1; // Ensure content is visible
        section.style.transition = 'opacity 1s ease-in-out'; // Smooth transition
    });

    // Start showing the SVG circles just before the content bounce ends
    setTimeout(() => {
        backgroundContainer.style.opacity = 0.1; // Make SVG circles visible
        backgroundContainer.style.transition = 'opacity 1s ease'; // Smooth transition for background
    }, 2000); // Show SVG background after 2 seconds
}

// Contact form submission (optional)
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    alert('Thank you for your message!'); // Placeholder for form submission
    this.reset(); // Reset the form fields
});

// Smooth scroll for nav links
const navLinks = document.querySelectorAll('nav ul li a');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});
