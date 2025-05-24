import React, { useState } from "react";
import SongSymbolWrapper from "./SongSymbol";
import FooterLinks from "./FooterLinks";
import jumpingSpud from "../img/FunkNJump.gif";
import sunset from "../img/HillsideSunsetSongSymbol.png";
import somethin from "../img/SomethinSometimesSongSymbol.png";
import lowDown from "../img/LowDownFNS-Appleton.jpg";
import noName from "../img/NoNameDec17SpudsAndLads.jpg";
import whiteS from "../img/FnSatWhiteS.jpg";
import mwmf23 from "../img/MWMF2023.png"
import Art612 from "../img/ArtAWhirl612Spudsite.jpg"
import GGD22 from "../img/GGD2022Spudsite.jpg"
import MWMF22 from "../img/MWMFSpudsite.jpg"
import Paper22 from "../img/PaperfestPromoSpudsite.jpg"
import Shoebox from "../img/ShoeboxEpisodeXiiSpudsite.jpg"
import SpudCounty from "../img/SpudCountySpudsite.jpg"
import Underground from "../img/UndergroundClamsVelvetFns.jpg"
import HighlandHarmonies from "../img/HighlandHarmonies.PNG"
import HunnyCan from "../img/HoneyCan.jpg"
import pandEmfiSpuds from "../img/pandEmfiSpuds.JPG"
import funkCreatures from "../img/NoNameOct28Final.jpg"
import hunnyAlbumRelease from "../img/HunnyAlbumRelease.jpg"
//import spud5s from "../img/5spuds.PNG"
import bigTurn from "../img/bigTurn.JPG"
import uwstout from "../img/UWStout.png"
import singleRelease from "../img/messin.v3.jpg"
//import albumArt from "../img/HillsideSunsetArtBackground.jpg"
//import meierFest from "../img/BassIntroArtBackground.jpg"
import justinFest from "../img/LithouseArtBackground.jpg"
import albumReleaseShow from "../img/DayBlockShowPosterv6.jpg"
import fmFest from "../img/FMfest.jpeg"
import bentPaddle from "../img/BentPaddle.png"
import HillSunOrb from "../img/Orbz/HillsideSunsetOrb.png"
import nonamecoins from "../img/NoName1214posterv3.jpg"
import dayblockfeb8 from "../img/dayblockfeb8.JPG"
import fnsindeed from "../img/Funk_In_The_Ox.jpg"
import matcha from "../img/Matcha.png"
import lenjaorb from "../img/Orbz/LenjaminOrb.png"
import albumorb from "../img/Orbz/AlbumOrb.png"
import bassorb from "../img/Orbz/BassOrb.png"
import spgorb from "../img/Orbz/SPGOrb.png"
import ewtrtworb from "../img/Orbz/EWTRTWOrb.png"
import artAWhirlElias from "../img/ArtAWhirlElias.JPG"
import tour25 from "../img/spudsTour25.png"
import indeed from "../img/indeedLogo.png"
import appleton from "../img/SpudsTourAppleton.jpg"
import harriet from "../img/SpudsTourHarriet.jpg"
import madison from "../img/SpudsTourUpNorth.jpg"
import winona from "../img/SpudsTourNoname.jpg"
import folknight from "../img/FolkNightSpudGarden.jpg"
import caboozeWild from "../img/caboozeWild.JPG"

const SONGS = {
    sunset: {
        name: "Hillside Sunset",
        symbol: sunset,
        altText: "Hillside Sunset Song Symbol",
        youtubeUrl: "https://www.youtube.com/embed/_zHxvUMYBuU",
        description: "Max wrote this song while living in his friend Mary's attic in 2019. " +
            "During a brief stay in Neenah during the summer of that year, he teamed up with Martin and Nicole to choreograph and record a live-loop " +
            "one take video."
    },
    HSunset: {
        name: "Hillside Sunset",
        symbol: HillSunOrb,
        altText: "Hillside Sunset Orb",
        youtubeUrl: "https://www.youtube.com/embed/E8EWJwCbcg0",
        description: "The band recorded the studio version of Hillside Sunset in March of 2023, " +
            "incorporating revisions brought to the table through GNARhouse and collaboration between Max and Thomas."
    },
    somethin: {
        name: "Somethin Sometimes",
        symbol: somethin,
        altText: "Somethin Sometimes Song Symbol",
        youtubeUrl: "https://www.youtube.com/embed/OQuKGgxlRYk",
        description: "Inspired by Jack Johnson, in search of hope, Somethin Sometimes was written by " +
            "Max during the summer of 2019 and recorded over the following months. This song made it on to Minnesota Public Radio at " +
            "the beginning of the pandemic and was an early favorite of the Spuds."
    }
};

const SHOWS = {
    all: [
        {
            title: "Folk Night",
            date: "2025-05-21",
            location: "Spud Garden",
            venue: "Minneapolis, MN",
            image: folknight,
            link: "http://www.madeleineroger.com",
            alt: "You won't want to miss this night of music and fun at the Spud Garden"
        },
        {
            title: "Music on the Mississippi",
            date: "2025-08-13",
            location: "Harriet Island",
            venue: "St. Paul, MN",
            image: albumorb,
            link: "https://www.visitsaintpaul.com",
            alt: "Catch you along the banks of the Mighty Mississippi"
        },
        {
            title: "Art-A-Whirl",
            date: "2025-05-16",
            location: "Elias Metalworks",
            venue: "Minneapolis, MN",
            image: artAWhirlElias,
            link: "https://lisaeliasmetalstudio.com/home",
            alt: "The Spuds are excited to take the stage for Art-A-Whirl @ Elias Metal Studio"
        },
        {
            title: "Off The Dock",
            date: "2025-07-08",
            location: "Indeed Brewing",
            venue: "Minneapolis, MN",
            image: indeed,
            link: "https://indeedbrewing.com/events/list/?tribe_eventcategory[0]=11",
            alt: "Again taking the stage at one of their favorite haunts, Funk N Spuds will be playing at Indeed Brewing for Off The Dock"
        },
        {
            title: "Spring 2025 Mini Tour",
            isMiniTour: true,
            dateRange: {
                start: "2025-05-28",
                end: "2025-05-31"
            },
            headerImage: tour25,
            shows: [
                {
                    title: "Music in the Parks",
                    date: "2025-05-28",
                    location: "Lake Harriet Bandshell",
                    venue: "Minneapolis, MN",
                    image: harriet,
                    link: "https://www.minneapolisparks.org/activities-events/music-movies/",
                    alt: "The Spuds are beyond excited to take the Lake Harriet Bandshell stage"
                },
                {
                    title: "Appleton Funk",
                    date: "2025-05-29",
                    location: "Appleton Beer Factory",
                    venue: "Appleton, WI",
                    image: appleton,
                    link: "https://app.showslinger.com/standalone_external_events/27787?from=/promo_widget/calendar_list?venue_id=46738&old_promo_widget_id=120",
                    alt: "Back home to see some family, drink some beer, and be merry!"
                },
                {
                    title: "Funk N Spuds with LOWBOY",
                    date: "2025-05-30",
                    location: "Up North Bar",
                    venue: "Madison, WI",
                    image: madison,
                    link: "https://upnorthbarmadison.com",
                    alt: "Can't wait to share the stage with these groovy doods!"
                },
                {
                    title: "Desperate Electric",
                    date: "2025-05-31",
                    location: "NoName Bar",
                    venue: "Winona, MN",
                    image: winona,
                    link: "https://www.facebook.com/nonamebarwinona/",
                    alt: "A great finale to our first mini tour"
                }
            ]
        },
        {
            title: "Dream Of The Wild Residency",
            date: "2025-04-13",
            location: "Cabooze",
            venue: "Minneapolis, MN",
            image: caboozeWild,
            link: "https://cabooze.com/#/events",
            alt: "The Spuds return to the Cabooze with old friends and fresh tunes"
        },
        {
            title: "Matcha Spud Cabinet",
            date: "2025-03-27",
            location: "White Squirrel Bar",
            venue: "St. Paul, MN",
            image: matcha,
            link: "https://whitesquirrelbar.com",
            alt: "The Spuds return to White Squirrel with new friends and fresh tunes"
        },
        {
            title: "Funk in the Ox",
            date: "2025-02-18",
            location: "Indeed Brewing",
            venue: "Minneapolis, MN",
            image: fnsindeed,
            link: "https://fb.me/e/9JB7mH6SS",
            alt: "Funk in the Ox Taproom"
        },
        {
            title: "Ice Block Winter Music Series",
            date: "2025-02-08",
            location: "Day Block Brewing",
            venue: "Minneapolis, MN",
            image: dayblockfeb8,
            link: "https://www.dayblockbrewing.com/live-events/ice-block-winter-concert-series-with-funk-n-spuds-the-confused-and-sunshine-the-night-walkers/",
            alt: "The Spuds return to Day Block Brewing to take the stage with Sunshine and the Night Walkers and the Confused"
        },
        {
            title: "Noname Bar with Maria and the Coins",
            date: "2024-12-14",
            location: "Noname Bar",
            venue: "Winona, MN",
            image: nonamecoins,
            link: "https://www.facebook.com/nonamebarwinona/",
            alt: "The Spuds return to NoName Bar in Winona with Maria and the Coins"
        },
        {
            title: "Pre-All Pints Hootenanny",
            date: "2024-07-26",
            location: "Bent Paddle",
            venue: "Duluth, MN",
            image: bentPaddle,
            link: "https://youtu.be/LWSKAxJGNH8?si=OrW1QbHW36miJlBf",
            alt: "Funk N Spuds will be performing at Bent Paddle for their pre-All Pints Hootenanny"
        },
        {
            title: "Justin's Family Reunion",
            date: "2024-07-19",
            location: "Fort Halverson",
            venue: "Austin, MN",
            image: justinFest,
            link: "https://youtu.be/LWSKAxJGNH8?si=OrW1QbHW36miJlBf",
            alt: "The spuds are heading to Austin, MN to celebrate family and friends with the Halversons"
        },
        {
            title: "Album Release Show",
            date: "2024-07-12",
            location: "Day Block Brewing",
            venue: "Minneapolis, MN",
            image: albumReleaseShow,
            link: "https://www.dayblockbrewing.com/live-events/funk-n-spuds-album-release-show/",
            alt: "Finally a new Funk N Spuds album"
        },
        {
            title: "Meierfest",
            date: "2024-06-01",
            location: "Fort Meier",
            venue: "Neenah, WI",
            image: fmFest,
            link: "https://youtu.be/_3mhGQWLZms?si=poel_2XAPMsxZ02a",
            alt: "The spuds are heading back home to perform for family and friends at Fort Meier"
        },
        {
            title: "Tied In Knots - Single Release Show",
            date: "2024-04-26",
            location: "Day Block Brewing",
            venue: "Minneapolis, MN",
            details: "with Brother Means Ally and Curly Jefferson",
            image: singleRelease,
            link: "https://www.dayblockbrewing.com/live-events/funk-n-spuds/",
            alt: "Tied In Knots single release at Day Block with soop light show and Brother Means Ally and Curly Jefferson"
        },
        {
            title: "UW Stout",
            date: "2024-02-29",
            location: "Memorial Student Center",
            venue: "Menomonie, WI",
            image: uwstout,
            link: "https://connect.uwstout.edu/BDP/rsvp_boot?id=2259571",
            alt: "Funk N Spuds will be performing at UW Stout's Memorial Student Center"
        },
        {
            title: "Big Turn Music Festival",
            date: "2024-02-17",
            location: "St. James Hotel, Port Side Room",
            venue: "Red Wing, MN",
            image: bigTurn,
            link: "https://www.bigturnmusicfest.com",
            alt: "A weekend that's full of sights and sounds in the middle of Febrrruary. This is a place of music and community and we just hope you packed a pair of stomping boots for your trip. This is the Big Turn Music Fest."
        },
        {
            title: "Hunny Bear Album Release Show",
            date: "2024-01-25",
            location: "Can Can Wonderland",
            venue: "St. Paul, MN",
            image: hunnyAlbumRelease,
            link: "https://www.cancanwonderland.com/entertainment",
            alt: "Hunny Bear Album Release Show with Funk N Spuds and Confucisaurus at Can Can Wonderland Jan 25, 2024"
        },
        {
            title: "Creatures from the Funk Lagoon",
            date: "2023-10-28",
            location: "No Name Bar",
            venue: "Winona, MN",
            image: funkCreatures,
            link: "https://bandsintown.com/e/104727519",
            alt: "Lavendar Project, Funk N Spuds, and Curly Jefferson and the Jam Turkeys at No Name Bar Oct 28 2023"
        },
        {
            title: "Eagles #34",
            date: "2023-10-07",
            location: "Eagles #34",
            venue: "Minneapolis, MN",
            image: pandEmfiSpuds,
            link: "https://www.eagles34.org/events-entertainment.html",
            alt: "Efmi, Pandelion, and Funk N Spuds at Eagles #34 Oct 7 2023"
        },
        {
            title: "Highland Park Picnic Shelter",
            date: "2023-10-07",
            location: "Highland Park Picnic Shelter",
            venue: "St. Paul, MN",
            image: HighlandHarmonies,
            link: "https://www.bandsintown.com/e/104727822",
            alt: "Funk N Spuds at Highland Park for Highland"
        },
        {
            title: "Can Can Wonderland",
            date: "2023-09-28",
            location: "Can Can Wonderland",
            venue: "St. Paul, MN",
            image: HunnyCan,
            link: "https://www.cancanwonderland.com/events/the-hunny-pot",
            alt: "Funk N Spuds with Hunny Bear and Emery Snow at Can Can Wonderland"
        },
        {
            title: "Mid West Music Fest Main Stage",
            date: "2023-05-13",
            location: "Mid West Music Fest Main Stage",
            venue: "Winona, MN",
            image: mwmf23,
            link: "https://www.midwestmusicfest.org/",
            alt: "Mid West Music Fest 2023 Lineup"
        },
        {
            title: "Underground Music Cafe",
            date: "2023-02-11",
            location: "Underground Music Cafe",
            venue: "Minneapolis, MN",
            image: Underground,
            link: "https://www.undergroundmusicvenue.com",
            alt: "Underground Music Cafe Minneapolis, MN - Clams, Funk N Spuds, and Velvetwolf"
        },
        {
            title: "The White Squirrel Bar",
            date: "2023-02-04",
            location: "The White Squirrel Bar",
            venue: "St. Paul, MN",
            image: whiteS,
            link: "https://whitesquirrelbar.com",
            alt: "White Squirrel Bar St. Paul, MN - Funk N Spuds and Confucisaurus"
        },
        {
            title: "Appleton Beer Factory",
            date: "2023-01-20",
            location: "Appleton Beer Factory",
            venue: "Appleton, WI",
            image: lowDown,
            link: "https://app.showslinger.com/ticket_payment/9259/checkout_ticket?from=%2Fpromo_widget%2Fcalendar_list%3Fvenue_id%3D46738",
            alt: "Appleton Beer Factory - Lowdown Brass Band wsg Funk N Spuds"
        },
        {
            title: "No Name Bar",
            date: "2022-12-17",
            location: "No Name Bar",
            venue: "Winona, MN",
            image: noName,
            link: "https://visitwinona.com/directory_entry/eds-no-name-bar/",
            alt: "No Name Bar Winona - Funk N Spuds and Sugar Lads"
        },
        {
            title: "Shoebox Episode XII",
            date: "2022-10-14",
            location: "Shoebox",
            venue: "St. Paul, MN",
            image: Shoebox,
            link: "https://www.airshipcaravan.com/",
            alt: "Shoebos Episode XII - Pandelion, Juniper Fly, Funk N Spuds, Airship Caravan"
        },
        {
            title: "Galactic Get Down 6",
            date: "2022-08-26",
            location: "Galactic Get Down",
            venue: "New Richmond, WI",
            image: GGD22,
            link: "https://www.thegalacticgetdown.com/",
            alt: "Galactic Get Down Music Festival"
        },
        {
            title: "Paperfest",
            date: "2022-07-15",
            location: "Paperfest",
            venue: "Kimberly, WI",
            image: Paper22,
            link: "https://www.paperfest.com/",
            alt: "Funk N Spuds at Paperfest 2022"
        },
        {
            title: "Art-A-Whirl @ 612Brew",
            date: "2022-05-20",
            location: "612Brew",
            venue: "Minneapolis, MN",
            image: Art612,
            link: "https://nemaa.org/art-a-whirl/",
            alt: "Funk N Spuds at 612Brew for Art-A-Whirl 2022"
        },
        {
            title: "Mid West Music Fest @ Eagles Club",
            date: "2022-04-29",
            location: "Eagles Club",
            venue: "Winona, MN",
            image: MWMF22,
            link: "https://www.midwestmusicfest.org/",
            alt: "Funk N Spuds at Mid West Music Fest 2022"
        },
        {
            title: "Spud County",
            date: "2022-03-26",
            location: "Livestream",
            venue: "Youtube",
            image: SpudCounty,
            link: "https://youtu.be/MOTcyp4Lj64?t=5937",
            alt: "Spud County Livestream - Cook County and Funk N Spuds"
        }
    ]
};

function Shows() {
    const [songStates, setSongStates] = useState({
        sunset: false,
        HSunset: false,
        somethin: false
    });

    const getCategorizedShows = () => {
        const today = new Date();
        const categorized = {
            upcoming: [],
            past: [],
            miniTours: []
        };

        SHOWS.all.forEach(show => {
            if (show.isMiniTour) {
                const tourStart = new Date(show.dateRange.start);
                if (tourStart > today) {
                    categorized.miniTours.push(show);
                }
            } else {
                const showDate = new Date(show.date);
                if (showDate > today) {
                    categorized.upcoming.push(show);
                } else {
                    categorized.past.push(show);
                }
            }
        });

        // Sort upcoming and past shows by date
        categorized.upcoming.sort((a, b) => new Date(a.date) - new Date(b.date));
        categorized.past.sort((a, b) => new Date(b.date) - new Date(a.date));
        // Sort mini tours by start date
        categorized.miniTours.sort((a, b) => new Date(a.dateRange.start) - new Date(b.dateRange.start));

        return categorized;
    };

    const toggleSong = (songKey) => {
        setSongStates(prev => ({
            ...prev,
            [songKey]: !prev[songKey]
        }));
    };

    const ShowCard = ({ show, isMiniTour }) => (
        <div className={`show-card ${isMiniTour ? 'mini-tour-card' : ''}`}>
            <h4 className="spudsite mb-2">{show.title}</h4>
            <h5 className="spudsite mb-3">
                {new Date(show.date + 'T00:00:00').toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                })}<br/>
                {show.location}<br/>
                {show.venue}
                {show.details && <><br/>{show.details}</>}
            </h5>
            <a href={show.link}>
                <img 
                    className={`show-image ${isMiniTour ? 'mini-tour-image' : ''}`}
                    src={show.image} 
                    alt={show.alt} 
                />
            </a>
        </div>
    );

    const categorizedShows = getCategorizedShows();

    return (
        <div className="container">
            <div className="text-center rocksalt">
                <div>
                    <div className="text-start m-2">
                        <SongSymbolWrapper
                            song={SONGS.sunset}
                            isOpen={songStates.sunset}
                            onToggle={() => toggleSong('sunset')}
                        />
                    </div>

                    <h1 className="spudsite m-2">Upcoming Spuds!</h1>

                    <div className="calendar-container mt-5">
                        <div className="calendar-wrapper">
                            <iframe 
                                src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FChicago&showPrint=0&showTitle=0&showTz=0&src=ZnVua25zcHVkc0BnbWFpbC5jb20&color=%23039BE5" 
                                style={{ border: 'solid 1px #777' }}
                                width="100%" 
                                height="600" 
                                frameBorder="0" 
                                scrolling="no"
                                title="Funk N Spuds Calendar"
                            />
                        </div>
                    </div>

                    <div className="text-end mb-2">
                        <SongSymbolWrapper
                            song={SONGS.HSunset}
                            isOpen={songStates.HSunset}
                            onToggle={() => toggleSong('HSunset')}
                            shouldRotate={true}
                        />
                    </div>

                    {categorizedShows.miniTours.map((tour, index) => (
                        <div key={index}>
                            <h2 className="spudsite mt-5 mb-4">Spring 2025 Mini Tour!</h2>
                            <div className="text-center mb-4">
                                <img 
                                    src={tour.headerImage} 
                                    alt="Mini Tour Header" 
                                    className="mini-tour-header-image"
                                    style={{ maxWidth: '60%', height: 'auto' }}
                                />
                            </div>
                            <div className="text-center mb-4">
                                <h4 className="spudsite">
                                    {new Date(tour.dateRange.start + 'T00:00:00').toLocaleDateString('en-US', { 
                                        month: 'long', 
                                        day: 'numeric' 
                                    })} - {new Date(tour.dateRange.end + 'T00:00:00').toLocaleDateString('en-US', { 
                                        month: 'long', 
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </h4>
                            </div>
                            <div className="mini-tour-shows">
                                {tour.shows.map((show, index) => (
                                    <ShowCard key={index} show={show} isMiniTour={true} />
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="upcoming-shows">
                        {categorizedShows.upcoming.map((show, index) => (
                            <ShowCard key={index} show={show} />
                        ))}
                    </div>

                    <h1 className="spudsite mt-5 mb-4">Past Shows</h1>

                    <div className="past-shows-grid">
                        {categorizedShows.past.map((show, index) => (
                            <ShowCard key={index} show={show} />
                        ))}
                    </div>

                    <div className="text-end m-2">
                        <SongSymbolWrapper
                            song={SONGS.somethin}
                            isOpen={songStates.somethin}
                            onToggle={() => toggleSong('somethin')}
                        />
                    </div>

                    <footer className="container text-center">
                        <FooterLinks />
                        <div className="text-center">
                            <a href="https://lens.snapchat.com/9ab8073ff16547e5bd413f811fb3e513?sender_web_id=4a206bd0-61c0-4d01-9a1c-0db2f2654c50&device_type=desktop&is_copy_url=true">
                                <img 
                                    className="jumping-spud"
                                    src={jumpingSpud} 
                                    alt="Jumping Spud" 
                                />
                            </a>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
}

export default Shows;