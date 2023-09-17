import "../DashboardCard.css"
import User from "../../../API/api"
import AuthContext from "../../../Context/AuthContext"
import { useContext } from "react"
import MapAssetsContext from "../../../Context/MapAssetsContext"
import { useNavigate } from "react-router-dom"

export default function MapCard({ id, name, deleteMap }) {
    const { currentUser, token } = useContext(AuthContext)
    const { mapAssets, setMapAssets, mapName, setMapName } = useContext(MapAssetsContext);
    const navigate = useNavigate();


    const handleEditMap = async () => {
        User.token = token;
        const response = await User.getMapByID(id, currentUser);
        setMapAssets(response.mapAssets.map_assets)
        setMapName(response.mapAssets.map_name)
        navigate('/mapbuilder')
    }

    const handleDeleteMap = () => {
        deleteMap(id);
    }

    return (
        <div className="component-card" >
            <p className="card-text">{name}</p>
            <img src="/map_thumbnail.png" alt="map thumbnail" />
            <div className="card-btn-holder">
                <button
                    className="component-card-btn edit-btn"
                    onClick={handleEditMap}
                >Edit</button>
                <button
                    className="component-card-btn delete-btn"
                    onClick={handleDeleteMap}
                >Delete</button>
            </div>

        </div>
    )
}