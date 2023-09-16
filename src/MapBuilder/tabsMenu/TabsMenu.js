import AccordionItem from "./AccordionItem"
import images from "../../ImageData"
import "./TabsMenu.css"
import "./Layers.css"

import { useCallback, useState } from "react"

export default function TabsMenu({ assets, setAssets }) {
    const [assetsTab, setAssetsTab] = useState(true);
    const [layersTab, setLayersTab] = useState(false);

    const changeTabState = useCallback((e) => {
        if (e.target.id === "tab-assets") {
            setAssetsTab(true);
            setLayersTab(false);
        } else if (e.target.id === "tab-layers") {
            setLayersTab(true);
            setAssetsTab(false);
        }
    })

    return (
        <div className="container-for-tabs">
            <div className="container-tabs">
                <button className={assetsTab ? `tablinks active` : "tablinks"} id="tab-assets" onClick={changeTabState}>Assets</button>
                <button className={layersTab ? `tablinks active` : "tablinks"} id="tab-layers" onClick={changeTabState}>Layers</button>
            </div>
            <div className="container-tab-divider"></div>
            {assetsTab ?
                <div className="accordion active">
                    <h3 className="container-tab-title">Map Tiles</h3>
                    <AccordionItem title="Terain" imagesArr={[...images.terrain.land, ...images.terrain.water, ...images.terrain.landMarks]} />
                    <AccordionItem title="Grass and Trees" imagesArr={images.grass_and_trees} />
                    <AccordionItem title="Buildings" imagesArr={images.buildings} />
                    <AccordionItem title="Building pieces" imagesArr={images.building_pieces} />
                    <AccordionItem title="Furniture" imagesArr={images.furniture} />
                </div>
                :
                ""}

            {/* {layersTab ?
                <div className="layers">
                    <h3 className="container-tab-title">Layers</h3>
                    <Container assets={assets} />
                </div>
                :
                ""} */}
        </div>
    )
}