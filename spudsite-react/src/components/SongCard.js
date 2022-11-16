import React from "react";

function SongCard(props) {
    return (
        <div className="card specialCard text-center m-2" style={{width: "20rem"}}>
            <div className="card-header m-2">
                <p className="d-inline"><strong>{props.songName}</strong></p>
                <button className="btn btn-danger btn-sm float-end" onClick={props.onSongCancel}>X</button>
            </div>
            <div className="text-center">
                <iframe style={{width: "17rem"}} className="card-img-top text-center" src={props.youtubeUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
            <div className="card-body beenie d-inline">
                <h5 className="card-text">{props.songInfo}</h5>
            </div>
        </div>
    )
}

export default SongCard;