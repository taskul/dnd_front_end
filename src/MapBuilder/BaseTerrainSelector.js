import "../GeneralComponents/SelectorsMenu.css"

const imageList = [
    {
        name: "Forest",
        indexes: [1, 8]
    },
    {
        name: "Dry Lands",
        indexes: [3, 11]
    },
    {
        name: "Desert",
        indexes: [10, 5]
    },
    {
        name: "City",
        indexes: [8, 13]
    }
]

export default function BaseTiles({ pickBaseTile, tileImages = imageList }) {
    // on change it will pick an array of two tile indexes
    // that will be passed on to parent component though
    // pickBaseTile function
    const handleChange = (e) => {
        pickBaseTile(imageList[e.target.value].indexes)
    }

    return (
        <div className="selector-menu">
            <span className="selector-menu-label">Base Tiles</span>
            <select onChange={handleChange} className="selector-menu-input">
                {/* map over tile array to display all array items as 
                    options in select input field
                */}
                {tileImages.map((tile, idx) => (
                    <option key={idx} value={idx}>
                        {tile.name}
                    </option>
                ))}
            </select>
        </div>
    )
}
