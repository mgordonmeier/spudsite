import React from "react";

function InfoPanel(props) {

    return (
        <div className="card specialCard text-center m-2" style={{width: "20rem"}}>
            <div className="card-header m-2">
                <p className="d-inline"><strong>{props.memberName}</strong></p>
                <button className="btn btn-danger btn-sm float-end" onClick={props.onCancel}>X</button>
            </div>
            <div className="card-body beenie">
                <h4 className="card-text">{props.memberInfo}</h4>
            </div>
        </div>
    )
}

export default InfoPanel;