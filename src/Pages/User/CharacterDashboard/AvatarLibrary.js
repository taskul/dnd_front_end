import { useState, useContext } from "react"
import AuthContext from "../../../Context/AuthContext"
import "./CharacterBuilder.css"
import avatarArr from "../../../playerAvatarImgData";
import User from "../../../API/api"

export default function AvatarLibrary({ closeModal, avatar, setAvatar, char_id, setUpdatedAvatar }) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const { currentUser, token } = useContext(AuthContext)

    const handleImageClick = (index) => {
        setSelectedImageIndex(index);
    };

    // returns avatar object back to the parents so it can set as a new avatar
    const returnAvatar = async (avatarObj) => {
        setAvatar()
        closeModal();
        User.token = token;
        if (!avatar) {
            const response = await User.createCharacterAvatar(char_id, avatarObj.url, currentUser);
            setAvatar(response.newAvatar.img_url)
            setUpdatedAvatar(response.newAvatar.img_url)
            return response;
        } else {
            const response = await User.updateCharacterAvatar(char_id, avatarObj.url, currentUser);
            setAvatar(response.updatedAvatar.img_url)
            setUpdatedAvatar(response.updatedAvatar.img_url)
            return response;
        }
    }

    return (
        <div className="character-library-frame">
            <div className="exit-button-holder">
                {/* Exit button */}
                <button className="exit-modal-blue" onClick={closeModal}>X</button>
            </div>
            {avatarArr.map((img, idx) => (
                <div className="avatar-img-container">
                    <img
                        key={img.name}
                        src={img.url}
                        alt={img.alt}
                        className={idx === selectedImageIndex ? 'avatar-img selected' : 'avatar-img'}
                        onClick={() => handleImageClick(idx)}

                    />
                    {/* show select button when character is clicked on */}
                    {idx === selectedImageIndex
                        ?
                        <button
                            className="select-avatar-btn"
                            onClick={() => returnAvatar(avatarArr[idx])}
                        >Select</button>
                        :
                        null
                    }
                </div>
            ))}

        </div>
    )
}