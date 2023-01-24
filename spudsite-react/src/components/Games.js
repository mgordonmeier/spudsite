import React, { useState } from "react";
import MApp from "./MApp";
import spudcraftLogo from "../img/Spudcraft.png"
import FooterLinks from "./FooterLinks";
import jumpingSpud from "../img/FunkNJump.gif";


function Games() {

    const [spudcraft, setSpudcraft] = useState(true)

    function onSpudcraftClick() {
        setSpudcraft(false)
    }

    function onSpudcraftClose() {
        setSpudcraft(true)
    }

    return (
        <div className="container text-center">
            <div>
                <h1 className="m-4 spudsite rocksalt">Spudcraft</h1>
                {spudcraft
                    ? <div><h3 className="mt-5 rocksalt">click to play</h3><div><img className="spuddies" style={{ width: "50%", height: "auto" }} src={spudcraftLogo} alt="Spudcraft logo" onClick={onSpudcraftClick} /></div></div>
                    : <div>
                        <div style={{ display: "inline-block" }}>
                            <div className="m-2 text-center" style={{ border: "10px solid black", borderRadius: "5px", height: "550px", width: "700px" }}>
                                <MApp />
                            </div>
                        </div>
                        <button className="btn btn-danger rocksalt" onClick={onSpudcraftClose}>X</button>
                        <div className="card container specialCard m-3 beenie text-center" style={{ width: "50%", display: "inline-block" }}>
                            <h2 className="spudsiteSm"><strong>Controls</strong></h2>
                            <div className="row m-2">
                                <div className="col-sm-6">
                                    <h4 className="">'W' - forward</h4>
                                    <h4 className="">'S' - back</h4>
                                    <h4 className="">'A' - left</h4>
                                    <h4 className="">'D' - right</h4>
                                    <h4 className="">'space' - jump</h4>
                                </div>
                                <div className="col-sm-6">
                                    <h4 className="">'mouse' - move camera</h4>
                                    <h4 className="">'click' - place block</h4>
                                    <h4 className="">'alt + click' - remove block</h4>
                                    <h4 className="">'1-5' - material select</h4>
                                </div>
                            </div>
                        </div>
                    </div>}
            </div>
            <div className="container text-center mt-3">
                <FooterLinks />
                <div className="text-center">
                    <a href="https://lens.snapchat.com/9ab8073ff16547e5bd413f811fb3e513?sender_web_id=4a206bd0-61c0-4d01-9a1c-0db2f2654c50&device_type=desktop&is_copy_url=true">
                        <img style={{ height: "10em", width: "15em" }} src={jumpingSpud} alt="Jumping Spud" />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Games;