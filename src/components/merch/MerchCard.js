import React, { useState } from "react";
import { createPortal } from "react-dom";
import "./MerchCard.css";
import { getStockLevel, isInStock, getAvailableSizes, decrementStock, getAvailabilityStatus } from "./inventory";

function MerchCard({ item, isOpen, onToggle, onAddToCart }) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedSong, setSelectedSong] = useState("");
    
    // Get available sizes from inventory
    const availableSizes = item.sizes ? getAvailableSizes(item.id) : [];
    
    // Set initial selected size to first available size
    React.useEffect(() => {
        if (availableSizes.length > 0 && !selectedSize) {
            setSelectedSize(availableSizes[0]);
        }
    }, [availableSizes, selectedSize]);

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

    if (isOpen) {
        return createPortal(
            <div className="merch-card-expanded">
                <div className="merch-modal-backdrop" onClick={onToggle}></div>
                <div className="merch-modal-content">
                    <div className="card specialCard text-center" style={{ width: "35rem", maxWidth: "95vw" }}>
                    <div className="card-header m-2 d-flex justify-content-between align-items-center">
                        <h4 className="mb-0"><strong>{item.name}</strong></h4>
                        <button className="btn btn-danger btn-sm merch-close-btn" onClick={onToggle}>×</button>
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