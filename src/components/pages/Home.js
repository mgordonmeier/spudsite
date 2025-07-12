import React, { useState, useEffect } from "react";
import './Home.css';
import jumpingSpud from "../../img/FunkNJump.gif";
import FooterLinks from "../ui/FooterLinks";
import SongSymbolWrapper from "../ui/SongSymbol";
import intoFocus3 from "../../img/into focus 3.jpg";
import TIKorb from "../../img/Orbz/TIKOrb.png";
import tour25 from "../../img/spudsTour25.png";
// Additional imports needed for SONGS and GALLERY_IMAGES
import first1up from "../../img/FirstOneUpSongSymbol.png";
import h2ku from "../../img/Happy2KnowUSongSymbol.png";
import envelope from "../../img/EnvelopeSongSymbol.png";
import lhc from "../../img/LHCSongSymbol.png";
import ahem from "../../img/AhemSongSymbol.png";
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
//import WanderingSpuddie from "./WanderingSpuddie"

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
    envelope: {
        name: "The Envelope",
        symbol: envelope,
        altText: "The Envelope Song Symbol",
        youtubeUrl: "https://www.youtube.com/embed/0dsg35UWTeA",
        description: "Justin brought this song to Max and Martin on a random Saturday in October 2020 when " +
            "the three were gathered to record a track called Show Up by Joe Davis. The magic that is The Envelope was the trio's third " +
            "take playing through the loose and jammy form. Justin doubles on bass and 12 string."
    },
    lhc: {
        name: "Low Hanging Ceilings",
        symbol: lhc,
        altText: "Low Hanging Ceilings Song Symbol",
        youtubeUrl: "https://www.youtube.com/embed/kIhJc4kovKI",
        description: "This song is about falling in love and blanket forts. In the fall of 2018, Max and Nicole spent an afternoon " +
            "in a blanket fort and the rest is history. "
    },
    ahem: {
        name: "Ahem",
        symbol: ahem,
        altText: "Ahem Song Symbol",
        youtubeUrl: "https://www.youtube.com/embed/MjuEEClLuDQ",
        description: "In late 2017 Max sat down behind his computer and popped out an early version of this song out " +
            "in a couple hours. After that it did little more than gather dust until he brought it to the newly formed Funk N Spuds in early 2020. " +
            "From there it turned into an utter soul jam and another favorite of the group."
    }
};

const VIDEO_LINKS = [
    'https://www.youtube.com/embed/kIhJc4kovKI?si=fWFWN4pML-KEzmti',
    'https://www.youtube.com/embed/KMAOT2d1tXI',
    'https://www.youtube.com/embed/Et9OYk7XIM8?si=6QkB0ERDrG-L24N2',
    'https://www.youtube.com/embed/pIDOSohb8jI?si=UhPYXR0LZo9K1JSF',
    'https://www.youtube.com/embed/2O8G22vrpRw?si=ZuXUKsBQSalX-z45',
    'https://www.youtube.com/embed/q6x-OIfsgRg?si=Zkst6Qz3Po3_3hDZ',
    'https://www.youtube.com/embed/OQuKGgxlRYk?si=YIimR7ixwhMyjSvW',
    'https://www.youtube.com/embed/9783gZaMlZU?si=vTYGS6pBVvXj9LjC',
    'https://www.youtube.com/embed/MjuEEClLuDQ?si=M-tN-qUeB7Gwqvnx',
    'https://www.youtube.com/embed/wMLpBWudGPk?si=NqAokb70KMisDBMm',
    'https://www.youtube.com/embed/3AcNSV5UqUY?si=Rm1JmLMZR7-LecxX'
];

export const GALLERY_IMAGES = [
    cover1, cover2, cover4, cover6, cover9, cover10, cover11, cover12, cover13, cover14, cover15, cover16, cover17, cover18, cover19, cover20
];

function Home() {
    const [selectedVideo, setSelectedVideo] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [songStates, setSongStates] = useState({
        envelope: false,
        lhc: false,
        ahem: false,
        first1up: false,
        h2ku: false,
        TIK: false
    });

    useEffect(() => {
        setSelectedImage(getRandomItem(GALLERY_IMAGES));
        setSelectedVideo(getRandomItem(VIDEO_LINKS));
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

                <h2 className="spudsite">Welcome to the Spudsite</h2>
                <h3>Home of</h3>

                <div className="text-start m-1">
                    <SongSymbolWrapper
                        song={SONGS.TIK}
                        isOpen={songStates.TIK}
                        onToggle={() => toggleSong('TIK')}
                        shouldRotate={true}
                    />
                </div>
                
                <div className="">
                    <a href="https://voyageminnesota.com/interview/conversations-with-max-martin-justin-thomas-zach-meier-meier-halverson-hazlett-miller/">
                        <img style={{width: "55%"}} src={tour25} alt="5 spuds" className="" />
                    </a>
                </div>
                <br></br>
                <div className="m-2 mb-4">
                    <h3>New Album</h3>
                    <h1 className="spudsite">Into Focus</h1>
                    <h4>Available now on all streaming services</h4>
                    <a href="https://funknspuds.bandcamp.com/album/into-focus">
                        <img style={{width: "60%"}} src={intoFocus3} alt="Into Focus Album art" className="img-header frame-2"/>
                    </a>
                </div>
                <div className="text-start " >
                    <SongSymbolWrapper
                        song={SONGS.lhc}
                        isOpen={songStates.lhc}
                        onToggle={() => toggleSong('lhc')}
                    />
                </div>
                <div>
                    <h3 className="spudsite m-4">Check us out on YouTube</h3>
                </div>
                <div className="intro-video ratio ratio-16x9 mt-2" style={{width: "65vw", display: "inline-block"}}>
                    <iframe style={{ borderRadius: "4px" }} src={selectedVideo} title="YouTube Vids"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen></iframe>
                </div>
                
                <div className="text-end m-2">
                    <SongSymbolWrapper
                        song={SONGS.envelope}
                        isOpen={songStates.envelope}
                        onToggle={() => toggleSong('envelope')}
                    />
                </div>
                <div className="card container specialCard beenie" style={{ width: "75vw", display: "inline-block" }}>
                    <h2 className="m-3 spudsite">Symphony of Spuds in the Heart of Minneapolis</h2>
                    <h4 className="m-3">Embark on a musical journey with Funk N Spuds, a dynamic ensemble that emerged from the heart of Minneapolis in early 2020. What started as a whimsical obsession with potatoes and jazz between brothers Martin and Max evolved into a powerhouse of musical innovation. This collective, comprising seasoned musicians from across the Midwest, brings a fresh perspective to the music scene. Their sound, a rich tapestry of jam-rock, jazz-pop, and a hint of funk, reflects a deep commitment to inspiring hope and driving positive change through their art. Each performance is not just a concert; it's a narrative of joy, connection, and musical prowess.</h4>
                    <h4 className="m-3">Funk N Spuds' unique sound is an alchemy of groovy bass lines, electrifying guitar riffs, funky flugelhorn, and compelling percussion, all harmonized to create an immersive experience. Their repertoire, ranging from upbeat, dance-inducing tunes to soul-stirring melodies, showcases their versatility and passion for music. The band's dedication to their craft is evident in their lively performances, leaving audiences not just entertained, but transformed.</h4>
                    <h4 className="m-3">Beyond the music, Funk N Spuds is a beacon of positivity in the community. Their journey is a testament to the power of friendship, creativity, and the unifying force of music. They've graced various stages, from intimate local venues to prominent music festivals, each time leaving an indelible mark on their audience. The band's commitment to making a difference extends to their engagement with local charities and community events, proving that their mission is not just to play music, but to make the world a better place, one note at a time.</h4>
                    <h3 className="m-3 spudsite">Music is Hope!</h3>
                </div>
                <div className="text-start m-2">
                    <SongSymbolWrapper
                        song={SONGS.ahem}
                        isOpen={songStates.ahem}
                        onToggle={() => toggleSong('ahem')}
                    />
                </div>
                <div className="frame-2">
                    <a href="https://lens.snapchat.com/9ab8073ff16547e5bd413f811fb3e513">
                        <img style={{width: "50%"}} src={selectedImage} alt="Fresh Spuds Cover" className="img-header" />
                    </a>
                </div>
                <div className="text-end m-2">
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
                        <img style={{ height: "10em", width: "15em" }} src={jumpingSpud} alt="Jumping Spud" />
                    </a>
                </div>
            </footer>
        </div>
    );
}

export default Home;