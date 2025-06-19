import React from "react";
import FooterLinks from "./FooterLinks";
import jumpingSpud from "../img/FunkNJump.gif";

function NotFound() {
    return (
        <main className="container text-center rocksalt">
            <h1 className="m-5 spudsite">404 📃 Not Found</h1>
            <h4 className="m-5">We were unable to find the page you were looking for</h4>
            <img className="m-3" src="https://placekitten.com/300/300" alt="kitty for your troubles" />
            <p className="m-4">Please accept this picture of a kitten for your troubles</p>
            <FooterLinks />
            <div className="text-center">
                <a href="https://lens.snapchat.com/9ab8073ff16547e5bd413f811fb3e513?sender_web_id=4a206bd0-61c0-4d01-9a1c-0db2f2654c50&device_type=desktop&is_copy_url=true">
                    <img style={{ height: "10em", width: "15em" }} src={jumpingSpud} alt="Jumping Spud" />
                </a>
            </div>
        </main>
    );
}

export default NotFound;