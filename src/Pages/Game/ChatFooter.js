import React, { useState, useContext } from 'react'
import "./Chat.css"
import "../../Pages/User/Dashboard.css"
import "../../GeneralComponents/Forms.css"
import AuthContext from "../../Context/AuthContext"
import User from "../../API/api"

const ChatFooter = ({ socket, chat_id, room }) => {
    const { currentUser, token } = useContext(AuthContext)
    const [message, setMessage] = useState("")
    const handleTyping = () => socket.emit("typing", `${localStorage.getItem("userName")} is typing`)

    const handleSendMessage = async (e) => {
        e.preventDefault()
        if (message.trim() !== '') {
            // socket.emit('chat message', { message, user });
            // setMessage('');
            let username = currentUser;
            socket.emit('chat message', { message, username, room });
            setMessage('');
            User.token = token;
            const response = await User.createMessage(chat_id, currentUser, message)
        }
    }
    return (
        <div className='chat__footer'>
            <form className='chat-input-field' onSubmit={handleSendMessage}>
                <input
                    type="text"
                    placeholder='Write message'
                    className='message'
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onKeyDown={handleTyping}
                />
                <button className="dashboard-action-btn">SEND</button>
            </form>
        </div>
    )
}

export default ChatFooter