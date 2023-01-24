import React, { useState } from "react";
import "./Music.css";
import SongSymbols from "./SongSymbols";
import SongCard from "./SongCard";
import FooterLinks from "./FooterLinks";
import jumpingSpud from "../img/FunkNJump.gif";
import changes from "../img/ChangesSongSymbol.png";
import pentUp from "../img/PentUpSongSymbol.png";
import beenGone from "../img/BeenGoneSongSymbol.png";
import lithouse from "../img/LithouseSongSymbol.png";




function Music() {

    const [beenGoneCheck, setBeenGoneCheck] = useState(false);
    const [changesCheck, setChangesCheck] = useState(false);
    const [pentUpCheck, setPentUpCheck] = useState(false);
    const [litCheck, setLitCheck] = useState(false);

    function onBeenGoneClick() {
        setBeenGoneCheck(true);
    }

    function onBeenGoneCancel() {
        setBeenGoneCheck(false);
    }

    const beenGoneDescription = "Been Gone is a break-up song resulting from a split Max experienced in early 2018. " +
        "'The music is broken, the music is clear - And we're wandering around believing in the sound, my dear'. Sometimes " +
        "it's better to call it quits than trying to put back together a shattered piece of glass.";

    function onChangesClick() {
        setChangesCheck(true)
    }

    function onChangesCancel() {
        setChangesCheck(false)
    }

    const changesDescription = "Meditating on the balcony of the house Max and Martin shared during the beginning of the pandemic, " +
        "Max wrote this song and shared it with the Spuds mid-livestream. The band quickly learned to jam on the simple four chord progression " +
        "and it is one of the tracks appearing on Ramsey's Adventure Cabin - EP";

    function onPentUpClick() {
        setPentUpCheck(true)
    }

    function onPentUpCancel() {
        setPentUpCheck(false)
    }

    const pentUpDescription = "Zach came up with the stellar sax part to this groove (originally an iPhone recording of the group during the first days of the pandemic). " +
        "The group arranged and recorded this track during Ramsey Adventure Cabin weekend. Can you feel the energy?";

    function onLitClick() {
        setLitCheck(true)
    }

    function onLitCancel() {
        setLitCheck(false)
    }

    const litDescription = "LitHouse is a song that Justin brought to the group over the summer of 2021. Upon the cyclical piano " +
        "intro Zach threw some ambient sax, Max transformed into a singing whale with the help of his flugelhorn, and the rest of the Spuds " +
        "helped to build this soaring atmospheric sonic tome."



    return (
        <div className="rocksalt container">
            <div className="text-center">
                <div>
                    <div className="text-end m-2">
                        <div style={{ display: "inline-block" }}>
                            {beenGoneCheck ? <SongCard songName="Been Gone" onSongCancel={onBeenGoneCancel} youtubeUrl="https://www.youtube.com/embed/I-a0hjlSZaU?start=2268" songInfo={beenGoneDescription} />
                                : <SongSymbols symbol={beenGone} altText="Been Gone Song Symbol" onClick={onBeenGoneClick} />}
                        </div>
                    </div>
                    <h1 className="mb-5 spudsite">Livestream Central</h1>
                    <div className="text-start m-2">
                        <div style={{ display: "inline-block" }}>
                            {litCheck ? <SongCard songName="LitHouse" onSongCancel={onLitCancel} youtubeUrl="https://www.youtube.com/embed/CF8fYacBiv0" songInfo={litDescription} />
                                : <SongSymbols symbol={lithouse} altText="LitHouse Song Symbol" onClick={onLitClick} />}
                        </div>
                    </div>
                    <div className="music-video-box">
                        <div className="ratio ratio-16x9 m-3" style={{ width: "65vw", display: "inline-block" }}>
                            <iframe style={{ borderRadius: "4px" }} width="auto" height="auto" src="https://www.youtube.com/embed/MOTcyp4Lj64?start=5907" title="YouTube - Spud County" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                        <div className="ratio ratio-16x9 m-3" style={{ width: "65vw", display: "inline-block" }}>
                            <iframe style={{ borderRadius: "4px" }} width="auto" height="auto" src="https://www.youtube.com/embed/PRyNdlSUJJY?start=19666" title="YouTube - Porchfest" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                        <div className="ratio ratio-16x9 m-3" style={{ width: "65vw", display: "inline-block" }}>
                            <iframe style={{ borderRadius: "4px" }} width="auto" height="auto" src="https://www.youtube.com/embed/C5eFspyaYmc?start=267" title="YouTube - RAC EP Release" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                    </div>
                    <div className="text-start m-2">
                        <div style={{ display: "inline-block" }}>
                            {changesCheck ? <SongCard songName="Changes" onSongCancel={onChangesCancel} youtubeUrl="https://www.youtube.com/embed/-PSL2XeBKA8" songInfo={changesDescription} />
                                : <SongSymbols symbol={changes} altText="Changes Song Symbol" onClick={onChangesClick} />}
                        </div>
                    </div>
                    <h1 className=" spudsite">Listen on Bandcamp</h1>
                    <div className="bandcamp-box">
                        <div className="m-2">
                            <iframe className="m-3" title="LHC Bandcamp" style={{ border: "8em", width: "200px", height: "200px", borderRadius: "4px" }} src="https://bandcamp.com/EmbeddedPlayer/track=2496098191/size=large/bgcol=ffffff/linkcol=63b2cc/minimal=true/transparent=true/" seamless><a href="https://funknspuds.bandcamp.com/track/low-hanging-ceilings-3">Low Hanging Ceilings by Funk N Spuds</a></iframe>
                            <iframe className="m-3" title="Envelope Bandcamp" style={{ border: "8em", width: "200px", height: "200px", borderRadius: "5px" }} src="https://bandcamp.com/EmbeddedPlayer/track=1517826561/size=large/bgcol=ffffff/linkcol=0687f5/minimal=true/transparent=true/" seamless><a href="https://funknspuds.bandcamp.com/track/the-envelope">The Envelope by Funk N Spuds</a></iframe>
                        </div>
                        <div>
                            <div className="text-center align-top" style={{display: "inline-block"}}>
                                <iframe className="m-3 align-top" title="Harmonize Bandcamp" style={{ border: "4em", width: "200px", height: "600px" }} src="https://bandcamp.com/EmbeddedPlayer/album=879770262/size=large/bgcol=ffffff/linkcol=0687f5/transparent=true/" seamless><a href="https://funknspuds.bandcamp.com/album/harmonize">Harmonize by Funk N Spuds</a></iframe>
                                <iframe className="m-3 align-top" title="RAC Bandcamp" style={{ border: "4em", width: "200px", height: "500px" }} src="https://bandcamp.com/EmbeddedPlayer/album=317344125/size=large/bgcol=ffffff/linkcol=0687f5/transparent=true/" seamless><a href="https://funknspuds.bandcamp.com/album/ramseys-adventure-cabin">Ramsey's Adventure Cabin by Funk N Spuds</a></iframe>
                            </div>
                        </div>
                    </div>
                    <div className="text-end m-2">
                        <div style={{ display: "inline-block" }}>
                            {pentUpCheck ? <SongCard songName="Pent Up" onSongCancel={onPentUpCancel} youtubeUrl="https://www.youtube.com/embed/hWuE9rREJQI" songInfo={pentUpDescription} />
                                : <SongSymbols symbol={pentUp} altText="Pent Up Song Symbol" onClick={onPentUpClick} />}
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
        </div >
    );
}

export default Music;