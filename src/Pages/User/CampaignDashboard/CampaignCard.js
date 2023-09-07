import "../DashboardCard.css"
import AuthContext from "../../../Context/AuthContext"
import { useContext } from "react"
import User from "../../../API/api"

export default function CampaignCard({ guild_id, guild_name, guild_img, campaign_id, campaign_name, campaign_owner, deleteCampaign }) {

    const handleConnectOwner = () => {

    }

    const handleConnectPlayer = () => {

    }


    const handleDelete = () => {
        deleteCampaign(campaign_id);
    }

    const handleLeave = () => {

    }

    const guildIcon = JSON.parse(guild_img)

    return (
        <fieldset>
            <legend className="card-legend">{campaign_owner ? "owner" : ""}</legend>
            <div className="component-card" >
                <p className="card-text">Campaign: {campaign_name}</p>
                <p className="card-text">Guild: {guild_name}</p>
                {/* Checks to see if the user is the owner of the guild and if they are allowed to manage guild or not
            */}

                <img
                    src={guildIcon.url}
                    alt={guildIcon.alt}
                    className="selectField-avatar-icon-small"
                />

                {campaign_owner
                    ?
                    <div className="card-btn-holder">
                        <button
                            className="component-card-btn edit-btn"
                            onClick={handleConnectOwner}
                        >Connect</button>
                        <button
                            className="component-card-btn delete-btn"
                            onClick={handleDelete}
                        >Delete</button>
                    </div>
                    :
                    <div className="card-btn-holder">
                        <button
                            className="component-card-btn edit-btn"
                            onClick={handleConnectPlayer}
                        >Connect</button>
                        <button
                            className="component-card-btn delete-btn"
                            onClick={handleLeave}
                        >Leave</button>
                    </div>
                }
            </div>
        </fieldset>
    )
}