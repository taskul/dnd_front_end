export function snapToGrid(x, y) {
    const snappedX = Math.round(x / 1) * 1;
    const snappedY = Math.round(y / 1) * 1;
    return [snappedX, snappedY]
  }
  