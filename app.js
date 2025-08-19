// eCloudWorx Frontend JavaScript

document.addEventListener('DOMContentLoaded', function() {

    // Dashboard Tab Switching
    const dashboardTabs = document.querySelectorAll('.dashboard__tab');
    const providerPanels = document.querySelectorAll('.provider-panel');

    dashboardTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const provider = this.getAttribute('data-provider');

            // Remove active class from all tabs and panels
            dashboardTabs.forEach(t => t.classList.remove('active'));
            providerPanels.forEach(p => p.classList.remove('active'));

            // Add active class to clicked tab and corresponding panel
            this.classList.add('active');
            const targetPanel = document.getElementById(`${provider}-panel`);
            if (targetPanel) {
                targetPanel.classList.add('active');

                // Add a subtle animation effect
                targetPanel.style.opacity = '0';
                targetPanel.style.transform = 'translateY(10px)';

                setTimeout(() => {
                    targetPanel.style.transition = 'all 0.3s ease';
                    targetPanel.style.opacity = '1';
                    targetPanel.style.transform = 'translateY(0)';
                }, 50);
            }
        });
    });

    // Automation Library Filtering
    const filterButtons = document.querySelectorAll('.automation-filters .filter-btn');
    const automationCards = document.querySelectorAll('.automation-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');

            // Remove active class from all filter buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Filter automation cards
            automationCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (category === 'all' || cardCategory === category) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.3s ease-out';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // Resource Card Hover Effects
    const resourceCards = document.querySelectorAll('.resource-card');

    resourceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)';
        });
    });

    // Feature Card Animations
    const featureCards = document.querySelectorAll('.feature-card');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);

    featureCards.forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Search Input Enhancement
    const searchInput = document.querySelector('.search-input');

    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const activePanel = document.querySelector('.provider-panel.active');

            if (activePanel) {
                const resourceCards = activePanel.querySelectorAll('.resource-card');

                resourceCards.forEach(card => {
                    const resourceName = card.querySelector('.resource-name').textContent.toLowerCase();
                    const resourceType = card.querySelector('.resource-card__header h4').textContent.toLowerCase();

                    if (resourceName.includes(searchTerm) || resourceType.includes(searchTerm)) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeInUp 0.3s ease-out';
                    } else {
                        card.style.display = 'none';
                    }
                });
            }
        });
    }

    // Pricing Card Interactions
    const pricingCards = document.querySelectorAll('.pricing-card');

    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('pricing-card--featured')) {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            }
        });

        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('pricing-card--featured')) {
                this.style.transform = 'translateY(-4px) scale(1)';
            }
        });
    });

    // Automation Deploy Button Interactions
    const deployButtons = document.querySelectorAll('.automation-card .btn');

    deployButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            // Change button text temporarily
            const originalText = this.textContent;
            this.textContent = 'Deploying...';
            this.disabled = true;

            // Simulate deployment
            setTimeout(() => {
                this.textContent = 'Deployed ✓';
                this.classList.add('btn--primary');
                this.classList.remove('btn--outline');

                // Reset after 3 seconds
                setTimeout(() => {
                    this.textContent = originalText;
                    this.disabled = false;
                    this.classList.remove('btn--primary');
                    this.classList.add('btn--outline');
                }, 3000);
            }, 1500);
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop;
    });

    // Add transition to header
    header.style.transition = 'transform 0.3s ease-in-out';

    // Mobile menu toggle (basic implementation)
    const createMobileMenu = () => {
        const nav = document.querySelector('.nav');
        const navMenu = document.querySelector('.nav__menu');

        // Create mobile menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.style.cssText = `
            display: none;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--color-primary);
        `;

        // Insert before nav menu
        nav.insertBefore(mobileMenuBtn, navMenu);

        // Toggle menu on mobile
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('mobile-menu-open');
        });

        // Show mobile menu button on small screens
        const mediaQuery = window.matchMedia('(max-width: 768px)');

        const handleMediaQuery = (e) => {
            if (e.matches) {
                mobileMenuBtn.style.display = 'block';
                navMenu.style.cssText = `
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: white;
                    flex-direction: column;
                    padding: 1rem;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    transform: translateY(-100%);
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.3s ease;
                `;
            } else {
                mobileMenuBtn.style.display = 'none';
                navMenu.style.cssText = '';
                navMenu.classList.remove('mobile-menu-open');
            }
        };

        mediaQuery.addListener(handleMediaQuery);
        handleMediaQuery(mediaQuery);

        // Add CSS for mobile menu open state
        const style = document.createElement('style');
        style.textContent = `
            .nav__menu.mobile-menu-open {
                transform: translateY(0) !important;
                opacity: 1 !important;
                visibility: visible !important;
            }
        `;
        document.head.appendChild(style);
    };

    createMobileMenu();

    // Cost calculation demo
    const updateTotalCost = () => {
        const costElements = document.querySelectorAll('.cost');
        let totalCost = 0;

        costElements.forEach(el => {
            const cost = parseFloat(el.textContent.replace(/[$\/month]/g, ''));
            if (!isNaN(cost)) {
                totalCost += cost;
            }
        });

        // Update the hero section cost if it exists
        const totalCostElement = document.querySelector('.mini-stat__value');
        if (totalCostElement && totalCostElement.textContent.includes('$')) {
            totalCostElement.textContent = `$${Math.round(totalCost)}`;
        }
    };

    updateTotalCost();

    // Console welcome message
    console.log(`
    🌩️ Welcome to eCloudWorx!

    Your cloud, simplified.

    This demo showcases our multi-cloud management platform.
    Ready to simplify your cloud infrastructure?

    Visit: https://ecloudworx.com
    `);
});

// Utility functions
const utils = {
    // Format currency
    formatCurrency: (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    },

    // Debounce function for search
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Animate counter
    animateCounter: (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
};

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { utils };
}
