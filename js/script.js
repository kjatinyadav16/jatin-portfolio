document.addEventListener('DOMContentLoaded', () => {
    // Enable animations only if script is running
    document.body.classList.add('js-reveal');

    /* =========================================
       1. Preloader
    ========================================= */
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1000);

    /* =========================================
       2. Theme Toggle (Dark/Light Mode)
    ========================================= */
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const themeIcon = themeToggle.querySelector('i');
    
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Determine initial theme
    let currentTheme = 'dark';
    if (savedTheme) {
        currentTheme = savedTheme;
    } else if (!systemPrefersDark) {
        currentTheme = 'light';
    }
    
    // Apply initial theme
    applyTheme(currentTheme);

    themeToggle.addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(currentTheme);
        localStorage.setItem('theme', currentTheme);
    });

    function applyTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
        
        // Attempt to update Vanta if it's already initialized
        if (typeof initVanta === 'function') {
            try {
                initVanta(theme);
            } catch (e) {
                console.error("Vanta update failed:", e);
            }
        }
    }

    /* =========================================
       3. Mobile Navigation Menu
    ========================================= */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    /* =========================================
       4. Navbar Scroll Effect & Active Link
    ========================================= */
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Navbar Scrolled State
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Link Highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });

    /* =========================================
       5. Scroll Reveal & Progress Bar Animations
    ========================================= */
    const revealElements = document.querySelectorAll('.reveal');
    const progressBars = document.querySelectorAll('.progress');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Animate progress bars if inside skills section
                if (entry.target.classList.contains('skill-category')) {
                    const bars = entry.target.querySelectorAll('.progress');
                    bars.forEach(bar => {
                        const width = bar.getAttribute('data-width');
                        bar.style.width = width;
                    });
                }
                
                // Optional: Unobserve after revealing to animate only once
                // observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1, // Lower threshold
        rootMargin: "0px 0px 50px 0px" // Trigger BEFORE it comes perfectly into view, positive margin
    });

    try {
        revealElements.forEach(el => revealObserver.observe(el));
        
        // Manually trigger hero reveals immediately
        setTimeout(() => {
            document.querySelectorAll('#home .reveal').forEach(el => el.classList.add('active'));
        }, 150);
    } catch (e) {
        console.error("Reveal observer failed:", e);
        // Safety: remove js-reveal class if it fails
        document.body.classList.remove('js-reveal');
    }

    /* =========================================
       6. Dynamic Footer Year
    ========================================= */
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    /* =========================================
       7. Vanta.js 3D Background
    ========================================= */
    const particles = document.getElementById('particles');
    let vantaEffect = null;
    
    function initVanta(theme) {
        try {
            if (typeof VANTA === 'undefined') {
                console.warn("Vanta.js not loaded yet.");
                return;
            }
            if (vantaEffect) vantaEffect.destroy();
            
            let colorConfig = {
                color: 0x38bdf8,
                backgroundColor: 0x0f172a,
                points: 12.00,
                maxDistance: 20.00,
                spacing: 16.00
            };

            if (theme === 'light') {
                colorConfig = {
                    color: 0x3b82f6,
                    backgroundColor: 0xf8fafc,
                    points: 12.00,
                    maxDistance: 20.00,
                    spacing: 16.00
                };
            }

            vantaEffect = VANTA.NET({
                el: particles,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                ...colorConfig
            });
        } catch (err) {
            console.error("Vanta initialization failed:", err);
        }
    }

    // Initial Vanta call
    initVanta(currentTheme);

    /* =========================================
       8. Typed.js Initialization
    ========================================= */
    if (document.getElementById('typed-tagline')) {
        try {
            if (typeof Typed !== 'undefined') {
                new Typed('#typed-tagline', {
                    strings: [
                        'Aspiring Software Engineer',
                        'Full Stack Developer',
                        'Data Enthusiast',
                        'Problem Solver'
                    ],
                    typeSpeed: 50,
                    backSpeed: 30,
                    backDelay: 2000,
                    loop: true,
                    showCursor: true,
                    cursorChar: '|'
                });
            } else {
                console.warn("Typed.js not loaded.");
            }
        } catch (err) {
            console.error("Typed.js failed:", err);
        }
    }

    /* =========================================
       9. Custom Glowing Cursor
    ========================================= */
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    const cursorFollower = document.createElement('div');
    cursorFollower.classList.add('cursor-follower');
    document.body.appendChild(cursorFollower);

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Update main cursor immediately
        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    });

    // Smooth follow for the glowing orb
    function animateCursor() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        cursorFollower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Add hover states for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-category');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorFollower.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorFollower.classList.remove('hover');
        });
    });

    /* =========================================
       10. Expandable Case Studies Logic
    ========================================= */
    const caseStudyCards = document.querySelectorAll('.case-study-card');
    
    caseStudyCards.forEach(card => {
        const readMoreBtn = card.querySelector('.read-more-btn');
        const readLessBtn = card.querySelector('.read-less-btn');
        const detailsSection = card.querySelector('.case-study-details');
        
        if (readMoreBtn && readLessBtn && detailsSection) {
            readMoreBtn.addEventListener('click', () => {
                detailsSection.classList.add('expanded');
                readMoreBtn.style.display = 'none';
            });
            
            readLessBtn.addEventListener('click', () => {
                detailsSection.classList.remove('expanded');
                readMoreBtn.style.display = 'inline-block';
                // Scroll back to top of card slightly
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            });
        }
    });

    /* =========================================
       11. Contact Form AJAX Submission (Premium)
    ========================================= */
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-button');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            
            const formData = new FormData(this);
            
            // UI State: Loading
            submitBtn.disabled = true;
            const btnText = submitBtn.querySelector('span');
            const btnIcon = submitBtn.querySelector('i');
            const originalText = btnText.textContent;
            
            btnText.textContent = 'Sending...';
            btnIcon.className = 'fas fa-spinner fa-spin';
            
            formStatus.style.display = 'block';
            formStatus.className = 'form-status-msg info';
            formStatus.textContent = 'Preparing your message...';

            try {
                const response = await fetch(this.action, {
                    method: this.method,
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Success UI
                    formStatus.className = 'form-status-msg success';
                    formStatus.textContent = 'Thanks! Your message has been sent successfully.';
                    btnText.textContent = 'Sent!';
                    btnIcon.className = 'fas fa-check';
                    contactForm.reset();
                } else {
                    const result = await response.json();
                    throw new Error(result.error || 'Oops! There was a problem submitting your form');
                }
            } catch (error) {
                // Error UI
                formStatus.className = 'form-status-msg error';
                formStatus.textContent = error.message;
                btnText.textContent = 'Error';
                btnIcon.className = 'fas fa-exclamation-triangle';
            } finally {
                // Reset button state after a delay
                setTimeout(() => {
                    submitBtn.disabled = false;
                    btnText.textContent = originalText;
                    btnIcon.className = 'fas fa-arrow-right';
                }, 4000);
            }
        });
    }

    /* =========================================
       12. Copy to Clipboard Functionality
    ========================================= */
    const copyBtns = document.querySelectorAll('.copy-btn');
    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const textToCopy = btn.getAttribute('data-copy');
            const icon = btn.querySelector('i');
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                btn.classList.add('copied');
                icon.className = 'fas fa-check';
                
                const originalTitle = btn.title;
                btn.title = 'Copied!';
                
                setTimeout(() => {
                    btn.classList.remove('copied');
                    icon.className = 'far fa-copy';
                    btn.title = originalTitle;
                }, 2000);
            });
        });
    });

});
