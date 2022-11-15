import React from "react";
import "./Music.css";
import SongSymbols from "./SongSymbols";
import FooterLinks from "./FooterLinks";
import jumpingSpud from "../img/FunkNJump.gif";
import changes from "../img/ChangesSongSymbol.png";
import pentUp from "../img/PentUpSongSymbol.png";
import beenGone from "../img/BeenGoneSongSymbol.png";




function Music() {

    return (
        <div className="rocksalt container">
            <div className="text-center">
                <div>
                    <div className="text-end me-5">
                        <SongSymbols urlLink="https://youtu.be/I-a0hjlSZaU?t=2268" symbol={beenGone} altText="Been Gone Song Symbol" />
                    </div>
                    <h1 className="mb-5 spudsite">Livestream Central</h1>
                    <div class="music-video-box">
                        <div className="m-3">
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/MOTcyp4Lj64?start=5907" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                        <div className="m-3">
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/PRyNdlSUJJY?start=19666" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                        <div>
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/C5eFspyaYmc?start=267" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                    </div>
                    <div className="text-start ms-5">
                        <SongSymbols urlLink="https://youtu.be/-PSL2XeBKA8" symbol={changes} altText="Changes Song Symbol" />
                    </div>
                    <h1 className="mb-5 spudsite">Listen on Bandcamp</h1>
                    <div class="bandcamp-box">
                        <div className="m-2">
                            <iframe className="m-3" style={{ border: "8em", width: "200px", height: "200px" }} src="https://bandcamp.com/EmbeddedPlayer/track=2496098191/size=large/bgcol=ffffff/linkcol=63b2cc/minimal=true/transparent=true/" seamless><a href="https://funknspuds.bandcamp.com/track/low-hanging-ceilings-3">Low Hanging Ceilings by Funk N Spuds</a></iframe>
                            <iframe className="m-3" style={{ border: "8em", width: "200px", height: "200px" }} src="https://bandcamp.com/EmbeddedPlayer/track=1517826561/size=large/bgcol=ffffff/linkcol=0687f5/minimal=true/transparent=true/" seamless><a href="https://funknspuds.bandcamp.com/track/the-envelope">The Envelope by Funk N Spuds</a></iframe>
                        </div>
                        <div style={{ display: "inline-flex" }}>
                            <iframe className="m-3" style={{ border: "4em", width: "350px", height: "621px" }} src="https://bandcamp.com/EmbeddedPlayer/album=317344125/size=large/bgcol=ffffff/linkcol=0687f5/transparent=true/" seamless><a href="https://funknspuds.bandcamp.com/album/ramseys-adventure-cabin">Ramsey's Adventure Cabin by Funk N Spuds</a></iframe>
                            <iframe className="m-3" style={{ border: "4em", width: "350px", height: "720px" }} src="https://bandcamp.com/EmbeddedPlayer/album=879770262/size=large/bgcol=ffffff/linkcol=0687f5/transparent=true/" seamless><a href="https://funknspuds.bandcamp.com/album/harmonize">Harmonize by Funk N Spuds</a></iframe>
                        </div>
                    </div>
                    <div className="text-end me-5">
                        <SongSymbols urlLink="https://youtu.be/hWuE9rREJQI" symbol={pentUp} altText="Pent Up Song Symbol" />
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