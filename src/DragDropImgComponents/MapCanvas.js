import { Container } from './Container.js'
import { CustomDragLayer } from './CustomDragLayer.js'
export const MapCanvas = ({ assets, setAssets, mapName }) => {
  return (
    <div>
      <Container snapToGrid={true} setAssets={setAssets} assets={assets} mapName={mapName} />
      <CustomDragLayer snapToGrid={true} />
    </div>
  )
}
