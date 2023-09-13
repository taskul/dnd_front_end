import { useContext } from "react"
import AuthContext from "../../Context/AuthContext"
import "../User/CharacterDashboard/CharacterBuilder.css"
import "../../GeneralComponents/TextStyles.css"
import "../../MapBuilder/MapBuilderStyle.css"
import "./Chat.css"
import User from "../../API/api"

export default function SelectMap({ availableMaps, closeModal, gameMaps, room, socket, setMapAssets, openMap }) {
    const { currentUser, token } = useContext(AuthContext)

    const addMap = (map_id, map_name) => {
        socket.emit('get map', { map_id, map_name, room })
    }

    const loadMap = async (map_id) => {
        if (map_id) {
            User.token = token;
            const response = await User.getMapByID(map_id, currentUser)
            console.log(response)
            setMapAssets(response.mapAssets.map_assets)
            setTimeout(() => {
                openMap()
            }, 500)
        }
    }


    return (
        <div className="center-content">
            <div className="character-library-frame">
                <div className="exit-button-holder">
                    {/* Exit button */}
                    <button className="exit-modal-blue" onClick={closeModal}>X</button>
                </div>

                <div className="maps-in-chat">
                    <h1 className="blue-highlighted-text large-font">Click on the map to add it to the game</h1>
                    <div className="maps-in-chat-row">
                        {availableMaps
                            ?
                            availableMaps.map((map, idx) => (
                                <button
                                    className="select-map-container"
                                    onClick={() => addMap(map.game_map_id, map.map_name)}
                                >
                                    <img src="/map.png" alt={`${map.map_name} map`} />
                                    {map.map_name}
                                </button>
                            ))
                            :
                            <div className="character-library-frame">
                                You don't have any maps.
                            </div>

                        }
                    </div>


                    <div>
                        <h1 className="blue-highlighted-text large-font">In game maps</h1>
                        <div className="maps-in-chat-row">
                            {gameMaps
                                ?
                                gameMaps.map(map =>
                                    <button
                                        className="select-map-container"
                                        onClick={() => loadMap(map.data.map_id)}
                                    >
                                        <img src="/map_thumbnail.png" />
                                        {map.data.map_name}
                                    </button>
                                )
                                :
                                <div>There are currently no maps loaded into the game</div>
                            }
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}