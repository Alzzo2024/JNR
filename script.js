document.addEventListener('DOMContentLoaded', function() {
    // Logo functionality
    const logo = document.getElementById('logo');
    
    // Reload page when logo is clicked
    logo.addEventListener('click', function() {
        window.location.reload();
    });
    
    // Open new tab when logo is dragged
    logo.addEventListener('dragstart', function(e) {
        e.preventDefault();
        window.open(window.location.href, '_blank');
    });
    
    // Video controls
    const video = document.getElementById('hero-video');
    const playPauseBtn = document.getElementById('play-pause');
    const muteUnmuteBtn = document.getElementById('mute-unmute');
    const fullscreenBtn = document.getElementById('fullscreen');
    const progressBar = document.getElementById('progress-bar');
    const progressContainer = document.querySelector('.progress-container');
    
    // Set video to paused initially
    video.pause();
    
    // Play/Pause functionality
    playPauseBtn.addEventListener('click', function() {
        if (video.paused) {
            video.play();
            playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        } else {
            video.pause();
            playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        }
    });
    
    // Mute/Unmute functionality
    muteUnmuteBtn.addEventListener('click', function() {
        video.muted = !video.muted;
        muteUnmuteBtn.innerHTML = video.muted 
            ? '<i class="fa-solid fa-volume-xmark"></i>' 
            : '<i class="fa-solid fa-volume-high"></i>';
    });
    
    // Fullscreen functionality
    fullscreenBtn.addEventListener('click', function() {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) { /* Safari */
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) { /* IE11 */
            video.msRequestFullscreen();
        }
    });
    
    // Update progress bar as video plays
    video.addEventListener('timeupdate', function() {
        const percentage = (video.currentTime / video.duration) * 100;
        progressBar.style.width = percentage + '%';
    });
    
    // Allow user to seek through video
    progressContainer.addEventListener('click', function(e) {
        const seekTime = (e.offsetX / progressContainer.offsetWidth) * video.duration;
        video.currentTime = seekTime;
    });
    
    // Reset video when it ends
    video.addEventListener('ended', function() {
        video.currentTime = 0;
        playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a, .footer-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header shrink on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        const header = document.querySelector('header');
        
        if (scrollPosition > 100) {
            header.style.padding = '0.8rem 5%';
        } else {
            header.style.padding = '1.2rem 5%';
        }
    });
    
    // Reveal animations for sections
    const revealElements = function() {
        const sections = document.querySelectorAll('section');
        const windowHeight = window.innerHeight;
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('visible');
                
                // Animate children with delay
                const elements = section.querySelectorAll('.manifesto-column, .evento-card, .galeria-item');
                elements.forEach((el, index) => {
                    setTimeout(() => {
                        el.classList.add('visible');
                    }, 150 * index);
                });
            }
        });
    };
    
    // Run reveal on scroll
    window.addEventListener('scroll', revealElements);
    
    // Run reveal once on load
    revealElements();
    
    // Form submission
    const contactForm = document.querySelector('.contato-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'ENVIANDO...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                alert('Mensagem enviada com sucesso!');
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const submitButton = this.querySelector('button');
            
            if (emailInput.value.trim() !== '') {
                const originalHTML = submitButton.innerHTML;
                submitButton.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
                submitButton.disabled = true;
                
                setTimeout(() => {
                    alert('Inscrição realizada com sucesso!');
                    emailInput.value = '';
                    submitButton.innerHTML = originalHTML;
                    submitButton.disabled = false;
                }, 1500);
            }
        });
    }
    
    // Add CSS class for animation when elements come into view
    const addInViewClass = function() {
        const elements = document.querySelectorAll('.manifesto-column, .evento-card, .galeria-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight * 0.85) {
                element.classList.add('in-view');
            }
        });
    };
    
    window.addEventListener('scroll', addInViewClass);
    window.addEventListener('load', addInViewClass);
    
    // Add hover effect to event cards
    const eventCards = document.querySelectorAll('.evento-card');
    eventCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderLeftWidth = '6px';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderLeftWidth = '3px';
        });
    });
    
    // Add preload attribute to video to improve performance
    video.setAttribute('preload', 'metadata');
    
    // Add poster image to video
    video.setAttribute('poster', 'https://via.placeholder.com/1920x1080/211c1c/e91d30?text=MOVIMENTO');
});