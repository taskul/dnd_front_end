import React from 'react'
import { useNavigate } from "react-router-dom"
import "./Chat.css"
import { v4 as uuidv4 } from 'uuid';

const ChatBody = ({ socket, room, messages, typingStatus, lastMessageRef, user, campaign_name }) => {
    const navigate = useNavigate()


    const handleLeaveChat = () => {
        socket.emit('leave room', room);
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

                        < div className="message__chats" key={uuidv4()} >
                            <p className='sender__name'>You</p>
                            <div
                                className={
                                    message.message.startsWith("Event:")
                                        ?
                                        'message__event_sender'
                                        :
                                        'message__sender'}
                            >
                                <p>{message.message}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="message__chats" key={uuidv4()}>
                            <p>{message.username}</p>
                            <div className={
                                message.message.startsWith("Event:")
                                    ?
                                    'message__event_recipient'
                                    :
                                    'message__recipient'}
                            >
                                <p>{message.message}</p>
                            </div>
                        </div>
                    )
                ))}

                <div className='message__status'>
                    <p>{typingStatus}</p>
                </div>
                <div className="chat-message last-message" />
            </div >
        </>
    )
}

export default ChatBody