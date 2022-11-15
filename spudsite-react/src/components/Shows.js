import React, { useState } from "react";
import SongSymbols from "./SongSymbols";
import FooterLinks from "./FooterLinks";
import jumpingSpud from "../img/FunkNJump.gif";
import sunset from "../img/HillsideSunsetSongSymbol.png";
import somethin from "../img/SomethinSometimesSongSymbol.png"
import SongCard from "./SongCard";

function Shows() {

    const [sunsetCheck, setSunsetCheck] = useState(false);
    const [somethinCheck, setSomethinCheck] = useState(false);

    function onSunsetClick() {
        setSunsetCheck(true)
    }

    function onSunsetCancel() {
        setSunsetCheck(false)
    }

    const sunsetDescription = "Max wrote this song while living in the Attic of his friend Mary's house in 2019. " +
        "During a brief stay in Neenah during the summer of that year, he teamed up with Martin and Nicole to choreograph and record a live-loop " +
    "one take video.";

    function onSomethinClick() {
        setSomethinCheck(true)
    }

    function onSomethinCancel() {
        setSomethinCheck(false)
    }

    const somethinDescription = "Inspired by Jack Johnson, in search of hope, Somethin Sometimes was written by " +
        "Max during the summer of 2019 and recorded over the following months. This song made it on to Minnesota Public Radio at " +
        "the beginning of the pandemic and was an early favorite of the Spuds.";

    return (
        <div className="container">
            <div className="text-center rocksalt">
                <div>
                    <div className="text-start ms-5">
                        <div style={{ display: "inline-block" }}>
                            {sunsetCheck ? <SongCard songName="Hillside Sunset" onSongCancel={onSunsetCancel} youtubeUrl="https://www.youtube.com/embed/_zHxvUMYBuU" songInfo={sunsetDescription} />
                                : <SongSymbols symbol={sunset} altText="Hillside Sunset Song Symbol" onClick={onSunsetClick} />}
                        </div>
                    </div>
                    <h1 className="spudsite">Upcoming Shows!</h1>
                    <h5 className="spudsite m-5">December 17, 2022 @ Ed's No Name Bar (Winona, MN)</h5>
                    <h5 className="spudsite">January 20, 2023 @ Appleton Beer Factory (Appleton, WI)</h5>
                    <div className="text-end me-5">
                        <div style={{ display: "inline-block" }}>
                            {somethinCheck ? <SongCard songName="Somethin Sometimes" onSongCancel={onSomethinCancel} youtubeUrl="https://www.youtube.com/embed/OQuKGgxlRYk" songInfo={somethinDescription} />
                                : <SongSymbols symbol={somethin} altText="Somethin Sometimes Song Symbol" onClick={onSomethinClick} />}
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

export default Shows;