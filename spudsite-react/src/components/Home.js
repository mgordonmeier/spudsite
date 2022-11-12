import React from "react";
import './Home.css';
// import background from "../img/pour4.JPG";
import jumpingSpud from "../img/FunkNJump.gif";
import spudCover from "../img/FreshSpudsCover.png";
import envelope from "../img/EnvelopeSongSymbol.png";
import lhc from "../img/LHCSongSymbol.png";
import ahem from "../img/AhemSongSymbol.png";


function Home() {

    return (
        <div>
            <div className="container">
                <div className="text-center">
                    <div className="rocksalt" style={{ display: "inline-block" }}>
                        <div className="card mt-4 container specialCard frame-text-box" style={{ width: "62%" }}>
                            <h1 className="m-4 spudsite">Welcome to the Spudsite</h1>
                            <h3 className="mb-4">Home of</h3>
                        </div>
                        <div className="text-start">
                            <a href="https://youtu.be/0dsg35UWTeA">
                                <img src={envelope} alt="Envelope Song Symbol" className="songSymbol" />
                            </a>
                        </div>
                        <div className="funk-n-jump">
                            <img style={{ height: "10em", width: "15em" }} src={jumpingSpud} alt="Jumping Spud" />
                        </div>
                        <div className="frame-2">
                            <img src={spudCover} alt="Fresh Spuds Cover" className="img-header" />
                        </div>
                        <div className="text-end me-10">
                            <a href="https://youtu.be/kIhJc4kovKI">
                                <img src={lhc} alt="Low Hanging Ceilings Song Symbol" className="songSymbol" />
                            </a>
                        </div>
                        <div className="card mb-3 container specialCard beenie" style={{ width: "75%", display: "inline-block" }}>
                            <h4 className="m-1">Funk N Spuds is a Minneapolis based musical collective of artists from around the Midwest.</h4>
                            <h4 className="m-1">Formed in early 2020, their jam-rock jazz-pop sounds inspire hope in listeners and positive change in the world.</h4>
                            {/* <p className="m-2">Funk N Spuds has taken the stage at most venues in the Twin Cities, but also </p> */}
                        </div>
                        <div className="text-start">
                            <a href="https://youtu.be/MjuEEClLuDQ">
                                <img src={ahem} alt="Ahem Song Symbol" className="songSymbol"/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <footer>
                <div className="container text-center">
                    <ul class="social-icons">
                        <li className="m-2"><a href="https://open.spotify.com/artist/2ZfuKARQLHtJx0kPCb7jbe?si=avihm02YQDaHOEhmh8r2pg"><i class="fa-brands fa-spotify"></i></a></li>
                        <li className="m-2"><a href="https://funknspuds.bandcamp.com"><i class="fa-brands fa-bandcamp"></i></a></li>
                        <li className="m-2"><a href="https://www.youtube.com/c/FunkNSpuds/"><i class="fa-brands fa-youtube"></i></a></li>
                        <li className="m-2"><a href="https://www.tiktok.com/@funknspuds?lang=en"><i class="fa-brands fa-tiktok"></i></a></li>
                    </ul>
                </div>
            </footer>
        </div>
    )
}

export default Home;