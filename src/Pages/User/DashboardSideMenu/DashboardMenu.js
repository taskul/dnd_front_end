import { NavLink } from "react-router-dom";
import "../Dashboard.css"
import "../../../GeneralComponents/Buttons.css"
import { useContext } from "react"
import MapAssetsContext from "../../../Context/MapAssetsContext"

export default function DashboardMenu() {
    const { mapAssets, setMapAssets, mapName, setMapName } = useContext(MapAssetsContext);

    const clearMapAssetsContext = () => {
        setMapAssets({})
        setMapName('')
    }

    return (
        <div>
            <div className="dashboard-side-menu">
                <NavLink to='/dashboard/manage_guilds' className={"dahsboard-btn-link"}>
                    <button className="dashboard-icon-btn">
                        <img
                            src={process.env.PUBLIC_URL + "guild.png"}
                            alt="guilds icon"
                            className="dashboard-icon-img"
                        />
                        Guilds
                    </button>
                </NavLink>
                <NavLink to='/dashboard/manage_campaigns' className={"dahsboard-btn-link"}>
                    <button className="dashboard-icon-btn">
                        <img
                            src={process.env.PUBLIC_URL + "campaign.png"}
                            alt="campaign icon"
                            className="dashboard-icon-img"
                        />
                        Campaign
                    </button>
                </NavLink>
                <NavLink to='/dashboard/manage_characters' className={"dahsboard-btn-link"}>
                    <button className="dashboard-icon-btn">

                        <img
                            src={process.env.PUBLIC_URL + "character.png"}
                            alt="character icon"
                            className="dashboard-icon-img"
                        />
                        Character
                    </button>
                </NavLink>
                <NavLink to='/dashboard/manage_maps' className={"dahsboard-btn-link"}>
                    <button className="dashboard-icon-btn"
                        onClick={clearMapAssetsContext}
                    >
                        <img
                            src={process.env.PUBLIC_URL + "map.png"}
                            alt="map icon"
                            className="dashboard-icon-img"
                        />Maps
                    </button>
                </NavLink>
                {/* <NavLink to='/dashboard/manage_friends' className={"dahsboard-btn-link"}>
                    <button className="dashboard-icon-btn">
                        <img
                            src={process.env.PUBLIC_URL + "friends.png"}
                            alt="friends icon"
                            className="dashboard-icon-img"
                        />
                        Friends
                    </button>
                </NavLink> */}
            </div >

        </div>
    )
}
