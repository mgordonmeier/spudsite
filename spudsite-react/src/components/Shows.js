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
import mwmf23 from "../img/MWMF2023.png"
import Art612 from "../img/ArtAWhirl612Spudsite.jpg"
import GGD22 from "../img/GGD2022Spudsite.jpg"
import MWMF22 from "../img/MWMFSpudsite.jpg"
import Paper22 from "../img/PaperfestPromoSpudsite.jpg"
import Shoebox from "../img/ShoeboxEpisodeXiiSpudsite.jpg"
import SpudCounty from "../img/SpudCountySpudsite.jpg"
import Underground from "../img/UndergroundClamsVelvetFns.jpg"
import HighlandHarmonies from "../img/HighlandHarmonies.PNG"
import HunnyCan from "../img/HoneyCan.jpg"
import pandEmfiSpuds from "../img/pandEmfiSpuds.JPG"
import funkCreatures from "../img/NoNameOct28Final.jpg"
import hunnyAlbumRelease from "../img/HunnyAlbumRelease.jpg"
import spud5s from "../img/5spuds.PNG"
import bigTurn from "../img/bigTurn.JPG"
import uwstout from "../img/UWStout.png"
import singleRelease from "../img/messin.v3.jpg"
//import albumArt from "../img/HillsideSunsetArtBackground.jpg"
//import meierFest from "../img/BassIntroArtBackground.jpg"
import justinFest from "../img/LithouseArtBackground.jpg"
import albumReleaseShow from "../img/DayBlockShowPosterv6.jpg"
import fmFest from "../img/FMfest.jpeg"
import bentPaddle from "../img/BentPaddle.png"
import HillSunOrb from "../img/Orbz/HillsideSunsetOrb.png"


function Shows() {

    const [sunsetCheck, setSunsetCheck] = useState(false);
    const [HsunsetCheck, setHSunsetCheck] = useState(false);
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

    function onHSunsetClick() {
        setHSunsetCheck(true)
    }

    function onHSunsetCancel() {
        setHSunsetCheck(false)
    }

    const HsunsetDescription = "The band recorded the studio version of Hillside Sunset in March of 2023, " +
        "incorporating revisions brought to the table through GNARhouse and collaboration between Max and Thomas.";

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

                    <div className="text-end m-2">
                        <div style={{ display: "inline-block" }}>
                            {HsunsetCheck ? <SongCard songName="Hillside Sunset" onSongCancel={onHSunsetCancel} youtubeUrl="https://www.youtube.com/embed/E8EWJwCbcg0" songInfo={HsunsetDescription} />
                                : <div className="rotate2"><SongSymbols symbol={HillSunOrb} altText="Hillside Sunset Orb" onClick={onHSunsetClick} /></div>}
                        </div>
                    </div>

                    <h4 className="spudsite mt-5 mb-3">Album Release Show</h4>
                    <h5 className="spudsite mt-3">July 12, 2024 @ Day Block Brewing (Mineapolis, MN)</h5>
                    <a href="https://www.dayblockbrewing.com/live-events/funk-n-spuds-album-release-show/">
                        <img className=" mb-2 music-video-box mt-3" style={{ width: "50%", height: "auto", borderRadius: "4px" }} src={albumReleaseShow} alt="Finally a new Funk N Spuds album" />
                    </a>

                    <h4 className="spudsite mt-5 mb-3">Justin's Family Reunion</h4>
                    <h5 className="spudsite mt-3 mb-3">July 19, 2024 @ Fort Halverson (Austin, MN)</h5>
                    <a href="">
                        <img className="mb-2 music-video-box mt-3" style={{ width: "50%", height: "auto", borderRadius: "4px" }} src={justinFest} alt="The spuds are heading to Austin, MN to celebrate family and friends with the Halversons" />
                    </a>

                    <h4 className="spudsite mt-5 mb-3">Pre-All Pints Hootenanny</h4>
                    <h5 className="spudsite mt-3 mb-3">July 26, 2024 @ Bent Paddle (Duluth, MN)</h5>
                    <a href="https://bentpaddlebrewing.com">
                        <img className="mb-2 music-video-box mt-3" style={{ width: "50%", height: "auto", borderRadius: "4px" }} src={bentPaddle} alt="Funk N Spuds will be performing at Bent Paddle for their pre-All Pints Hootenanny" />
                    </a>

                    <h4 className="spudsite mt-5 mb-3">Noname Bar</h4>
                    <h5 className="spudsite mt-3 mb-3">December 14, 2024 (Winona, MN)</h5>
                    <a href="https://www.facebook.com/nonamebarwinona/">
                        <img className="mb-2 music-video-box rotate mt-3" style={{ width: "50%", height: "auto", borderRadius: "4px" }} src={spud5s} alt="details tbd" />
                    </a>

                    <div className="spudsite mt-"> </div>


                    <h1 className="spudsite mt-5 mb-2">Past Shows</h1>

                    <h4 className="spudsite mt-5 mb-3">Meierfest</h4>
                    <h5 className="spudsite mt-3 mb-3">June 1, 2024 @ Fort Meier (Neenah, WI)</h5>
                    <a href="https://youtu.be/_3mhGQWLZms?si=poel_2XAPMsxZ02a">
                        <img className=" mb-2 music-video-box mt-3" style={{ width: "30%", height: "auto", borderRadius: "4px" }} src={fmFest} alt="The spuds are heading back home to perform for family and friends at Fort Meier" />
                    </a>

                    <h4 className="spudsite mt-5 mb-3">Tied In Knots - Single Release Show with Brother Means Ally and Curly Jefferson</h4>
                    <h5 className="spudsite mt-3 mb-3">April 26, 2024 @ Day Block Brewing (Minneapolis, MN)</h5>
                    <a href="https://www.dayblockbrewing.com/live-events/funk-n-spuds/">
                        <img className="mt-2 mb-5 music-video-box" style={{ width: "30%", height: "auto", borderRadius: "4px" }} src={singleRelease} alt="Tied In Knots single release at Day Block with soop light show and Brother Means Ally and Curly Jefferson" />
                    </a>

                    <h4 className="spudsite mt-5 mb-3">UW Stout</h4>
                    <h5 className="spudsite mt-3 mb-3">February 29, 2024 @ Memorial Student Center (Menomonie, WI)</h5>
                    <a href="https://connect.uwstout.edu/BDP/rsvp_boot?id=2259571">
                        <img className="mt-2 mb-5 music-video-box" style={{ width: "30%", height: "auto", borderRadius: "4px" }} src={uwstout} alt="Funk N Spuds will be performing at UW Stout's Memorial Student Center" />
                    </a>

                    <h4 className="spudsite mt-5 mb-3">Big Turn Music Festival</h4>
                    <h5 className="spudsite mt-3 mb-3">February 17, 2024 @ St. James Hotel, Port Side Room (Red Wing, MN)</h5>
                    <a href="https://www.bigturnmusicfest.com">
                        <img className="mt-2 mb-5 music-video-box" style={{ width: "30%", height: "auto", borderRadius: "4px" }} src={bigTurn} alt="A weekend that's full of sights and sounds in the middle of Febrrruary. This is a place of music and community and we just hope you packed a pair of stomping boots for your trip. This is the Big Turn Music Fest." />
                    </a>

                    <h4 className="spudsite mt-5 mb-3">Hunny Bear Album Release Show</h4>
                    <h5 className="spudsite mt-3 mb-3">January 25, 2024 @ Can Can Wonderland (St. Paul, MN)</h5>
                    <a href="https://www.cancanwonderland.com/entertainment">
                        <img className="mt-2 mb-5 music-video-box" style={{ width: "30%", height: "auto", borderRadius: "4px" }} src={hunnyAlbumRelease} alt="Hunny Bear Album Release Show with Funk N Spuds and Confucisaurus at Can Can Wonderland Jan 25, 2024" />
                    </a>

                    <h4 className="spudsite mt-5 mb-3">Creatures from the Funk Lagoon</h4>
                    <h5 className="spudsite mt-3 mb-3">October 28, 2023 @ No Name Bar (Winona, MN)</h5>
                    <a href="https://bandsintown.com/e/104727519?came_from=297&utm_medium=web&utm_source=copy_link&utm_campaign=event_social_share">
                        <img className="mt-2 mb-5 music-video-box" style={{ width: "30%", height: "auto", borderRadius: "4px" }} src={funkCreatures} alt="Lavendar Project, Funk N Spuds, and Curly Jefferson and the Jam Turkeys at No Name Bar Oct 28 2023" />
                    </a>

                    <h5 className="spudsite mt-5">October 7, 2023 @ Eagles #34 (Minneapolis, MN)</h5>
                    <a href="https://www.eagles34.org/events-entertainment.html">
                        <img className="mt-2 mb-4 music-video-box" style={{ width: "30%", height: "auto", borderRadius: "4px" }} src={pandEmfiSpuds} alt="Efmi, Pandelion, and Funk N Spuds at Eagles #34 Oct 7 2023" />
                    </a>

                    <h5 className="spudsite mt-5">October 7, 2023 @ Highland Park Picnic Shelter (St. Paul, MN)</h5>
                    <a href="https://www.bandsintown.com/e/104727822-funk-n-spuds-at-highland-park-picnic-shelter">
                        <img className="mt-2 mb-4 music-video-box" style={{ width: "30%", height: "auto", borderRadius: "4px" }} src={HighlandHarmonies} alt="Funk N Spuds at Highland Park for Highland " />
                    </a>

                    <h5 className="spudsite mt-5">September 28, 2023 @ Can Can Wonderland (St. Paul, MN)</h5>
                    <a href="https://www.cancanwonderland.com/events/the-hunny-pot">
                        <img className="mt-2 mb-4 music-video-box" style={{ width: "30%", height: "auto", borderRadius: "4px" }} src={HunnyCan} alt="Funk N Spuds with Hunny Bear and Emery Snow at Can Can Wonderland" />
                    </a>

                    <h5 className="spudsite mt-5">May 13, 2023 @ Mid West Music Fest Main Stage (Winona, MN)</h5>
                    <a href="https://www.midwestmusicfest.org/">
                        <img className="mt-2 mb-4 music-video-box" style={{ width: "30%", height: "auto", borderRadius: "4px" }} src={mwmf23} alt="Mid West Music Fest 2023 Lineup" />
                    </a>

                    <h5 className="spudsite mt-3">February 11, 2023 @ Underground Music Cafe (Minneapolis, MN)</h5>
                    <a href="https://www.undergroundmusicvenue.com">
                        <img className="mt-2 mb-3 music-video-box" style={{ width: "30%", height: "auto", borderRadius: "4px" }} src={Underground} alt="Underground Music Cafe Minneapolis, MN - Clams, Funk N Spuds, and Velvetwolf " />
                    </a>

                    <h5 className="spudsite mt-3">February 4, 2023 @ The White Squirrel Bar (St. Paul, MN)</h5>
                    <a href="https://whitesquirrelbar.com">
                        <img className="mt-2 mb-3 music-video-box" style={{ width: "30%", height: "auto", borderRadius: "4px" }} src={whiteS} alt="White Squirrel Bar St. Paul, MN - Funk N Spuds and Confucisaurus" />
                    </a>

                    <h5 className="spudsite mt-3">January 20, 2023 @ Appleton Beer Factory (Appleton, WI)</h5>
                    <a href="https://app.showslinger.com/ticket_payment/9259/checkout_ticket?from=%2Fpromo_widget%2Fcalendar_list%3Fvenue_id%3D46738">
                        <img className="mt-2 mb-3 music-video-box" style={{ width: "30%", height: "auto", borderRadius: "4px" }} src={lowDown} alt="Appleton Beer Factory - Lowdown Brass Band wsg Funk N Spuds" />
                    </a>

                    <h5 className="spudsite mt-3">December 17, 2022 @ No Name Bar (Winona, MN)</h5>
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