/**
 * creates a matrix of 0s and 1s
 * increasing the freq results in more 1s placed in the matrix
 * when placing board tiles land pieces will go on to 1s and water pieces will go onto 0s
 */
function makeGrid(freq=0.3, rows, columns) {
    const grid = [];

    function randomizeNum() {
        let result = Math.random()
        if (result <= freq) {
            return 0;
        } else {
            return 1;
        }
    }

    for (let i= 0; i < rows; i++) {
        grid.push(Array.from({length:columns}, () => randomizeNum()))
    }

    return grid;
}

// returns a random number that is within a range of the array's length
function randomItemFromArray(arr) {
    return Math.floor(Math.random() * arr.length)
}

// itterates through the grid and checks each cell to see if it has a 1 or a 0 in it
function fillGrid(grid, tileTypes, size) {

    for (let row = 0; row < grid.length; row++) {
        for (let cell = 0; cell < grid[0].length; cell++) {
            if(grid[row][cell] === "1") {
                placeTile(grid, row, cell, tileTypes['land'])
            } else {
                placeTile(grid, row, cell, tileTypes['water'])
            }
        }
    }
}

/** Creates a nested loop where both loops have a randomized range for those loops to create clusters of x and y coordinates.
 * If coordinate is equal to 1 then it is a land tile, uses placeTile function to
 * place a tile
 */
function fillTiles(grid) {
    let startX = Math.floor(Math.random() * grid.length/2)
    let endX = grid.length - startX -1
    let startY = Math.floor(Math.random() * grid[0].length/2)
    let endY = grid[0].length - startY -1
    for (let x = startX; x < endX; x++) {
        for (let y = startY; y < endY; y++) {
            if (grid[x][y] === 1) {
                placeTile(grid, x, y)
            }
        }
    }
}

// checks to make sure coordinates are within a range of the grid and then changes that coordinate to "X" which will be used to populate that area with a specific type of tile selected by user
function checkCoordinates(grid, x,y) {
    if (x < 0 || y < 0 || x > grid.length-1 || y > grid[0].length-1) return;
    if (grid[x][y] === 0 || grid[x][y] === "X") return;
    grid[x][y] = "X";
}

// places tiles in a in surrounding area is it is withing grid limits.
function placeTile(grid, x, y) {
    checkCoordinates(grid, x, y)
    checkCoordinates(grid, x+1, y)
    checkCoordinates(grid, x-1, y)
    checkCoordinates(grid, x, y+1)
    checkCoordinates(grid, x, y-1)
}

export {makeGrid, randomItemFromArray, fillTiles};