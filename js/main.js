// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }
    
    // Easter egg counter
    let easterEggsFound = 0;
    const easterEggCounter = document.querySelector('.easter-egg-counter');
    const easterEggCountDisplay = easterEggCounter ? easterEggCounter.querySelector('span') : null;
    
    function incrementEasterEgg() {
        easterEggsFound++;
        console.log("Easter egg found! Total: " + easterEggsFound);
        
        if (easterEggCounter && easterEggCountDisplay) {
            easterEggCountDisplay.textContent = easterEggsFound;
            
            if (easterEggsFound === 1) {
                easterEggCounter.style.display = 'block';
                easterEggCounter.style.opacity = '0.2';
            }
            
            // Unlock special message at 3 easter eggs
            if (easterEggsFound >= 3) {
                easterEggCounter.style.color = 'var(--secondary)';
                easterEggCounter.style.opacity = '0.8';
            }
        }
    }
      // Trophy easter egg - make sure it works properly
    const trophyIcon = document.querySelector('.feature-icon[title="Double-click me"] i');
    console.log("Trophy icon found:", trophyIcon);
    
    if (trophyIcon) {
        trophyIcon.addEventListener('click', function(e) {
            console.log("Trophy clicked!");
            activateTrophyEffect(this);
        });
        
        trophyIcon.addEventListener('dblclick', function(e) {
            console.log("Trophy double-clicked!");
            e.stopPropagation();
            activateTrophyEffect(this);
        });
    }
    
    function activateTrophyEffect(element) {
        // Change icon temporarily
        element.className = 'fas fa-award';
        element.style.color = 'gold';
        
        // Track easter egg
        incrementEasterEgg();
        
        // Flash effect
        const icon = element.parentElement;
        icon.style.transform = 'scale(1.2)';
        
        setTimeout(() => {
            // Reset after 3 seconds
            element.className = 'fas fa-trophy';
            element.style.color = '';
            icon.style.transform = '';
        }, 3000);
    }
      // Easter Egg: Konami Code (up, up, down, down, left, right, left, right, B, A)
    // Fix implementation to ensure it works properly
    let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiCodePosition = 0;
    let konamiDebug = false;
      document.addEventListener('keydown', function(e) {
        // Get the key
        const key = e.key;
        // Get the required key from the code
        const requiredKey = konamiCode[konamiCodePosition];
        
        // Compare the key with the required key
        if (key.toLowerCase() === requiredKey.toLowerCase()) {
            konamiCodePosition++;
            
            // If the last key is reached, activate the easter egg
            if (konamiCodePosition === konamiCode.length) {
                activateDiscFlightMode();
                incrementEasterEgg();
                konamiCodePosition = 0;
            }
        } else {
            konamiCodePosition = 0;
        }
    });
      // No debug function needed
      // Disc Flight Easter Egg - revised to ensure it works
    function activateDiscFlightMode() {
        console.log("Activating disc flight!");
        
        // Create a disc element
        const disc = document.createElement('div');
        disc.classList.add('flying-disc');
        disc.style.position = 'fixed';
        disc.style.width = '60px';
        disc.style.height = '15px';
        disc.style.borderRadius = '50%';
        disc.style.zIndex = '9999';
        disc.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.3)';
        disc.style.pointerEvents = 'none';
        
        document.body.appendChild(disc);
        
        // Randomize the disc color
        const colors = ['#3949AB', '#00BFA5', '#FF6E40', '#4CAF50', '#9C27B0'];
        disc.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Animate the disc across the screen
        let posX = -100;
        let posY = Math.random() * window.innerHeight / 2;
        let rotation = 0;
        let speed = 5 + Math.random() * 5;
        let curve = Math.random() * 0.5 + 0.2;
        
        function animateDisc() {
            posX += speed;
            // Create a curved flight path
            posY += Math.sin(posX / 100) * curve;
            rotation += speed;
            
            disc.style.transform = `translate(${posX}px, ${posY}px) rotate(${rotation}deg)`;
            
            // Remove disc when it leaves the screen
            if (posX > window.innerWidth + 100) {
                disc.remove();
                console.log("Disc animation complete");
            } else {
                requestAnimationFrame(animateDisc);
            }
        }
        
        // Start animation
        animateDisc();
        
        // Add a small flash effect
        document.body.classList.add('disc-flash');
        setTimeout(() => {
            document.body.classList.remove('disc-flash');
        }, 300);
        
        return "Disc thrown!";
    }
    
    // QOL: Add reading time estimation for long text sections
    function addReadingTimeEstimates() {
        const sections = document.querySelectorAll('.roadmap-content p, .feature-card p, .qr-info p');
        sections.forEach(section => {
            if (section.textContent.length > 100) {
                const words = section.textContent.split(/\s+/).length;
                // Average reading speed: 200 words per minute
                const readingTimeSeconds = Math.ceil(words / 200 * 60);
                let readingTime;
                
                if (readingTimeSeconds < 60) {
                    readingTime = `${readingTimeSeconds} sec read`;
                } else {
                    readingTime = `${Math.ceil(readingTimeSeconds / 60)} min read`;
                }
                
                const timeIndicator = document.createElement('span');
                timeIndicator.classList.add('reading-time');
                timeIndicator.textContent = readingTime;
                section.parentNode.insertBefore(timeIndicator, section.nextSibling);
            }
        });
    }
    
    // QOL: Add subtle scroll indicator for mobile users
    function addScrollIndicator() {
        const scrollIndicator = document.createElement('div');
        scrollIndicator.classList.add('scroll-indicator');
        scrollIndicator.innerHTML = `<span class="scroll-arrow">↓</span>`;
        document.querySelector('.hero').appendChild(scrollIndicator);
        
        // Hide scroll indicator after user has scrolled
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                scrollIndicator.classList.add('hidden');
            }
        });
    }
    
      // API Tabs
    const tabButtons = document.querySelectorAll('.tab-button');
    const codeBlocks = document.querySelectorAll('.code-block');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and code blocks
            tabButtons.forEach(btn => btn.classList.remove('active'));
            codeBlocks.forEach(block => block.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding code block
            const tabId = button.getAttribute('data-tab');
            document.getElementById(`${tabId}-example`).classList.add('active');
        });
    });
      // Apply simple syntax highlighting
    function applySyntaxHighlighting() {
        const codeElements = document.querySelectorAll('.code-block code');
        
        codeElements.forEach(codeElement => {
            let html = codeElement.innerHTML;
            
            // Multi-line comments
            html = html.replace(/\/\*([\s\S]*?)\*\//g, '<span class="comment">/*$1*/</span>');
            
            // Single-line Comments
            html = html.replace(/(\/\/.*)/g, '<span class="comment">$1</span>');
            
            // Strings
            html = html.replace(/(".*?")/g, '<span class="string">$1</span>');
            html = html.replace(/('.*?')/g, '<span class="string">$1</span>');
            
            // Numbers
            html = html.replace(/\b(\d+)\b/g, '<span class="number">$1</span>');
            
            // Keywords
            const keywords = ['const', 'let', 'var', 'function', 'return', 'if', 'then', 'fetch', 'new', 'true', 'false'];
            keywords.forEach(keyword => {
                const regex = new RegExp(`\\b(${keyword})\\b`, 'g');
                html = html.replace(regex, '<span class="keyword">$1</span>');
            });
            
            // Methods
            html = html.replace(/\.([a-zA-Z]\w*)/g, '.<span class="method">$1</span>');
            
            codeElement.innerHTML = html;
        });
    }
    
    // Apply syntax highlighting when page loads
    applySyntaxHighlighting();
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    // Function to handle intersection
    function handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation classes
                entry.target.classList.add('visible');
                
                // If it's a counter, animate it
                if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                }
                
                // Stop observing after animation
                if (!entry.target.classList.contains('stat-number')) {
                    observer.unobserve(entry.target);
                }
            }
        });
    }
    
    // Create observer
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    // Observe elements with animation classes
    document.querySelectorAll('.feature-card, .stat-item, .step, .qr-image, .qr-info, .api-cta .button')
        .forEach(element => {
            element.classList.add('slide-up');
            observer.observe(element);
        });
    
    // Observe roadmap items
    document.querySelectorAll('.timeline-item, .community-callout')
        .forEach(element => {
            element.classList.add('slide-up');
            observer.observe(element);
        });

    // Add animation to contribution callout
    document.querySelectorAll('.contribution-callout')
        .forEach(element => {
            element.classList.add('fade-in');
            observer.observe(element);
        });
        
    // Observe community badges
    document.querySelectorAll('.community-badge')
        .forEach(element => {
            element.classList.add('fade-in');
            observer.observe(element);
        });
    
    // Stats counter animation
    function animateCounter(counterElement) {
        const target = parseInt(counterElement.getAttribute('data-target'));
        const duration = 2000; // milliseconds
        let startTime = null;
        const startValue = parseInt(counterElement.textContent.replace(/,/g, ''));
        
        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            
            let currentValue = Math.floor(progress * (target - startValue) + startValue);
            
            // Add thousand separators
            counterElement.textContent = currentValue.toLocaleString();
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                counterElement.textContent = target.toLocaleString();
            }
        }
        
        window.requestAnimationFrame(step);
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Offset for fixed navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
            }
        });
    });
    
    // Add animation to floating phone mockup
    const phoneMockup = document.querySelector('.phone-mockup');
    if (phoneMockup) {
        document.addEventListener('mousemove', e => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            // Subtle movement based on mouse position
            const moveX = (mouseX - 0.5) * 20;
            const moveY = (mouseY - 0.5) * 20;
            
            phoneMockup.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    }
    
    // Animated gradient background
    const gradientBg = document.querySelector('.gradient-bg');
    if (gradientBg) {
        gradientBg.style.backgroundSize = '400% 400%';
    }
    
    // Form submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = Object.fromEntries(formData.entries());
            
            // Simple form validation
            let isValid = true;
            for (const [key, value] of Object.entries(formObject)) {
                if (!value.trim()) {
                    isValid = false;
                    break;
                }
            }
            
            if (isValid) {
                // Normally you'd send this data to your server
                // For now, just show a success message
                contactForm.innerHTML = '<div class="success-message">Thanks for your message! We\'ll get back to you soon.</div>';
            }
        });
    }
    
    // Generate placeholder SVG for logo
    function createSimpleLogo() {
        const logoPlaceholders = document.querySelectorAll('#logo-placeholder, #footer-logo-placeholder');
        
        logoPlaceholders.forEach(placeholder => {
            // Create SVG
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('viewBox', '0 0 40 40');
            svg.setAttribute('width', '40');
            svg.setAttribute('height', '40');
            
            // Create gradient
            const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
            const linearGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
            linearGradient.id = 'logoGradient';
            linearGradient.setAttribute('x1', '0%');
            linearGradient.setAttribute('y1', '0%');
            linearGradient.setAttribute('x2', '100%');
            linearGradient.setAttribute('y2', '100%');
            
            const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop1.setAttribute('offset', '0%');
            stop1.setAttribute('stop-color', '#4f46e5');
            
            const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop2.setAttribute('offset', '100%');
            stop2.setAttribute('stop-color', '#10b981');
            
            linearGradient.appendChild(stop1);
            linearGradient.appendChild(stop2);
            defs.appendChild(linearGradient);
            svg.appendChild(defs);
            
            // Create disc shape with gradient
            const disc = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            disc.setAttribute('cx', '20');
            disc.setAttribute('cy', '20');
            disc.setAttribute('r', '15');
            disc.setAttribute('fill', 'url(#logoGradient)');
            
            // Create inner circle
            const innerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            innerCircle.setAttribute('cx', '20');
            innerCircle.setAttribute('cy', '20');
            innerCircle.setAttribute('r', '5');
            innerCircle.setAttribute('fill', 'white');
            
            svg.appendChild(disc);
            svg.appendChild(innerCircle);
            
            // Replace placeholder
            placeholder.replaceWith(svg);
        });
    }
    
    // Create QR code placeholder
    function createQrCodePlaceholder() {
        const qrPlaceholder = document.getElementById('qr-placeholder');
        if (!qrPlaceholder) return;
        
        // Create SVG
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 200 200');
        svg.setAttribute('width', '200');
        svg.setAttribute('height', '200');
        svg.style.background = 'white';
        
        // Draw QR code frame
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', '10');
        rect.setAttribute('y', '10');
        rect.setAttribute('width', '180');
        rect.setAttribute('height', '180');
        rect.setAttribute('stroke', '#4f46e5');
        rect.setAttribute('stroke-width', '2');
        rect.setAttribute('fill', 'none');
        svg.appendChild(rect);
        
        // Add position squares (top-left, top-right, bottom-left)
        const positions = [
            [30, 30], [150, 30], [30, 150]
        ];
        
        positions.forEach(pos => {
            const outerRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            outerRect.setAttribute('x', pos[0]);
            outerRect.setAttribute('y', pos[1]);
            outerRect.setAttribute('width', '20');
            outerRect.setAttribute('height', '20');
            outerRect.setAttribute('fill', '#4f46e5');
            svg.appendChild(outerRect);
            
            const innerRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            innerRect.setAttribute('x', pos[0] + 5);
            innerRect.setAttribute('y', pos[1] + 5);
            innerRect.setAttribute('width', '10');
            innerRect.setAttribute('height', '10');
            innerRect.setAttribute('fill', 'white');
            svg.appendChild(innerRect);
        });
        
        // Add some random squares to look like a QR code
        for (let i = 0; i < 100; i++) {
            const x = Math.floor(Math.random() * 140) + 30;
            const y = Math.floor(Math.random() * 140) + 30;
            
            // Skip areas around the position squares
            const isInPositionSquare = positions.some(pos => 
                x > pos[0] - 10 && x < pos[0] + 30 && 
                y > pos[1] - 10 && y < pos[1] + 30
            );
            
            if (!isInPositionSquare) {
                const dot = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                dot.setAttribute('x', x);
                dot.setAttribute('y', y);
                dot.setAttribute('width', '4');
                dot.setAttribute('height', '4');
                dot.setAttribute('fill', '#4f46e5');
                svg.appendChild(dot);
            }
        }
        
        // Add text at the bottom
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', '100');
        text.setAttribute('y', '190');
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('fill', '#4f46e5');
        text.setAttribute('font-size', '12');
        text.textContent = 'Scan to find disc';
        svg.appendChild(text);
        
        // Replace placeholder
        qrPlaceholder.replaceWith(svg);
    }
    
    // Create phone mockup placeholder
    function createPhoneMockupPlaceholder() {
        const phonePlaceholder = document.getElementById('phone-mockup-placeholder');
        if (!phonePlaceholder) return;
        
        // Create SVG
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 270 570');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        
        // Create gradient background
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const linearGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        linearGradient.id = 'phoneGradient';
        linearGradient.setAttribute('x1', '0%');
        linearGradient.setAttribute('y1', '0%');
        linearGradient.setAttribute('x2', '100%');
        linearGradient.setAttribute('y2', '100%');
        
        const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop1.setAttribute('offset', '0%');
        stop1.setAttribute('stop-color', '#4f46e5');
        stop1.setAttribute('stop-opacity', '0.1');
        
        const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop2.setAttribute('offset', '100%');
        stop2.setAttribute('stop-color', '#10b981');
        stop2.setAttribute('stop-opacity', '0.1');
        
        linearGradient.appendChild(stop1);
        linearGradient.appendChild(stop2);
        defs.appendChild(linearGradient);
        svg.appendChild(defs);
        
        // Create phone screen
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', '0');
        rect.setAttribute('y', '0');
        rect.setAttribute('width', '270');
        rect.setAttribute('height', '570');
        rect.setAttribute('fill', 'url(#phoneGradient)');
        svg.appendChild(rect);
        
        // Create app UI elements
        
        // Header
        const header = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        header.setAttribute('x', '0');
        header.setAttribute('y', '0');
        header.setAttribute('width', '270');
        header.setAttribute('height', '60');
        header.setAttribute('fill', '#4f46e5');
        svg.appendChild(header);
        
        // Header text
        const headerText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        headerText.setAttribute('x', '135');
        headerText.setAttribute('y', '35');
        headerText.setAttribute('text-anchor', 'middle');
        headerText.setAttribute('fill', 'white');
        headerText.setAttribute('font-size', '18');
        headerText.textContent = 'Hyzeer';
        svg.appendChild(headerText);
        
        // Map section
        const mapRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        mapRect.setAttribute('x', '15');
        mapRect.setAttribute('y', '75');
        mapRect.setAttribute('width', '240');
        mapRect.setAttribute('height', '160');
        mapRect.setAttribute('rx', '8');
        mapRect.setAttribute('fill', '#e5e7eb');
        svg.appendChild(mapRect);
        
        // Create some "map" elements
        for (let i = 0; i < 3; i++) {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', 50 + i * 70);
            circle.setAttribute('cy', 140);
            circle.setAttribute('r', 15 + i * 5);
            circle.setAttribute('fill', 'none');
            circle.setAttribute('stroke', '#10b981');
            circle.setAttribute('stroke-width', '2');
            svg.appendChild(circle);
        }
        
        // Course name
        const courseText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        courseText.setAttribute('x', '135');
        courseText.setAttribute('y', '100');
        courseText.setAttribute('text-anchor', 'middle');
        courseText.setAttribute('fill', '#111827');
        courseText.setAttribute('font-size', '14');
        courseText.textContent = 'Maple Hill Disc Golf';
        svg.appendChild(courseText);
        
        // Disc section title
        const discTitle = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        discTitle.setAttribute('x', '25');
        discTitle.setAttribute('y', '270');
        discTitle.setAttribute('fill', '#111827');
        discTitle.setAttribute('font-size', '16');
        discTitle.textContent = 'My Discs';
        svg.appendChild(discTitle);
        
        // Disc items
        for (let i = 0; i < 4; i++) {
            const discItem = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            discItem.setAttribute('x', '15');
            discItem.setAttribute('y', 290 + i * 60);
            discItem.setAttribute('width', '240');
            discItem.setAttribute('height', '50');
            discItem.setAttribute('rx', '8');
            discItem.setAttribute('fill', 'white');
            discItem.setAttribute('stroke', '#e5e7eb');
            discItem.setAttribute('stroke-width', '1');
            svg.appendChild(discItem);
            
            // Disc circle
            const discCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            discCircle.setAttribute('cx', '40');
            discCircle.setAttribute('cy', 290 + i * 60 + 25);
            discCircle.setAttribute('r', '15');
            discCircle.setAttribute('fill', ['#4f46e5', '#10b981', '#ef4444', '#f59e0b'][i % 4]);
            svg.appendChild(discCircle);
            
            // Disc name
            const discName = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            discName.setAttribute('x', '65');
            discName.setAttribute('y', 290 + i * 60 + 20);
            discName.setAttribute('fill', '#111827');
            discName.setAttribute('font-size', '14');
            discName.textContent = ['Driver', 'Mid-range', 'Putter', 'Approach'][i % 4];
            svg.appendChild(discName);
            
            // Disc details
            const discDetails = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            discDetails.setAttribute('x', '65');
            discDetails.setAttribute('y', 290 + i * 60 + 40);
            discDetails.setAttribute('fill', '#6b7280');
            discDetails.setAttribute('font-size', '12');
            discDetails.textContent = ['Distance: 120m', 'Stability: Stable', 'Weight: 175g', 'Flight: 9/5/-1/2'][i % 4];
            svg.appendChild(discDetails);
        }
        
        // Bottom navigation
        const bottomNav = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        bottomNav.setAttribute('x', '0');
        bottomNav.setAttribute('y', '520');
        bottomNav.setAttribute('width', '270');
        bottomNav.setAttribute('height', '50');
        bottomNav.setAttribute('fill', 'white');
        bottomNav.setAttribute('stroke', '#e5e7eb');
        bottomNav.setAttribute('stroke-width', '1');
        svg.appendChild(bottomNav);
        
        // Navigation icons
        const navIcons = ['M135 535 L135 545 M125 535 L145 535', 'M120 540 L130 540 M140 540 L150 540', 'M125 535 L135 545 L145 535'];
        for (let i = 0; i < 3; i++) {
            const navIcon = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            navIcon.setAttribute('d', navIcons[i]);
            navIcon.setAttribute('stroke', i === 0 ? '#4f46e5' : '#6b7280');
            navIcon.setAttribute('stroke-width', '2');
            navIcon.setAttribute('transform', `translate(${i * 90 - 45}, 0)`);
            svg.appendChild(navIcon);
        }
        
        // Replace placeholder
        phonePlaceholder.replaceWith(svg);
    }    // Create all placeholders
    createSimpleLogo();
    createQrCodePlaceholder();
    createPhoneMockupPlaceholder();
    
    // Initialize QOL features
    addReadingTimeEstimates();
    addScrollIndicator();
    
    // Enable disc drag and throw
    enableDiscInteraction();
      // Easter egg counter stays hidden until discovered naturally
    const counter = document.querySelector('.easter-egg-counter');
    if (counter) {
        counter.style.display = 'none'; // Keep hidden until discovered
    }
    
    // Detect if user came from another disc golf site 
    // (simple easter egg that changes subtitle text)
    function checkReferrer() {
        const referrer = document.referrer.toLowerCase();
        const discGolfDomains = ['udisc.com', 'pdga.com', 'discgolfscene.com', 'dgcoursereview.com'];
        
        if (discGolfDomains.some(domain => referrer.includes(domain))) {
            const subtitle = document.querySelector('.hero .subtitle');
            if (subtitle) {
                subtitle.innerHTML += ' <span class="welcome-note">(Welcome from the other side!)</span>';
            }
        }
    }
    
    checkReferrer();
    
    function getWeatherIcon(code) {
        if (code >= 200 && code < 300) return 'bolt';    // thunder
        if (code >= 300 && code < 400) return 'cloud-rain'; // drizzle
        if (code >= 500 && code < 600) return 'umbrella'; // rain
        if (code >= 600 && code < 700) return 'snowflake'; // snow
        if (code >= 700 && code < 800) return 'smog';    // fog/mist
        if (code === 800) return 'sun';      // clear sky
        return 'cloud';                      // clouds
    }
    
    function getWindDirection(degrees) {
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        return directions[Math.round(degrees / 45) % 8];
    }
    
    // QOL: Allow dragging and throwing the logo disc
    function enableDiscInteraction() {
        const logos = document.querySelectorAll('#logo-placeholder, #footer-logo-placeholder');
        
        logos.forEach(logo => {
            let isDragging = false;
            let startX, startY, lastX, lastY;
            let velocityX = 0, velocityY = 0;
            
            logo.addEventListener('mousedown', startDrag);
            logo.addEventListener('touchstart', e => {
                const touch = e.touches[0];
                startDrag({ clientX: touch.clientX, clientY: touch.clientY });
            });
            
            function startDrag(e) {
                isDragging = true;
                startX = lastX = e.clientX;
                startY = lastY = e.clientY;
                
                logo.style.cursor = 'grabbing';
                logo.style.transition = 'none';
                
                document.addEventListener('mousemove', drag);
                document.addEventListener('touchmove', touchDrag);
                document.addEventListener('mouseup', stopDrag);
                document.addEventListener('touchend', stopDrag);
                
                // Prevent text selection while dragging
                e.preventDefault();
            }
            
            function touchDrag(e) {
                const touch = e.touches[0];
                drag({ clientX: touch.clientX, clientY: touch.clientY });
            }
            
            function drag(e) {
                if (!isDragging) return;
                
                // Calculate velocity
                velocityX = e.clientX - lastX;
                velocityY = e.clientY - lastY;
                
                // Update position
                lastX = e.clientX;
                lastY = e.clientY;
                
                // Move the logo
                logo.style.transform = `translate(${e.clientX - startX}px, ${e.clientY - startY}px)`;
            }
            
            function stopDrag() {
                if (!isDragging) return;
                isDragging = false;
                
                document.removeEventListener('mousemove', drag);
                document.removeEventListener('touchmove', touchDrag);
                
                logo.style.cursor = 'grab';
                logo.style.transition = 'transform 0.5s ease';
                logo.style.transform = 'translate(0, 0)';
                
                // If thrown with enough force, trigger the disc flight animation
                if (Math.abs(velocityX) > 15 || Math.abs(velocityY) > 15) {
                    activateDiscFlightMode();
                }
            }
            
            // Make the logo look interactive
            logo.style.cursor = 'grab';
        });
    }
    
    // Add more user-discoverable easter eggs
    function addUserFriendlyEasterEggs() {
        // Logo easter egg - triple click (easier to discover than Konami code)
        const siteLogo = document.querySelector('.logo h1');
        if (siteLogo) {
            let clickCount = 0;
            let clickTimer = null;
            
            siteLogo.addEventListener('click', function() {
                clickCount++;
                
                // Reset click count after a delay
                clearTimeout(clickTimer);
                clickTimer = setTimeout(() => {
                    clickCount = 0;
                }, 1000);
                
                // Activate on triple click
                if (clickCount >= 3) {
                    activateDiscFlightMode();
                    incrementEasterEgg();
                    clickCount = 0;
                }
            });
        }
        
        // Add disc design easter egg to QR code image
        const qrImage = document.querySelector('.qr-image');
        if (qrImage) {
            qrImage.addEventListener('mouseover', function() {
                if (Math.random() < 0.2) { // 20% chance on hover
                    this.style.transform = 'rotate(360deg)';
                    this.style.transition = 'transform 1s ease';
                    incrementEasterEgg();
                    
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 1000);
                }
            });
        }
    }
    
    // Call this function to add the new easter eggs
    addUserFriendlyEasterEggs();
});
