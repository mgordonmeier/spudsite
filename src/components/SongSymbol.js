import React from "react";

function SongSymbol({ song, isOpen, onToggle, shouldRotate = false, alignRight = false }) {
    const containerStyle = {
        display: "inline-block",
        ...(alignRight && {
            position: "relative",
            right: isOpen ? "20rem" : "0" // Offset by card width when open
        })
    };

    if (isOpen) {
        return (
            <div style={containerStyle}>
                <div className="card specialCard text-center m-2" style={{width: "20rem"}}>
                    <div className="card-header m-2">
                        <p className="d-inline"><strong>{song.name}</strong></p>
                        <button className="btn btn-danger btn-sm float-end" onClick={onToggle}>X</button>
                    </div>
                    <div className="text-center">
                        <iframe 
                            style={{width: "17rem"}} 
                            className="card-img-top text-center" 
                            src={song.youtubeUrl} 
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                        />
                    </div>
                    <div className="card-body beenie d-inline">
                        <h5 className="card-text">{song.description}</h5>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={containerStyle}>
            <div className={shouldRotate ? "rotate2" : ""} onClick={onToggle}>
                <img src={song.symbol} alt={song.altText} className="songSymbol" />
            </div>
        </div>
    );
}

export default SongSymbol; 