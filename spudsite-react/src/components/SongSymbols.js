import React from "react";

function SongSymbols(props) {

    return (
        <a href={props.urlLink}>
            <img src={props.symbol} alt={props.altText} className="songSymbol" />
        </a>
    )
}

export default SongSymbols;