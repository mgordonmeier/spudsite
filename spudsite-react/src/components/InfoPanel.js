import React from "react";

function InfoPanel(props) {
    
    let topOrBottom = "card-image-top text-center m-1";

    if (props.top !== 1) {
        topOrBottom = "card-img-bottom text-center m-1";
    } 

    return (
        <div className="card specialCard text-center m-2" style={{width: "20rem"}}>
            <div className="card-header m-2">
                <p className="d-inline"><strong>{props.memberName}</strong></p>
                <button className="btn btn-danger btn-sm float-end" onClick={props.onCancel}>X</button>
            </div>
            {props.top ? <div className="text-center"><img src={props.dalleImg} alt={props.dalleAlt} className={topOrBottom} style={{width: "18rem", height: "auto", borderRadius: "7px"}} /></div> : null}
            <div className="card-body beenie d-inline">
                {/* <img src={props.dalleImg} alt={props.dalleAlt} className="card-image"/> */}
                <h4 className="card-text">{props.memberInfo}</h4>
            </div>
            {!props.top ? <img src={props.dalleImg} alt={props.dalleAlt} className={topOrBottom} style={{width: "18rem", height: "auto", borderRadius: "7px"}} /> : null}
        </div>
    )
}

export default InfoPanel;