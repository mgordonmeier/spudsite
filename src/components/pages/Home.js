import React, { useState, useEffect } from "react";
import './Home.css';
import jumpingSpud from "../../img/FunkNJump.gif";
import FooterLinks from "../ui/FooterLinks";
import SongSymbolWrapper from "../ui/SongSymbol";
// hero image is optimized into public/optimized/ by tools/convert-images.js
import TIKorb from "../../img/Orbz/TIKOrb.png";
import tour25 from "../../img/spudsTour25.png";
import intoFocusAlbum from "../../img/into focus 3.jpg";
// Additional imports needed for SONGS and GALLERY_IMAGES
import first1up from "../../img/FirstOneUpSongSymbol.png";
import h2ku from "../../img/Happy2KnowUSongSymbol.png";
import lhc from "../../img/LHCSongSymbol.png";
import cover1 from "../../img/IMG_0245.JPG";
import cover2 from "../../img/IMG_0249.JPG";
import cover4 from "../../img/IMG_3587.jpeg";
import cover6 from "../../img/IMG_3890-2.jpeg";
import cover9 from "../../img/IMG_20230616_200358246_HDR.jpg";
import cover10 from "../../img/IMGP1954.JPG";
import cover11 from "../../img/MWMF.jpg";
import cover12 from "../../img/A7S06448.jpeg";
import cover13 from "../../img/A7S06001.jpeg";
import cover14 from "../../img/A7S04769.jpeg";
import cover15 from "../../img/FunknSpuds-113.jpeg";
import cover16 from "../../img/IMG_5793.jpeg";
import cover17 from "../../img/IMG_5587.JPG";
import cover18 from "../../img/IMG_5229.jpeg";
import cover19 from "../../img/A7S09821.jpeg";
import cover20 from "../../img/A7S00995.jpeg";

const SONGS = {
    first1up: {
        name: "First One Up",
        symbol: first1up,
        altText: "First One Up Song Symbol",
        youtubeUrl: "https://www.youtube.com/embed/pIDOSohb8jI",
        description: "First One Up is the first original Thomas brought to the group! Dating back to sometime before 2018, " +
            "he approached the group with the song as we prepared for Ramsey Adventure Cabin Weekend. It was there that we rehearsed, arranged, and " +
            "recorded this smooth vibe."
    },
    TIK: {
        name: "Tied In Knots",
        symbol: TIKorb,
        altText: "Tied In Knots orb",
        youtubeUrl: "https://www.youtube.com/embed/HTq0FrH-FpY",
        description: "This song was in the works for four years, since its writing in early 2020 in Minneapolis, MN. It is about " + 
            "not knowing how to be in light of everything and feeling like you need to take a step back so others can take a step forward, but not " +
            "knowing exactly how to do that while also honoring that I am a person deserving of space and time and love. The recording process of this " +
            "song reflects that confusion and going back and forth. We started recording it in 2022 and lost members of the band, gained new ones, scratched " +
            "the entire drum set recording and guitar solo and re recorded them. But at the end of all the work, we couldn't be more proud of how it turned out."
    },
    h2ku: {
        name: "Happy 2 Know U",
        symbol: h2ku,
        altText: "Happy 2 Know U Song Symbol",
        youtubeUrl: "https://www.youtube.com/embed/q6x-OIfsgRg",
        description: "Happy 2 Know u was written in the dead of pandemic winter 2020-2021. A late night inspiration after too much listening to Shawn Mendes, " +
            "Max woke up and threw down the keys. In an attempt to juxtapose the chaotic darkness of that time, he leaned into the hope that is friends and community. We're happy to know you :)"
    },
    lhc: {
        name: "Low Hanging Ceilings",
        symbol: lhc,
        altText: "Low Hanging Ceilings Song Symbol",
        youtubeUrl: "https://www.youtube.com/embed/kIhJc4kovKI",
        description: "This song is about falling in love and blanket forts. In the fall of 2018, Max and Nicole spent an afternoon " +
            "in a blanket fort and the rest is history. "
    },
};

export const GALLERY_IMAGES = [
    cover1, cover2, cover4, cover6, cover9, cover10, cover11, cover12, cover13, cover14, cover15, cover16, cover17, cover18, cover19, cover20
];

function Home() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [songStates, setSongStates] = useState({
        lhc: false,
        first1up: false,
        h2ku: false,
        TIK: false
    });

    useEffect(() => {
        setSelectedImage(getRandomItem(GALLERY_IMAGES));
    }, []);

    const getRandomItem = (array) => {
        return array[Math.floor(Math.random() * array.length)];
    };

    const toggleSong = (songKey) => {
        setSongStates(prev => ({
            ...prev,
            [songKey]: !prev[songKey]
        }));
    };

    return (
        <div className="container">
            <div className="text-center rocksalt">
                <div className="text-end m-1">
                    <div className="text-center" style={{ display: "inline-block" }}>
                        <SongSymbolWrapper
                            song={SONGS.first1up}
                            isOpen={songStates.first1up}
                            onToggle={() => toggleSong('first1up')}
                        />
                        <p style={{fontWeight: 'bold', textAlign: 'center'}} className="mt-1">Click around <br/> to explore</p>
                    </div>
                </div>

                <section className="home-section home-welcome-section">
                    <h2 className="spudsite">Welcome to the Spudsite</h2>
                    <h3>Home of</h3>
                </section>
                
                <div className="home-section home-logo-section">
                    <a href="https://voyageminnesota.com/interview/conversations-with-max-martin-justin-thomas-zach-meier-meier-halverson-hazlett-miller/">
                        <img loading="lazy" src={tour25} alt="5 spuds" className="center-img home-logo-image" />
                    </a>
                </div>
                <div className="home-section text-start home-song-symbol">
                    <SongSymbolWrapper
                        song={SONGS.TIK}
                        isOpen={songStates.TIK}
                        onToggle={() => toggleSong('TIK')}
                        shouldRotate={true}
                    />
                </div>
                <div className="home-section home-album-section">
                    <h3>New Album</h3>
                    <h1 className="spudsite">Into Focus</h1>
                    <h4>Available now on all streaming services</h4>
                    <a href="https://funknspuds.bandcamp.com/album/into-focus">
                        <img loading="lazy" src={intoFocusAlbum} alt="Into Focus Album art" className="img-header frame-2 center-img home-album-image"/>
                    </a>
                </div>
                <div className="home-section text-start home-song-symbol" >
                    <SongSymbolWrapper
                        song={SONGS.lhc}
                        isOpen={songStates.lhc}
                        onToggle={() => toggleSong('lhc')}
                    />
                </div>
                <div className="home-section frame-2 home-gallery-section">
                    <a href="https://lens.snapchat.com/9ab8073ff16547e5bd413f811fb3e513">
                        <img loading="lazy" src={selectedImage} alt="Fresh Spuds Cover" className="img-header center-img home-gallery-image" />
                    </a>
                </div>
                <div className="home-section text-end home-song-symbol">
                    <SongSymbolWrapper
                        song={SONGS.h2ku}
                        isOpen={songStates.h2ku}
                        onToggle={() => toggleSong('h2ku')}
                    />
                </div>
            </div>
            <footer>
                <div className="container text-center">
                    <FooterLinks />
                </div>
                <div className="text-center">
                    <a href="https://lens.snapchat.com/9ab8073ff16547e5bd413f811fb3e513?sender_web_id=4a206bd0-61c0-4d01-9a1c-0db2f2654c50&device_type=desktop&is_copy_url=true">
                        <img className="center-img" style={{ height: "10em", width: "15em" }} src={jumpingSpud} alt="Jumping Spud" />
                    </a>
                </div>
            </footer>
        </div>
    );
}

export default Home;
