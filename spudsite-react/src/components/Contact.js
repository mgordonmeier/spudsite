import React from "react";
import SongSymbols from "./SongSymbols";
import FooterLinks from "./FooterLinks";
import jumpingSpud from "../img/FunkNJump.gif";
import hippie from "../img/HippieHillSongSymbol.png";
import rollOn from "../img/RollOnSongSymbol.png";
import fnsLogo from "../img/fns-logo.png"

function Contact() {

    return (
        <div className="container rocksalt">
            <div className="text-center">
                <div>
                    <div className="text-end me-5">
                        <SongSymbols urlLink="https://youtu.be/_zHxvUMYBuU" symbol={hippie} altText="Hippie Song Symbol" />
                    </div>
                    <h1 className="spudsite mt-4">Get in touch!</h1>
                    <p className="mt-5">Leave us a message or silly story <a href="mailto:funknspuds@gmail.com">funknspuds@gmail.com</a></p>
                    <div>
                        <img src={fnsLogo} alt="FnS Logo" style={{width: "20em"}} />
                    </div>
                    <div className="text-start ms-5">
                        <SongSymbols urlLink="https://youtu.be/0OQIxd8jOzM" symbol={rollOn} altText="Roll On Song Symbol" />
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

export default Contact;