import React, { useState } from "react";
import SongSymbolWrapper from "../ui/SongSymbol";
import FooterLinks from "../ui/FooterLinks";
import jumpingSpud from "../../img/FunkNJump.gif";
import hillsideSunset from "../../img/HillsideSunsetSongSymbol.png";
import somethinSometimes from "../../img/SomethinSometimesSongSymbol.png";
import lowDownFNS from "../../img/LowDownFNS-Appleton.jpg";
import noNameDec17 from "../../img/NoNameDec17SpudsAndLads.jpg";
import fnSatWhiteS from "../../img/FnSatWhiteS.jpg";
import mwmf2023 from "../../img/MWMF2023.png";
import artAWhirl from "../../img/ArtAWhirl612Spudsite.jpg";
import ggd2022 from "../../img/GGD2022Spudsite.jpg";
import mwmfSpudsite from "../../img/MWMFSpudsite.jpg";
import paperfestPromo from "../../img/PaperfestPromoSpudsite.jpg";
import shoeboxEpisodeXii from "../../img/ShoeboxEpisodeXiiSpudsite.jpg";
import spudCounty from "../../img/SpudCountySpudsite.jpg";
import undergroundClamsVelvetFns from "../../img/UndergroundClamsVelvetFns.jpg";
import highlandHarmonies from "../../img/HighlandHarmonies.PNG";
import honeyCan from "../../img/HoneyCan.jpg";
import pandEmfiSpuds from "../../img/pandEmfiSpuds.JPG";
import noNameOct28 from "../../img/NoNameOct28Final.jpg";
import hunnyAlbumRelease from "../../img/HunnyAlbumRelease.jpg";
import bigTurn from "../../img/bigTurn.JPG";
import uwStout from "../../img/UWStout.png";
import messinV3 from "../../img/messin.v3.jpg";
import lithouseArtBackground from "../../img/LithouseArtBackground.jpg";
import dayBlockShowPoster from "../../img/DayBlockShowPosterv6.jpg";
import fmfest from "../../img/FMfest.jpeg";
import bentPaddle from "../../img/BentPaddle.png";
import hillsideSunsetOrb from "../../img/Orbz/HillsideSunsetOrb.png";
import noName1214poster from "../../img/NoName1214posterv3.jpg";
import dayblockFeb8 from "../../img/dayblockfeb8.JPG";
import funkInTheOx from "../../img/Funk_In_The_Ox.jpg";
import matcha from "../../img/Matcha.png";
//import lenjaminOrb from "../../img/Orbz/LenjaminOrb.png";
import albumOrb from "../../img/Orbz/AlbumOrb.png";
import spgOrb from "../../img/Orbz/SPGOrb.png";
//import ewtrtwOrb from "../../img/Orbz/EWTRTWOrb.png";
import artAWhirlElias from "../../img/ArtAWhirlElias.JPG";
import spudsTour25 from "../../img/spudsTour25.png";
import indeedLogo from "../../img/indeedLogo.png";
import spudsTourAppleton from "../../img/SpudsTourAppleton.jpg";
import spudsTourHarriet from "../../img/SpudsTourHarriet.jpg";
import spudsTourUpNorth from "../../img/SpudsTourUpNorth.jpg";
import spudsTourNoname from "../../img/SpudsTourNoname.jpg";
import folkNightSpudGarden from "../../img/FolkNightSpudGarden.jpg";
import caboozeWild from "../../img/caboozeWild.JPG";
import whiskeyWed212 from "../../img/old_show_posters/WhiskeyWed212.jpg";
import bernItDown from "../../img/old_show_posters/BernItDown.JPG";
import spudlympics2020 from "../../img/old_show_posters/Spudlympics2020.JPG";
import gdeColdSweat from "../../img/old_show_posters/GDEColdSweat.jpg";
import varbsfnsPoster from "../../img/old_show_posters/VARBSFNSPoster.jpg";
import blakesHouseParty from "../../img/old_show_posters/BlakesHouseParty.JPG";
import ggdv from "../../img/old_show_posters/GGDV.JPG";
import funkNFalltasticVBS from "../../img/old_show_posters/FunkNFalltasticVBS.jpg";
import lbSotsPoster from "../../img/old_show_posters/LBSotSPoster.JPG";
import grenada815 from "../../img/old_show_posters/Grenada815.JPG";
import aaw2021 from "../../img/old_show_posters/612AAW2021.JPG";
import abf1016Poster from "../../img/old_show_posters/ABF_1016_Poster.jpg";
import comoPorchfest from "../../img/old_show_posters/ComoPorchfest.jpg";
import racChicken from "../../img/old_show_posters/RACchicken.JPG";
import mortsAnnex from "../../img/old_show_posters/MortsAnnex.jpg";
import funkItUp from "../../img/old_show_posters/FunkItUp.jpg";
import cabooze83 from "../../img/old_show_posters/Cabooze83.JPG";
import ivhfmg from "../../img/old_show_posters/IVHFMG.JPG";
import highlandHarmonies2020 from "../../img/old_show_posters/HighlandHarmonies2020.PNG";
import grenadaHunnySpuds from "../../img/old_show_posters/GrenadaHunnySpuds.jpg";
import bigVibesTuesdays from "../../img/old_show_posters/BigVibesTuesdays.JPG";
import HighlandHarmonies25 from "../../img/HighlandHarmonies25.JPG";
import hunnyBearWhiteSquirrel from "../../img/HunnyBearWhiteSquirrel25.JPG";
import halloweenSpuds from "../../img/IMG_5793.jpeg"
import fsmnfallfest  from "../../img/IMG_5587.JPG"

const SONGS = {
    sunset: {
        name: "Hillside Sunset",
        symbol: hillsideSunset,
        altText: "Hillside Sunset Song Symbol",
        youtubeUrl: "https://www.youtube.com/embed/_zHxvUMYBuU",
        description: "Max wrote this song while living in his friend Mary's attic in 2019. " +
            "During a brief stay in Neenah during the summer of that year, he teamed up with Martin and Nicole to choreograph and record a live-loop " +
            "one take video."
    },
    HSunset: {
        name: "Hillside Sunset",
        symbol: hillsideSunsetOrb,
        altText: "Hillside Sunset Orb",
        youtubeUrl: "https://www.youtube.com/embed/E8EWJwCbcg0",
        description: "The band recorded the studio version of Hillside Sunset in March of 2023, " +
            "incorporating revisions brought to the table through GNARhouse and collaboration between Max and Thomas."
    },
    somethin: {
        name: "Somethin Sometimes",
        symbol: somethinSometimes,
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
            title: "FSMN Fall Fest",
            date: "2025-10-04",
            venue: "Friends School of Minnesota",
            location: "St. Paul, MN",
            image: fsmnfallfest,
            link: "https://fsmn.org",
            alt: "The Spuds are overjoyed to be back at FSMN for their Fall Fest"
        },
        {
            title: "Halloween",
            date: "2025-10-31",
            venue: "Spud Garden",
            location: "Minneapolis, MN",
            image: halloweenSpuds,
            link: "https://whitesquirrelbar.com",
            alt: "Join us Halloween Night for some groovy tunes and a pumpkin smashing party"
        },
        {
            title: "Hunny Bear feat. Max's Birthday",
            date: "2025-11-05",
            venue: "White Squirrel Bar",
            location: "St. Paul, MN",
            image: hunnyBearWhiteSquirrel,
            link: "https://whitesquirrelbar.com",
            alt: "The Spuds return to White Squirrel on Max's Birthday!"
        },
        {
            title: "Highland Park Harmonies",
            date: "2025-10-04",
            venue: "Highland Park Picnic Shelter", 
            location: "St. Paul, MN",
            image: HighlandHarmonies25,
            link: "https://www.facebook.com/HighlandHarmonies/",
            alt: "Highland Park Harmonies"
        },
        {
            title: "Logan Park Community Meeting",
            date: "2025-07-16",
            venue: "Logan Park Gazebo", 
            location: "Minneapolis MN, MN",
            image: spgOrb,
            link: "https://www.minneapolisparks.org/parks-destinations/parks-lakes/logan_park/",
            alt: "Live at Logan Park"
        },
        {
            title: "Highland Park Harmonies",
            date: "2020-10-10",
            venue: "Highland Park Picnic Shelter", 
            location: "St. Paul, MN",
            image: highlandHarmonies2020,
            link: "https://www.facebook.com/HighlandHarmonies/",
            alt: "Highland Park Harmonies"
        },
        {
            title: "Hunny Bear with Funk N Spuds",
            date: "2021-06-27",
            venue: "Grenada Theater", 
            location: "Minneapolis, MN",
            image: grenadaHunnySpuds,
            link: "https://hunnybearjazz.wixsite.com/hunny-bear",
            alt: "Hunny Bear with Funk N Spuds"
        },
        {
            title: "Big Vibes Tuesdays Presented by Socktopus",
            date: "2021-06-22",
            venue: "Cabooze", 
            location: "Minneapolis, MN",
            image: bigVibesTuesdays,
            link: "https://socktopus.bandcamp.com/",
            alt: "Big Vibes Tuesdays Presented by Socktopus"
        },
        {
            title: "The Immaculate Virtual Halloween Full Moon Gala",
            date: "2020-10-30",
            venue: "Livestream", 
            location: "Parallax",
            image: ivhfmg,
            link: "https://youtu.be/pGA-Teg6BpY?si=TCeQfeoTH8s1_rHa",
            alt: "The Immaculate Virtual Halloween Full Moon Gala with Funk N Spuds and The Immaculate Beings"
        },
        {
            title: "Elour, Funk N Spuds, and The Moonlight Community",
            date: "2021-08-05",
            venue: "Cabooze", 
            location: "Minneapolis, MN",
            image: cabooze83,
            link: "https://elourmusic.com/home",
            alt: "Elour, Funk N Spuds, and The Moonlight Community at Cabooze"
        },
        {
            title: "Folk Night",
            date: "2025-05-21",
            venue: "Spud Garden",
            location: "Minneapolis, MN",
            image: folkNightSpudGarden,
            link: "http://www.madeleineroger.com",
            alt: "You won't want to miss this night of music and fun at the Spud Garden"
        },
        {
            title: "Music on the Mississippi",
            date: "2025-08-13",
            venue: "Harriet Island",
            location: "St. Paul, MN",
            image: albumOrb,
            link: "https://www.visitsaintpaul.com",
            alt: "Catch you along the banks of the Mighty Mississippi"
        },
        {
            title: "Art-A-Whirl",
            date: "2025-05-16",
            venue: "Elias Metalworks",
            location: "Minneapolis, MN",
            image: artAWhirlElias,
            link: "https://lisaeliasmetalstudio.com/home",
            alt: "The Spuds are excited to take the stage for Art-A-Whirl @ Elias Metal Studio"
        },
        {
            title: "Off The Dock",
            date: "2025-07-08",
            venue: "Indeed Brewing",
            location: "Minneapolis, MN",
            image: indeedLogo,
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
            headerImage: spudsTour25,
            shows: [
                {
                    title: "Music in the Parks",
                    date: "2025-05-28",
                    venue: "Lake Harriet Bandshell",
                    location: "Minneapolis, MN",
                    image: spudsTourHarriet,
                    link: "https://www.minneapolisparks.org/activities-events/music-movies/",
                    alt: "The Spuds are beyond excited to take the Lake Harriet Bandshell stage"
                },
                {
                    title: "Appleton Funk",
                    date: "2025-05-29",
                    venue: "Appleton Beer Factory",
                    location: "Appleton, WI",
                    image: spudsTourAppleton,
                    link: "https://app.showslinger.com/standalone_external_events/27787?from=/promo_widget/calendar_list?venue_id=46738&old_promo_widget_id=120",
                    alt: "Back home to see some family, drink some beer, and be merry!"
                },
                {
                    title: "Funk N Spuds with LOWBOY",
                    date: "2025-05-30",
                    venue: "Up North Bar",
                    location: "Madison, WI",
                    image: spudsTourUpNorth,
                    link: "https://upnorthbarmadison.com",
                    alt: "Can't wait to share the stage with these groovy doods!"
                },
                {
                    title: "Desperate Electric",
                    date: "2025-05-31",
                    venue: "NoName Bar",
                    location: "Winona, MN",
                    image: spudsTourNoname,
                    link: "https://www.facebook.com/nonamebarwinona/",
                    alt: "A great finale to our first mini tour"
                }
            ]
        },
        {
            title: "Dream Of The Wild Residency",
            date: "2025-04-13",
            venue: "Cabooze",
            location: "Minneapolis, MN",
            image: caboozeWild,
            link: "https://cabooze.com/#/events",
            alt: "The Spuds return to the Cabooze with old friends and fresh tunes"
        },
        {
            title: "Matcha Spud Cabinet",
            date: "2025-03-27",
            venue: "White Squirrel Bar",
            location: "St. Paul, MN",
            image: matcha,
            link: "https://whitesquirrelbar.com",
            alt: "The Spuds return to White Squirrel with new friends and fresh tunes"
        },
        {
            title: "Funk in the Ox",
            date: "2025-02-18",
            venue: "Indeed Brewing",
            location: "Minneapolis, MN",
            image: funkInTheOx,
            link: "https://fb.me/e/9JB7mH6SS",
            alt: "Funk in the Ox Taproom"
        },
        {
            title: "Ice Block Winter Music Series",
            date: "2025-02-08",
            venue: "Day Block Brewing",
            location: "Minneapolis, MN",
            image: dayblockFeb8,
            link: "https://www.dayblockbrewing.com/live-events/ice-block-winter-concert-series-with-funk-n-spuds-the-confused-and-sunshine-the-night-walkers/",
            alt: "The Spuds return to Day Block Brewing to take the stage with Sunshine and the Night Walkers and the Confused"
        },
        {
            title: "Noname Bar with Maria and the Coins",
            date: "2024-12-14",
            venue: "Noname Bar",
            location: "Winona, MN",
            image: noName1214poster,
            link: "https://www.facebook.com/nonamebarwinona/",
            alt: "The Spuds return to NoName Bar in Winona with Maria and the Coins"
        },
        {
            title: "Pre-All Pints Hootenanny",
            date: "2024-07-26",
            venue: "Bent Paddle",
            location: "Duluth, MN",
            image: bentPaddle,
            link: "https://youtu.be/LWSKAxJGNH8?si=OrW1QbHW36miJlBf",
            alt: "Funk N Spuds will be performing at Bent Paddle for their pre-All Pints Hootenanny"
        },
        {
            title: "Justin's Family Reunion",
            date: "2024-07-19",
            venue: "Fort Halverson",
            location: "Austin, MN",
            image: lithouseArtBackground,
            link: "https://youtu.be/LWSKAxJGNH8?si=OrW1QbHW36miJlBf",
            alt: "The spuds are heading to Austin, MN to celebrate family and friends with the Halversons"
        },
        {
            title: "Album Release Show",
            date: "2024-07-12",
            venue: "Day Block Brewing",
            location: "Minneapolis, MN",
            image: dayBlockShowPoster,
            link: "https://www.dayblockbrewing.com/live-events/funk-n-spuds-album-release-show/",
            alt: "Finally a new Funk N Spuds album"
        },
        {
            title: "Meierfest",
            date: "2024-06-01",
            venue: "Fort Meier",
            location: "Neenah, WI",
            image: fmfest,
            link: "https://youtu.be/_3mhGQWLZms?si=poel_2XAPMsxZ02a",
            alt: "The spuds are heading back home to perform for family and friends at Fort Meier"
        },
        {
            title: "Tied In Knots - Single Release Show",
            date: "2024-04-26",
            venue: "Day Block Brewing",
            location: "Minneapolis, MN",
            details: "with Brother Means Ally and Curly Jefferson",
            image: messinV3,
            link: "https://www.dayblockbrewing.com/live-events/funk-n-spuds/",
            alt: "Tied In Knots single release at Day Block with soop light show and Brother Means Ally and Curly Jefferson"
        },
        {
            title: "UW Stout",
            date: "2024-02-29",
            venue: "Memorial Student Center",
            location: "Menomonie, WI",
            image: uwStout,
            link: "https://connect.uwstout.edu/BDP/rsvp_boot?id=2259571",
            alt: "Funk N Spuds will be performing at UW Stout's Memorial Student Center"
        },
        {
            title: "Big Turn Music Festival",
            date: "2024-02-17",
            venue: "St. James Hotel, Port Side Room",
            location: "Red Wing, MN",
            image: bigTurn,
            link: "https://www.bigturnmusicfest.com",
            alt: "A weekend that's full of sights and sounds in the middle of Febrrruary. This is a place of music and community and we just hope you packed a pair of stomping boots for your trip. This is the Big Turn Music Fest."
        },
        {
            title: "Hunny Bear Album Release Show",
            date: "2024-01-25",
            venue: "Can Can Wonderland",
            location: "St. Paul, MN",
            image: hunnyAlbumRelease,
            link: "https://www.cancanwonderland.com/entertainment",
            alt: "Hunny Bear Album Release Show with Funk N Spuds and Confucisaurus at Can Can Wonderland Jan 25, 2024"
        },
        {
            title: "Creatures from the Funk Lagoon",
            date: "2023-10-28",
            venue: "No Name Bar",
            location: "Winona, MN",
            image: noNameOct28,
            link: "https://bandsintown.com/e/104727519",
            alt: "Lavendar Project, Funk N Spuds, and Curly Jefferson and the Jam Turkeys at No Name Bar Oct 28 2023"
        },
        {
            title: "Eagles #34",
            date: "2023-10-07",
            venue: "Eagles #34",
            location: "Minneapolis, MN",
            image: pandEmfiSpuds,
            link: "https://www.eagles34.org/events-entertainment.html",
            alt: "Efmi, Pandelion, and Funk N Spuds at Eagles #34 Oct 7 2023"
        },
        {
            title: "Highland Park Picnic Shelter",
            date: "2023-10-07",
            venue: "Highland Park Picnic Shelter",
            location: "St. Paul, MN",
            image: highlandHarmonies,
            link: "https://www.bandsintown.com/e/104727822",
            alt: "Funk N Spuds at Highland Park for Highland"
        },
        {
            title: "Can Can Wonderland",
            date: "2023-09-28",
            venue: "Can Can Wonderland",
            location: "St. Paul, MN",
            image: honeyCan,
            link: "https://www.cancanwonderland.com/events/the-hunny-pot",
            alt: "Funk N Spuds with Hunny Bear and Emery Snow at Can Can Wonderland"
        },
        {
            title: "Mid West Music Fest Main Stage",
            date: "2023-05-13",
            venue: "Mid West Music Fest Main Stage",
            location: "Winona, MN",
            image: mwmf2023,
            link: "https://youtu.be/3AcNSV5UqUY?si=yVN0icDgwgLbgCEQ",
            alt: "Mid West Music Fest 2023 Lineup"
        },
        {
            title: "Underground Music Cafe",
            date: "2023-02-11",
            venue: "Underground Music Cafe",
            location: "Minneapolis, MN",
            image: undergroundClamsVelvetFns,
            link: "https://www.undergroundmusicvenue.com",
            alt: "Underground Music Cafe Minneapolis, MN - Clams, Funk N Spuds, and Velvetwolf"
        },
        {
            title: "The White Squirrel Bar",
            date: "2023-02-04",
            venue: "The White Squirrel Bar",
            location: "St. Paul, MN",
            image: fnSatWhiteS,
            link: "https://whitesquirrelbar.com",
            alt: "White Squirrel Bar St. Paul, MN - Funk N Spuds and Confucisaurus"
        },
        {
            title: "Appleton Beer Factory",
            date: "2023-01-20",
            venue: "Appleton Beer Factory",
            location: "Appleton, WI",
            image: lowDownFNS,
            link: "https://app.showslinger.com/ticket_payment/9259/checkout_ticket?from=%2Fpromo_widget%2Fcalendar_list%3Fvenue_id%3D46738",
            alt: "Appleton Beer Factory - Lowdown Brass Band wsg Funk N Spuds"
        },
        {
            title: "No Name Bar",
            date: "2022-12-17",
            venue: "No Name Bar",
            location: "Winona, MN",
            image: noNameDec17,
            link: "https://visitwinona.com/directory_entry/eds-no-name-bar/",
            alt: "No Name Bar Winona - Funk N Spuds and Sugar Lads"
        },
        {
            title: "Shoebox Episode XII",
            date: "2022-10-14",
            venue: "Shoebox",
            location: "St. Paul, MN",
            image: shoeboxEpisodeXii,
            link: "https://www.airshipcaravan.com/",
            alt: "Shoebos Episode XII - Pandelion, Juniper Fly, Funk N Spuds, Airship Caravan"
        },
        {
            title: "Galactic Get Down 6",
            date: "2022-08-26",
            venue: "Galactic Get Down",
            location: "New Richmond, WI",
            image: ggd2022,
            link: "https://www.thegalacticgetdown.com/",
            alt: "Galactic Get Down Music Festival"
        },
        {
            title: "Paperfest",
            date: "2022-07-15",
            venue: "Paperfest",
            location: "Kimberly, WI",
            image: paperfestPromo,
            link: "https://youtu.be/jhiQB0x3ft4?si=Xb-E_RhCWfONoRkR",
            alt: "Funk N Spuds at Paperfest 2022"
        },
        {
            title: "Art-A-Whirl @ 612Brew",
            date: "2022-05-20",
            venue: "612Brew",
            location: "Minneapolis, MN",
            image: artAWhirl,
            link: "https://youtu.be/2OfxzjVljFo?si=cAeAwkXO3hoc-xRA",
            alt: "Funk N Spuds at 612Brew for Art-A-Whirl 2022"
        },
        {
            title: "Mid West Music Fest @ Eagles Club",
            date: "2022-04-29",
            venue: "Eagles Club",
            location: "Winona, MN",
            image: mwmfSpudsite,
            link: "https://youtu.be/CF8fYacBiv0?si=-4Yp7N4fTeNsI7aK",
            alt: "Funk N Spuds at Mid West Music Fest 2022"
        },
        {
            title: "Spud County",
            date: "2022-03-26",
            venue: "Livestream",
            location: "Youtube",
            image: spudCounty,
            link: "https://youtu.be/MOTcyp4Lj64?t=5937",
            alt: "Spud County Livestream - Cook County and Funk N Spuds"
        },
        {
            title: "Whiskey Wednesdays",
            date: "2020-02-12",
            venue: "Whiskey Junction",
            location: "Minneapolis, MN",
            image: whiskeyWed212,
            link: "",
            alt: "Whiskey Wednesdays - Funk N Spuds"
        },
        {
            title: "Bern It Down - Get Out the Vote",
            date: "2020-03-02",
            venue: "Honey MPLS",
            location: "Minneapolis, MN",
            image: bernItDown,
            link: "https://berniesanders.com",
            alt: "Bern It Down - Get Out the Vote - Honey MPLS"
        },
        {
            title: "Spudlympics 2020",
            date: "2020-04-11",
            venue: "Someone's House",
            location: "Minneapolis, MN",
            image: spudlympics2020,
            link: "",
            alt: "Spudlympics 2020 - Psychedelic Egg Hunt"
        },
        {
            title: "GDE Presents: Cold Sweat with Vibe Corp and Funk N Spuds",
            date: "2020-03-27",
            venue: "Hook & Ladder",
            location: "Minneapolis, MN",
            image: gdeColdSweat,
            link: "https://thehookmpls.com/",
            alt: "GDE Presents: Cold Sweat with Vibe Corp and Funk N Spuds"
        },
        {
            title: "Virtual Album Release Balcony Show",
            date: "2020-07-18",
            venue: "Como Balcony",
            location: "Minneapolis, MN",
            image: varbsfnsPoster,
            link: "https://youtu.be/mtbByaGBAKU?si=PDinXPpuk7SNBWcK",
            alt: "Virtual Album Release Balcony Show"
        },
        {
            title: "Blake's House Party",
            date: "2020-04-25",
            venue: "Livestream",
            location: "YouTube",
            image: blakesHouseParty,
            link: "https://funknspuds.bandcamp.com/album/blakes-house-party",
            alt: "Blake's House Party"
        },
        {
            title: "A Funk N Falltastic Virtual Balcony Show",
            date: "2020-10-17",
            venue: "Livestream",
            location: "YouTube",
            image: funkNFalltasticVBS,
            link: "https://www.youtube.com/live/JhUeem8WIbo?si=gxYMsvtBkHVCFVYx",
            alt: "A Funk N Falltastic Virtual Balcony Show"
        },
        {
            title: "Galactic Get Down: V(irtual)",
            date: "2020-08-01",
            venue: "Livestream",
            location: "YouTube",
            image: ggdv,
            link: "https://youtu.be/s5aRktYIIVs?si=RBvkvsp1BV35Nc3i",
            alt: "Galactic Get Down: V(irtual)"
        },
        {
            title: "Live at the Grenada Theater",
            date: "2021-08-15",
            venue: "Grenada Theater",
            location: "Minneapolis, MN",
            image: grenada815,
            link: "https://granadampls.com/",
            alt: "Live at the Grenada Theater: Hunny Bear, Funk N Spuds, Jojo Green, and The Only"
        },
        {
            title: "Last Balcony Show of the Summer",
            date: "2020-08-27",
            venue: "Livestream",
            location: "Livestream",
            image: lbSotsPoster,
            link: "https://www.youtube.com/live/UHz4yRaNieo?si=TuQ8RrN9IRU043IG",
            alt: "Last Balcony Show of the Summer"
        },
        {
            title: "Art-A-Whirl 2021",
            date: "2021-05-14",
            venue: "612Brew",
            location: "Minneapolis, MN",
            image: aaw2021,
            link: "https://nemaa.org/art-a-whirl/art-a-whirl-map/",
            alt: "Art-A-Whirl 2021"
        },
        {
            title: "Immaculate Spud Funk",
            date: "2021-10-16",
            venue: "Appleton Beer Factory", 
            location: "Appleton, WI",
            image: abf1016Poster,
            link: "https://appletonbeerfactory.com/live-shows/",
            alt: "Appleton Beer Factory Presents: Immaculate Beings and Funk N Spuds"
        },
        {
            title: "Como Porchfest",
            date: "2021-07-24",
            venue: "Como House/Livestream", 
            location: "Minneapolis, MN/Youtube",
            image: comoPorchfest,
            link: "https://www.youtube.com/live/PRyNdlSUJJY?si=snIniz92EIIDeSTw",
            alt: "Como Porchfest: Goon Tribune, Brandon Pulphus, Joe Bartel, The Personas, Funk N Spuds"
        },
        {
            title: "Livestream EP Release Show",
            date: "2021-04-02",
            venue: "Livestream", 
            location: "Youtube",
            image: racChicken,
            link: "https://www.youtube.com/live/C5eFspyaYmc?si=QMCNdk74y_RH_KuY",
            alt: "Ramsey's Adventure Cabin Release Show with Chicken Boys from Austin, TX"
        },
        {
            title: "Mortimer's Presents: Annex Panda, Funk N Spuds, and PureShifter",
            date: "2021-07-29",
            venue: "Mortimer's", 
            location: "Minneapolis, MN",
            image: mortsAnnex,
            link: "https://www.mortimersbar.com/",
            alt: "Mortimer's Presents: Annex Panda, Funk N Spuds, and PureShifter"
        },
        {
            title: "Funk It Up To Our Tempo",
            date: "2021-12-09",
            venue: "Part Wolf", 
            location: "Minneapolis, MN",
            image: funkItUp,
            link: "https://lavendermagazine.com/our-scene/clubs-music/natalie-fideler-releases-new-music-three-man-army/",
            alt: "Funk It Up To Our Tempo: Jojo Green, Funk N Spuds, and Natalie Fideler"
        },

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
                } else {
                    // Add individual shows from past mini tours to past shows
                    show.shows.forEach(show => {
                        categorized.past.push(show);
                    });
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
            <h5 className="show-details mb-3">
                {new Date(show.date + 'T00:00:00').toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                })}<br/>
                {show.venue}<br/>
                {show.location}
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