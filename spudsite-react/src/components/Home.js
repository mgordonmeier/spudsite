import React from "react";
import './Home.css';
// import background from "../img/pour4.JPG";
import jumpingSpud from "../img/FunkNJump.gif";
import spudCover from "../img/FreshSpudsCover.png";
import envelope from "../img/EnvelopeSongSymbol.png";
import lhc from "../img/LHCSongSymbol.png";
import ahem from "../img/AhemSongSymbol.png";
import h2ku from "../img/Happy2KnowUSongSymbol.png"
import first1up from "../img/FirstOneUpSongSymbol.png"
import FooterLinks from "./FooterLinks";
import SongSymbols from "./SongSymbols";


function Home() {

    return (
        <div>
            <div className="container">
                <div className="text-center">
                    <div className="rocksalt" style={{ display: "inline-block" }}>
                        <div className="text-end me-5">
                            <SongSymbols urlLink="https://youtu.be/pIDOSohb8jI" symbol={first1up} altText="First One Up Song Symbol" />
                        </div>
                        <div className="container frame-text-box" style={{ width: "70%" }}>
                            <h1 className="m-4 spudsite">Welcome to the Spudsite</h1>
                            <h3 className="mb-4">Home of</h3>
                        </div>
                        <div className="text-start ms-5">
                            <SongSymbols urlLink="https://youtu.be/kIhJc4kovKI" symbol={lhc} altText="Low Hanging Ceilings Song Symbol" />
                        </div>
                        <div className="frame-2">
                            <img src={spudCover} alt="Fresh Spuds Cover" className="img-header" />
                        </div>
                        <div className="text-end me-4">
                            <SongSymbols urlLink="https://youtu.be/0dsg35UWTeA" symbol={envelope} altText="Envelope Song Symbol" />

                        </div>
                        <div className="card container specialCard beenie" style={{ width: "75%", display: "inline-block" }}>
                            <h4 className="m-1">Funk N Spuds is a Minneapolis based musical collective of artists from around the Midwest.</h4>
                            <h4 className="m-1">Formed in early 2020, their jam-rock jazz-pop sounds inspire hope in listeners and positive change in the world.</h4>
                            <h4 className="m-1">Over the past few years the Spuds have played venues across the Twin Cities, Southern Minnesota, and Central Wisconsin including Mid West Music Fest, Appleton Beer Factory, The Cabooze, 612 Brew, Galactic Get Down, and UW Stout. </h4>
                            {/* <p className="m-2">Funk N Spuds has taken the stage at most venues in the Twin Cities, but also </p> */}
                        </div>
                        <div className="text-start ms-3">
                            <SongSymbols urlLink="https://youtu.be/MjuEEClLuDQ" symbol={ahem} altText="Ahem Song Symbol" />
                        </div>
                        <div className="intro-video">
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/cSz4jmj5Zfc" title="YouTube video player"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen></iframe>
                        </div>
                        <div className="text-end me-5">
                            <SongSymbols urlLink="https://youtu.be/q6x-OIfsgRg" symbol={h2ku} altText="Happy 2 Know U Song Symbol" />
                        </div>
                    </div>
                </div>
            </div>
            <footer>
                <div className="container text-center">
                    <FooterLinks />
                </div>
                <div className="text-center">
                    <a href="https://lens.snapchat.com/9ab8073ff16547e5bd413f811fb3e513?sender_web_id=4a206bd0-61c0-4d01-9a1c-0db2f2654c50&device_type=desktop&is_copy_url=true">
                        <img style={{ height: "10em", width: "15em" }} src={jumpingSpud} alt="Jumping Spud" />
                    </a>
                </div>
            </footer>
        </div>
    )
}

export default Home;