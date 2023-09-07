import "./GuildMember.css"
import "../../../GeneralComponents/Buttons.css"

export default function GuildMember({guid_id, username}) {
    return (
        <div className="guild-members-frame">
            <div className="guild-member">
                {username}
                <button className="remove-btn">Remove</button>
            </div>
        </div>
    )
}