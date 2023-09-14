
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
