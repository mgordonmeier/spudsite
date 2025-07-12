import React, { useState } from "react";
import "./Music.css";
import FooterLinks from "../ui/FooterLinks";
import './Music.css';
import SongSymbolWrapper from '../ui/SongSymbol';
import jumpingSpud from "../../img/FunkNJump.gif";
import changes from "../../img/ChangesSongSymbol.png";
import pentUp from "../../img/PentUpSongSymbol.png";
import beenGone from "../../img/BeenGoneSongSymbol.png";
import lithouse from "../../img/Orbz/LithouseOrb.png";

const SONGS = {
    beenGone: {
        name: "Been Gone",
        symbol: beenGone,
        altText: "Been Gone Song Symbol",
        youtubeUrl: "https://www.youtube.com/embed/I-a0hjlSZaU?start=2268",
        description: "Been Gone is a break-up song resulting from a split Max experienced in early 2018. " +
            "'The music is broken, the music is clear - And we're wandering around believing in the sound, my dear'. Sometimes " +
            "it's better to call it quits than trying to put back together a shattered piece of glass."
    },
    changes: {
        name: "Changes",
        symbol: changes,
        altText: "Changes Song Symbol",
        youtubeUrl: "https://www.youtube.com/embed/-PSL2XeBKA8",
        description: "Meditating on the balcony of the house Max and Martin shared during the beginning of the pandemic, " +
            "Max wrote this song and shared it with the Spuds mid-livestream. The band quickly learned to jam on the simple four chord progression " +
            "and it is one of the tracks appearing on Ramsey's Adventure Cabin - EP"
    },
    pentUp: {
        name: "Pent Up",
        symbol: pentUp,
        altText: "Pent Up Song Symbol",
        youtubeUrl: "https://www.youtube.com/embed/hWuE9rREJQI",
        description: "Zach came up with the stellar sax part to this groove (originally an iPhone recording of the group during the first days of the pandemic). " +
            "The group arranged and recorded this track during Ramsey Adventure Cabin weekend. Can you feel the energy?"
    },
    litHouse: {
        name: "LitHouse",
        symbol: lithouse,
        altText: "LitHouse Song Symbol",
        youtubeUrl: "https://www.youtube.com/embed/2fnhFhTp5-g",
        description: "LitHouse is a song that Justin brought to the group over the summer of 2021. Upon the cyclical piano " +
            "intro Zach threw some ambient sax, Max transformed into a singing whale with the help of his flugelhorn, and the rest of the Spuds " +
            "helped to build this soaring atmospheric sonic tome."
    }
};

function Music() {
    const [songStates, setSongStates] = useState({
        beenGone: false,
        changes: false,
        pentUp: false,
        litHouse: false
    });

    const toggleSong = (songKey) => {
        setSongStates(prev => ({
            ...prev,
            [songKey]: !prev[songKey]
        }));
    };

    const youtubeVideos = [
        {
            url: "https://www.youtube.com/embed/MOTcyp4Lj64?start=5907",
            title: "YouTube - Spud County"
        },
        {
            url: "https://www.youtube.com/embed/PRyNdlSUJJY?start=19666",
            title: "YouTube - Porchfest"
        },
        {
            url: "https://www.youtube.com/embed/C5eFspyaYmc?start=267",
            title: "YouTube - RAC EP Release"
        }
    ];

    const bandcampSingles = [
        {
            title: "Hillside Sunset",
            trackId: "1177938476",
            link: "hillside-sunset-3"
        },
        {
            title: "Lithouse",
            trackId: "766847436",
            link: "lithouse"
        },
        {
            title: "Tied In Knots",
            trackId: "3510970589",
            link: "tied-in-knots"
        },
        {
            title: "Low Hanging Ceilings",
            trackId: "2496098191",
            link: "low-hanging-ceilings-3",
            linkColor: "63b2cc" // special case for this track
        }
    ];

    const bandcampAlbums = [
        {
            title: "Into Focus",
            albumId: "2671849949",
            width: "350px",
            height: "760px",
            showTracklist: true
        },
        {
            title: "Harmonize",
            albumId: "879770262",
            width: "200px",
            height: "600px"
        },
        {
            title: "Ramsey's Adventure Cabin",
            albumId: "317344125",
            width: "200px",
            height: "500px"
        }
    ];

    return (
        <div className="rocksalt container">
            <div className="text-center">
                <div>
                    <div className="text-end m-2">
                        <SongSymbolWrapper
                            song={SONGS.beenGone}
                            isOpen={songStates.beenGone}
                            onToggle={() => toggleSong('beenGone')}
                            shouldRotate={false}
                        />
                    </div>

                    <h1 className="spudsite">Listen on Bandcamp</h1>
                    <div className="bandcamp-box">
                        <div className="singles-section">
                            {bandcampSingles.map((single, index) => (
                                <iframe 
                                    key={index}
                                    className="m-3"
                                    title={`${single.title} Bandcamp`}
                                    style={{ 
                                        border: "8em",
                                        width: "200px",
                                        height: "200px",
                                        borderRadius: "4px"
                                    }}
                                    src={`https://bandcamp.com/EmbeddedPlayer/track=${single.trackId}/size=large/bgcol=ffffff/linkcol=${single.linkColor || '0687f5'}/tracklist=false/transparent=true/`}
                                    seamless
                                >
                                    <a href={`https://funknspuds.bandcamp.com/track/${single.link}`}>
                                        {single.title} by Funk N Spuds
                                    </a>
                                </iframe>
                            ))}
                        </div>

                        <div className="albums-section">
                            {bandcampAlbums.map((album, index) => (
                                <div key={index} className={index === 0 ? "" : "text-center align-top"} 
                                     style={index !== 0 ? {display: "inline-block"} : undefined}>
                                    <iframe 
                                        className="m-3 align-top"
                                        title={`${album.title} Bandcamp`}
                                        style={{
                                            border: "4em",
                                            width: album.width,
                                            height: album.height
                                        }}
                                        src={`https://bandcamp.com/EmbeddedPlayer/album=${album.albumId}/size=large/bgcol=ffffff/linkcol=0687f5/${album.showTracklist ? 'tracklist=true/' : ''}transparent=true/`}
                                        seamless
                                    >
                                        <a href={`https://funknspuds.bandcamp.com/album/${album.title.toLowerCase().replace(/\s+/g, '-')}`}>
                                            {album.title} by Funk N Spuds
                                        </a>
                                    </iframe>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="text-start m-2">
                        <SongSymbolWrapper
                            song={SONGS.litHouse}
                            isOpen={songStates.litHouse}
                            onToggle={() => toggleSong('litHouse')}
                            shouldRotate={true}
                        />
                    </div>

                    <h1 className="mb-5 spudsite">Livestream Central</h1>

                    <div className="music-video-box">
                        {youtubeVideos.map((video, index) => (
                            <div key={index} className="ratio ratio-16x9 m-3" 
                                 style={{ width: "65vw", display: "inline-block" }}>
                                <iframe 
                                    style={{ borderRadius: "4px" }}
                                    src={video.url}
                                    title={video.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        ))}
                    </div>

                    <div className="text-start m-2">
                        <SongSymbolWrapper
                            song={SONGS.changes}
                            isOpen={songStates.changes}
                            onToggle={() => toggleSong('changes')}
                            shouldRotate={false}
                        />
                    </div>

                    <div className="text-end m-2">
                        <SongSymbolWrapper
                            song={SONGS.pentUp}
                            isOpen={songStates.pentUp}
                            onToggle={() => toggleSong('pentUp')}
                            shouldRotate={false}
                        />
                    </div>
                    <footer className="container text-center">
                        <FooterLinks />
                        <div className="text-center">
                            <a href="https://lens.snapchat.com/9ab8073ff16547e5bd413f811fb3e513?sender_web_id=4a206bd0-61c0-4d01-9a1c-0db2f2654c50&device_type=desktop&is_copy_url=true">
                                <img 
                                    className="jumping-spud"
                                    src={jumpingSpud}
                                    alt="Jumping Spud"
                                />
                            </a>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
}

export default Music;