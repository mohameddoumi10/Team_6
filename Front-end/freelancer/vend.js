document.addEventListener('DOMContentLoaded', function() {
    // Category Filtering Logic
    const filterButtons = document.querySelectorAll('.filter-btn');
    const serviceItems = document.querySelectorAll('.service-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active', 'btn-primary'));
            filterButtons.forEach(btn => {
                if (!btn.classList.contains('active')) {
                    btn.classList.add('btn-outline-secondary', 'bg-white');
                }
            });

            // Add active class to clicked button
            this.classList.add('active', 'btn-primary');
            this.classList.remove('btn-outline-secondary', 'bg-white');

            const filterValue = this.getAttribute('data-filter');

            // Filter the service items
            serviceItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    // Animation
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transition = 'opacity 0.4s ease';
                    }, 50);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Sidebar Active State Toggle
    const sidebarLinks = document.querySelectorAll('#sidebar-wrapper .list-group-item');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // If it's the logout button, we might want different behavior
            if (this.classList.contains('text-danger')) return;

            e.preventDefault();
            sidebarLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Simple Search Feedback
    const searchInput = document.querySelector('.search-bar input');
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            alert('Searching for: ' + this.value);
            this.value = '';
        }
    });

    // Sidebar Toggle Logic
    const wrapper = document.getElementById('wrapper');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebarClose = document.getElementById('sidebar-close');
    const overlay = document.getElementById('sidebar-overlay');

    if (sidebarToggle) {
        sidebarToggle.onclick = () => {
            wrapper.classList.toggle('toggled');
        };
    }

    if (sidebarClose) {
        sidebarClose.onclick = () => {
            wrapper.classList.remove('toggled');
        };
    }

    if (overlay) {
        overlay.onclick = () => {
            wrapper.classList.remove('toggled');
        };
    }

    // Log load success
    console.log('Vendow Freelance Portal Initialized Successfully');
});
