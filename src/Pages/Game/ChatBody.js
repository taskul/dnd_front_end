import React from 'react'
import { useNavigate } from "react-router-dom"
import "./Chat.css"

const ChatBody = ({ messages, typingStatus, lastMessageRef, user, campaign_name }) => {
    const navigate = useNavigate()


    const handleLeaveChat = () => {
        navigate("/dashboard")
    }

    return (
        <>
            <header className='chat__mainHeader'>
                <h2>Campaign: {campaign_name}</h2>
                <button className='leaveChat__btn' onClick={handleLeaveChat}>LEAVE CHAT</button>
            </header>


            <div ref={lastMessageRef} className='message__container'>
                {messages.map(message => (

                    message.username === user ? (
                        <div className="message__chats" key={message.id}>
                            <p className='sender__name'>You</p>
                            <div className='message__sender'>
                                <p>{message.text || message.message_text}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="message__chats" key={message.id}>
                            <p>{message.username}</p>
                            <div className='message__recipient'>
                                <p>{message.text || message.message_text}</p>
                                {console.log(message.message_text)}
                            </div>
                        </div>
                    )
                ))}

                <div className='message__status'>
                    <p>{typingStatus}</p>
                </div>
                <div className="chat-message last-message" />
            </div>
        </>
    )
}

export default ChatBody