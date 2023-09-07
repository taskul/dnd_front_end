import "../Pages/User/DashboardCard.css"
import "./Forms.css"
import "./Buttons.css"

export default function ConfirmationModal({ closeConfirmationModal, message, id, confirm }) {

    const handleConfirm = () => {
        confirm(id)
        closeConfirmationModal()
    }


    return (
        <div className="form-container-modal">
            <div className="confirmation-modal">
                <p className="confirmation-modal-text">{message}</p>
                <div className="card-btn-holder">
                    <button onClick={handleConfirm} className="component-card-btn edit-btn">
                        Yes
                    </button>
                    <button onClick={closeConfirmationModal} className="component-card-btn delete-btn">
                        No
                    </button>
                </div>
            </div>
        </div>
    )
}