import React, { useState } from "react";
import SongSymbols from "./SongSymbols";
import FooterLinks from "./FooterLinks";
import jumpingSpud from "../img/FunkNJump.gif";
import sunset from "../img/HillsideSunsetSongSymbol.png";
import somethin from "../img/SomethinSometimesSongSymbol.png";
import SongCard from "./SongCard";
import lowDown from "../img/LowDownFNS-Appleton.jpg";
import noName from "../img/NoNameDec17SpudsAndLads.jpg";
import whiteS from "../img/FnSatWhiteS.jpg";
// import logo from "../img/fns-logo.png";
import Art612 from "../img/ArtAWhirl612Spudsite.jpg"
import GGD22 from "../img/GGD2022Spudsite.jpg"
import MWMF22 from "../img/MWMFSpudsite.jpg"
import Paper22 from "../img/PaperfestPromoSpudsite.jpg"
import Shoebox from "../img/ShoeboxEpisodeXiiSpudsite.jpg"
import SpudCounty from "../img/SpudCountySpudsite.jpg"
import Underground from "../img/UndergroundClamsVelvetFns.jpg"


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
                    <div className="text-start m-2">
                        <div style={{ display: "inline-block" }}>
                            {sunsetCheck ? <SongCard songName="Hillside Sunset" onSongCancel={onSunsetCancel} youtubeUrl="https://www.youtube.com/embed/_zHxvUMYBuU" songInfo={sunsetDescription} />
                                : <SongSymbols symbol={sunset} altText="Hillside Sunset Song Symbol" onClick={onSunsetClick} />}
                        </div>
                    </div>
                    <h1 className="spudsite m-2">Upcoming Shows!</h1>

                    <h5 className="spudsite mt-5">February 4, 2023 @ The White Squirrel Bar (St. Paul, MN)</h5>
                    <a href="https://whitesquirrelbar.com">
                        <img className="mt-2 mb-4 music-video-box" style={{ width: "50%", height: "auto", borderRadius: "4px" }} src={whiteS} alt="White Squirrel Bar St. Paul, MN - Funk N Spuds and Confucisaurus" />
                    </a>

                    <h5 className="spudsite mt-5">February 11, 2023 @ Underground Music Cafe (Minneapolis, MN)</h5>
                    <a href="https://www.undergroundmusicvenue.com">
                        <img className="mt-2 mb-4 music-video-box" style={{ width: "50%", height: "auto", borderRadius: "4px" }} src={Underground} alt="Underground Music Cafe Minneapolis, MN - Clams, Funk N Spuds, and Velvetwolf " />
                    </a>



                    <h1 className="spudsite m-4">Past Shows</h1>

                    <h5 className="spudsite mt-3">January 20, 2023 @ Appleton Beer Factory (Appleton, WI)</h5>
                    <a href="https://app.showslinger.com/ticket_payment/9259/checkout_ticket?from=%2Fpromo_widget%2Fcalendar_list%3Fvenue_id%3D46738">
                        <img className="mt-2 mb-3 music-video-box" style={{ width: "30%", height: "auto", borderRadius: "4px" }} src={lowDown} alt="Appleton Beer Factory - Lowdown Brass Band wsg Funk N Spuds" />
                    </a>
                    <h5 className="spudsite mt-3">December 17, 2022 @ Ed's No Name Bar (Winona, MN)</h5>
                    <a href="https://visitwinona.com/directory_entry/eds-no-name-bar/">
                        <img className="mt-2 mb-3 music-video-box" style={{ width: "30%", height: "auto", borderRadius: "4px" }} src={noName} alt="No Name Bar Winona - Funk N Spuds and Sugar Lads" />
                    </a>

                    <h5 className="spudsite mt-3">October 14, 2022 Shoebox Episode XII (St. Paul, MN)</h5>
                    <a href="https://www.airshipcaravan.com/">
                        <img className="mt-2 mb-3 music-video-box" style={{ width: "30%", height: "auto", borderRadius: "4px" }} src={Shoebox} alt="Shoebos Episode XII - Pandelion, Juniper Fly, Funk N Spuds, Airship Caravan" />
                    </a>

                    <h5 className="spudsite mt-3">August 26, 2022 Galactic Get Down 6 (New Richmond, WI)</h5>
                    <a href="https://www.thegalacticgetdown.com/">
                        <img className="mt-2 mb-3 music-video-box" style={{ width: "30%", height: "auto", borderRadius: "4px" }} src={GGD22} alt="Galactic Get Down Music Festival" />
                    </a>

                    <h5 className="spudsite mt-3">July 15, 2022 Paperfest (Kimberly, WI)</h5>
                    <a href="https://www.paperfest.com/">
                        <img className="mt-2 mb-3 music-video-box" style={{ width: "30%", height: "auto", borderRadius: "4px" }} src={Paper22} alt="Funk N Spuds at Paperfest 2022" />
                    </a>

                    <h5 className="spudsite mt-3">May 20, 2022 Art-A-Whirl @ 612Brew (Minneapolis, MN)</h5>
                    <a href="https://nemaa.org/art-a-whirl/">
                        <img className="mt-2 mb-3 music-video-box" style={{ width: "30%", height: "auto", borderRadius: "4px" }} src={Art612} alt="Funk N Spuds at 612Brew for Art-A-Whirl 2022" />
                    </a>

                    <h5 className="spudsite mt-3">April 29, 2022 Mid West Music Fest @ Eagles Club (Winona, MN)</h5>
                    <a href="https://www.midwestmusicfest.org/">
                        <img className="mt-2 mb-3 music-video-box" style={{ width: "30%", height: "auto", borderRadius: "4px" }} src={MWMF22} alt="Funk N Spuds at Mid West Music Fest 2022" />
                    </a>

                    <h5 className="spudsite mt-3">March 26, 2022 Spud County (Livestream - Youtube)</h5>
                    <a href="https://youtu.be/MOTcyp4Lj64?t=5937">
                        <img className="mt-2 mb-3 music-video-box" style={{ width: "30%", height: "auto", borderRadius: "4px" }} src={SpudCounty} alt="Spud County Livestream - Cook County and Funk N Spuds" />
                    </a>

                    <div className="text-end m-2">
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