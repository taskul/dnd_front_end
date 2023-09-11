import "../Dashboard.css"
import "../GuildsDashboard/GuildMember.css"
import "../../../GeneralComponents/Buttons.css"
import "../../../GeneralComponents/Forms.css"
import { useState, useContext } from "react"
import User from "../../../API/api"
import AuthContext from "../../../Context/AuthContext"
import ConfirmationCheck from "../../../GeneralComponents/ConfirmationCheck";

export default function AddPlayers({ guid_id, closeModal, guildMembers, campaign_id }) {
    const { currentUser, token } = useContext(AuthContext)

    const [confirmationVisible, setConfirmationVisible] = useState(false);

    // controls visibility of the confirmation check mark
    const showConfimrationCheckMark = () => {
        setConfirmationVisible(true);

        setTimeout(() => {
            setConfirmationVisible(false);
        }, 2000);
    }


    const managePlayers = async (username) => {
        const response = await User.addCampaignMember(campaign_id, guid_id, username, false)
        showConfimrationCheckMark();
        console.log(response)
    }

    return (
        <div className="form-container-modal">
            <div className="dashboard-modal">
                <div className="exit-button-holder">
                    {/* Exit button */}
                    <button type="button" className="exit-modal" onClick={closeModal}>X</button>
                </div>
                <div className="guild-member-holder">
                    {guildMembers.map(member =>
                        <div className="guild-member">
                            {confirmationVisible && <ConfirmationCheck />}
                            {member.first_name}
                            <button
                                className="remove-btn"
                                onClick={() => managePlayers(member.username)}
                            >Add
                            </button>

                        </div>
                    )}

                </div>
            </div>

        </div>
    )
} 