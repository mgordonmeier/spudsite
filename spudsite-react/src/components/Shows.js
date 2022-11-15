import React from "react";
import SongSymbols from "./SongSymbols";
import FooterLinks from "./FooterLinks";
import jumpingSpud from "../img/FunkNJump.gif";
import sunset from "../img/HillsideSunsetSongSymbol.png";
import somethin from "../img/SomethinSometimesSongSymbol.png"

function Shows() {

    return (
        <div className="container">
            <div className="text-center rocksalt">
                <div>
                    <div className="text-start ms-5">
                        <SongSymbols urlLink="https://youtu.be/_zHxvUMYBuU" symbol={sunset} altText="Hillside Sunset Song Symbol" />
                    </div>
                    <h1 className="spudsite">Upcoming Shows!</h1>
                    <h5 className="spudsite m-5">December 17, 2022 @ Ed's No Name Bar (Winona, MN)</h5>
                    <h5 className="spudsite m-5">January 20, 2023 @ Appleton Beer Factory (Appleton, WI)</h5>
                    <div className="text-end me-5">
                        <SongSymbols urlLink="https://youtu.be/OQuKGgxlRYk" symbol={somethin} altText="Somethin Sometimes Song Symbol" />
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