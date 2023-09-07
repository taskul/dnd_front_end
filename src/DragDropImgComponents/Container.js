import update from 'immutability-helper'
import { useCallback, useContext, useState } from 'react'
import { useDrop } from 'react-dnd'
import { DraggableBox } from './DraggableBox.js'
import { ItemTypes } from './ItemTypes.js'
import { snapToGrid as doSnapToGrid } from './snapToGrid.js'
import { v4 as uuidv4 } from 'uuid'
import "../MapBuilder/MapBuilderStyle.css"
import "../GeneralComponents/Buttons.css"
import images from '../ImageData.js'
import { makeGrid, fillTiles } from '../MapBuilder/mapHelperFunctions.js'
import BaseTiles from '../MapBuilder/BaseTerrainSelector.js'
import CreateNewNameForm from '../GeneralComponents/CreateNewNameForm.js'
import AuthContext from '../Context/AuthContext.js'
import User from '../API/api.js'

// styling for the Canvas
export const Container = ({ assets, setAssets, mapName }) => {
  // const [assets, setAssets] = useState()
  const [baseTilesArr, setBaseTileArr] = useState([1, 8])
  const [displaySaveMap, setDisplaySaveMap] = useState(false)
  const { currentUser, token } = useContext(AuthContext);
  const [savedMapName, setSavedMapName] = useState(mapName);


  // useCallback returns a function that won’t be re-declared on subsequent renders, as long as the dependencies don’t change
  // here we are only updating left and top coordinates using update function from
  // immutability-helper library which allows us to update only specified parts of
  // the data we have
  const moveBox = useCallback(
    (id, left, top) => {
      setAssets(
        update(assets, {
          [id]: {
            $merge: { left, top },
          },
        }),
      )
    },
    [assets],
  )

  // this function adds a box to setBoxes which are then rendered on the canvas
  const addToBox = useCallback(
    (newImgId, url, title, top, left, rotation, zIndex, onMap) => {
      setAssets((assets) => ({
        ...assets, [newImgId]: {
          url, title, top, left, rotation, zIndex, onMap
        }
      }))
    },
    [])

  // checking to see if the image we are dragging is not a new image that is 
  // being added to the canvas
  // returns true if image id is not in a boxes array
  const addImageToMap = useCallback((item) => {
    let newImg = Object.keys(assets).includes(item.id)
    if (!newImg) {
      return true
    }
    return false;
  }, [assets])

  // drops images onto the canvas, 
  // if the image is new, adds the image to the canvas
  // otherwise it updates the new location of the existing image on the canvas
  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop(item, monitor) {
        // if image id is not found in boxes array, then create new image with 
        // all of the needed image properties. 
        if (addImageToMap(item)) {
          let newImgId = uuidv4();
          let url = item.url;
          let title = item.title;
          let rotation = 0;
          let zIndex = 0;
          let onMap = true;
          // calculate delta for where to drop the image off on the canvas
          const delta = monitor.getClientOffset()
          // let left = Math.round(delta.x) 
          // let top = Math.round(delta.y /5)
          let left = Math.round(delta.x - 330)
          let top = Math.round(delta.y - 70)
            // ; before array is needed for array destructuring
            ;[left, top] = doSnapToGrid(left, top)
          addToBox(newImgId, url, title, top, left, rotation, zIndex, onMap)
        } else {
          // calculate delta for where to drop the image off on the canvas
          const delta = monitor.getDifferenceFromInitialOffset()
          let left = Math.round(item.left + delta.x)
          let top = Math.round(item.top + delta.y)
            // ; before array is needed for array destructuring
            ;[left, top] = doSnapToGrid(left, top)
          // update item properties
          item.left = left;
          item.top = top;
          moveBox(item.id, left, top)
        }
      },
    }),
    [moveBox],
  )

  // rotate image by 90 degrees
  // use merge to update only the id and rotation matching
  const rotateImage = useCallback((id, rotation) => {
    setAssets(
      update(assets, {
        [id]: {
          $merge: { rotation },
        },
      }),
    )
  }, [assets])

  // Delete impage from a Map
  // use $unset to remove item with matching id
  const deleteImage = (id) => {
    setAssets(
      update(assets, {
        $unset: [id]
      }),
    )
  }

  // selects array of two indexes for two tiles from BaseTiles component
  const selectBaseTile = (arr) => {
    setBaseTileArr(arr)
  }

  const makeMap = () => {
    setAssets([])
    const grid = makeGrid(0.1, 10, 16);
    fillTiles(grid)
    let topLoc = 0;
    let leftLoc = 0;
    // getting an array of land tiles
    let land = images.terrain.land;
    // getting an array of water tiles
    let water = images.terrain.water;
    grid.map((row) => {
      row.map(cell => {
        const newId = uuidv4();
        if (cell === 1) {
          // passing an array index to land array to get the index of the land tile
          addToBox(newId, land[baseTilesArr[0]].url, images.terrain.land[baseTilesArr[0]].title, topLoc, leftLoc, 0, 0, false)
        } else if (cell === "X") {
          addToBox(newId, land[baseTilesArr[1]].url, images.terrain.land[baseTilesArr[1]].title, topLoc, leftLoc, 0, 0, false)
        } else {
          addToBox(newId, water[0].url, images.terrain.water[0].title, topLoc, leftLoc, 0, 0, false)
        }
        topLoc += 0;
        leftLoc += 50;
      })
      topLoc += 50;
      leftLoc = 0;
    })
  }

  const saveMap = (data) => {
    let gameAssets = JSON.stringify(assets)
    // add token to a request to check if the correct user is sending the request
    User.token = token;
    const response = User.createMap(data.inputName, currentUser, gameAssets)
    return response;
  }

  const manageSaveMapDisplay = () => {
    setDisplaySaveMap(!displaySaveMap)
  }

  const clearMap = () => {
    setAssets({})
  }

  return (
    <div className='map-display'>
      <div ref={drop} className='map-container'>
        {Object.keys(assets).map((key) => (
          <DraggableBox
            key={key}
            id={key}
            {...assets[key]}
            rotateImage={rotateImage}
            deleteImage={deleteImage}
          />
        ))}
      </div>
      <span className='warning-message'>*Create Random Map completely resets the map</span>
      <br />
      <BaseTiles pickBaseTile={selectBaseTile} />
      <button onClick={makeMap} className='action-button'>Create Random Map</button>
      <button onClick={clearMap} className='action-button'>Clear Map</button>
      {/* show button if there is a logged in user */}
      {currentUser ?
        <button className='action-button' onClick={manageSaveMapDisplay}>Save Map</button>
        : null}

      {displaySaveMap ?
        <CreateNewNameForm
          closeModal={manageSaveMapDisplay}
          createNewEntry={saveMap}
          savedName={savedMapName}
          setSavedName={setSavedMapName}
          placeholderName={"Map Name"}
        /> : null}

    </div>
  )
}
