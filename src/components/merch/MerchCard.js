import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./MerchCard.css";
import { isInStock, getAvailableSizes, decrementStock, getAvailabilityStatus } from "./inventory";

function MerchCard({ item, isOpen, onToggle, onAddToCart }) {
    const [shouldRenderModal, setShouldRenderModal] = useState(isOpen);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedSong, setSelectedSong] = useState("");
    const cardRef = useRef(null);
    const wasOpenRef = useRef(isOpen);
    
    // Get available sizes from inventory
    const availableSizes = useMemo(
        () => item.sizes ? getAvailableSizes(item.id) : [],
        [item.id, item.sizes]
    );
    
    // Set initial selected size to first available size
    useEffect(() => {
        if (availableSizes.length > 0 && !selectedSize) {
            setSelectedSize(availableSizes[0]);
        }
    }, [availableSizes, selectedSize]);

    useEffect(() => {
        if (isOpen) {
            setShouldRenderModal(true);
            return undefined;
        }

        const closeTimer = setTimeout(() => {
            setShouldRenderModal(false);
        }, 280);

        return () => clearTimeout(closeTimer);
    }, [isOpen]);

    useEffect(() => {
        const wasOpen = wasOpenRef.current;
        wasOpenRef.current = isOpen;

        if (wasOpen && !isOpen) {
            window.dispatchEvent(new CustomEvent("spuddie:song-card-close", {
                detail: { songName: item.name }
            }));
            return undefined;
        }

        if (!isOpen || !shouldRenderModal) {
            return undefined;
        }

        const frameId = window.requestAnimationFrame(() => {
            const rect = cardRef.current?.getBoundingClientRect();

            if (!rect) {
                return;
            }

            window.dispatchEvent(new CustomEvent("spuddie:song-card-open", {
                detail: {
                    songName: item.name,
                    rect: {
                        left: rect.left,
                        right: rect.right,
                        top: rect.top,
                        bottom: rect.bottom,
                        width: rect.width,
                        height: rect.height
                    }
                }
            }));
        });

        return () => window.cancelAnimationFrame(frameId);
    }, [isOpen, shouldRenderModal, item.name]);

    const handleImageClick = (index) => {
        setSelectedImageIndex(index);
    };

    const handleSizeChange = (size) => {
        setSelectedSize(size);
    };

    const handleAddToCart = () => {
        // Decrement inventory
        if (selectedSize) {
            decrementStock(item.id, selectedSize);
        } else {
            decrementStock(item.id, 'default');
        }
        
        // Add to cart with song choice for lyrics
        if (item.category === "Handwritten Lyrics") {
            onAddToCart(item, null, selectedSong);
        } else {
            onAddToCart(item, selectedSize);
        }
        
        // Close the modal
        onToggle();
    };

    if (shouldRenderModal) {
        return createPortal(
            <div className={`song-card-overlay merch-card-expanded ${isOpen ? "is-open" : "is-closing"}`} role="presentation">
                <div className="song-card-backdrop merch-modal-backdrop" onClick={onToggle} aria-hidden="true"></div>
                <div
                    ref={cardRef}
                    className={`card specialCard text-center song-card-modal merch-modal-content ${isOpen ? "is-opening" : "is-closing"}`}
                    role="dialog"
                    aria-modal="true"
                    aria-label={item.name}
                    data-spuddie-interest="song-card"
                >
                    <div className="card-header m-2 song-card-header merch-card-header">
                        <p className="d-inline rocksalt song-card-title merch-card-title"><strong>{item.name}</strong></p>
                        <button
                            className="btn btn-danger btn-sm song-close-btn merch-close-btn"
                            type="button"
                            onClick={onToggle}
                            aria-label={`Close ${item.name}`}
                        >
                            ×
                        </button>
                    </div>
                    
                    {/* Image Gallery */}
                    <div className="merch-image-container">
                        <img 
                            src={item.images[selectedImageIndex].src} 
                            alt={item.images[selectedImageIndex].alt}
                            className="merch-primary-image"
                        />
                        
                        {/* Thumbnail Navigation */}
                        {item.images.length > 1 && (
                            <div className="merch-thumbnails">
                                {item.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image.src}
                                        alt={image.alt}
                                        className={`merch-thumbnail ${selectedImageIndex === index ? 'active' : ''}`}
                                        onClick={() => handleImageClick(index)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Item Details */}
                    <div className="card-body">
                        <p className="merch-description">{item.description}</p>
                        
                        <div className="merch-price">
                            <strong>${item.price}</strong>
                        </div>

                        {/* Size Selection */}
                        {item.sizes && (
                            <div className="merch-option-group">
                                <label className="merch-option-label">Size:</label>
                                <div className="merch-option-buttons">
                                    {item.sizes.map((size) => (
                                        <button
                                            key={size}
                                            className={`merch-option-btn ${selectedSize === size ? 'selected' : ''}`}
                                            onClick={() => handleSizeChange(size)}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Song Selection for Handwritten Lyrics */}
                        {item.category === "Handwritten Lyrics" && (
                            <div className="merch-option-group">
                                <label className="merch-option-label">Song Choice:</label>
                                <input
                                    type="text"
                                    className="form-control merch-song-input"
                                    placeholder="Enter the song you'd like handwritten lyrics for..."
                                    value={selectedSong}
                                    onChange={(e) => setSelectedSong(e.target.value)}
                                />
                            </div>
                        )}



                        {/* Stock Status */}
                        <div className="merch-stock-status">
                            {item.comingSoon ? (
                                <div>
                                    <span className="text-warning">🚀 Coming Soon!</span>
                                </div>
                            ) : item.sizes ? (
                                <div>
                                    <span className="text-success">✓ Available Sizes: {availableSizes.join(', ')}</span>
                                    {selectedSize && (
                                        <div className="stock-count">
                                            {getAvailabilityStatus(item.id, selectedSize) === 'available' && '✓ In Stock'}
                                            {getAvailabilityStatus(item.id, selectedSize) === 'low' && '⚠ Low Stock'}
                                            {getAvailabilityStatus(item.id, selectedSize) === 'out' && '✗ Out of Stock'}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div>
                                    {getAvailabilityStatus(item.id) === 'available' && <span className="text-success">✓ In Stock</span>}
                                    {getAvailabilityStatus(item.id) === 'low' && <span className="text-warning">⚠ Low Stock</span>}
                                    {getAvailabilityStatus(item.id) === 'out' && <span className="text-danger">✗ Out of Stock</span>}
                                </div>
                            )}
                        </div>

                        {/* Purchase Button */}
                        <button 
                            className="btn btn-primary merch-purchase-btn"
                            onClick={handleAddToCart}
                            disabled={
                                item.comingSoon || 
                                (item.category === "Handwritten Lyrics" ? !selectedSong.trim() : false) ||
                                (item.sizes ? !selectedSize || !isInStock(item.id, selectedSize) : !isInStock(item.id))
                            }
                        >
                            {item.comingSoon ? 'Coming Soon' :
                                (item.category === "Handwritten Lyrics" ? 
                                    (selectedSong.trim() ? 'Add to Cart' : 'Enter Song Choice') :
                                    (item.sizes ? 
                                        (selectedSize && isInStock(item.id, selectedSize) ? 'Add to Cart' : 'Out of Stock') :
                                        (isInStock(item.id) ? 'Add to Cart' : 'Out of Stock')
                                    )
                                )
                            }
                        </button>
                    </div>
                </div>
        </div>,
        document.body
        );
    }

    // Collapsed view - just show the item card
    const primaryImage = item.images.find(img => img.isPrimary) || item.images[0];
    
    return (
        <div className="merch-card-collapsed" onClick={onToggle}>
            <div className="card specialCard merch-item-card">
                <img 
                    src={primaryImage.src} 
                    alt={primaryImage.alt}
                    className="merch-item-image"
                />
                <div className="merch-item-name-visible">
                    <h6 className="merch-item-name">{item.name}</h6>
                </div>
                <div className="merch-item-overlay">
                    <div className="merch-item-details">
                        <p className="merch-item-price">${item.price}</p>
                        <p className="merch-item-category">{item.category}</p>
                        <div className="merch-item-stock">
                            {item.comingSoon ? 
                                <span className="text-warning">🚀 Coming Soon</span> :
                                (item.sizes ? 
                                    (getAvailableSizes(item.id).length > 0 ? 
                                        <span className="text-success">✓ In Stock</span> : 
                                        <span className="text-danger">✗ Out of Stock</span>
                                    ) :
                                    (isInStock(item.id) ? 
                                        <span className="text-success">✓ In Stock</span> : 
                                        <span className="text-danger">✗ Out of Stock</span>
                                    )
                                )
                            }
                        </div>
                    </div>
                    {item.featured && <span className="merch-featured-badge">Featured</span>}
                </div>
            </div>
        </div>
    );
}

export default MerchCard; 
