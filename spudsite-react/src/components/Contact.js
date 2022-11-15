import React, { useState } from "react";
import SongSymbols from "./SongSymbols";
import FooterLinks from "./FooterLinks";
import jumpingSpud from "../img/FunkNJump.gif";
import hippie from "../img/HippieHillSongSymbol.png";
import rollOn from "../img/RollOnSongSymbol.png";
import fnsLogo from "../img/fns-logo.png"
import myFriends from "../img/AllMyFriendsSongSymbol.png"
import SongCard from "./SongCard";

function Contact() {

    const [hippieCheck, setHippieCheck] = useState(false);
    const [rollCheck, setRollCheck] = useState(false);
    const [friendsCheck, setFriendsCheck] = useState(false);

    function onHippieClick() {
        setHippieCheck(true);
    }

    function onHippieCancel() {
        setHippieCheck(false);
    }

    const hippieDescription = "This song recounts the events of a 16 hour layover in Denver Colorado " +
        "in January of 2018. After a brief airport-nap in the early hours of the morning, Max woke up to find " +
        "himself in a cuddle puddle with strangers. From there he ventured around the city until finding himself " +
        "on Hippie Hill.";

    function onRollClick() {
        setRollCheck(true);
    }

    function onRollCancel() {
        setRollCheck(false);
    }

    const rollDescription = "Roll On is one of the oldest songs in Funk N Spuds collection of originals. " +
        "Written in the midst of political and social turmoil leading up to the 2016 election and inspired " +
        "in no small part by the events of the Standing Rock Dakota Access Pipeline protests, the song conveys " +
        "emotions and visuals of chaos and darkness while urging the listener to 'Hold On'.";

    function onFriendsClick() {
        setFriendsCheck(true);
    }

    function onFriendsCancel() {
        setFriendsCheck(false);
    }

    const friendsDescription = "Inspired by a rif Zach played, we collaboratively wrote this song in " +
        "Neenah, WI while in town for Meierfest during June of 2021. The video above is one of the few recorded " +
        "versions of this song. The sounds of New Orleans heavily influenced this one.";

    return (
        <div className="container rocksalt">
            <div className="text-center">
                <div>
                    <div className="text-end me-5">
                        <div style={{ display: "inline-block" }}>
                            {hippieCheck ? <SongCard songName="Hippie Hill" onSongCancel={onHippieCancel} youtubeUrl="https://www.youtube.com/embed/5EuS4imn_fU" songInfo={hippieDescription} /> :
                                <SongSymbols symbol={hippie} altText="Hippie Song Symbol" onClick={onHippieClick} />}
                        </div>
                    </div>
                    <h1 className="spudsite mt-4">Get in touch!</h1>
                    <div className="text-start ms-5">
                        <div style={{ display: "inline-block" }}>
                            {friendsCheck ? <SongCard songName="All My Friends" onSongCancel={onFriendsCancel} youtubeUrl="https://www.youtube.com/embed/W4eh7Ianuis" songInfo={friendsDescription} />
                                : <SongSymbols symbol={myFriends} altText="All My Friends Song Symbol" onClick={onFriendsClick} />}
                        </div>
                    </div>
                    <p className="mt-5">Leave us a message or silly story <a href="mailto:funknspuds@gmail.com">funknspuds@gmail.com</a></p>
                    <div>
                        <img src={fnsLogo} alt="FnS Logo" style={{ width: "20em" }} />
                    </div>
                    <div className="text-end me-5">
                        <div style={{ display: "inline-block" }}>
                            {rollCheck ? <SongCard songName="Roll On" onSongCancel={onRollCancel} youtubeUrl="https://www.youtube.com/embed/0OQIxd8jOzM" songInfo={rollDescription} />
                                : <SongSymbols symbol={rollOn} altText="Roll On Song Symbol" onClick={onRollClick} />}

                        </div>
                    </div>
                    <footer className="container text-center">
                        <FooterLinks />
                        <div className="text-center">
                            <a href="https://lens.snapchat.com/9ab8073ff16547e5bd413f811fb3e513?sender_web_id=4a206bd0-61c0-4d01-9a1c-0db2f2654c50&device_type=desktop&is_copy_url=true">
                                <img style={{ height: "10em", width: "15em" }} src={jumpingSpud} alt="Jumping Spud" />
                            </a>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
}

export default Contact;