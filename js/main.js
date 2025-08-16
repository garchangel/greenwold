// Main JavaScript for The Greenwold Divine Chronicles

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavigation();
    initializeAnimations();
    initializeAccessibility();
    initializeInteractiveElements();
    initializeTooltips();
    
    // Add deity-specific body class based on current page
    addDeityClass();
});

// Navigation Enhancement
function initializeNavigation() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add active state to navigation links
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-link, .breadcrumb-nav a').forEach(link => {
        if (link.getAttribute('href') && currentPath.includes(link.getAttribute('href'))) {
            link.classList.add('active');
        }
    });

    // Back to top functionality
    createBackToTopButton();
}

// Animation System
function initializeAnimations() {
    // Intersection Observer for scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.artifact-card, .adventure-hook, .holy-day-card, .relationship-card').forEach(el => {
        observer.observe(el);
    });

    // Parallax effect for deity portraits
    initializeParallax();
}

// Accessibility Enhancements
function initializeAccessibility() {
    // Skip link for keyboard navigation
    createSkipLink();

    // Enhanced focus management
    document.addEventListener('keydown', function(e) {
        // Tab navigation enhancement
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });

    // High contrast mode detection
    if (window.matchMedia('(prefers-contrast: high)').matches) {
        document.body.classList.add('high-contrast');
    }

    // Reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('reduced-motion');
    }
}

// Interactive Elements
function initializeInteractiveElements() {
    // Deity card hover effects on index page
    document.querySelectorAll('.deity-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('card-hover');
            // Add subtle animation to symbol
            const symbol = this.querySelector('.deity-symbol img');
            if (symbol) {
                symbol.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });

        card.addEventListener('mouseleave', function() {
            this.classList.remove('card-hover');
            const symbol = this.querySelector('.deity-symbol img');
            if (symbol) {
                symbol.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // Expandable sections
    initializeExpandableSections();

    // Search functionality for index page
    initializeSearch();

    // Reading progress indicator
    initializeReadingProgress();
}

// Tooltip System
function initializeTooltips() {
    // Create tooltip element
    const tooltip = document.createElement('div');
    tooltip.className = 'custom-tooltip';
    tooltip.style.cssText = `
        position: absolute;
        background: rgba(139, 69, 19, 0.95);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        font-size: 0.875rem;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1000;
        max-width: 200px;
        text-align: center;
    `;
    document.body.appendChild(tooltip);

    // Add tooltips to elements with title attributes
    document.querySelectorAll('[title]').forEach(element => {
        const originalTitle = element.getAttribute('title');
        element.removeAttribute('title');
        
        element.addEventListener('mouseenter', function(e) {
            tooltip.textContent = originalTitle;
            tooltip.style.opacity = '1';
            updateTooltipPosition(e, tooltip);
        });

        element.addEventListener('mousemove', function(e) {
            updateTooltipPosition(e, tooltip);
        });

        element.addEventListener('mouseleave', function() {
            tooltip.style.opacity = '0';
        });
    });
}

// Helper Functions
function addDeityClass() {
    const path = window.location.pathname;
    const deityPages = {
        'storth': 'good-deity',
        'dongus': 'good-deity',
        'enza': 'good-deity',
        'rekogall': 'good-deity',
        'empyrean': 'evil-deity',
        'silence': 'evil-deity',
        'warmaster': 'evil-deity',
        'ruin': 'evil-deity',
        'swennlau': 'neutral-deity'
    };

    for (const [deity, className] of Object.entries(deityPages)) {
        if (path.includes(deity)) {
            document.body.classList.add(className);
            break;
        }
    }
}

function createBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #8b4513 0%, #a0522d 100%);
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;

    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    document.body.appendChild(button);

    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.opacity = '1';
            button.style.transform = 'scale(1)';
        } else {
            button.style.opacity = '0';
            button.style.transform = 'scale(0.8)';
        }
    });
}

function createSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #8b4513;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 0 0 4px 4px;
        z-index: 1001;
        transition: top 0.3s ease;
    `;

    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '0';
    });

    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });

    document.body.insertBefore(skipLink, document.body.firstChild);
}

function initializeParallax() {
    const portraits = document.querySelectorAll('.portrait-image');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        portraits.forEach(portrait => {
            portrait.style.transform = `translateY(${rate}px)`;
        });
    });
}

function initializeExpandableSections() {
    // Add expand/collapse functionality to long content sections
    document.querySelectorAll('.lore-section, .worship-section').forEach(section => {
        const content = section.querySelector('p');
        if (content && content.textContent.length > 500) {
            const button = document.createElement('button');
            button.textContent = 'Read More';
            button.className = 'expand-button';
            button.style.cssText = `
                background: none;
                border: 2px solid #d4af37;
                color: #8b4513;
                padding: 0.5rem 1rem;
                border-radius: 20px;
                cursor: pointer;
                margin-top: 1rem;
                transition: all 0.3s ease;
            `;
            
            // Initially show only first paragraph
            const paragraphs = section.querySelectorAll('p');
            for (let i = 1; i < paragraphs.length; i++) {
                paragraphs[i].style.display = 'none';
            }
            
            button.addEventListener('click', () => {
                const isExpanded = button.textContent === 'Read Less';
                
                for (let i = 1; i < paragraphs.length; i++) {
                    paragraphs[i].style.display = isExpanded ? 'none' : 'block';
                }
                
                button.textContent = isExpanded ? 'Read More' : 'Read Less';
            });
            
            section.appendChild(button);
        }
    });
}

function initializeSearch() {
    if (document.querySelector('.deity-index')) {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.style.cssText = `
            max-width: 400px;
            margin: 0 auto 2rem;
            position: relative;
        `;

        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search deities...';
        searchInput.className = 'deity-search';
        searchInput.style.cssText = `
            width: 100%;
            padding: 1rem;
            border: 2px solid #d4af37;
            border-radius: 25px;
            font-size: 1rem;
            background: rgba(255, 255, 255, 0.9);
        `;

        searchContainer.appendChild(searchInput);
        
        const deityIndex = document.querySelector('.deity-index');
        deityIndex.insertBefore(searchContainer, deityIndex.firstChild);

        // Search functionality
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const deityCards = document.querySelectorAll('.deity-card');

            deityCards.forEach(card => {
                const name = card.querySelector('.deity-name').textContent.toLowerCase();
                const title = card.querySelector('.deity-title').textContent.toLowerCase();
                const domains = card.querySelector('.deity-domains').textContent.toLowerCase();

                if (name.includes(searchTerm) || title.includes(searchTerm) || domains.includes(searchTerm)) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.3s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

function initializeReadingProgress() {
    if (document.querySelector('.deity-page-container')) {
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #d4af37 0%, #f4e04d 100%);
            z-index: 1000;
            transition: width 0.1s ease;
        `;

        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            
            progressBar.style.width = scrolled + '%';
        });
    }
}

function updateTooltipPosition(e, tooltip) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const tooltipRect = tooltip.getBoundingClientRect();
    
    let left = mouseX + 10;
    let top = mouseY - tooltipRect.height - 10;
    
    // Adjust if tooltip goes off screen
    if (left + tooltipRect.width > window.innerWidth) {
        left = mouseX - tooltipRect.width - 10;
    }
    
    if (top < 0) {
        top = mouseY + 10;
    }
    
    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';
}

// Theme switcher (optional enhancement)
function initializeThemeSwitcher() {
    const themeButton = document.createElement('button');
    themeButton.innerHTML = '🌙';
    themeButton.className = 'theme-switcher';
    themeButton.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(139, 69, 19, 0.9);
        color: white;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        z-index: 1000;
        transition: all 0.3s ease;
    `;

    themeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        themeButton.innerHTML = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
        
        // Save preference
        localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeButton.innerHTML = '☀️';
    }

    document.body.appendChild(themeButton);
}

// Export functions for external use
window.GreenwoldChronicles = {
    initializeNavigation,
    initializeAnimations,
    initializeAccessibility,
    initializeInteractiveElements,
    initializeTooltips
};
