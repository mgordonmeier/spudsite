import React, { useState } from "react";
import MApp from "./MApp";
import spudcraftLogo from "../img/Spudcraft.png"

function Games() {

    const [spudcraft, setSpudcraft] = useState(true)

    function onSpudcraftClick() {
        setSpudcraft(false)
    }

    function onSpudcraftClose() {
        setSpudcraft(true)
    }

    return (
        <div className="container text-center" style={{ height: "700px" }}>
            <h1 className="m-4 spudsite rocksalt">Spudcraft</h1>
            {spudcraft 
            ? <div><h3 className="mt-5 rocksalt">click to play</h3><div><img className="spuddies" style={{width: "50%", height: "auto"}} src={spudcraftLogo} alt="Spudcraft logo" onClick={onSpudcraftClick} /></div></div>
            : <div><div className="m-2" style={{ border: "10px solid black", borderRadius: "5px", height: "550px", width: "700px", display: "inline-block" }}><MApp /></div><button className="btn btn-danger rocksalt" onClick={onSpudcraftClose}>X</button></div>}
        </div>
    )
}

export default Games;