import React from "react";
import './Home.css';
// import background from "../img/pour4.JPG";
import jumpingSpud from "../img/FunkNJump.gif";
import spudCover from "../img/FreshSpudsCover.png";
import envelope from "../img/EnvelopeSongSymbol.png";
import lhc from "../img/LHCSongSymbol.png";
import ahem from "../img/AhemSongSymbol.png";
import h2ku from "../img/Happy2KnowUSongSymbol.png"
import FooterLinks from "./FooterLinks";
import SongSymbols from "./SongSymbols";


function Home() {

    return (
        <div>
            <div className="container">
                <div className="text-center">
                    <div className="rocksalt" style={{ display: "inline-block" }}>
                        <div className="card mt-4 container specialCard frame-text-box" style={{ width: "70%" }}>
                            <h1 className="m-4 spudsite">Welcome to the Spudsite</h1>
                            <h3 className="mb-4">Home of</h3>
                        </div>
                        <div className="text-start">
                            <SongSymbols urlLink="https://youtu.be/0dsg35UWTeA" symbol={envelope} altText="Envelope Song Symbol" />
                        </div>
                        <div className="funk-n-jump">
                            <img style={{ height: "10em", width: "15em" }} src={jumpingSpud} alt="Jumping Spud" />
                        </div>
                        <div className="frame-2">
                            <img src={spudCover} alt="Fresh Spuds Cover" className="img-header" />
                        </div>
                        <div className="text-end me-10">
                            <SongSymbols urlLink="https://youtu.be/kIhJc4kovKI" symbol={lhc} altText="Low Hanging Ceilings Song Symbol" />
                        </div>
                        <div className="card mb-3 container specialCard beenie" style={{ width: "75%", display: "inline-block" }}>
                            <h4 className="m-1">Funk N Spuds is a Minneapolis based musical collective of artists from around the Midwest.</h4>
                            <h4 className="m-1">Formed in early 2020, their jam-rock jazz-pop sounds inspire hope in listeners and positive change in the world.</h4>
                            {/* <p className="m-2">Funk N Spuds has taken the stage at most venues in the Twin Cities, but also </p> */}
                        </div>
                        <div className="text-start">
                            <SongSymbols urlLink="https://youtu.be/MjuEEClLuDQ" symbol={ahem} altText="Ahem Song Symbol" />
                        </div>
                        <div className="intro-video">
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/cSz4jmj5Zfc" title="YouTube video player"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen></iframe>
                        </div>
                        <div className="text-end">
                            <SongSymbols urlLink="https://youtu.be/q6x-OIfsgRg" symbol={h2ku} altText="Happy 2 Know U Song Symbol"/>
                        </div>
                    </div>
                </div>
            </div>
            <footer>
                <div className="container text-center">
                    <FooterLinks />
                </div>
            </footer>
        </div>
    )
}

export default Home;