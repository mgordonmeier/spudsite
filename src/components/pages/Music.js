import React, { useEffect, useState } from "react";
import "./Music.css";
import FooterLinks from "../ui/FooterLinks";
import SongSymbolWrapper from '../ui/SongSymbol';
import LazyIframe from '../ui/LazyIframe';
import jumpingSpud from "../../img/FunkNJump.gif";
import changes from "../../img/ChangesSongSymbol.png";
import pentUp from "../../img/PentUpSongSymbol.png";
import beenGone from "../../img/BeenGoneSongSymbol.png";
import envelope from "../../img/EnvelopeSongSymbol.png";
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
    },
    envelope: {
        name: "The Envelope",
        symbol: envelope,
        altText: "The Envelope Song Symbol",
        youtubeUrl: "https://www.youtube.com/embed/0dsg35UWTeA",
        description: "Justin brought this song to Max and Martin on a random Saturday in October 2020 when " +
            "the three were gathered to record a track called Show Up by Joe Davis. The magic that is The Envelope was the trio's third " +
            "take playing through the loose and jammy form. Justin doubles on bass and 12 string."
    }
};

const FEATURED_VIDEO_LINKS = [
    'https://www.youtube.com/embed/kIhJc4kovKI?si=fWFWN4pML-KEzmti',
    'https://www.youtube.com/embed/KMAOT2d1tXI',
    'https://www.youtube.com/embed/Et9OYk7XIM8?si=6QkB0ERDrG-L24N2',
    'https://www.youtube.com/embed/pIDOSohb8jI?si=UhPYXR0LZo9K1JSF',
    'https://www.youtube.com/embed/2O8G22vrpRw?si=ZuXUKsBQSalX-z45',
    'https://www.youtube.com/embed/q6x-OIfsgRg?si=Zkst6Qz3Po3_3hDZ',
    'https://www.youtube.com/embed/OQuKGgxlRYk?si=YIimR7ixwhMyjSvW',
    'https://www.youtube.com/embed/9783gZaMlZU?si=vTYGS6pBVvXj9LjC',
    'https://www.youtube.com/embed/MjuEEClLuDQ?si=M-tN-qUeB7Gwqvnx',
    'https://www.youtube.com/embed/wMLpBWudGPk?si=NqAokb70KMisDBMm',
    'https://www.youtube.com/embed/3AcNSV5UqUY?si=Rm1JmLMZR7-LecxX'
];

function Music() {
    const [featuredVideo, setFeaturedVideo] = useState('');
    const [songStates, setSongStates] = useState({
        beenGone: false,
        changes: false,
        pentUp: false,
        litHouse: false,
        envelope: false
    });

    useEffect(() => {
        setFeaturedVideo(FEATURED_VIDEO_LINKS[Math.floor(Math.random() * FEATURED_VIDEO_LINKS.length)]);
    }, []);

    const toggleSong = (songKey) => {
        setSongStates(prev => ({
            ...prev,
            [songKey]: !prev[songKey]
        }));
    };

    const youtubeVideos = [
        {
            url: "https://www.youtube.com/embed/UP3HcJexDOE?si=c8WpKH1aBHPJTg-Z",
            title: "Flavor World Presents: Funk N Spuds Live at Greenway Recording"
        },
        {
            url: "https://www.youtube.com/embed/0Z5PQY-aa8o?si=7-EIzz8-N9CWpLGb",
            title: "Five Years Of Funk N Spuds"
        },
        {
            url: "https://www.youtube.com/embed/MOTcyp4Lj64?start=5907",
            title: "Spud County"
        },
        {
            url: "https://www.youtube.com/embed/PRyNdlSUJJY?start=19666",
            title: "Como Porchfest"
        },
        {
            url: "https://www.youtube.com/embed/C5eFspyaYmc?start=267",
            title: "Ramsey's Adventure Cabin EP Release"
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
                                <LazyIframe
                                    key={index}
                                    className="m-3"
                                    title={`${single.title} Bandcamp`}
                                    style={{ display: 'inline-block' }}
                                    src={`https://bandcamp.com/EmbeddedPlayer/track=${single.trackId}/size=large/bgcol=ffffff/linkcol=${single.linkColor || '0687f5'}/tracklist=false/transparent=true/`}
                                    width="200px"
                                    height="200px"
                                />
                            ))}
                        </div>

                        <div className="albums-section">
                            {bandcampAlbums.map((album, index) => (
                                <div key={index} className={index === 0 ? "" : "text-center align-top"} 
                                     style={index !== 0 ? {display: "inline-block"} : undefined}>
                                    <LazyIframe
                                        className="m-3 align-top"
                                        title={`${album.title} Bandcamp`}
                                        style={{ display: 'inline-block' }}
                                        src={`https://bandcamp.com/EmbeddedPlayer/album=${album.albumId}/size=large/bgcol=ffffff/linkcol=0687f5/${album.showTracklist ? 'tracklist=true/' : ''}transparent=true/`}
                                        width={album.width}
                                        height={album.height}
                                    />
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

                    <section className="youtube-feature-section" aria-label="Featured YouTube video">
                        <h1 className="spudsite mb-5">Check us out on YouTube</h1>
                        {featuredVideo && (
                            <div className="youtube-feature-video ratio ratio-16x9 mt-3">
                                <LazyIframe
                                    src={featuredVideo}
                                    title="Funk N Spuds YouTube video"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    width="100%"
                                    height="100%"
                                />
                            </div>
                        )}
                        <div className="text-end youtube-feature-symbol">
                            <SongSymbolWrapper
                                song={SONGS.envelope}
                                isOpen={songStates.envelope}
                                onToggle={() => toggleSong('envelope')}
                            />
                        </div>
                    </section>

                    <h1 className="mb-5 spudsite">Livestream Central</h1>

                    <div className="music-video-box">
                        {youtubeVideos.map((video, index) => (
                            <div key={index} className="ratio ratio-16x9 m-3" 
                                 style={{ width: "65vw", display: "inline-block" }}>
                                <LazyIframe
                                    src={video.url}
                                    title={video.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    width="100%"
                                    height="100%"
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
                                    loading="lazy"
                                    className="jumping-spud center-img"
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
