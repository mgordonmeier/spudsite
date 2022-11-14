import React, {useState} from "react";
import FooterLinks from "./FooterLinks";
import SongSymbols from "./SongSymbols";
import "./Spuds.css";
import spuddieMax from "../img/spuddie-max.PNG";
import spuddieMarty from "../img/spuddie-marty.PNG";
import spuddieThomas from "../img/spuddie-thomas.PNG";
import spuddieJustin from "../img/spuddie-justin.PNG";
import mtnSong from "../img/MountainSongSymbol.png";
import mango from "../img/MangoJamSongSymbol.png";
import cantStop from "../img/CantStopSongSymbol.png";
import harm from "../img/HarmonizeSongSymbol.png";
import jumpingSpud from "../img/FunkNJump.gif";

function Spuds() {
    const [maxInfo, setMaxInfo] = useState(false);
    const [martyInfo, setMartyInfo] = useState(false);
    const [thomasInfo, setThomasInfo] = useState(false);
    const [justinInfo, setJustinInfo] = useState(false);

    function onMaxClick() {
        
    }

    return (
        <div className="container rocksalt">
            <div className="text-start ms-5">
                <SongSymbols urlLink="https://youtu.be/Et9OYk7XIM8" symbol={cantStop} altText="Can't Stop Song Symbol" />
            </div>
            <div className="container" style={{ width: "50%" }}>
                <h1 className="text-center m-3 spudsite">Meet the Spuds</h1>
            </div>
            <div className="text-center">
                <div className="text-end me-5">
                    <SongSymbols urlLink="https://youtu.be/2O8G22vrpRw" symbol={mtnSong} altText="Mountain Song Symbol" />
                </div>
                <div>
                    <img src={spuddieMax} alt="Spuddie Buddie - Max on Flugel" className="spuddies me-5" />
                    <img src={spuddieMarty} alt="Spuddie Buddie - Marty on drums" className="spuddies" />
                </div>
                <div className="text-start ms-3">
                    <SongSymbols urlLink="https://youtu.be/tGncFGhEAY0" symbol={harm} altText="Harmonize Song Symbol" />
                </div>
                <div>
                    <img src={spuddieThomas} alt="Spuddie Buddie - Thomas on Guitar" className="spuddies me-5" />
                    <img src={spuddieJustin} alt="Spuddie Buddie - Justin on Bass" className="spuddies" />
                </div>
                <div className="text-end me-3">
                    <SongSymbols urlLink="https://youtu.be/9783gZaMlZU" symbol={mango} altText="Mango Jam Song Symbol" />
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
    );
}

export default Spuds;