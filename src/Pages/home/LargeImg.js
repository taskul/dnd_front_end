import "./Home.css"
import "../../GeneralComponents/Buttons.css"

export default function LargeImg({ url, alt, closeModal }) {

    return (
        <div className="large-img-frame"
        >
            <div className="exit-button-holder">
                {/* Exit button */}
                <button className="exit-modal-blue" onClick={closeModal}>X</button>
            </div>
            <img
                src={process.env.PUBLIC_URL + url}
                alt={alt}
                className="large-img"
            />
        </div>
    )
}