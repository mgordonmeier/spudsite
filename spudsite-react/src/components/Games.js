import React from "react";
import MApp from "./MApp";

function Games() {

    return (
        <div className="container text-center" style={{height: "700px"}}>
            <h1 className="m-4 rocksalt spudsite">Spudcraft</h1>
            <div className="m-2" style={{border: "10px solid black", borderRadius: "5px", height: "550px", width: "700px", display: "inline-block"}}>
                <MApp />
            </div>
        </div>
    )
}

export default Games;