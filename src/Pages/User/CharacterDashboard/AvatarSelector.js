import "../../../GeneralComponents/Loaders.css";
import "../../../GeneralComponents/Buttons.css";
import "./CharacterBuilder.css"



export default function AvatarSelector({ avatarImg, openAvatarSelector }) {

    return (
        <div className="avatar-frame">
            {avatarImg || "/avatars/druid.png"
                ?
                <img
                    src={avatarImg ? avatarImg : "/avatars/druid.png"}
                    className="avatar-img"
                    onClick={openAvatarSelector}
                />
                :
                <div className="loader"></div>
            }
            <button
                onClick={openAvatarSelector}
                className="action-button"
            >Change Avatar</button>

        </div>
    )
}