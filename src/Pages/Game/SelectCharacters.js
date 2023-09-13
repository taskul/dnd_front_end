import { useState, useContext } from "react"
import AuthContext from "../../Context/AuthContext"
import "../User/CharacterDashboard/CharacterBuilder.css"
import User from "../../API/api"

export default function SelectCharacters({ closeModal, allUserCharacters, chatId, setSelectedCharacter }) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const { currentUser, token } = useContext(AuthContext)

    const handleImageClick = (index) => {
        setSelectedImageIndex(index);
    };

    const saveCharacter = async (char_id, char_name) => {
        User.token = token;
        const checkExisting = await User.getChatCharacter(chatId, currentUser)
        if (Object.keys(checkExisting).length > 0) {
            const response = await User.updateChatCharacter(chatId, char_id, char_name, currentUser)
            setSelectedCharacter(response)
        } else {
            const response = await User.createChatCharacter(chatId, char_id, char_name, currentUser)
            setSelectedCharacter(response)
        }
        closeModal();
    }

    return (
        <div className="center-content">
            <div className="character-library-frame">
                <div className="exit-button-holder">
                    {/* Exit button */}
                    <button className="exit-modal-blue" onClick={closeModal}>X</button>
                </div>
                {allUserCharacters
                    ?
                    allUserCharacters.map((char, idx) => (
                        <div className="avatar-img-container">
                            <p>{char.char_name}</p>
                            <img
                                key={char.char_id}
                                src={char.img_url}
                                alt={char.char_name}
                                className={idx === selectedImageIndex ? 'avatar-img selected' : 'avatar-img'}
                                onClick={() => handleImageClick(idx)}

                            />
                            {/* show select button when character is clicked on */}
                            {idx === selectedImageIndex
                                ?
                                <button
                                    className="select-avatar-btn"
                                    onClick={() => saveCharacter(char.char_id, char.char_name)}
                                >Select</button>
                                :
                                null
                            }
                        </div>
                    ))
                    :
                    <div className="character-library-frame">
                        You don't have any characters. You can create a new character in user dahsboard.
                    </div>
                }

            </div>
        </div>
    )
}