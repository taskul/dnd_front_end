import React from "react"
let mapAssets = {}
let setMapAssets, mapName, setMapName;
export default React.createContext(
    mapAssets, setMapAssets, mapName, setMapName
);
// this context is used to manage data retrieved from the maps/assets/:game_map_id
// the MapAssetsContext.Provider is located in Routes/AppRoutes.js
// it keeps track of the map name and map assets that will be first retrieved by MapCard located in Pages/User/MapsDashboard/MapCard.js
// then the data will be save in context and passed on to MapBuilder route 