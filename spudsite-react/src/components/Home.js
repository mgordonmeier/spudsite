import React, { useState } from "react";
import './Home.css';
// import background from "../img/pour4.JPG";
import jumpingSpud from "../img/FunkNJump.gif";
import spudCover from "../img/FreshSpudsCover.jpg";
import envelope from "../img/EnvelopeSongSymbol.png";
import lhc from "../img/LHCSongSymbol.png";
import ahem from "../img/AhemSongSymbol.png";
import h2ku from "../img/Happy2KnowUSongSymbol.png"
import first1up from "../img/FirstOneUpSongSymbol.png"
import FooterLinks from "./FooterLinks";
import SongSymbols from "./SongSymbols";
import SongCard from "./SongCard";


function Home() {

    const [envelopeCheck, setEnvelopeCheck] = useState(false);
    const [lhcCheck, setLhcCheck] = useState(false);
    const [ahemCheck, setAhemCheck] = useState(false);
    const [first1Check, setFirst1Check] = useState(false);
    const [h2kuCheck, setH2kuCheck] = useState(false);

    function onFirst1Click() {
        setFirst1Check(true)
    }

    function onFirst1Cancel() {
        setFirst1Check(false)
    }

    const first1Description = "First One Up is the first original Thomas brought to the group! Dating back to sometime before 2018, " +
        "he approached the group with the song as we prepared for Ramsey Adventure Cabin Weekend. It was there that we rehearsed, arranged, and " +
        "recorded this smooth vibe.";

    function onH2kuClick() {
        setH2kuCheck(true)
    }

    function onH2kuCancel() {
        setH2kuCheck(false)
    }

    const h2kuDescription = "Happy 2 Know u was written in the dead of pandemic winter 2020-2021. A late night inspiration after too much listening to Shawn Mendes, " +
        "Max woke up and threw down the keys. In an attempt to juxtapose the chaotic darkness of that time, he leaned into the hope that is friends and community. We're happy to know you :)";

    function onEnvelopeClick() {
        setEnvelopeCheck(true)
    }

    function onEnvelopeCancel() {
        setEnvelopeCheck(false)
    }

    const envelopeDescription = "Justin brought this song to Max and Martin on a random Saturday in Octover 2021 when " +
        "the three were gathered to record a track called Show Up by Joe Davis. The magic that is The Envelope was the trio's third " +
        "take playing through the loose and jammy form. Justin doubles on bass and 12 string.";

    function onLhcClick() {
        setLhcCheck(true)
    }

    function onLhcCancel() {
        setLhcCheck(false)
    }

    const lhcDescription = "This song is about falling in love and blanket forts. In the fall of 2018, Max and Nicole spent an afternoon " +
        "in a blanket fort and the rest is history. ";

    function onAhemClick() {
        setAhemCheck(true)
    }

    function onAhemCancel() {
        setAhemCheck(false)
    }

    const ahemDescription = "In late 2017 Max sat down behind his computer and popped out an early version of this song out " +
        "in a couple hours. After that it did little more than gather dust until he brought it to the newly formed Funk N Spuds in early 2020. " +
        "From there it turned into an utter soul jam and another favorite of the group.";

    return (
    
            <div className="container">
                <div className="text-center">
                    <div className="rocksalt" 
                    // style={{ display: "inline-block" }}
                    >
                        <div className="text-end m-2">
                            <div className="text-center" style={{ display: "inline-block" }}>
                                {first1Check ? <SongCard songName="First One Up" onSongCancel={onFirst1Cancel} youtubeUrl="https://www.youtube.com/embed/pIDOSohb8jI" songInfo={first1Description} /> :
                                    <SongSymbols symbol={first1up} altText="First One Up Song Symbol" onClick={onFirst1Click} />}
                            </div>
                        </div>
                        {/* <div className="container frame-text-box" style={{ width: "70vw" }}> */}
                            <h1 className="spudsite">Welcome to the Spudsite</h1>
                            <h3>Home of</h3>
                        {/* </div> */}
                        <div className="text-start m-2" >
                            <div style={{ display: "inline-block" }}>
                                {lhcCheck ? <SongCard songName="Low Hanging Ceilings" onSongCancel={onLhcCancel} youtubeUrl="https://www.youtube.com/embed/kIhJc4kovKI" songInfo={lhcDescription} /> :
                                    <SongSymbols symbol={lhc} altText="Low Hanging Ceilings Song Symbol" onClick={onLhcClick} />}
                            </div>
                        </div>
                        <div className="frame-2">
                            <a href="https://voyageminnesota.com/interview/conversations-with-max-martin-justin-thomas-zach-meier-meier-halverson-hazlett-miller/">
                                <img style={{width: "70%"}} src={spudCover} alt="Fresh Spuds Cover" className="img-header" />
                            </a>
                        </div>
                        <div className="text-end m-2">
                            <div style={{ display: "inline-block" }}>
                                {envelopeCheck ? <SongCard songName="The Envelope" onSongCancel={onEnvelopeCancel} youtubeUrl="https://www.youtube.com/embed/0dsg35UWTeA" songInfo={envelopeDescription} /> :
                                    <SongSymbols symbol={envelope} altText="The Envelope Song Symbol" onClick={onEnvelopeClick} />}
                            </div>
                        </div>
                        <div className="card container specialCard beenie" style={{ width: "75vw", display: "inline-block" }}>
                            <h4 className="m-1">Funk N Spuds is a Minneapolis based musical collective of artists from around the Midwest.</h4>
                            <h4 className="m-1">Formed in early 2020, their jam-rock jazz-pop sounds inspire hope in listeners and positive change in the world.</h4>
                            <h4 className="m-1">Over the past few years the Spuds have played venues across the Twin Cities, Southern Minnesota, and Central Wisconsin including Mid West Music Fest, Appleton Beer Factory, The Cabooze, 612 Brew, Galactic Get Down, and UW Stout. </h4>
                            {/* <p className="m-2">Funk N Spuds has taken the stage at most venues in the Twin Cities, but also </p> */}
                        </div>
                        <div className="text-start m-2">
                            <div style={{ display: "inline-block" }}>
                                {ahemCheck ? <SongCard songName="Ahem" onSongCancel={onAhemCancel} youtubeUrl="https://www.youtube.com/embed/MjuEEClLuDQ" songInfo={ahemDescription} /> :
                                    <SongSymbols symbol={ahem} altText="Ahem Song Symbol" onClick={onAhemClick} />}
                            </div>
                        </div>
                        <div className="intro-video ratio ratio-16x9 m-4" style={{width: "65vw", display: "inline-block"}}>
                            <iFrame style={{ borderRadius: "4px" }} src="https://www.youtube.com/embed/KMAOT2d1tXI" title="YouTube - Mango Jam"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen></iFrame>
                        </div>
                        <div className="text-end m-2">
                            <div style={{ display: "inline-block" }}>
                                {h2kuCheck ? <SongCard songName="Happy 2 Know U" onSongCancel={onH2kuCancel} youtubeUrl="https://www.youtube.com/embed/q6x-OIfsgRg" songInfo={h2kuDescription} /> :
                                    <SongSymbols symbol={h2ku} altText="Happy 2 Know U Song Symbol" onClick={onH2kuClick} />}
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