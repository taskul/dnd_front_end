import { useCallback, useState } from "react"
import { Picture } from "../../DragDropImgComponents/Picture"
import "./AccordionItem.css"
import "./MapBuilder.css"

export default function AccordionItem({imagesArr, title}) {
    const [accordionState, setAccordionState] = useState(false);

    const toggleAccordion = useCallback((e) => {
        setAccordionState(!accordionState)
    },[accordionState]) 

    return (
        <div className="accordion-item">
            <button id="accordion-button-1" 
            aria-expanded={accordionState ? "true":"false"}
            onClick={toggleAccordion}
            >
            <span className="accordion-title">
            {title}
            {/* + Icon */}
            </span><span className="icon" aria-hidden="true"></span>
            </button>
            <div className="accordion-content">
                {imagesArr.map((img) => (
                    <Picture 
                        id={img.title}
                        key={img.title} 
                        url={img.url}
                        alt={img.title}
                        zIndex={img.zIndex}
                        onMap={false}
                    />
                ))}
            </div>
        </div>
    )
}