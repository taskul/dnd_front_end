import { useEffect, useContext, useState } from "react"
import User from "../../../API/api"
import AuthContext from "../../../Context/AuthContext"
import { NavLink } from "react-router-dom";
import MapCard from "./MapCard";
import "../Dashboard.css"
import "../../../GeneralComponents/Buttons.css"
import "../../../GeneralComponents/Loaders.css";

export default function MapManager() {
    const [maps, setMaps] = useState([]);
    const { currentUser, token } = useContext(AuthContext)

    useEffect(() => {
        async function getMaps() {
            User.token = token;
            const { response } = await User.getMap(currentUser)

            setMaps(maps => ([
                ...maps,
                ...response
            ]))
        }
        getMaps()
    }, [currentUser])

    // handle deleting maps 
    const handleDeleteMap = async (id) => {
        // filter maps to exclude item with game_map_id matching id
        setMaps(maps.filter(m => m.game_map_id !== id))
        // make an API call to delete the map with provided id
        User.token = token;
        const response = await User.deleteMap(id, currentUser);
    }


    return (
        <div>

            <div className="dashboard-component-frame">
                <div>
                    <h3 className="dashboard-component-title">Create New Map</h3>
                    <p className="dashboard-component-text">You can build cute 8bit art maps to use in your campaigns to set the stage for the setting. We'll be adding more game assets in the futre.
                    </p>
                    <NavLink to="/mapbuilder">
                        <button className="dashboard-action-btn">
                            Create New Map
                        </button>
                    </NavLink>
                </div>
            </div>

            <div className="dashboard-component-frame">
                <h3 className="dashboard-component-title">Your maps</h3>
                <div className="dashboard-component-container">

                    {maps
                        ?
                        maps.map(data =>
                            <MapCard
                                key={data.game_map_id}
                                id={data.game_map_id}
                                name={data.map_name}
                                deleteMap={handleDeleteMap}
                            />
                        )
                        :
                        <div class="loader"></div>
                    }
                </div>
            </div>
        </div>
    )
}