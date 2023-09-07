import { useContext, useState } from "react"
import MapAssetsContext from "../../../Context/MapAssetsContext"

export default function FriendsManager() {
    const { mapAssets, setMapAssets, mapName, setMapName } = useContext(MapAssetsContext);

    console.log(mapAssets)
    return (
        <div className="dashboard-components">
            Hello friends
        </div>
    )
}