import React from "react";
import './Home.css';

function Home() {

    return (
        <div className="container">
            <div className="text-center">
                <div className="rocksalt" style={{ display: "inline-block" }}>
                    <h1 className="m-4">Welcome to the Spudsite</h1>
                    <h3 className="m-2">Home of</h3>
                    <div className="frame-2">
                        <img src="/img/FreshSpudsCover.png" alt="Fresh Spuds Cover" className="img-header" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;