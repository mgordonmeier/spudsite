import React, { useState } from "react";
import FooterLinks from "./FooterLinks";
import "./Spuds.css";
import spuddieMax from "../img/spuddie-max.PNG";
import spuddieMarty from "../img/spuddie-marty.PNG";
import spuddieThomas from "../img/spuddie-thomas.PNG";
import spuddieJustin from "../img/spuddie-justin2.PNG";
import spuddieChristian from "../img/spuddie-christian.PNG"
import spuddieKrystal from "../img/spuddie-krystal.PNG"
import mtnSong from "../img/MountainSongSymbol.png";
import mango from "../img/MangoJamSongSymbol.png";
import cantStop from "../img/CantStopSongSymbol.png";
import harm from "../img/HarmonizeSongSymbol.png";
import jumpingSpud from "../img/FunkNJump.gif";
import dalleJustin from "../img/band_pix/JustinElias.jpeg";
import dalleMartin from "../img/band_pix/MartinUpNorth.jpeg";
import dalleThomas from "../img/band_pix/ThomasAppleton.jpeg";
import dalleMax from "../img/band_pix/MaxUpNorth.jpeg";
import dalleChristian from "../img/band_pix/ChristianElias.jpeg"
import MemberCard from "./MemberPanel";
import SongSymbolWrapper from './SongSymbol';
import { GALLERY_IMAGES } from './Home';

const SONGS = {
    mountainSong: {
        name: "The Mountain Song",
        symbol: mtnSong,
        altText: "Mountain Song Symbol",
        youtubeUrl: "https://www.youtube.com/embed/2O8G22vrpRw",
        description: "The Mountain Song was written by Max after an roadtrip to Colorado where he and a few " +
            "friends attempted to climb Mt. Elbert. Arriving around 3am at the base of the mountain, the friends made it to the summit " +
            "just before 6am when wild weather overtook them. A snowstorm forced them to take cover and eventually retreat, but just as they reached " +
            "the bottom of the summit, the clouds parted and (in Emperor's New Groove fashion) the mountaintop was singing."
    },
    mangoJam: {
        name: "Mango Jam",
        symbol: mango,
        altText: "Mango Jam Song Symbol",
        youtubeUrl: "https://www.youtube.com/embed/9783gZaMlZU",
        description: "Max threw together Mango Jam on garageband in his bedroom over the summer of 2019. He brought in " +
            "Thomas and Zach to shred over the foundation, tossed it to Martin while he was still living in La Crosse, and eventually brought " +
            "Justin in later that winter. This has long been one of the favorites of the band and fans alike."
    },
    cantStop: {
        name: "Can't Stop",
        symbol: cantStop,
        altText: "Can't Stop Song Symbol",
        youtubeUrl: "https://www.youtube.com/embed/Et9OYk7XIM8",
        description: "With origins dating back to bedroom recordings of 2013, Can't Stop might be the oldest FnS original still in tact. " +
            "Written with the help of Erik Lindgrin, this tune hits on the feeling of being in love and feeling like it will last forever."
    },
    harmonize: {
        name: "Harmonize",
        symbol: harm,
        altText: "Harmonize Song Symbol",
        youtubeUrl: "https://www.youtube.com/embed/tGncFGhEAY0",
        description: "Harmonize was written in the fall of 2016 after a double dose of inspiration from Bon Iver's recent 22 A Million album " +
            "and a colorful fall drive drenched in late afternoon autumn sun. After studying Yeat's poem 'The Second Coming' and Joan Didion's 'Slouching Towards Bethlehem', " +
            "Max felt some sense of impending doom. His response: Harmonize."
    }
};

const MEMBERS = {
    max: {
        name: "Max Meier",
        spuddie: spuddieMax,
        dalle: dalleMax,
        alt: "Spuddie Buddie - Max on Flugel",
        description: "Born and raised in Neenah Wisconsin, Max grew up playing music with and enjoying the company of his " +
            "brother Martin. When not playing music with Funk 'N Spuds he travels the country with his partner Nicole playing Quadball."
    },
    martin: {
        name: "Martin Meier",
        spuddie: spuddieMarty,
        dalle: dalleMartin,
        alt: "Spuddie Buddie - Marty on drums",
        description: "Martin grew up in Neenah Wisconsin with his brother Max, playing music together in school bands and getting into trouble. " +
            "This bandana-clad wizard spends his days chasing his cats around the apartment and making beats and synth jams that bring pure joy."
    },
    thomas: {
        name: "Thomas Hazlett",
        spuddie: spuddieThomas,
        dalle: dalleThomas,
        alt: "Spuddie Buddie - Thomas on Guitar",
        description: "Hailing from the Wild Wild Midwest, Thomas is Funk 'N Spuds' six string slinger. When the encore ends he trades in his " + 
            "guitar for a camera to ride off into the night, shooting stars in galaxies far, far away...."
    },
    justin: {
        name: "Justin Halverson",
        spuddie: spuddieJustin,
        dalle: dalleJustin,
        alt: "Spuddie Buddie - Justin on Guitar",
        description: "Justin was born and raised in Prior Lake, Minnesota, to a family who loves water, wind, and music. " +
            "He now lives in Saint Paul and makes music with the Funk 'N Spuds."
    },
    christian: {
        name: "Christian Rasmussen",
        spuddie: spuddieChristian,
        dalle: dalleChristian,
        alt: "Spuddie Buddie - Christian on Bass",
        description: "Fresh off a tear with the Immaculate Beings, Christian is a graduate of Lawrence University where he studied religion and jazz " +
            "and really knows how to funk it up. His chops and soul have cracked the spuds' sound wide open!"
    },
    krystal: {
        name: "Krystal Spud",
        spuddie: spuddieKrystal,
        dalle: null,
        alt: "Spuddie Buddie - Krystal the Gallery Spud",
        description: "Click to view our photo gallery!"
    }
};

function Spuds() {
    const [songStates, setSongStates] = useState({
        mountainSong: false,
        mangoJam: false,
        cantStop: false,
        harmonize: false
    });

    const [memberStates, setMemberStates] = useState({
        max: false,
        martin: false,
        thomas: false,
        justin: false,
        christian: false,
        krystal: false
    });

    const toggleSong = (songKey) => {
        setSongStates(prev => ({
            ...prev,
            [songKey]: !prev[songKey]
        }));
    };

    const toggleMember = (memberKey) => {
        setMemberStates(prev => ({
            ...prev,
            [memberKey]: !prev[memberKey]
        }));
    };

    return (
        <div className="container rocksalt">
            <div className="text-start m-2" style={{ position: 'relative', zIndex: 1 }}>
                <SongSymbolWrapper
                    song={SONGS.cantStop}
                    isOpen={songStates.cantStop}
                    onToggle={() => toggleSong('cantStop')}
                />
            </div>
            <div className="container" style={{ width: "100%", maxWidth: "500px", position: 'relative', zIndex: 1 }}>
                <h1 className="text-center spudsite">Meet the Spuds</h1>
            </div>
            <div className="text-end m-2" style={{ position: 'relative', zIndex: 1 }}>
                <SongSymbolWrapper
                    song={SONGS.mountainSong}
                    isOpen={songStates.mountainSong}
                    onToggle={() => toggleSong('mountainSong')}
                />
            </div>
            
            {/* Main spuds circle container */}
            <div className="spuds-circle-container" style={{ position: 'relative', zIndex: 2 }}>
                {/* Top row: Max and Martin */}
                <div className="spud-top">
                    <div className={`spud-member-wrapper${memberStates.max ? ' active' : ''}`}>
                        <MemberCard 
                            member={MEMBERS.max}
                            isInfoShown={memberStates.max}
                            onToggle={() => toggleMember('max')}
                        />
                    </div>
                    <div className={`spud-member-wrapper${memberStates.martin ? ' active' : ''}`}>
                        <MemberCard 
                            member={MEMBERS.martin}
                            isInfoShown={memberStates.martin}
                            onToggle={() => toggleMember('martin')}
                        />
                    </div>
                </div>
                {/* Bottom row: Thomas, Justin, Christian */}
                <div className="spud-bottom">
                    <div className={`spud-member-wrapper${memberStates.thomas ? ' active' : ''}`}>
                        <MemberCard 
                            member={MEMBERS.thomas}
                            isInfoShown={memberStates.thomas}
                            onToggle={() => toggleMember('thomas')}
                        />
                    </div>
                    <div className={`spud-member-wrapper${memberStates.justin ? ' active' : ''}`}>
                        <MemberCard 
                            member={MEMBERS.justin}
                            isInfoShown={memberStates.justin}
                            onToggle={() => toggleMember('justin')}
                        />
                    </div>
                    <div className={`spud-member-wrapper${memberStates.christian ? ' active' : ''}`}>
                        <MemberCard 
                            member={MEMBERS.christian}
                            isInfoShown={memberStates.christian}
                            onToggle={() => toggleMember('christian')}
                        />
                    </div>
                </div>
            </div>
            {/* Separate container for Krystal */}
            <div className="krystal-container" style={{ position: 'relative', zIndex: 2 }}>
                <div className="spud-member-wrapper">
                    <MemberCard 
                        member={MEMBERS.krystal}
                        isInfoShown={memberStates.krystal}
                        onToggle={() => toggleMember('krystal')}
                        isGallery={true}
                        galleryImages={GALLERY_IMAGES}
                    />
                </div>
            </div>
            <div className="text-start m-2" style={{ position: 'relative', zIndex: 1 }}>
                <SongSymbolWrapper
                    song={SONGS.harmonize}
                    isOpen={songStates.harmonize}
                    onToggle={() => toggleSong('harmonize')}
                />
            </div>

            <div className="text-end m-2" style={{ position: 'relative', zIndex: 1 }}>
                <SongSymbolWrapper
                    song={SONGS.mangoJam}
                    isOpen={songStates.mangoJam}
                    onToggle={() => toggleSong('mangoJam')}
                />
            </div>

            <footer className="container text-center" style={{ position: 'relative', zIndex: 1 }}>
                <FooterLinks />
                <div className="text-center">
                    <a href="https://lens.snapchat.com/9ab8073ff16547e5bd413f811fb3e513?sender_web_id=4a206bd0-61c0-4d01-9a1c-0db2f2654c50&device_type=desktop&is_copy_url=true">
                        <img style={{ height: "10em", width: "15em" }} src={jumpingSpud} alt="Jumping Spud" />
                    </a>
                </div>
            </footer>
        </div>
    );
}

export default Spuds;