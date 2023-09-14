import "./Home.css"
import "../User/Dashboard.css"
import { useState } from "react"
import LargeImg from "./LargeImg";

export default function Home() {
    const [showLargeImg, setShowLargeImg] = useState(false);
    const [imgUrl, setImgUrl] = useState()
    const [imgAlt, setImgAlt] = useState()

    const openLargeImg = (url, alt) => {
        setImgUrl(url)
        setImgAlt(alt)
        setShowLargeImg(!showLargeImg)
    }

    const closeLargeImg = () => {
        setShowLargeImg(!showLargeImg)
    }

    return (
        <div className="homepage-container">
            {showLargeImg && <LargeImg
                url={imgUrl}
                alt={imgAlt}
                closeModal={closeLargeImg}
            />
            }
            <div className="section-container">
                <div className="section-half-container">
                    <img
                        className="home-page-img"
                        src={process.env.PUBLIC_URL + "dragon_resized.png"}
                        alt="colorful dragon"
                    />
                </div>

                <div className="section-half-container">
                    <h1 className="dashboard-component-title">Welcome to DND DEN!</h1>
                    <p>DND DEN is a place for anyone who wants to be able to play Dungeon and Dragons games online with friends</p>
                </div>
            </div>
            <div className="section-container">
                <div className="section-half-container">
                    <h1 className="dashboard-component-title">Build custom 8bit style maps!</h1>
                    <p>Use our map builder feature to build cute 8bit art style maps that you can diplay to your campaign players to help visualize the game setting.</p>
                </div>

                <div className="section-half-container">
                    <img
                        className="home-page-img expandable-img"
                        src={"dnd_map_builder.jpg"}
                        alt="building an 8 bit style map example"

                        onClick={() => openLargeImg(process.env.PUBLIC_URL + "dnd_map_builder.jpg", "example of a map builder ")}
                    />
                </div>
            </div>
            <div className="section-container">

                <div className="section-half-container">
                    <img
                        className="home-page-img expandable-img"
                        src={process.env.PUBLIC_URL + "character_sheet.jpg"}
                        alt="Character sheet example"

                        onClick={() => openLargeImg(process.env.PUBLIC_URL + "character_sheet.jpg", "Character sheet example ")}
                    />
                </div>
                <div className="section-half-container">
                    <h1 className="dashboard-component-title">Chreate a character using our character sheet</h1>
                    <p>You can view other players' characters and update your character during the live game.</p>
                </div>

            </div>
            <div className="section-container">
                <div className="section-half-container">
                    <h1 className="dashboard-component-title">Live chat allows you to communicate with your team!</h1>
                    <p>You can communicate with your team using live chat and we'll store all your game data including dice rolling events. You can show other users your maps, edit character, view other players' characters and roll dice in the chat window.</p>
                </div>

                <div className="section-half-container">
                    <img
                        className="home-page-img expandable-img"
                        src={process.env.PUBLIC_URL + "chat.jpg"}
                        alt="example of game chat"

                        onClick={() => openLargeImg(process.env.PUBLIC_URL + "chat.jpg", "example of game chat")}
                    />
                </div>
            </div>
        </div>
    )
}