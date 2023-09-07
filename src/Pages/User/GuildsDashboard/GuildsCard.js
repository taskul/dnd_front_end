import "../DashboardCard.css"
import "../../../GeneralComponents/Forms.css"


export default function GuildsCard({ id, name, owner, img_data, deleteGuild, displayEditGuild, leaveGuild }) {

    const handleEditGuild = async () => {
        displayEditGuild(id, owner)
    }

    const handleDeleteGuild = () => {
        deleteGuild(id);
    }

    const handleLeavingGuild = () => {
        leaveGuild(id)
    }
    const guildIcon = JSON.parse(img_data)

    return (
        <fieldset>
            <legend className="card-legend">{owner ? "owner" : ""}</legend>
            <div className="component-card" >
                <p className="card-text">Guild:
                    <i className="card-text">
                        {name}
                    </i></p>
                {/* Checks to see if the user is the owner of the guild and if they are allowed to manage guild or not
            */}
                <img
                    src={guildIcon.url}
                    alt={guildIcon.alt}
                    className="selectField-avatar-icon-small"
                />
                {owner
                    ?
                    <div className="card-btn-holder">
                        <button
                            className="component-card-btn edit-btn"
                            onClick={handleEditGuild}
                        >Manage</button>
                        <button
                            className="component-card-btn delete-btn"
                            onClick={handleDeleteGuild}
                        >Delete</button>
                    </div>
                    :
                    <button
                        className="component-card-btn-one delete-btn"
                        onClick={handleLeavingGuild}
                    >Leave</button>
                }
            </div>
        </fieldset>
    )
}