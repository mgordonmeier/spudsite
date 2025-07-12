import React, { useState } from "react";
import FooterLinks from "../ui/FooterLinks";
import jumpingSpud from "../../img/FunkNJump.gif";
import hippie from "../../img/HippieHillSongSymbol.png";
import rollOn from "../../img/RollOnSongSymbol.png";
import fnsLogo from "../../img/fns-logo.png";
import myFriends from "../../img/AllMyFriendsSongSymbol.png"
import discord from "../../img/fnsDiscord.png"
import SongSymbolWrapper from "../ui/SongSymbol";
import '../../styles/Contact.css';

const SONGS = {
    hippieHill: {
        name: "Hippie Hill",
        symbol: hippie,
        altText: "Hippie Song Symbol",
        youtubeUrl: "https://www.youtube.com/embed/5EuS4imn_fU",
        description: "This song recounts the events of a 16 hour layover in Denver Colorado " +
            "in January of 2018. After a brief airport-nap in the early hours of the morning, Max woke up to find " +
            "himself in a cuddle puddle with strangers. From there he ventured around the city until finding himself " +
            "on Hippie Hill."
    },
    rollOn: {
        name: "Roll On",
        symbol: rollOn,
        altText: "Roll On Song Symbol",
        youtubeUrl: "https://www.youtube.com/embed/0OQIxd8jOzM",
        description: "Roll On is one of the oldest songs in Funk N Spuds collection of originals. " +
            "Written in the midst of political and social turmoil leading up to the 2016 election and inspired " +
            "in no small part by the events of the Standing Rock Dakota Access Pipeline protests, the song conveys " +
            "emotions and visuals of chaos and darkness while urging the listener to 'Hold On'."
    },
    allMyFriends: {
        name: "All My Friends",
        symbol: myFriends,
        altText: "All My Friends Song Symbol",
        youtubeUrl: "https://www.youtube.com/embed/W4eh7Ianuis",
        description: "Inspired by a rif Zach played, we collaboratively wrote this song in " +
            "Neenah, WI while in town for Meierfest during June of 2021. The video above is one of the few recorded " +
            "versions of this song. The sounds of New Orleans heavily influenced this one."
    }
};

function Contact() {
    const [songStates, setSongStates] = useState({
        hippieHill: false,
        rollOn: false,
        allMyFriends: false
    });

    const toggleSong = (songKey) => {
        setSongStates(prev => ({
            ...prev,
            [songKey]: !prev[songKey]
        }));
    };

    return (
        <div className="container rocksalt">
            <div className="text-center">
                <div>
                    <div className="text-end m-2">
                        <SongSymbolWrapper
                            song={SONGS.hippieHill}
                            isOpen={songStates.hippieHill}
                            onToggle={() => toggleSong('hippieHill')}
                        />
                    </div>

                    <h1 className="spudsite m-4">Get in touch!</h1>

                    <div className="text-start m-2">
                        <SongSymbolWrapper
                            song={SONGS.allMyFriends}
                            isOpen={songStates.allMyFriends}
                            onToggle={() => toggleSong('allMyFriends')}
                        />
                    </div>

                    <div className="contact-section mt-5">
                        <h3>Inquiries / Booking</h3>
                        <a href="mailto:funknspuds@gmail.com" className="btn btn-outline-dark email-btn">
                            funknspuds@gmail.com
                        </a>
                    </div>

                    <div className="mt-5">
                        <h3>Join our Discord</h3>
                        <a href="https://discord.gg/XzafWtMgFZ">
                            <img 
                                className="music-video-box mt-1 spuddies hover-grow" 
                                src={discord} 
                                alt="Discord" 
                                style={{ width: "10em", height: "8em" }}
                            />
                        </a>
                    </div>

                    <div className="mt-5">
                        <a href="https://mndaily.com/262980/arts-entertainment/como-band-creates-funky-concert-venue-at-home/">
                            <img 
                                className="music-video-box spuddies hover-grow" 
                                src={fnsLogo} 
                                alt="FnS Logo" 
                                style={{ width: "20em" }} 
                            />
                        </a>
                    </div>

                    <div className="text-end me-5">
                        <SongSymbolWrapper
                            song={SONGS.rollOn}
                            isOpen={songStates.rollOn}
                            onToggle={() => toggleSong('rollOn')}
                        />
                    </div>

                    <footer className="container text-center mt-5">
                        <FooterLinks />
                        <div className="text-center">
                            <a href="https://lens.snapchat.com/9ab8073ff16547e5bd413f811fb3e513?sender_web_id=4a206bd0-61c0-4d01-9a1c-0db2f2654c50&device_type=desktop&is_copy_url=true">
                                <img 
                                    className="jumping-spud hover-grow" 
                                    style={{ height: "10em", width: "15em" }} 
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

export default Contact;