import React, { useState } from "react";
import FooterLinks from "./FooterLinks";
import SongSymbols from "./SongSymbols";
import SongCard from "./SongCard";
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
import dalleJustin from "../img/ShaggyOnBass.jpg";
import dalleMartin from "../img/LunaTunaOnTheDrums.jpg";
import dalleThomas from "../img/TheHaze.jpg";
import dalleMax from "../img/FunkySpudInSpace.jpg";

function Spuds() {
    const [maxInfo, setMaxInfo] = useState(false);
    const [martyInfo, setMartyInfo] = useState(false);
    const [thomasInfo, setThomasInfo] = useState(false);
    const [justinInfo, setJustinInfo] = useState(false);

    const [mtnCheck, setMtnCheck] = useState(false);
    const [mangoCheck, setMangoCheck] = useState(false);
    const [cantStopCheck, setCantStopCheck] = useState(false);
    const [harmCheck, setHarmCheck] = useState(false);

    function onMtnClick() {
        setMtnCheck(true)
    }

    function onMtnCancel() {
        setMtnCheck(false)
    }

    const mtnDescription = "The Mountain Song was written by Max after an roadtrip to Colorado where he and a few " +
        "friends attempted to climb Mt. Elbert. Arriving around 3am at the base of the mountain, the friends made it to the summit " +
    "just before 6am when wild weather overtook them. A snowstorm forced them to take cover and eventually retreat, but just as they reached " +
    "the bottom of the summit, the clouds parted and (in Emperor's New Groove fashion) the mountaintop was singing.";

    function onMangoClick() {
        setMangoCheck(true)
    }

    function onMangoCancel() {
        setMangoCheck(false)
    }

    const mangoDescription = "Max threw together Mango Jam on garageband in his bedroom over the summer of 2019. He brought in " +
    "Thomas and Zach to shred over the foundation, tossed it to Martin while he was still living in La Crosse, and eventually brought " +
    "Justin in later that winter. This has long been one of the favorites of the band and fans alike.";

    function onCantStopClick() {
        setCantStopCheck(true)
    }

    function onCantStopCancel() {
        setCantStopCheck(false)
    }

    const cantStopDescription = "With origins dating back to bedroom recordings of 2013, Can't Stop might be the oldest FnS original still in tact. " +
    "Written with the help of Erik Lindgrin, this tune hits on the feeling of being in love and feeling like it will last forever.";

    function onHarmClick() {
        setHarmCheck(true)
    }

    function onHarmCancel() {
        setHarmCheck(false)
    }

    const harmDescription = "Harmonize was written in the fall of 2016 after a double dose of inspiration from Bon Iver's recent 22 A Million album " +
    "and a colorful fall drive drenched in late afternoon autumn sun. After studying Yeat's poem 'The Second Coming' and Joan Didion's 'Slouching Towards Bethlehem', " +
    "Max felt some sense of impending doom. His response: Harmonize.";


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
        "brother Martin. When not playing music with Funk 'N Spuds he travels the country with " +
        "his partner Nicole playing Quadball."

    const martyDescription = "Martin grew up in Neenah Wisconsin with " +
    "his brother Max, playing music together in school bands and getting into trouble. " +
    "This bandana-clad wizard spends his days chasing his cats around the apartment " +
    "and making beats and synth jams that bring pure joy."

    const thomasDescription = "Hailing from the Wild Wild Midwest, Thomas is " + 
    "Funk 'N Spuds' six string slinger. When the encore ends he trades in his " + 
    "guitar for a camera to ride off into the night, shooting stars in galaxies far, far away...."

    const justinDescription = "Justin was born and raised in Prior Lake, Minnesota, " +
    "to a family who loves water, wind, and music.  He now lives in Saint Paul and makes " + 
    "music with the Funk 'N Spuds."

    const dalleAlt = "Image created via Dall-E OpenAI";

    return (
        <div className="container rocksalt">
            <div className="text-start ms-5">
                <div style={{ display: "inline-block" }}>
                    {cantStopCheck ? <SongCard songName="Can't Stop" onSongCancel={onCantStopCancel} youtubeUrl="https://www.youtube.com/embed/Et9OYk7XIM8" songInfo={cantStopDescription} />
                        : <SongSymbols symbol={cantStop} altText="Can't Stop Song Symbol" onClick={onCantStopClick} />}
                </div>
            </div>
            <div className="container" style={{ width: "50%" }}>
                <h1 className="text-center spudsite">Meet the Spuds</h1>
            </div>
            <div className="text-center">
                <div className="text-end me-5">
                    <div style={{ display: "inline-block" }}>
                        {mtnCheck ? <SongCard songName="The Mountain Song" onSongCancel={onMtnCancel} youtubeUrl="https://www.youtube.com/embed/2O8G22vrpRw" songInfo={mtnDescription} />
                            : <SongSymbols symbol={mtnSong} altText="Mountain Song Symbol" onClick={onMtnClick} />}
                    </div>
                </div>
                <div style={{ display: "inline-block" }}>
                    <div className="text-center row">
                        {maxInfo ? <InfoPanel memberName="Max Meier" memberInfo={maxDescription} onCancel={onMaxCancel} top={1} dalleImg={dalleMax} dalleAlt={dalleAlt} />
                            : <img src={spuddieMax} alt="Spuddie Buddie - Max on Flugel" className="spuddies me-5" onClick={onMaxClick} />}
                        {martyInfo ? <InfoPanel className="m-2" memberName="Martin Meier" memberInfo={martyDescription} onCancel={onMartyCancel} top={1} dalleImg={dalleMartin} dalleAlt={dalleAlt} />
                            : <img src={spuddieMarty} alt="Spuddie Buddie - Marty on drums" className="spuddies" onClick={onMartyClick} />}
                    </div>
                </div>
                <div></div>
                <div style={{ display: "inline-block" }}>
                    <div className="text-center row">
                        {thomasInfo ? <InfoPanel className="m-2" memberName="Thomas Hazlett" memberInfo={thomasDescription} onCancel={onThomasCancel} top={0} dalleImg={dalleThomas} dalleAlt={dalleAlt} />
                            : <img src={spuddieThomas} alt="Spuddie Buddie - Thomas on Guitar" className="spuddies me-5" onClick={onThomasClick} />}
                        {justinInfo ? <InfoPanel className="m-2" memberName="Justin Halverson" memberInfo={justinDescription} onCancel={onJustinCancel} top={0} dalleImg={dalleJustin} dalleAlt={dalleAlt} />
                            : <img src={spuddieJustin} alt="Spuddie Buddie - Justin on Bass" className="spuddies" onClick={onJustinClick} />}
                    </div>
                </div>
                <div className="text-start ms-3">
                    <div style={{ display: "inline-block" }}>
                        {harmCheck ? <SongCard songName="Harmonize" onSongCancel={onHarmCancel} youtubeUrl="https://www.youtube.com/embed/tGncFGhEAY0" songInfo={harmDescription} />
                            : <SongSymbols symbol={harm} altText="Harmonize Song Symbol" onClick={onHarmClick} />}
                    </div>
                </div>
                <div className="text-end me-3">
                    <div style={{ display: "inline-block" }}>
                        {mangoCheck ? <SongCard songName="Mango Jam" onSongCancel={onMangoCancel} youtubeUrl="https://www.youtube.com/embed/9783gZaMlZU" songInfo={mangoDescription} />
                            : <SongSymbols symbol={mango} altText="Mango Jam Song Symbol" onClick={onMangoClick} />}
                    </div>
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