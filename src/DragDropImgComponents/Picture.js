import { useDrag } from "react-dnd"
import { ItemTypes } from './ItemTypes.js'
import { useState, memo, useCallback } from 'react'
import "./Picture.css"

export const Picture = memo(function Picture(
        {
            id, url, title, preview, top,
            left, rotation, zIndex, onMap,
            rotateImage, deleteImage
        }) 
        {
    const [imageOptions, setImageOptions] = useState(false);
    // we can set type to anything we want image, picture, photo
    // we also don't have to use collect function, but we can use it if we want to keep track of isDragging
    // isDragging returns true/false
    const [{isDragging}, drag] = useDrag(() => ({
        type: ItemTypes.BOX,
        item: {id: id, 
                url: url,
                title: title,
                top: top,
                left: left,
                rotation: rotation,
                zIndex: zIndex,
                onMap: onMap
                },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }))

    const showImageOptions = useCallback((e) => {
        if (onMap) {
            if (e.target.className === "mapImage") {
                setImageOptions(true);
            }  
        }
    }, [onMap])

    const hideImageOptions = useCallback((e) => {
        if (onMap) {
            if (e.target.className === "mapImage") {
                setImageOptions(false);
            }  
        }
    }, [onMap])

    const rotatePicture = useCallback(() =>{
        let angle = rotation + 90;
        rotateImage(id, angle)
    })

    const deletePicture = () => {
        deleteImage(id)
    }

    return (
        // useDrag is needed for every element that we want to be draggable
        <div
            onClick={showImageOptions}
            onMouseLeave={hideImageOptions}
            className="mapImage"
        >
            {imageOptions ? 
                <div className="imageOptions">
                <button 
                    className="imageOptionsBtn"
                    onClick={rotatePicture}
                >⭯</button>
                <button 
                    className="imageOptionsBtn"
                    onClick={deletePicture}>X</button>
                </div>
                :
                ""
            }
        <img 
            // we need to indicate which element we want to drag
            ref={drag}
            className="mapImage"
            src={url}
            alt={title} 
            width="50px" 
            height="50px" 
            style={{cursor: 'move', transform:`rotate(${rotation}deg)`, zIndex}}
            role={preview ? 'BoxPreview' : 'Box'}
            data-effect-allowed="copy"
        />
        </div>
        
    )
})

// export default Picture;