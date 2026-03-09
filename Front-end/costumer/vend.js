/**
 * Vendow Marketplace - Dynamic Behaviors
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Sidebar Toggle for Mobile
    const menuToggle = document.getElementById('menu-toggle');
    const wrapper = document.getElementById('wrapper');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            wrapper.classList.toggle('toggled');
            
            // Toggle icon
            const icon = menuToggle.querySelector('i');
            if (wrapper.classList.contains('toggled')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
    }

    // 2. Cart Functionality
    let cartCount = 0;
    const cartCountElement = document.getElementById('cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('disabled')) return;

            cartCount++;
            updateCartUI();
            
            // Animation effect
            const originalHTML = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i>';
            this.classList.add('bg-success', 'text-white');
            
            setTimeout(() => {
                this.innerHTML = originalHTML;
                this.classList.remove('bg-success', 'text-white');
            }, 1000);

            // Show a simple toast-like notification
            showNotification('Produit ajouté au panier !');
        });
    });

    function updateCartUI() {
        if (cartCountElement) {
            cartCountElement.textContent = cartCount;
            cartCountElement.style.transform = 'scale(1.2)';
            setTimeout(() => {
                cartCountElement.style.transform = 'scale(1)';
            }, 200);
        }
    }

    // 3. Wishlist Toggle
    const wishlistButtons = document.querySelectorAll('.wishlist-btn');
    
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            this.classList.toggle('active-wishlist');
            
            if (this.classList.contains('active-wishlist')) {
                icon.className = 'fas fa-heart';
                showNotification('Ajouté aux favoris !');
            } else {
                icon.className = 'far fa-heart';
            }
        });
    });

    // 4. Category Selection (Visual only)
    const categoryLinks = document.querySelectorAll('.list-group-item');
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.classList.contains('active-category')) return;
            
            // Remove active class from all
            categoryLinks.forEach(l => {
                l.classList.remove('active-category');
                const dot = l.querySelector('.dot');
                if (dot) dot.remove();
            });
            
            // Add active class to clicked
            this.classList.add('active-category');
            
            // Add dot to clicked
            const dot = document.createElement('span');
            dot.className = 'dot';
            this.prepend(dot);
            
            showNotification(`Catégorie : ${this.textContent.trim()}`);
        });
    });

    // 5. Newsletter Subscription
    const newsletterBtn = document.querySelector('.newsletter-form button');
    const newsletterInput = document.querySelector('.newsletter-form input');

    if (newsletterBtn && newsletterInput) {
        newsletterBtn.addEventListener('click', function() {
            const email = newsletterInput.value.trim();
            if (validateEmail(email)) {
                showNotification('Merci pour votre inscription !');
                newsletterInput.value = '';
            } else {
                newsletterInput.classList.add('is-invalid');
                setTimeout(() => newsletterInput.classList.remove('is-invalid'), 2000);
            }
        });
    }

    // Helpers
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showNotification(message) {
        // Simple notification element
        let notification = document.createElement('div');
        notification.className = 'notification-toast';
        notification.textContent = message;
        
        // CSS for notification if not in style.css
        Object.assign(notification.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            background: '#2B3D51',
            color: '#fff',
            padding: '12px 24px',
            borderRadius: '10px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
            zIndex: '9999',
            opacity: '0',
            transition: 'opacity 0.3s ease'
        });

        document.body.appendChild(notification);
        
        // Trigger reflow
        notification.offsetHeight;
        notification.style.opacity = '1';
        
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
});
