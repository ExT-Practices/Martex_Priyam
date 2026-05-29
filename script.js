document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    const navbarLogoDesktop = document.querySelector('.logo-desktop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            navbar.classList.add('opacity-95');
            navbar.classList.remove('opacity-100');
            if (navbarLogoDesktop) {
                if (document.documentElement.classList.contains('dark')) {
                    navbarLogoDesktop.src = './images/martex-logo-pinkwhite.png';
                } else {
                    navbarLogoDesktop.src = './images/martex-logo-pink.png';
                }
            }
        } else {
            navbar.classList.remove('scrolled');
            navbar.classList.add('opacity-100');
            navbar.classList.remove('opacity-95');
            if (navbarLogoDesktop) navbarLogoDesktop.src = './images/martex-logo-white.png';
        }
    });

    // Mobile menu toggle
    const mobileBtn = document.getElementById('mobile-menu-button');
    const closeBtn = document.getElementById('close-menu-button');
    const navMenu = document.getElementById('navbarNav');
    const overlay = document.getElementById('mobile-overlay');
    
    function toggleMenu() {
        const isClosed = navMenu.classList.contains('translate-x-full');
        if (isClosed) {
            navMenu.classList.remove('translate-x-full');
            if (overlay) {
                overlay.classList.remove('hidden');
                setTimeout(() => overlay.classList.remove('opacity-0'), 10);
            }
        } else {
            navMenu.classList.add('translate-x-full');
            if (overlay) {
                overlay.classList.add('opacity-0');
                setTimeout(() => overlay.classList.add('hidden'), 300);
            }
        }
    }

    if(mobileBtn) mobileBtn.addEventListener('click', toggleMenu);
    if(closeBtn) closeBtn.addEventListener('click', toggleMenu);
    if(overlay) overlay.addEventListener('click', toggleMenu);

    // Dropdown toggle for mobile
    const dropdowns = document.querySelectorAll('.dropdown-toggle');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', (e) => {
            if(window.innerWidth < 1024) {
                e.preventDefault();
                const menu = dropdown.nextElementSibling;
                // Close other open menus
                document.querySelectorAll('.dropdown-menu').forEach(m => {
                    if(m !== menu) m.classList.add('hidden');
                });
                menu.classList.toggle('hidden');
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if(href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offset = 80; // Navbar height offset
                    const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Theme Settings Toggle
    const themePanel = document.getElementById('theme-settings-panel');
    const themeBtn = document.getElementById('theme-toggle-btn');
    const colorBtns = document.querySelectorAll('.color-btn');
    const resetColorBtn = document.getElementById('reset-color-btn');
    const defaultColor = '#ff4d79';
    const root = document.documentElement;

    if (themeBtn && themePanel) {
        themeBtn.addEventListener('click', () => {
            themePanel.classList.toggle('translate-x-full');
        });
    }

    if (colorBtns) {
        colorBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const color = btn.getAttribute('data-color');
                root.style.setProperty('--primary-color', color);
            });
        });
    }

    if (resetColorBtn) {
        resetColorBtn.addEventListener('click', () => {
            root.style.setProperty('--primary-color', defaultColor);
        });
    }

    // Dark Mode Toggle
    const darkModeBtn = document.getElementById('dark-mode-btn');
    if (darkModeBtn) {
        darkModeBtn.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            const isDark = document.documentElement.classList.contains('dark');
            
            if (isDark) {
                darkModeBtn.textContent = 'Light Mode';
                darkModeBtn.classList.remove('text-white');
                darkModeBtn.classList.add('text-black', 'bg-white');
            } else {
                darkModeBtn.textContent = 'Dark Mode';
                darkModeBtn.classList.remove('text-black', 'bg-white');
            }
            
            // Update logo if scrolled
            if (window.scrollY > 50 && navbarLogoDesktop) {
                navbarLogoDesktop.src = isDark ? './images/martex-logo-pinkwhite.png' : './images/martex-logo-pink.png';
            }
        });
    }

    // Scroll Animations Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-slide-left, .scroll-slide-right, .scroll-slide-up').forEach(el => {
        scrollObserver.observe(el);
    });

    // Statistics Counter Animation
    const statsSection = document.getElementById('statistic-1');
    if (statsSection) {
        const counters = statsSection.querySelectorAll('.counter');
        const floatCounters = statsSection.querySelectorAll('.counter-float');
        
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const duration = 2000;
                    
                    counters.forEach(counter => {
                        const target = +counter.getAttribute('data-target');
                        let startTime = null;
                        
                        const updateCounter = (currentTime) => {
                            if (!startTime) startTime = currentTime;
                            const progress = currentTime - startTime;
                            const percentage = Math.min(progress / duration, 1);
                            const easeOut = 1 - Math.pow(1 - percentage, 3);
                            
                            counter.innerText = Math.floor(easeOut * target);
                            
                            if (progress < duration) {
                                requestAnimationFrame(updateCounter);
                            } else {
                                counter.innerText = target;
                            }
                        };
                        requestAnimationFrame(updateCounter);
                    });

                    floatCounters.forEach(counter => {
                        const target = parseFloat(counter.getAttribute('data-target'));
                        let startTime = null;
                        
                        const updateCounter = (currentTime) => {
                            if (!startTime) startTime = currentTime;
                            const progress = currentTime - startTime;
                            const percentage = Math.min(progress / duration, 1);
                            const easeOut = 1 - Math.pow(1 - percentage, 3);
                            
                            counter.innerText = (easeOut * target).toFixed(2);
                            
                            if (progress < duration) {
                                requestAnimationFrame(updateCounter);
                            } else {
                                counter.innerText = target.toFixed(2);
                            }
                        };
                        requestAnimationFrame(updateCounter);
                    });
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counterObserver.observe(statsSection);
    }

    // Video Modal
    const videoBtn = document.getElementById('play-video-btn');
    const videoModal = document.getElementById('video-modal');
    const closeVideo = document.getElementById('close-video');
    const ytPlayer = document.getElementById('youtube-player');
    const videoUrl = 'https://www.youtube.com/embed/7e90gBu4pas?autoplay=1';

    if (videoBtn && videoModal && closeVideo && ytPlayer) {
        videoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            ytPlayer.src = videoUrl;
            videoModal.classList.remove('hidden');
            // small delay to allow display:block to apply before changing opacity
            setTimeout(() => {
                videoModal.classList.remove('opacity-0');
            }, 10);
        });

        const closeModal = () => {
            videoModal.classList.add('opacity-0');
            setTimeout(() => {
                videoModal.classList.add('hidden');
                ytPlayer.src = ''; // Stop video playback
            }, 300);
        };

        closeVideo.addEventListener('click', closeModal);
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                closeModal();
            }
        });
    }

    // Brands Carousel Auto-scroll
    const brandsTrack = document.getElementById('brands-track');
    if (brandsTrack) {
        let isTransitioning = false;

        const moveCarousel = () => {
            if (isTransitioning || brandsTrack.children.length === 0) return;
            isTransitioning = true;
            
            const itemWidth = brandsTrack.firstElementChild.getBoundingClientRect().width;
            
            brandsTrack.style.transition = 'transform 0.5s ease-in-out';
            brandsTrack.style.transform = `translateX(-${itemWidth}px)`;
            
            setTimeout(() => {
                brandsTrack.style.transition = 'none';
                brandsTrack.style.transform = 'translateX(0)';
                brandsTrack.appendChild(brandsTrack.firstElementChild);
                
                // Small delay to ensure the browser registers the reset
                requestAnimationFrame(() => {
                    isTransitioning = false;
                });
            }, 500);
        };

        // Scroll every 1 second (1000ms pause + 500ms transition = 1500ms interval)
        setInterval(moveCarousel, 1500);
    }

    // Testimonials Carousel Logic
    const testimonialsCarousel = document.getElementById('testimonials-carousel');
    const testimonialsTrack = document.getElementById('testimonials-track');
    const testimonialsPagination = document.getElementById('testimonials-pagination');

    if (testimonialsCarousel && testimonialsTrack && testimonialsPagination) {
        let isDragging = false;
        let startPos = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;
        let animationID;
        let currentIndex = 0;
        let isTransitioning = false;
        let autoScrollInterval;

        const originalItems = Array.from(testimonialsTrack.children);
        const totalOriginalItems = originalItems.length; // 8

        // Clone the first 3 items (max possible itemsPerView) and append them for infinite scrolling
        for (let i = 0; i < 3; i++) {
            if (originalItems[i]) {
                const clone = originalItems[i].cloneNode(true);
                clone.setAttribute('aria-hidden', 'true');
                testimonialsTrack.appendChild(clone);
            }
        }

        // Configuration
        const getItemsPerView = () => window.innerWidth >= 1024 ? 3 : (window.innerWidth >= 768 ? 2 : 1);

        const updatePagination = () => {
            const itemsPerView = getItemsPerView();
            const totalPages = Math.ceil(totalOriginalItems / itemsPerView);
            
            // Normalize index for pagination so dot calculation ignores the clones
            let normalizedIndex = currentIndex % totalOriginalItems;
            if (currentIndex === totalOriginalItems) normalizedIndex = 0; // When on the clone, dot 0 is active

            let activePage = Math.floor(normalizedIndex / itemsPerView);
            if (activePage >= totalPages) activePage = totalPages - 1;

            testimonialsPagination.innerHTML = '';
            for (let i = 0; i < totalPages; i++) {
                const dot = document.createElement('div');
                dot.className = `w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${i === activePage ? 'bg-[#E73971] w-6' : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'}`;
                dot.addEventListener('click', () => {
                    currentIndex = i * itemsPerView;
                    setPositionByIndex(true);
                    resetAutoScroll();
                });
                testimonialsPagination.appendChild(dot);
            }
        };

        const setPositionByIndex = (smooth = true) => {
            const itemsPerView = getItemsPerView();
            const itemWidth = testimonialsCarousel.offsetWidth / itemsPerView;
            
            // Set explicit width for all items to fix mobile overflow issues with negative margins
            Array.from(testimonialsTrack.children).forEach(child => {
                child.style.width = `${itemWidth}px`;
            });
            
            // Prevent going backwards out of bounds
            if (currentIndex < 0) currentIndex = 0;
            // Prevent going forwards out of bounds (max is the first clone)
            if (currentIndex > totalOriginalItems) currentIndex = totalOriginalItems;
            
            currentTranslate = currentIndex * -itemWidth;
            prevTranslate = currentTranslate;
            
            if (smooth) {
                testimonialsTrack.style.transition = 'transform 0.6s ease-out';
                isTransitioning = true;
            } else {
                testimonialsTrack.style.transition = 'none';
            }
            
            setSliderPosition();
            updatePagination();
        };

        const setSliderPosition = () => {
            testimonialsTrack.style.transform = `translateX(${currentTranslate}px)`;
        };

        const animation = () => {
            setSliderPosition();
            if (isDragging) requestAnimationFrame(animation);
        };

        const dragStart = (e) => {
            if (isTransitioning) return;
            isDragging = true;
            startPos = getPositionX(e);
            testimonialsTrack.style.transition = 'none';
            animationID = requestAnimationFrame(animation);
            pauseAutoScroll();
        };

        const dragMove = (e) => {
            if (isDragging) {
                const currentPosition = getPositionX(e);
                currentTranslate = prevTranslate + currentPosition - startPos;
            }
        };

        const dragEnd = () => {
            if (!isDragging) return;
            isDragging = false;
            cancelAnimationFrame(animationID);
            
            const movedBy = currentTranslate - prevTranslate;
            
            // Snap to next/prev item if moved enough
            if (movedBy < -50) {
                currentIndex += 1;
            } else if (movedBy > 50) {
                currentIndex -= 1;
            }
            
            setPositionByIndex(true);
            resumeAutoScroll();
        };

        const getPositionX = (e) => {
            return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        };

        // Transition End Event to handle infinite looping silently
        testimonialsTrack.addEventListener('transitionend', () => {
            isTransitioning = false;
            if (currentIndex >= totalOriginalItems) {
                // Silently jump back to the start
                testimonialsTrack.style.transition = 'none';
                currentIndex = 0;
                
                const itemsPerView = getItemsPerView();
                const itemWidth = testimonialsCarousel.offsetWidth / itemsPerView;
                currentTranslate = 0;
                prevTranslate = 0;
                setSliderPosition();
                
                // Force reflow
                void testimonialsTrack.offsetWidth;
            }
        });

        // Event Listeners
        testimonialsCarousel.addEventListener('mousedown', dragStart);
        testimonialsCarousel.addEventListener('mousemove', dragMove);
        testimonialsCarousel.addEventListener('mouseup', dragEnd);
        testimonialsCarousel.addEventListener('mouseleave', () => { if (isDragging) dragEnd(); });

        testimonialsCarousel.addEventListener('touchstart', dragStart, { passive: true });
        testimonialsCarousel.addEventListener('touchmove', dragMove, { passive: true });
        testimonialsCarousel.addEventListener('touchend', dragEnd);

        // Auto Scroll
        const autoScroll = () => {
            if (isTransitioning || isDragging) return;
            currentIndex += 1; // Move by 1 item smoothly
            setPositionByIndex(true);
        };

        const resetAutoScroll = () => {
            pauseAutoScroll();
            resumeAutoScroll();
        };

        const pauseAutoScroll = () => clearInterval(autoScrollInterval);
        const resumeAutoScroll = () => {
            autoScrollInterval = setInterval(autoScroll, 2000); // 2 seconds interval
        };

        testimonialsCarousel.addEventListener('mouseenter', pauseAutoScroll);
        testimonialsCarousel.addEventListener('mouseleave', () => { if (!isDragging) resumeAutoScroll(); });

        // Initialize
        window.addEventListener('resize', () => {
            testimonialsTrack.style.transition = 'none';
            setPositionByIndex(false);
        });
        
        setPositionByIndex(false);
        resumeAutoScroll();
    }
});