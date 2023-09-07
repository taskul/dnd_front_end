import TabsMenu from "./tabsMenu/TabsMenu";
import { MapCanvas } from "../DragDropImgComponents/MapCanvas";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useState } from "react";
import "./MapBuilderStyle.css"

export default function MapBuilder({ mapAssets, setMapAssets, mapName, setMapName }) {
    const [assets, setAssets] = useState(mapAssets);

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="MapBuilder">
                <div className="mobile-support-msg">Map Builder is not supported on mobile</div>
                <TabsMenu setAssets={setAssets} assets={assets} />
                <MapCanvas setAssets={setAssets} assets={assets} mapName={mapName} />
            </div>
        </DndProvider>
    )
}

