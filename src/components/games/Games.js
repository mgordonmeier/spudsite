import React, { useState } from "react";
import MApp from "./MApp";
import './MApp.css';
import FooterLinks from "../ui/FooterLinks";
import './GTVenue/Gameboard.css';
import GameBoard from "./GTVenue";
import spudcraftLogo from "../../img/Spudcraft.png"
import jumpingSpud from "../../img/FunkNJump.gif";
import bandventureLogo from "../../img/BandventureLogo.png";

const GAMES = {
    spudcraft: {
        name: "Spudcraft",
        logo: spudcraftLogo,
        altText: "Spudcraft logo",
        component: MApp,
        title: "Spudcraft"
    },
    bandventure: {
        name: "Get To The Venue",
        logo: bandventureLogo,
        altText: "Bandventure Quest logo",
        component: GameBoard,
        title: "Get To The Venue"
    }
};

function Games() {
    const [gameStates, setGameStates] = useState({
        spudcraft: true,
        bandventure: true
    });

    const toggleGame = (gameKey) => {
        setGameStates(prev => ({
            ...prev,
            [gameKey]: !prev[gameKey]
        }));
    };

    const GameContainer = ({ game, isOpen, onClose }) => {
        const GameComponent = game.component;
        const gameKey = game.name === "Spudcraft" ? "spudcraft" : "bandventure";
        
        return (
            <div>
                {isOpen ? (
                    <div>
                        <img
                            className="spuddies"
                            style={{ width: "50%", height: "auto" }}
                            src={game.logo}
                            alt={game.altText}
                            onClick={() => toggleGame(gameKey)}
                        />
                    </div>
                ) : (
                    <div>
                        <div style={{ display: "inline-block" }}>
                            <h1 className="m-4 spudsite rocksalt">{game.title}</h1>
                            <div
                                className="m-2 text-center"
                                style={{
                                    border: "10px solid black",
                                    borderRadius: "5px",
                                    maxWidth: "800px",
                                    margin: "0 auto",
                                    overflow: "auto",
                                    ...(game.name === "Spudcraft" && {
                                        height: "550px",
                                        width: "700px"
                                    })
                                }}
                            >
                                <GameComponent />
                            </div>
                        </div>
                        <button
                            className="btn btn-danger rocksalt"
                            onClick={() => toggleGame(gameKey)}
                        >
                            X
                        </button>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="container text-center">
            <h3 className="mt-5 mb-5 rocksalt">Click to play</h3>

            {/* Temporarily commented out Spudcraft 
            <GameContainer 
                game={GAMES.spudcraft}
                isOpen={gameStates.spudcraft}
                onClose={() => toggleGame('spudcraft')}
            />
            */}

            <GameContainer 
                game={GAMES.bandventure}
                isOpen={gameStates.bandventure}
                onClose={() => toggleGame('bandventure')}
            />

            <div className="container text-center mt-3">
                <FooterLinks />
                <div className="text-center">
                    <a href="https://lens.snapchat.com/9ab8073ff16547e5bd413f811fb3e513?sender_web_id=4a206bd0-61c0-4d01-9a1c-0db2f2654c50&device_type=desktop&is_copy_url=true">
                        <img 
                            style={{ height: "10em", width: "15em" }} 
                            src={jumpingSpud} 
                            alt="Jumping Spud" 
                        />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Games;