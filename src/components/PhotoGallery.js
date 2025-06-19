import React, { useState } from 'react';
import './PhotoGallery.css';

const PhotoGallery = ({ images, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const previousImage = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="gallery-modal">
            <div className="gallery-overlay" onClick={onClose}>
                <div className="gallery-content" onClick={e => e.stopPropagation()}>
                    <div className="gallery-header">
                        <button className="gallery-close" onClick={onClose}>&times;</button>
                    </div>
                    <img 
                        src={images[currentIndex]} 
                        alt={`Gallery image ${currentIndex + 1}`}
                        className="gallery-image"
                    />
                    <div className="gallery-controls">
                        <button className="gallery-nav prev" onClick={previousImage}>&#10094;</button>
                        <div className="gallery-counter">
                            {currentIndex + 1} / {images.length}
                        </div>
                        <button className="gallery-nav next" onClick={nextImage}>&#10095;</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhotoGallery; 