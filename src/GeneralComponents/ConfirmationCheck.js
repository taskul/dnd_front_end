import "./TextStyles.css"
import "./GeneralComponents.css"

export default function ConfirmationCheck({ visible }) {
    return (
        <div className="checkmark-frame">
            <div className={`checkmark-container`}>
                <p className="white-titles large-bold">&#x2713;</p>
            </div>
        </div>
    )
}