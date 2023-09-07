import { useState } from "react"

export default function SelectItem({itemsArr, label}){
    const [selected, setSelected] = useState();
    const handleChange = (e) => {
        
    }

    return (
        <label>
            {label}
        <select name={`Select ${label}`} onChange={handleChange}>
            {itemsArr.map((item) => {
                <option key={item.name} value={item}>{item[0].toUpperCase() + item.substring(1)}</option>
            })}
        </select>
        </label>
    )
}