
document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // Enhanced Slideshow Code
    // ======================
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    let slideInterval;
    const slideDuration = 5000; // 5 seconds per slide
    const transitionDuration = 1500; // 1.5 second transition

    function showSlide(n) {
        // Clear all active classes first
        slides.forEach(slide => {
            slide.style.transition = `opacity ${transitionDuration}ms ease-in-out`;
            slide.classList.remove('active', 'prev');
        });

        // Set previous slide for transition effect
        if (slides[currentSlide]) {
            slides[currentSlide].classList.add('prev');
        }

        // Update current slide index
        currentSlide = (n + slides.length) % slides.length;
        
        // Apply active class to new slide
        slides[currentSlide].classList.add('active');
        
        // Force reflow to enable transition
        void slides[currentSlide].offsetWidth;
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function startSlideshow() {
        showSlide(0);
        slideInterval = setInterval(nextSlide, slideDuration);
    }

    function pauseSlideshow() {
        clearInterval(slideInterval);
    }

    // Start slideshow
    startSlideshow();

    // Pause on hover (optional)
    const heroSection = document.querySelector('.hero');
    heroSection.addEventListener('mouseenter', pauseSlideshow);
    heroSection.addEventListener('mouseleave', startSlideshow);
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Sticky navbar on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'var(--white)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Animate stats counter
    const stats = document.querySelectorAll('.number');
    const statsSection = document.querySelector('.about');
    
    function animateStats() {
        const rect = statsSection.getBoundingClientRect();
        const isVisible = (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2);
        
        if (isVisible) {
            stats.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                const duration = 1999;
                const step = target / (duration / 16);
                let current = 0;
                
                const counter = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        clearInterval(counter);
                        stat.textContent = target;
                    } else {
                        stat.textContent = Math.floor(current);
                    }
                }, 16);
            });
            
            // Remove the event listener after animation
            window.removeEventListener('scroll', animateStats);
        }
    }
    
    // Initialize stats animation when section is in view
    window.addEventListener('scroll', animateStats);
    
    // Load more gallery items
    const loadMoreBtn = document.getElementById('loadMore');
    const hiddenGallery = document.getElementById('hiddenGallery');
    
    if (loadMoreBtn && hiddenGallery) {
        loadMoreBtn.addEventListener('click', function() {
            // This is where you would typically fetch more items from a server
            // For demo purposes, we'll just add some placeholder items
            const additionalItems = [
                {
                    img: 'https://images.unsplash.com/photo-1599351431403-8915d5374561?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                    title: 'Hair Coloring'
                },
                {
                    img: 'https://images.unsplash.com/photo-1595475885542-6f2388871aea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                    title: 'Eyebrow Shaping'
                },
                {
                    img: 'https://images.unsplash.com/photo-1596704017256-e2a4f8c01e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                    title: 'Hair Treatment'
                },
                {
                    img: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                    title: 'Makeup Artistry'
                }
            ];
            
            // Add the new items to the hidden gallery
            additionalItems.forEach(item => {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                galleryItem.innerHTML = `
                    <img src="${item.img}" alt="${item.title}">
                    <div class="overlay">
                        <h3>${item.title}</h3>
                    </div>
                `;
                hiddenGallery.appendChild(galleryItem);
            });
            
            // Show the hidden gallery
            hiddenGallery.style.display = 'grid';
            loadMoreBtn.style.display = 'none';
        });
    }
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            // For demo purposes, we'll just show an alert
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
    
    // Set active nav link based on scroll position
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});