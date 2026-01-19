/**
 * Pure Extracts TX - Shopping Cart System
 * Frontend cart management with Stripe checkout preparation
 */

// Cart State
const Cart = {
    items: [],
    isOpen: false,

    // Initialize cart from localStorage
    init() {
        const saved = localStorage.getItem('pureextracts-cart');
        if (saved) {
            try {
                this.items = JSON.parse(saved);
            } catch (e) {
                this.items = [];
            }
        }
        this.render();
        this.updateCartCount();
        this.bindEvents();
    },

    // Add item to cart
    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }

        this.save();
        this.render();
        this.updateCartCount();
        this.showAddedNotification(product.name);
        this.open();
    },

    // Remove item from cart
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.save();
        this.render();
        this.updateCartCount();
    },

    // Update item quantity
    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = quantity;
                this.save();
                this.render();
                this.updateCartCount();
            }
        }
    },

    // Get cart total
    getTotal() {
        return this.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    },

    // Get item count
    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    },

    // Save to localStorage
    save() {
        localStorage.setItem('pureextracts-cart', JSON.stringify(this.items));
    },

    // Clear cart
    clear() {
        this.items = [];
        this.save();
        this.render();
        this.updateCartCount();
    },

    // Open cart sidebar
    open() {
        this.isOpen = true;
        const sidebar = document.getElementById('cartSidebar');
        const overlay = document.getElementById('cartOverlay');
        if (sidebar) sidebar.classList.add('open');
        if (overlay) overlay.classList.add('visible');
        document.body.style.overflow = 'hidden';
    },

    // Close cart sidebar
    close() {
        this.isOpen = false;
        const sidebar = document.getElementById('cartSidebar');
        const overlay = document.getElementById('cartOverlay');
        if (sidebar) sidebar.classList.remove('open');
        if (overlay) overlay.classList.remove('visible');
        document.body.style.overflow = '';
    },

    // Toggle cart
    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    },

    // Update cart count badge
    updateCartCount() {
        const count = this.getItemCount();
        const badges = document.querySelectorAll('.cart-count');
        badges.forEach(badge => {
            badge.textContent = count;
            badge.style.display = count > 0 ? 'flex' : 'none';
        });
    },

    // Show added notification
    showAddedNotification(productName) {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <span>${productName} added to cart</span>
        `;
        document.body.appendChild(notification);

        // Animate in
        requestAnimationFrame(() => {
            notification.classList.add('show');
        });

        // Remove after delay
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 2500);
    },

    // Render cart sidebar content
    render() {
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        const cartEmpty = document.getElementById('cartEmpty');
        const checkoutBtn = document.getElementById('checkoutBtn');

        if (!cartItems) return;

        if (this.items.length === 0) {
            cartItems.style.display = 'none';
            if (cartEmpty) cartEmpty.style.display = 'flex';
            if (checkoutBtn) checkoutBtn.disabled = true;
            if (cartTotal) cartTotal.textContent = '$0.00';
            return;
        }

        if (cartEmpty) cartEmpty.style.display = 'none';
        cartItems.style.display = 'block';
        if (checkoutBtn) checkoutBtn.disabled = false;

        cartItems.innerHTML = this.items.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-image">
                    <div class="cart-item-placeholder">
                        <svg viewBox="0 0 24 24" fill="currentColor" opacity="0.3">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                        </svg>
                    </div>
                </div>
                <div class="cart-item-details">
                    <h4 class="cart-item-name">${item.name}</h4>
                    <span class="cart-item-category">${item.category}</span>
                    <span class="cart-item-price">$${item.price.toFixed(2)}</span>
                </div>
                <div class="cart-item-quantity">
                    <button class="qty-btn qty-minus" data-id="${item.id}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                    </button>
                    <span class="qty-value">${item.quantity}</span>
                    <button class="qty-btn qty-plus" data-id="${item.id}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="12" y1="5" x2="12" y2="19"/>
                            <line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                    </button>
                </div>
                <button class="cart-item-remove" data-id="${item.id}" aria-label="Remove item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
        `).join('');

        if (cartTotal) {
            cartTotal.textContent = `$${this.getTotal().toFixed(2)}`;
        }

        // Rebind quantity and remove buttons
        this.bindCartItemEvents();
    },

    // Bind events for cart items
    bindCartItemEvents() {
        // Quantity buttons
        document.querySelectorAll('.qty-minus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.dataset.id;
                const item = this.items.find(i => i.id === id);
                if (item) {
                    this.updateQuantity(id, item.quantity - 1);
                }
            });
        });

        document.querySelectorAll('.qty-plus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.dataset.id;
                const item = this.items.find(i => i.id === id);
                if (item) {
                    this.updateQuantity(id, item.quantity + 1);
                }
            });
        });

        // Remove buttons
        document.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.dataset.id;
                this.removeItem(id);
            });
        });
    },

    // Bind global events
    bindEvents() {
        // Cart toggle button
        const cartToggle = document.getElementById('cartToggle');
        if (cartToggle) {
            cartToggle.addEventListener('click', () => this.toggle());
        }

        // Close button
        const closeBtn = document.getElementById('cartClose');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close());
        }

        // Overlay click to close
        const overlay = document.getElementById('cartOverlay');
        if (overlay) {
            overlay.addEventListener('click', () => this.close());
        }

        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });

        // Checkout button
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => this.checkout());
        }

        // Add to cart buttons
        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const product = this.getProductFromCard(e.currentTarget);
                if (product) {
                    this.addItem(product);
                }
            });
        });
    },

    // Get product data from card
    getProductFromCard(button) {
        const card = button.closest('.product-card');
        if (!card) return null;

        const title = card.querySelector('.product-title')?.textContent || 'Product';
        const category = card.querySelector('.product-category')?.textContent || 'Botanical';
        const id = card.dataset.productId || title.toLowerCase().replace(/\s+/g, '-');

        // Default price (in production, this would come from a database)
        const priceMap = {
            'gummies': 29.99,
            'tinctures': 39.99,
            'extracts': 49.99,
            'nutrients': 24.99,
            'dried': 19.99,
            'live': 34.99,
            'seeds': 14.99
        };

        const categoryKey = card.dataset.category || 'extracts';
        const price = priceMap[categoryKey] || 29.99;

        return {
            id,
            name: title,
            category,
            price
        };
    },

    // Checkout process
    async checkout() {
        if (this.items.length === 0) return;

        const checkoutBtn = document.getElementById('checkoutBtn');
        const originalText = checkoutBtn.innerHTML;

        // Show loading state
        checkoutBtn.innerHTML = '<span>Processing...</span>';
        checkoutBtn.disabled = true;

        try {
            // In production, this would call your backend to create a Stripe Checkout session
            // const response = await fetch('/api/create-checkout-session', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({
            //         items: this.items.map(item => ({
            //             id: item.id,
            //             name: item.name,
            //             price: item.price,
            //             quantity: item.quantity
            //         }))
            //     })
            // });
            // const { sessionId } = await response.json();
            // const stripe = Stripe('your-publishable-key');
            // await stripe.redirectToCheckout({ sessionId });

            // For demo, show checkout modal
            await new Promise(resolve => setTimeout(resolve, 1000));
            this.showCheckoutModal();

        } catch (error) {
            console.error('Checkout error:', error);
            alert('There was an error processing your checkout. Please try again.');
        } finally {
            checkoutBtn.innerHTML = originalText;
            checkoutBtn.disabled = false;
        }
    },

    // Show checkout modal (demo)
    showCheckoutModal() {
        // Prevent multiple modals
        if (document.querySelector('.checkout-modal')) {
            return;
        }

        // Close cart sidebar first to prevent z-index stacking issues
        this.close();

        const modal = document.createElement('div');
        modal.className = 'checkout-modal';
        modal.innerHTML = `
            <div class="checkout-modal-overlay"></div>
            <div class="checkout-modal-content">
                <button class="checkout-modal-close" aria-label="Close">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
                <div class="checkout-header">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                        <line x1="1" y1="10" x2="23" y2="10"/>
                    </svg>
                    <h2>Secure Checkout</h2>
                </div>
                <div class="checkout-summary">
                    <h3>Order Summary</h3>
                    <div class="checkout-items">
                        ${this.items.map(item => `
                            <div class="checkout-item">
                                <span>${item.name} × ${item.quantity}</span>
                                <span>$${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="checkout-total">
                        <span>Total</span>
                        <span>$${this.getTotal().toFixed(2)}</span>
                    </div>
                </div>
                <div class="checkout-notice">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="16" x2="12" y2="12"/>
                        <line x1="12" y1="8" x2="12.01" y2="8"/>
                    </svg>
                    <p>This is a demo checkout. In production, this would redirect to Stripe's secure payment page.</p>
                </div>
                <div class="checkout-actions">
                    <button class="btn btn-secondary" id="continueShopping">Continue Shopping</button>
                    <button class="btn btn-primary" id="simulatePayment">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        </svg>
                        <span>Simulate Payment</span>
                    </button>
                </div>
                <div class="checkout-badges">
                    <span class="security-badge">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                        </svg>
                        SSL Encrypted
                    </span>
                    <span class="security-badge">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                            <path d="M22 10H2" fill="none" stroke="white" stroke-width="2"/>
                        </svg>
                        Stripe Powered
                    </span>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        // Animate in
        requestAnimationFrame(() => {
            modal.classList.add('open');
        });

        // Close handlers
        const closeModal = () => {
            modal.classList.remove('open');
            setTimeout(() => {
                modal.remove();
                document.body.style.overflow = '';
            }, 300);
        };

        modal.querySelector('.checkout-modal-close').addEventListener('click', closeModal);
        modal.querySelector('.checkout-modal-overlay').addEventListener('click', closeModal);
        modal.querySelector('#continueShopping').addEventListener('click', () => {
            closeModal();
            this.close();
        });

        // Simulate payment
        modal.querySelector('#simulatePayment').addEventListener('click', async () => {
            const btn = modal.querySelector('#simulatePayment');
            btn.innerHTML = '<span>Processing...</span>';
            btn.disabled = true;

            await new Promise(resolve => setTimeout(resolve, 2000));

            // Show success
            modal.querySelector('.checkout-modal-content').innerHTML = `
                <div class="checkout-success">
                    <div class="success-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                            <polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                    </div>
                    <h2>Order Confirmed!</h2>
                    <p>Thank you for your order. This is a demo - no actual payment was processed.</p>
                    <p class="order-number">Order #DEMO-${Date.now()}</p>
                    <button class="btn btn-primary" id="closeSuccess">
                        <span>Return to Shop</span>
                    </button>
                </div>
            `;

            // Clear cart
            this.clear();

            modal.querySelector('#closeSuccess').addEventListener('click', () => {
                closeModal();
                this.close();
            });
        });
    }
};

// Initialize cart when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    Cart.init();
    Cart.addCartButtonsToProducts();
});

// Add "Add to Cart" buttons to all product cards
Cart.addCartButtonsToProducts = function() {
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach((card, index) => {
        // Generate unique product ID
        const title = card.querySelector('.product-title')?.textContent || 'Product';
        const productId = `product-${index}-${title.toLowerCase().replace(/\s+/g, '-').substring(0, 20)}`;
        card.dataset.productId = productId;

        // Find the product link
        const productLink = card.querySelector('.product-link');
        if (!productLink) return;

        // Create action buttons container
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'product-actions';

        // Create Add to Cart button
        const addToCartBtn = document.createElement('button');
        addToCartBtn.className = 'add-to-cart-btn';
        addToCartBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <span>Add to Cart</span>
        `;

        addToCartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const product = this.getProductFromCard(addToCartBtn);
            if (product) {
                this.addItem(product);
            }
        });

        // Wrap existing link and add button
        actionsDiv.appendChild(addToCartBtn);

        // Insert after the product link or replace it
        productLink.parentNode.insertBefore(actionsDiv, productLink);
        productLink.style.display = 'none'; // Hide original link for now
    });
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Cart;
}
