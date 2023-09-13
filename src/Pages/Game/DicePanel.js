import { useState, useContext } from "react"
import AuthContext from "../../Context/AuthContext"
import "../User/CharacterDashboard/CharacterBuilder.css"
import "./Chat.css"
import User from "../../API/api"
import dice from "../../DiceImgData.js"

export default function DicePanel({ closeModal, socket, chat_id, room }) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const { currentUser, token } = useContext(AuthContext)

    const handleImageClick = (index) => {
        setSelectedImageIndex(index);
    };


    const rollDice = async (value) => {
        const num = Math.floor(Math.random() * value) + 1;
        let username = currentUser;
        const message = `Event: ${username} rolled a ${value} sider dice and got ${num}/${value}`
        socket.emit('chat message', { message, username, room });
        User.token = token;
        const response = await User.createMessage(chat_id, currentUser, message)
    }

    return (
        <div className="center-content">
            <div className="character-library-frame">
                <div className="exit-button-holder">
                    {/* Exit button */}
                    <button className="exit-modal-blue" onClick={closeModal}>X</button>
                </div>
                {dice.map((d, idx) => (
                    <div className="avatar-img-container">
                        <p>{d.alt}</p>
                        <img
                            key={d.alt}
                            src={d.url}
                            alt={d.alt}
                            className={idx === selectedImageIndex ? 'dice-img selected' : 'dice-img'}
                            onClick={() => handleImageClick(idx)}
                        />
                        {/* show select button when character is clicked on */}
                        {idx === selectedImageIndex
                            ?
                            <button
                                className="select-avatar-btn"
                                style={{ background: "black" }}
                                onClick={() => rollDice(d.value)}
                            >Roll</button>
                            :
                            null
                        }
                    </div>
                ))
                }


            </div>
        </div>
    )
}