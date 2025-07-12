import React, { useState } from "react";
import FooterLinks from "../ui/FooterLinks";
import MerchCard from "./MerchCard";
import { MERCH_ITEMS, MERCH_CATEGORIES, getItemsByCategory, getFeaturedItems } from "./merchData";
import "./Merch.css";
import jumpingSpud from "../../img/FunkNJump.gif";

// Cart context to share cart state across components
export const CartContext = React.createContext();

function Merch() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [openItemId, setOpenItemId] = useState(null);
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setOpenItemId(null); // Close any open item when changing categories
    };

    const toggleItem = (itemId) => {
        setOpenItemId(openItemId === itemId ? null : itemId);
    };

    const addToCart = (item, size = null, song = null) => {
        const cartItem = {
            id: `${item.id}-${size || song || 'default'}`,
            itemId: item.id,
            name: item.name,
            price: item.price,
            size: size,
            color: item.color,
            song: song,
            image: item.images[0].src
        };

        setCart(prevCart => {
            const existingItem = prevCart.find(cartItem => cartItem.id === `${item.id}-${size || song || 'default'}`);
            if (existingItem) {
                return prevCart.map(cartItem => 
                    cartItem.id === `${item.id}-${size || song || 'default'}` 
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                return [...prevCart, { ...cartItem, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (itemId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== itemId));
    };

    const updateQuantity = (itemId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(itemId);
        } else {
            setCart(prevCart => prevCart.map(item => 
                item.id === itemId ? { ...item, quantity } : item
            ));
        }
    };

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getCartCount = () => {
        return cart.reduce((count, item) => count + item.quantity, 0);
    };

    const handleCheckout = () => {
        const emailSubject = encodeURIComponent("Merch Order Request - Funk N Spuds");
        
        let emailBody = "Hi Max,\n\n";
        emailBody += "I'd like to place an order for the following Funk N Spuds merch:\n\n";
        
        cart.forEach((item, index) => {
            emailBody += `${index + 1}. ${item.name}`;
            if (item.size) {
                emailBody += ` (Size: ${item.size})`;
            }
            if (item.color) {
                emailBody += ` (Color: ${item.color})`;
            }
            if (item.song) {
                emailBody += ` (Song: ${item.song})`;
            }
            emailBody += ` - Quantity: ${item.quantity} - $${item.price} each\n`;
        });
        
        emailBody += `\nTotal: $${getCartTotal()}\n\n`;
        emailBody += "Please check inventory availability and let me know how to proceed with payment.\n\n";
        emailBody += "Thanks!\n";
        
        const encodedBody = encodeURIComponent(emailBody);
        const mailtoLink = `mailto:funknspuds@gmail.com?subject=${emailSubject}&body=${encodedBody}`;
        
        window.open(mailtoLink);
        setShowCart(false); // Close the cart modal after opening email
    };

    const getFilteredItems = () => {
        if (selectedCategory === "all") {
            return Object.values(MERCH_ITEMS);
        } else if (selectedCategory === "featured") {
            return getFeaturedItems();
        } else if (selectedCategory === "comingSoon") {
            return Object.values(MERCH_ITEMS).filter(item => item.comingSoon);
        } else {
            return getItemsByCategory(selectedCategory);
        }
    };

    const filteredItems = getFilteredItems();

    return (
        <div className="container rocksalt">
            {/* Header with Cart */}
            <div className="merch-header">
                <div className="merch-title-section">
                    <h1 className="spudsite">Merch</h1>
                    <p>Support the Spuds and show your love with our official merchandise!</p>
                </div>
                <div className="cart-icon-container">
                    <button 
                        className="cart-icon-btn"
                        onClick={() => setShowCart(true)}
                    >
                        🛒 <span className="cart-count">{getCartCount()}</span>
                    </button>
                </div>
            </div>

            {/* Category Filter */}
            <div className="merch-category-filter" style={{ position: 'relative', zIndex: 1 }}>
                <div className="category-buttons">
                    <button
                        className={`category-btn ${selectedCategory === "all" ? "active" : ""}`}
                        onClick={() => handleCategoryChange("all")}
                    >
                        All Items
                    </button>
                    <button
                        className={`category-btn ${selectedCategory === "featured" ? "active" : ""}`}
                        onClick={() => handleCategoryChange("featured")}
                    >
                        Featured
                    </button>
                    <button
                        className={`category-btn ${selectedCategory === MERCH_CATEGORIES.shirts ? "active" : ""}`}
                        onClick={() => handleCategoryChange(MERCH_CATEGORIES.shirts)}
                    >
                        Shirts
                    </button>
                    <button
                        className={`category-btn ${selectedCategory === MERCH_CATEGORIES.cds ? "active" : ""}`}
                        onClick={() => handleCategoryChange(MERCH_CATEGORIES.cds)}
                    >
                        CDs
                    </button>
                    <button
                        className={`category-btn ${selectedCategory === MERCH_CATEGORIES.stickers ? "active" : ""}`}
                        onClick={() => handleCategoryChange(MERCH_CATEGORIES.stickers)}
                    >
                        Stickers
                    </button>
                    <button
                        className={`category-btn ${selectedCategory === MERCH_CATEGORIES.lyrics ? "active" : ""}`}
                        onClick={() => handleCategoryChange(MERCH_CATEGORIES.lyrics)}
                    >
                        Handwritten Lyrics
                    </button>
                    <button
                        className={`category-btn ${selectedCategory === "comingSoon" ? "active" : ""}`}
                        onClick={() => handleCategoryChange("comingSoon")}
                    >
                        Coming Soon
                    </button>

                </div>
            </div>

            {/* Merch Grid */}
            <div className={`merch-grid-container ${openItemId ? 'modal-open' : ''}`} style={{ position: 'relative', zIndex: 2 }}>
                {filteredItems.length === 0 ? (
                    <div className="no-items-message">
                        <p>No items found in this category.</p>
                    </div>
                ) : (
                    <div className="merch-grid">
                        {filteredItems.map((item, index) => (
                            <div key={`${selectedCategory}-${item.id}`} className="merch-item-wrapper" style={{ animationDelay: `${(index + 1) * 0.1}s` }}>
                                <MerchCard
                                    item={item}
                                    isOpen={openItemId === item.id}
                                    onToggle={() => toggleItem(item.id)}
                                    onAddToCart={addToCart}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Go to Cart Button */}
            {cart.length > 0 && (
                <div className="go-to-cart-container">
                    <button 
                        className="go-to-cart-btn"
                        onClick={() => setShowCart(true)}
                    >
                        🛒 Go to Cart ({getCartCount()} items)
                    </button>
                </div>
            )}

            {/* Footer */}
            <footer className="container text-center mt-5" style={{ position: 'relative', zIndex: 1 }}>
                <FooterLinks />
                <div className="text-center">
                    <a href="https://lens.snapchat.com/9ab8073ff16547e5bd413f811fb3e513?sender_web_id=4a206bd0-61c0-4d01-9a1c-0db2f2654c50&device_type=desktop&is_copy_url=true">
                        <img style={{ height: "10em", width: "15em" }} src={jumpingSpud} alt="Jumping Spud" />
                    </a>
                </div>
            </footer>

            {/* Cart Modal */}
            {showCart && (
                <div className="cart-modal">
                    <div className="cart-modal-backdrop" onClick={() => setShowCart(false)}></div>
                    <div className="cart-modal-content">
                        <div className="cart-header">
                            <h3>Your Cart</h3>
                            <button className="btn btn-danger btn-sm cart-close-btn" onClick={() => setShowCart(false)}>×</button>
                        </div>
                        {cart.length === 0 ? (
                            <div className="cart-empty">
                                <p>Your cart is empty</p>
                            </div>
                        ) : (
                            <>
                                <div className="cart-items">
                                    {cart.map((item) => (
                                        <div key={item.id} className="cart-item">
                                            <img src={item.image} alt={item.name} className="cart-item-image" />
                                            <div className="cart-item-details">
                                                <h6>{item.name}</h6>
                                                {item.size && <p>Size: {item.size}</p>}
                                                {item.color && <p>Color: {item.color}</p>}
                                                {item.song && <p>Song: {item.song}</p>}
                                                <p className="cart-item-price">${item.price}</p>
                                            </div>
                                            <div className="cart-item-quantity">
                                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                            </div>
                                            <button className="cart-remove-btn" onClick={() => removeFromCart(item.id)}>×</button>
                                        </div>
                                    ))}
                                </div>
                                <div className="cart-footer">
                                    <div className="cart-total">
                                        <strong>Total: ${getCartTotal()}</strong>
                                    </div>
                                    <button className="cart-checkout-btn" onClick={handleCheckout}>Checkout</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Merch; 