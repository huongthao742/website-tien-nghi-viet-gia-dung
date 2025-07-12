// Smooth scroll to products section
function scrollToProducts() {
    const productsSection = document.getElementById('products');
    productsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// Contact order function
function contactOrder(productName, price) {
    const phoneNumber = '0397788669';
    const message = `Xin chào! Tôi muốn đặt hàng sản phẩm: ${productName} - Giá: ${price} ₫. Vui lòng liên hệ tư vấn cho tôi.`;
    
    // Create WhatsApp link (if available) or show phone number
    const whatsappLink = `https://wa.me/84${phoneNumber.substring(1)}?text=${encodeURIComponent(message)}`;
    
    // Try to open WhatsApp, fallback to phone call
    const userChoice = confirm(`Bạn muốn đặt hàng sản phẩm: ${productName}\nGiá: ${price} ₫\n\nChọn OK để gọi điện hoặc Cancel để gửi tin nhắn WhatsApp`);
    
    if (userChoice) {
        // Make phone call
        window.location.href = `tel:${phoneNumber}`;
    } else {
        // Open WhatsApp
        window.open(whatsappLink, '_blank');
    }
}

// Add loading animation when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in animation to elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Observe contact cards
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Add hover effects for product cards
document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add click tracking for analytics (optional)
function trackProductClick(productName) {
    // This can be used to track which products are most popular
    console.log(`Product clicked: ${productName}`);
    
    // You can integrate with Google Analytics or other tracking services here
    // gtag('event', 'product_click', {
    //     'product_name': productName
    // });
}

// Add search functionality (basic)
function searchProducts(searchTerm) {
    const products = document.querySelectorAll('.product-card');
    const searchLower = searchTerm.toLowerCase();
    
    products.forEach(product => {
        const productName = product.querySelector('.product-name').textContent.toLowerCase();
        const productDesc = product.querySelector('.product-description').textContent.toLowerCase();
        
        if (productName.includes(searchLower) || productDesc.includes(searchLower)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Add price formatting
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

// Add smooth scrolling for all anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add form validation for contact form (if added later)
function validateContactForm(formData) {
    const errors = [];
    
    if (!formData.name || formData.name.trim().length < 2) {
        errors.push('Tên phải có ít nhất 2 ký tự');
    }
    
    if (!formData.phone || !/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ''))) {
        errors.push('Số điện thoại không hợp lệ');
    }
    
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.push('Email không hợp lệ');
    }
    
    return errors;
}

// Add notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add loading state for buttons
function setButtonLoading(button, isLoading) {
    if (isLoading) {
        button.disabled = true;
        button.textContent = 'Đang xử lý...';
        button.style.opacity = '0.7';
    } else {
        button.disabled = false;
        button.textContent = 'Liên hệ đặt hàng';
        button.style.opacity = '1';
    }
}

// Add mobile menu toggle (if needed)
function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
    }
}

// Add lazy loading for images (when real images are added)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', lazyLoadImages);
