import React, { useState } from 'react';
import PhotoGallery from './PhotoGallery';

function MemberPanel({ member, isInfoShown, onToggle, top, isGallery, galleryImages }) {
    const [showGallery, setShowGallery] = useState(false);

    const handleClick = () => {
        if (isGallery) {
            setShowGallery(true);
        } else {
            onToggle();
        }
    };

    if (isInfoShown) {
        const imageClassName = top ? "card-image-top text-center m-1" : "card-img-bottom text-center m-1";
        const imageStyle = {
            width: "17em",
            height: "auto",
            borderRadius: "7px"
        };

        return (
            <div className="card specialCard text-center m-2" style={{width: "19em"}}>
                <div className="card-header m-2">
                    <p className="d-inline spudsiteSm" style={{ fontSize: "1.4rem" }}>
                        <strong>{member.name}</strong>
                    </p>
                    <button className="btn btn-danger btn-sm float-end" onClick={onToggle}>X</button>
                </div>
                <div className="card-body beenie">
                    <p style={{ 
                        fontSize: "1.2rem",
                        lineHeight: "1.5",
                        margin: "1rem 0"
                    }}>
                        {member.description}
                    </p>
                    <div className="text-center">
                        <img 
                            src={member.dalle} 
                            alt="Image created via Dall-E OpenAI" 
                            className={imageClassName} 
                            style={imageStyle} 
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div onClick={handleClick}>
            <img 
                style={{display: "inline-block"}}
                src={member.spuddie}
                alt={member.alt}
                className="spuddies m-2 col-6"
            />
            {isInfoShown && !isGallery && (
                <div className="member-info">
                    <h3>{member.name}</h3>
                    <p>{member.description}</p>
                </div>
            )}
            {showGallery && (
                <PhotoGallery 
                    images={galleryImages} 
                    onClose={() => setShowGallery(false)} 
                />
            )}
        </div>
    );
}

export default MemberPanel; 