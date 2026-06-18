import React, { useState } from "react";
import FooterLinks from "../ui/FooterLinks";
import "./Spuds.css";
import jumpingSpud from "../../img/FunkNJump.gif";
import christian from "../../img/spuddie-christian.PNG";
import justin2 from "../../img/spuddie-justin2.PNG";
import krystal from "../../img/spuddie-krystal.PNG";
import marty from "../../img/spuddie-marty.PNG";
import max from "../../img/spuddie-max.PNG";
import thomas from "../../img/spuddie-thomas.PNG";
import MemberCard from "../ui/MemberPanel";
import SongSymbolWrapper from '../ui/SongSymbol';
import { GALLERY_IMAGES } from './Home';
import mountainSymbol from "../../img/MountainSongSymbol.png";
import mangoJamSymbol from "../../img/MangoJamSongSymbol.png";
import cantStopSymbol from "../../img/CantStopSongSymbol.png";
import harmonizeSymbol from "../../img/HarmonizeSongSymbol.png";
import ahem from "../../img/AhemSongSymbol.png";
import dalleJustin from "../../img/band_pix/JustinElias.jpeg";
import dalleMartin from "../../img/band_pix/MartinUpNorth.jpeg";
import dalleThomas from "../../img/band_pix/ThomasAppleton.jpeg";
import dalleMax from "../../img/band_pix/MaxUpNorth.jpeg";
import dalleChristian from "../../img/band_pix/ChristianElias.jpeg"

const SONGS = {
    mountainSong: {
        name: "The Mountain Song",
        symbol: mountainSymbol,
        altText: "Mountain Song Symbol",
        youtubeUrl: "https://www.youtube.com/embed/2O8G22vrpRw",
        description: "The Mountain Song was written by Max after an roadtrip to Colorado where he and a few " +
            "friends attempted to climb Mt. Elbert. Arriving around 3am at the base of the mountain, the friends made it to the summit " +
            "just before 6am when wild weather overtook them. A snowstorm forced them to take cover and eventually retreat, but just as they reached " +
            "the bottom of the summit, the clouds parted and (in Emperor's New Groove fashion) the mountaintop was singing."
    },
    mangoJam: {
        name: "Mango Jam",
        symbol: mangoJamSymbol,
        altText: "Mango Jam Song Symbol",
        youtubeUrl: "https://www.youtube.com/embed/9783gZaMlZU",
        description: "Max threw together Mango Jam on garageband in his bedroom over the summer of 2019. He brought in " +
            "Thomas and Zach to shred over the foundation, tossed it to Martin while he was still living in La Crosse, and eventually brought " +
            "Justin in later that winter. This has long been one of the favorites of the band and fans alike."
    },
    cantStop: {
        name: "Can't Stop",
        symbol: cantStopSymbol,
        altText: "Can't Stop Song Symbol",
        youtubeUrl: "https://www.youtube.com/embed/Et9OYk7XIM8",
        description: "With origins dating back to bedroom recordings of 2013, Can't Stop might be the oldest FnS original still in tact. " +
            "Written with the help of Erik Lindgrin, this tune hits on the feeling of being in love and feeling like it will last forever."
    },
    harmonize: {
        name: "Harmonize",
        symbol: harmonizeSymbol,
        altText: "Harmonize Song Symbol",
        youtubeUrl: "https://www.youtube.com/embed/tGncFGhEAY0",
        description: "Harmonize was written in the fall of 2016 after a double dose of inspiration from Bon Iver's recent 22 A Million album " +
            "and a colorful fall drive drenched in late afternoon autumn sun. After studying Yeat's poem 'The Second Coming' and Joan Didion's 'Slouching Towards Bethlehem', " +
            "Max felt some sense of impending doom. His response: Harmonize."
    },
    ahem: {
        name: "Ahem",
        symbol: ahem,
        altText: "Ahem Song Symbol",
        youtubeUrl: "https://www.youtube.com/embed/MjuEEClLuDQ",
        description: "In late 2017 Max sat down behind his computer and popped out an early version of this song out " +
            "in a couple hours. After that it did little more than gather dust until he brought it to the newly formed Funk N Spuds in early 2020. " +
            "From there it turned into an utter soul jam and another favorite of the group."
    }
};

const MEMBERS = {
    max: {
        name: "Max Meier",
        spuddie: max,
        dalle: dalleMax,
        alt: "Spuddie Buddie - Max on Flugel",
        description: "Born and raised in Neenah Wisconsin, Max grew up playing music with and enjoying the company of his " +
            "brother Martin. When not playing music with Funk 'N Spuds he travels the country with his partner Nicole playing Quadball."
    },
    martin: {
        name: "Martin Meier",
        spuddie: marty,
        dalle: dalleMartin,
        alt: "Spuddie Buddie - Marty on drums",
        description: "Martin grew up in Neenah Wisconsin with his brother Max, playing music together in school bands and getting into trouble. " +
            "This bandana-clad wizard spends his days chasing his cats around the apartment and making beats and synth jams that bring pure joy."
    },
    thomas: {
        name: "Thomas Hazlett",
        spuddie: thomas,
        dalle: dalleThomas,
        alt: "Spuddie Buddie - Thomas on Guitar",
        description: "Hailing from the Wild Wild Midwest, Thomas is Funk 'N Spuds' six string slinger. When the encore ends he trades in his " + 
            "guitar for a camera to ride off into the night, shooting stars in galaxies far, far away...."
    },
    justin: {
        name: "Justin Halverson",
        spuddie: justin2,
        dalle: dalleJustin,
        alt: "Spuddie Buddie - Justin on Guitar",
        description: "Justin was born and raised in Prior Lake, Minnesota, to a family who loves water, wind, and music. " +
            "He now lives in Saint Paul and makes music with the Funk 'N Spuds."
    },
    christian: {
        name: "Christian Rasmussen",
        spuddie: christian,
        dalle: dalleChristian,
        alt: "Spuddie Buddie - Christian on Bass",
        description: "Fresh off a tear with the Immaculate Beings, Christian is a graduate of Lawrence University where he studied religion and jazz " +
            "and really knows how to funk it up. His chops and soul have cracked the spuds' sound wide open!"
    },
    krystal: {
        name: "Krystal Spud",
        spuddie: krystal,
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
        harmonize: false,
        ahem: false
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
            <section className="about-spuds-section text-center" style={{ position: 'relative', zIndex: 1 }}>
                <div className="text-start m-2 about-spuds-symbol">
                    <SongSymbolWrapper
                        song={SONGS.ahem}
                        isOpen={songStates.ahem}
                        onToggle={() => toggleSong('ahem')}
                    />
                </div>
                <h1 className="spudsite mb-3">About Funk N Spuds</h1>
                <div className="card container specialCard beenie about-spuds-card mt-3">
                    <h4 className="m-3">Funk N Spuds started in Minneapolis in early 2020, mostly as an excuse for brothers Martin and Max to make music together and take a potato joke farther than anyone probably needed to. Since then, it's grown into a full band of friends and musicians bringing together bits of jazz, rock, pop, funk, and jam music.</h4>
                    <h4 className="m-3">The sound is built around groove, melody, and a lot of trust between players. Flugelhorn, guitar, bass, keys, drums, and percussion all find their way into the mix, with songs that move between upbeat, danceable sections and more reflective moments. Some tunes stretch out, some stay tight, but the goal is usually the same: play something honest, warm, and worth sharing.</h4>
                    <h4 className="m-3">At the center of the band is friendship - the kind that comes from basements, backyards, late-night rehearsals, and loading gear through the snow because that's just how it goes here. Funk N Spuds is serious about the music, but not too serious about themselves.</h4>
                    <h4 className="m-3">Whether they're playing a local venue, a festival stage, or a neighborhood event, the band tries to bring people in and leave the room feeling a little lighter than they found it.</h4>
                    <h3 className="m-3 spudsite">Music is hope.</h3>
                </div>
            </section>
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
