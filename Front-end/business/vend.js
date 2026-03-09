document.addEventListener('DOMContentLoaded', () => {
    // Auth Check
    const token = localStorage.getItem('token');
    if (!token && !window.location.href.includes('home')) {
        window.location.href = '../home/index.html';
        return; // Stop execution
    }

    // Sidebar Navigation
    const navLinks = document.querySelectorAll('#sidebar .nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            link.classList.add('active');
            
            const page = link.getAttribute('data-page');
            console.log(`Navigating to: ${page}`);
            
            // Close sidebar on mobile after clicking a link
            if (window.innerWidth < 992) {
                document.getElementById('wrapper').classList.remove('toggled');
            }
            
            // In a real app, this would trigger a page change or content load
        });
    });

    // Sidebar Toggle for Mobile
    const sidebarToggle = document.getElementById('sidebarToggle');
    const wrapper = document.getElementById('wrapper');
    const overlay = document.getElementById('sidebar-overlay');

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            wrapper.classList.toggle('toggled');
        });
    }

    if (overlay) {
        overlay.addEventListener('click', () => {
            wrapper.classList.remove('toggled');
        });
    }

    // Logout Functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('Are you sure you want to logout?')) {
                // Clear user session from localStorage
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                
                // Redirect to home page
                window.location.href = '../home/index.html';
            }
        });
    }

    // Add Product Button

    // Restock All Button
    const restockAllBtn = document.querySelector('.btn-orange-soft');
    if (restockAllBtn) {
        restockAllBtn.addEventListener('click', () => {
            console.log('Restock All triggered');
            const alertItems = document.querySelectorAll('.alert-item');
            alertItems.forEach(item => {
                item.style.border = '2px solid var(--success)';
                setTimeout(() => {
                    item.style.border = 'none';
                }, 2000);
            });
            alert('Restock request sent for all low-stock items.');
        });
    }

    // Search Bar Interaction
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                console.log(`Searching for: ${searchInput.value}`);
                // Implement search logic here
            }
        });
    }

    // Metric Cards Glow Effect on Hover
    const cards = document.querySelectorAll('.metric-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (!card.classList.contains('bg-gradient-blue')) {
                card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
            }
        });
        card.addEventListener('mouseleave', () => {
            if (!card.classList.contains('bg-gradient-blue')) {
                card.style.boxShadow = 'var(--card-shadow)';
            }
        });
    });

    // Line Chart Interactions
    const points = document.querySelectorAll('.chart-point');
    const tooltip = document.getElementById('chart-tooltip');
    
    if (tooltip) {
        points.forEach(point => {
            point.addEventListener('mouseenter', (e) => {
                const val = point.getAttribute('data-val');
                tooltip.querySelector('.value').textContent = val;
                
                // Position tooltip
                const rect = point.getBoundingClientRect();
                const containerRect = tooltip.parentElement.getBoundingClientRect();
                
                const x = rect.left - containerRect.left + rect.width / 2;
                const y = rect.top - containerRect.top;
                
                tooltip.style.left = `${x}px`;
                tooltip.style.top = `${y}px`;
                
                tooltip.classList.remove('d-none');
                tooltip.style.opacity = '1';
                tooltip.style.transform = 'translate(-50%, -120%) scale(1)';
            });
            
            point.addEventListener('mouseleave', () => {
                tooltip.style.opacity = '0';
                tooltip.style.transform = 'translate(-50%, -120%) scale(0.9)';
                setTimeout(() => {
                    tooltip.classList.add('d-none');
                }, 200);
            });
        });
    }
});
