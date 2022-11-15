import React from "react";

function SongSymbols(props) {

    return (
        <div onClick={props.onClick}>
            <img src={props.symbol} alt={props.altText} className="songSymbol" />
        </div>
    )
}

export default SongSymbols;