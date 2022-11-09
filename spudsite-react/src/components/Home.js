import React from "react";
import './Home.css';


function Home() {

    return (
        <div style={{ backgroundImage: '../img/pour4.JPG' }}>
            <div className="container">
                <div className="text-center">
                    <div className="rocksalt" style={{ display: "inline-block" }}>
                        <div className="card mt-2 container specialCard" style={{ width: "62%" }}>
                            <h1 className="m-4">Welcome to the Spudsite</h1>
                            <h3 className="mb-4">Home of</h3>
                        </div>
                        <div className="frame-2">
                            <img src="/img/FreshSpudsCover.png" alt="Fresh Spuds Cover" className="img-header" />
                        </div>
                        <div className="card mb-3 container specialCard" style={{ width: "90%", display: "inline-block" }}>
                            <p className="m-2">Funk N Spuds is a Minneapolis based musical collective of artists from around the Midwest.</p>
                            <p className="m-2">Formed in early 2020, their jam-rock jazz-pop sounds inspire hope in listeners and positive change in the world.</p>
                            {/* <p className="m-2">Funk N Spuds has taken the stage at most venues in the Twin Cities, but also </p> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;