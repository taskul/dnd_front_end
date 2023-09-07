import "./Home.css"
import "../User/Dashboard.css"

export default function Home() {
    return (
        <div className="homepage-container">
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
                        className="home-page-img"
                        src={process.env.PUBLIC_URL + "dnd_map_builder.jpg"}
                        alt="building an 8 bit style map example"
                    />
                </div>
            </div>
        </div>
    )
}