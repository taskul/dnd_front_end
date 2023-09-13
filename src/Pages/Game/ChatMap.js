
import "../../MapBuilder/MapBuilderStyle.css"
import { makeGrid, fillTiles } from '../../MapBuilder/mapHelperFunctions.js'
import update from 'immutability-helper'
import { useCallback, useState } from 'react'
import { Picture } from "../../DragDropImgComponents/Picture"
import images from '../../ImageData.js'
import { v4 as uuidv4 } from 'uuid'
import "../../DragDropImgComponents/Picture.css"

export default function ChatMap({ mapAssets, setAssets, closeModal }) {
    const [baseTilesArr, setBaseTileArr] = useState([1, 8])

    // // this function adds a box to setBoxes which are then rendered on the canvas
    // const addToBox = useCallback(
    //     (newImgId, url, title, top, left, rotation, zIndex, onMap) => {
    //         setAssets((mapAssets) => ({
    //             ...mapAssets, [newImgId]: {
    //                 url, title, top, left, rotation, zIndex, onMap
    //             }
    //         }))
    //     },
    //     [])

    // const makeMap = () => {
    //     setAssets([])
    //     const grid = makeGrid(0.1, 10, 16);
    //     fillTiles(grid)
    //     let topLoc = 0;
    //     let leftLoc = 0;
    //     // getting an array of land tiles
    //     let land = images.terrain.land;
    //     // getting an array of water tiles
    //     let water = images.terrain.water;
    //     grid.map((row) => {
    //         row.map(cell => {
    //             const newId = uuidv4();
    //             if (cell === 1) {
    //                 // passing an array index to land array to get the index of the land tile
    //                 addToBox(newId, land[baseTilesArr[0]].url, images.terrain.land[baseTilesArr[0]].title, topLoc, leftLoc, 0, 0, false)
    //             } else if (cell === "X") {
    //                 addToBox(newId, land[baseTilesArr[1]].url, images.terrain.land[baseTilesArr[1]].title, topLoc, leftLoc, 0, 0, false)
    //             } else {
    //                 addToBox(newId, water[0].url, images.terrain.water[0].title, topLoc, leftLoc, 0, 0, false)
    //             }
    //             topLoc += 0;
    //             leftLoc += 50;
    //         })
    //         topLoc += 50;
    //         leftLoc = 0;
    //     })
    // }


    return (
        <div className='map-display-chat'>
            <div className="exit-button-holder">
                {/* Exit button */}
                <button className="exit-modal-blue" onClick={closeModal}>X</button>
            </div>
            <div className='map-container-chat'>
                {Object.keys(mapAssets).map((key) => (
                    <Picture
                        key={key}
                        id={key}
                        {...mapAssets[key]}
                        position={"absolute"}
                    />
                ))}
            </div>
        </div>
    )
}
