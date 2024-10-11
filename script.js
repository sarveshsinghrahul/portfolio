const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");
const stars = [];
const numberOfStars = 50; // Number of stars to generate
const speed = 2; // Speed of star movement
const cometCount = 5; // Number of comets to generate

// Resize canvas to fill the screen
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Generate stars and comets with random positions and sizes
function createStars() {
    for (let i = 0; i < numberOfStars; i++) {
        stars.push({
            x: Math.random() * canvas.width, // Start off-screen to the left
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 2, // Random radius between 1 and 3
            isComet: Math.random() < 0.1, // 10% chance to be a comet
            trail: [],
        });
    }
}

// Draw stars and comets on the canvas
function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    ctx.fillStyle = "white"; // Color of the stars

    stars.forEach((star) => {
        // Draw the trail for comets
        if (star.isComet) {
            ctx.fillStyle = "rgba(255, 255, 255, 0.5)"; // Comet trail color
            star.trail.push({ x: star.x, y: star.y });
            if (star.trail.length > 10) {
                star.trail.shift(); // Remove the oldest trail point
            }
            star.trail.forEach((trailPoint, index) => {
                ctx.globalAlpha = 1 - index / star.trail.length; // Fade effect
                ctx.beginPath();
                ctx.arc(trailPoint.x, trailPoint.y, star.radius, 0, Math.PI * 2);
                ctx.fill();
            });
        }

        // Draw star
        ctx.fillStyle = "white"; // Reset to star color
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2, true);
        ctx.fill();
    });

    ctx.globalAlpha = 1; // Reset alpha for stars
}

// Update star and comet positions to create the animation
function updateStars() {
    stars.forEach((star) => {
        if (star.isComet) {
            // Move comet linearly
            star.x += speed + 2; // Comets move faster than stars

            if (star.x > canvas.width + star.radius) {
                // Reset comet position
                star.x = -star.radius; // Start from the left again
                star.y = Math.random() * canvas.height; // Randomize vertical position
                star.trail = []; // Reset the comet trail
            }
        } else {
            star.x += speed; // Move star to the right
            if (star.x > canvas.width + star.radius) {
                star.x = -star.radius; // Reset star position to left side
                star.y = Math.random() * canvas.height; // Randomize vertical position
            }
        }
    });
}

// Animation loop
function animate() {
    drawStars();
    updateStars();
    requestAnimationFrame(animate);
}

// Initialize the canvas
function init() {
    resizeCanvas();
    createStars();
    animate();
}

// Event listeners
window.addEventListener("resize", resizeCanvas);
window.addEventListener("load", init); // Start animation when window loads






// Auto-scroll functionality
// Auto-scroll functionality
const sections = document.querySelectorAll('.landing-page, .about-section, .skills-section, .projects-section, .contact-section');
let lastScrollTop = 0; // Track the last scroll position
const scrollThreshold = 200; // Adjust this value to set the scroll threshold for triggering
const sectionLoaded = {}; // Track loaded status for each section
let isScrolling = false; // Flag to prevent multiple scroll actions

// Initialize loaded status for each section
sections.forEach(section => {
    sectionLoaded[section.classList[0]] = false; // Assuming each section has a unique class name
});

// Function to debounce the scroll event
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// Function to handle scroll event
function handleScroll() {
    const scrollTop = window.scrollY;

    // Check if scrolling down and past the threshold
    if (scrollTop > lastScrollTop && scrollTop > scrollThreshold && !isScrolling) {
        isScrolling = true; // Prevent further scrolling until the current action completes

        // Find the next section to scroll to
        let nextSection = null;

        sections.forEach((section, index) => {
            if (scrollTop >= section.offsetTop && scrollTop < section.offsetTop + section.offsetHeight) {
                // Check if the current section is in view and has not loaded yet
                if (!sectionLoaded[section.classList[0]]) {
                    section.scrollIntoView({ behavior: 'smooth' });
                    sectionLoaded[section.classList[0]] = true; // Mark it as loaded
                    resetScrollingFlag(); // Reset the flag after scrolling
                    return; // Stop further execution to prevent skipping to next section
                }

                // Check if there's a next section
                if (index < sections.length - 1) {
                    nextSection = sections[index + 1];
                }
            }
        });

        // Scroll to the next section if applicable
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
            resetScrollingFlag(); // Reset the flag after scrolling
        } else {
            isScrolling = false; // Allow scrolling again if there are no next sections
        }
    } else if (scrollTop < lastScrollTop) {
        // Reset loading status when scrolling back up
        sections.forEach(section => {
            if (scrollTop < section.offsetTop) {
                sectionLoaded[section.classList[0]] = false; // Reset loading status
            }
        });
    }

    lastScrollTop = scrollTop; // Update last scroll position
}

// Function to reset the scrolling flag after a timeout
function resetScrollingFlag() {
    setTimeout(() => {
        isScrolling = false;
    }, 800); // Adjust timeout as necessary for smoothness
}

// Attach the debounced scroll event listener
window.addEventListener('scroll', debounce(handleScroll, 100)); // Adjust debounce time as needed

// Load section content
function loadSectionContent(section) {
    // Logic to load content for the section (e.g., displaying hidden elements, fetching data, etc.)
    section.style.display = 'block'; // Example: making the section visible
    sectionLoaded[section.classList[0]] = true; // Mark as loaded
}

// Call this function when each section is ready to be displayed
window.onload = () => {
    sections.forEach(section => {
        loadSectionContent(section);
    });
};

// Attach scroll event listener
window.addEventListener('scroll', handleScroll);

// Load section content
function loadSectionContent(section) {
    // Logic to load content for the section (e.g., displaying hidden elements, fetching data, etc.)
    section.style.display = 'block'; // Example: making the section visible
    sectionLoaded[section.classList[0]] = true; // Mark as loaded
}

// Call this function when each section is ready to be displayed
window.onload = () => {
    sections.forEach(section => {
        loadSectionContent(section);
    });
};










window.onscroll = function() {
    // Get the total height of the document
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    // Get the current scroll position
    const scrollTop = document.documentElement.scrollTop;

    // Calculate the percentage of scroll completed
    const scrollPercentage = (scrollTop / scrollHeight) * 100;

    // Update the progress bar's width
    document.getElementById('progress-bar').style.width = scrollPercentage + '%';
};



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

// Debounce function to optimize scroll event handling
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Function to add 'in-view' class when sections or boxes enter the viewport
function checkSectionsInView() {
    const sections = document.querySelectorAll('.about-section, .skills-section, .projects-section, .contact-section');
    sections.forEach(section => {
        if (isInViewport(section)) {
            section.classList.add('in-view');
        } else {
            section.classList.remove('in-view'); // Remove class if out of view
        }
    });

    const boxes = document.querySelectorAll('.about-box');
    boxes.forEach(box => {
        if (isInViewport(box)) {
            box.classList.add('in-view');
        } else {
            box.classList.remove('in-view'); // Remove class if out of view
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
window.addEventListener('scroll', debounce(checkSectionsInView, 100));

// Loader and background display
window.onload = () => {
    const loader = document.getElementById('loader');
    const backgroundContainer = document.querySelector('#starCanvas');

    // Hide loader after a delay
    setTimeout(() => {
        loader.style.display = 'none'; // Hide loader
        backgroundContainer.style.display = 'block'; // Show animated background
        fadeInContent(); // Fade in the content after loader
    }, 2000); // Adjust the duration as needed
};

// Fade-in effect for content
function fadeInContent() {
    const backgroundContainer = document.querySelector('#starCanvas');

    // Start with SVG background hidden
    backgroundContainer.style.opacity = 0.05;

    // Start showing the SVG circles just before the content bounce ends
    setTimeout(() => {
        backgroundContainer.style.opacity = 0.5; // Make SVG circles visible
    }, 2000); // Show SVG background after 2 seconds
}

// Typewriter effect for landing page text
const phrases = ["Student", "Web Designer", "Photographer"];
const colors = ["#db96ca", "#75283f", "#c86177"]; // Define different colors for each phrase
let phraseIndex = 0;
let letterIndex = 0;

function type() {
    const typedText = document.querySelector(".typed-text");
    const typingSpeed = 100 + Math.random() * 50; // Randomize typing speed
    if (letterIndex < phrases[phraseIndex].length) {
        typedText.textContent += phrases[phraseIndex].charAt(letterIndex);
        typedText.style.color = colors[phraseIndex]; // Change color based on the current phrase
        letterIndex++;
        setTimeout(type, typingSpeed); // Adjust typing speed here
    } else {
        setTimeout(erase, 1000); // Pause before erasing the text
    }
}

function erase() {
    const typedText = document.querySelector(".typed-text");
    if (letterIndex > 0) {
        typedText.textContent = typedText.textContent.substring(0, letterIndex - 1);
        letterIndex--;
        setTimeout(erase, 50); // Adjust erasing speed here
    } else {
        phraseIndex = (phraseIndex + 1) % phrases.length; // Move to the next phrase
        setTimeout(type, 500); // Pause before typing the next phrase
    }
}

// Start the typing effect when the DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
    type();
    checkSectionsInView(); // Initial check on page load
});

// Contact form submission (optional)
document.getElementById('contact-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(this);
    
    try {
        const response = await fetch('/your-api-endpoint', {
            method: 'POST',
            body: formData,
        });
        
        if (response.ok) {
            alert('Thank you for your message!');
            this.reset(); // Reset the form fields
        } else {
            alert('There was a problem with your submission.');
        }
    } catch (error) {
        alert('There was a problem with your submission.');
    }
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

