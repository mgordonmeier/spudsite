import React, { useState } from "react";
import FooterLinks from "./FooterLinks";
import SongSymbols from "./SongSymbols";
import InfoPanel from "./InfoPanel";
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
        setMaxInfo(true);
    }

    function onMaxCancel() {
        setMaxInfo(false);
    }

    function onMartyClick() {
        setMartyInfo(true);
    }

    function onMartyCancel() {
        setMartyInfo(false);
    }

    function onThomasClick() {
        setThomasInfo(true);
    }

    function onThomasCancel() {
        setThomasInfo(false);
    }

    function onJustinClick() {
        setJustinInfo(true);
    }

    function onJustinCancel() {
        setJustinInfo(false);
    }

    const maxDescription = "Born and raised in Neenah Wisconsin, " +
        "Max grew up playing music with and enjoying the company of his " +
        "brother Martin. When not playing music he travels the country with " +
        "his partner Nicole playing Quadball."

    const martyDescription = "Born and raised in Neenah Wisconsin, " +
        "Max grew up playing music with and enjoying the company of his " +
        "brother Martin. When not playing music he travels the country with " +
        "his partner Nicole playing Quadball."

    const thomasDescription = "Born and raised in Neenah Wisconsin, " +
        "Max grew up playing music with and enjoying the company of his " +
        "brother Martin. When not playing music he travels the country with " +
        "his partner Nicole playing Quadball."

    const justinDescription = "Born and raised in Neenah Wisconsin, " +
        "Max grew up playing music with and enjoying the company of his " +
        "brother Martin. When not playing music he travels the country with " +
        "his partner Nicole playing Quadball."

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
                <div style={{ display: "inline-block" }}>
                    <div className="text-center row">
                        {maxInfo ? <InfoPanel memberName="Max Meier" memberInfo={maxDescription} onCancel={onMaxCancel} />
                            : <img src={spuddieMax} alt="Spuddie Buddie - Max on Flugel" className="spuddies me-5" onClick={onMaxClick} />}
                        {martyInfo ? <InfoPanel className="m-2" memberName="Martin Meier" memberInfo={martyDescription} onCancel={onMartyCancel} />
                            : <img src={spuddieMarty} alt="Spuddie Buddie - Marty on drums" className="spuddies" onClick={onMartyClick} />}
                    </div>
                </div>
                <div></div>
                <div style={{ display: "inline-block" }}>
                    <div className="text-center row">
                        {thomasInfo ? <InfoPanel className="m-2" memberName="Thomas Hazlett" memberInfo={thomasDescription} onCancel={onThomasCancel} />
                            : <img src={spuddieThomas} alt="Spuddie Buddie - Thomas on Guitar" className="spuddies me-5" onClick={onThomasClick} />}
                        {justinInfo ? <InfoPanel className="m-2" memberName="Justin Halverson" memberInfo={justinDescription} onCancel={onJustinCancel} />
                            : <img src={spuddieJustin} alt="Spuddie Buddie - Justin on Bass" className="spuddies" onClick={onJustinClick} />}
                    </div>
                </div>
                <div className="text-start ms-3">
                    <SongSymbols urlLink="https://youtu.be/tGncFGhEAY0" symbol={harm} altText="Harmonize Song Symbol" />
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