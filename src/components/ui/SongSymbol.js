import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
    dispatchSpuddieSongCardClose,
    dispatchSpuddieSongCardOpen,
    dispatchSpuddieSongSymbolClick
} from "../spuddie/spuddieEvents";

function SongSymbol({ song, isOpen, onToggle, shouldRotate = false, alignRight = false }) {
    const [shouldRenderCard, setShouldRenderCard] = useState(isOpen);
    const cardRef = useRef(null);
    const wasOpenRef = useRef(isOpen);
    const spuddieTargetId = `song-symbol:${song.name}`;

    useEffect(() => {
        if (isOpen) {
            setShouldRenderCard(true);
            return undefined;
        }

        const closeTimer = setTimeout(() => {
            setShouldRenderCard(false);
        }, 280);

        return () => clearTimeout(closeTimer);
    }, [isOpen]);

    useEffect(() => {
        const wasOpen = wasOpenRef.current;
        wasOpenRef.current = isOpen;

        if (wasOpen && !isOpen) {
            dispatchSpuddieSongCardClose({ songName: song.name });
            return undefined;
        }

        if (!isOpen || !shouldRenderCard) {
            return undefined;
        }

        const frameId = window.requestAnimationFrame(() => {
            const rect = cardRef.current?.getBoundingClientRect();

            if (!rect) {
                return;
            }

            dispatchSpuddieSongCardOpen({
                songName: song.name,
                rect: {
                    left: rect.left,
                    right: rect.right,
                    top: rect.top,
                    bottom: rect.bottom,
                    width: rect.width,
                    height: rect.height
                }
            });
        });

        return () => window.cancelAnimationFrame(frameId);
    }, [isOpen, shouldRenderCard, song.name]);

    useEffect(() => {
        return () => {
            if (wasOpenRef.current) {
                dispatchSpuddieSongCardClose({ songName: song.name });
            }
        };
    }, [song.name]);

    const containerStyle = {
        display: "inline-block"
    };

    const handleTriggerActivate = () => {
        dispatchSpuddieSongSymbolClick({
            songName: song.name,
            targetId: spuddieTargetId
        });
        onToggle();
    };

    const cardOverlay = shouldRenderCard ? createPortal(
        <div className={`song-card-overlay ${isOpen ? "is-open" : "is-closing"}`} role="presentation">
            <div className="song-card-backdrop" aria-hidden="true" />
            <div
                ref={cardRef}
                className={`card specialCard text-center song-card-modal ${isOpen ? "is-opening" : "is-closing"}`}
                role="dialog"
                aria-modal="true"
                aria-label={song.name}
                data-spuddie-interest="song-card"
            >
                <div className="card-header m-2 song-card-header">
                    <p className="d-inline rocksalt song-card-title"><strong>{song.name}</strong></p>
                    <button
                        className="btn btn-danger btn-sm song-close-btn"
                        type="button"
                        onClick={onToggle}
                        aria-label={`Close ${song.name}`}
                    >
                        ×
                    </button>
                </div>
                <div className="text-center song-card-video-wrap">
                    <iframe
                        className="card-img-top text-center song-card-video"
                        src={song.youtubeUrl}
                        title={`${song.name} video player`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
                <div className="card-body beenie d-inline song-card-body">
                    <h5 className="card-text">{song.description}</h5>
                </div>
            </div>
        </div>,
        document.body
    ) : null;

    return (
        <div style={containerStyle}>
            <div
                className={`song-symbol-trigger ${shouldRotate ? "rotate2" : ""} ${alignRight ? "song-symbol-align-right" : ""}`}
                onClick={handleTriggerActivate}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        handleTriggerActivate();
                    }
                }}
                aria-label={`Open ${song.name}`}
                aria-expanded={isOpen}
                data-spuddie-interest="song-symbol"
                data-spuddie-target-id={spuddieTargetId}
            >
                {shouldRotate && (
                    <img
                        src={song.symbol}
                        alt=""
                        className="songSymbol song-symbol-stationary-shadow"
                        aria-hidden="true"
                    />
                )}
                <img src={song.symbol} alt={song.altText} className="songSymbol" />
            </div>
            {cardOverlay}
        </div>
    );
}

export default SongSymbol;
