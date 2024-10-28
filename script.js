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





    window.onscroll = function() {
        // Get the total height of the document
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        // Get the current scroll position
        const scrollTop = document.documentElement.scrollTop;

        // Calculate the percentage of scroll completed
        const scrollPercentage = (scrollTop / scrollHeight) * 100;

        // Update the progress bar's width
        document.getElementById('progress-bar').style.width = scrollPercentage + '%';

        // Check if the user has scrolled to the top
        if (scrollTop === 0) {
            resetAnimations(); // Reset animations if at the top
        }

        checkSectionsInView(); // Call the function to check visibility of sections
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
        const sections = document.querySelectorAll('.about-section, .contact-section, timeline-section');
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
            }
        });

        // Check for moon visibility
        const moon = document.getElementById('moon');
        if (isInViewport(moon)) {
            moon.classList.add('in-view'); // Add 'in-view' class when moon is visible
        }
    }

    // Event listener to check the position of the sections on scroll
    window.addEventListener('scroll', debounce(checkSectionsInView, 100));

    function resetAnimations() {
        const boxes = document.querySelectorAll('.about-box');
        boxes.forEach(box => {
            box.classList.remove('in-view');
            // Optionally force a reflow to restart CSS animations
            void box.offsetWidth; // This line forces a reflow
        });

        const moon = document.getElementById('moon');
        if (moon) {
            moon.classList.remove('in-view');
            void moon.offsetWidth; // This line forces a reflow
        }
    }


    // Check if a timeline item is in the viewport
    function checkTimelineInView() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => {
            if (isInViewport(item)) {
                item.classList.add('in-view');
            } else {
                item.classList.remove('in-view');
            }
        });
    }

    // Event listener to check the position of the timeline items on scroll
    window.addEventListener('scroll', debounce(checkTimelineInView, 100));

    // Trigger the check when the DOM content is loaded
    document.addEventListener("DOMContentLoaded", () => {
        checkTimelineInView(); // Initial check on page load
    });










    function parallaxEffect() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            const speed = index % 2 === 0 ? 1 : -1; // Alternate directions
            item.style.transform = `translateY(${window.scrollY * speed * 0.05}px)`;
        });
    }
    
    window.addEventListener('scroll', debounce(parallaxEffect, 10));
    





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
            setTimeout(erase, 100); // Adjust erasing speed here
        } else {
            phraseIndex = (phraseIndex + 1) % phrases.length; // Move to the next phrase
            setTimeout(type, 200); // Pause before typing the next phrase
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




    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        const formMessage = document.getElementById('form-message');

        // Simple form validation
        if (!name || !email || !message) {
            formMessage.style.display = 'block';
            formMessage.style.color = 'red';
            formMessage.textContent = 'All fields are required!';
            return;
        }

        if (!validateEmail(email)) {
            formMessage.style.display = 'block';
            formMessage.style.color = 'red';
            formMessage.textContent = 'Please enter a valid email address!';
            return;
        }

        // Clear previous message
        formMessage.style.display = 'none';

        // If everything is valid, simulate form submission (replace with your actual form handling logic)
        formMessage.style.display = 'block';
        formMessage.style.color = 'green';
        formMessage.textContent = 'Message sent successfully!';

        // Reset form after a delay
        setTimeout(() => {
            document.getElementById('contact-form').reset();
            formMessage.style.display = 'none';
        }, 2000);
    });

    // Email validation function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }


