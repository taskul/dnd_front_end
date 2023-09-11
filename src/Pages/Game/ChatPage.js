import React, { useEffect, useState, useRef, useContext } from 'react'
import { useParams } from 'react-router-dom';
import ChatBar from './ChatBar'
import ChatBody from './ChatBody'
import ChatFooter from './ChatFooter'
import "./Chat.css"
import AuthContext from "../../Context/AuthContext"
import User from "../../API/api"



const ChatPage = ({ socket, chatIdentifier, setChatIdentifier }) => {
    let { campaign_name, chatId } = useParams();
    const [messages, setMessages] = useState([])
    const [typingStatus, setTypingStatus] = useState("")
    const lastMessageRef = useRef(null);
    const { currentUser, token } = useContext(AuthContext)
    const [users, setUsers] = useState({});

    useEffect(() => {
        async function getMessages() {
            User.token = token;
            const response = await User.getMessages(chatId, campaign_name, currentUser);
            setMessages(response.gameChat)
        }
        getMessages();
    }, [])

    useEffect(() => {
        socket.on("chat message", data => setMessages([...messages, data]))
        return () => {
            // Clean up socket event listeners when the component unmounts
            // helps improve performance
            socket.off('chat message');
        };
    }, [socket, messages])

    useEffect(() => {
        socket.on("typingResponse", data => setTypingStatus(data))
    }, [socket])

    useEffect(() => {
        const chatContainer = lastMessageRef.current;

        if (chatContainer) {
            // Scroll to the last message with a delay for a smoother effect
            setTimeout(() => {
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }, 100);
        }
        // lastMessageRef.current?.scrollIntoView();

    }, [messages]);

    useEffect(() => {
        if (currentUser.trim() !== '') {
            socket.emit('set username', currentUser);
        }
        socket.on('user connected', (users) => {
            setUsers(users);
        });

        socket.on('user disconnected', (users) => {
            setUsers(Object.keys(users).filter(u => users[u] !== currentUser))
        });

        return () => {
            // Clean up socket event listeners when the component unmounts
            // helps improve performance
            socket.off('user connected');
            socket.off('user disconnected');
        };
    }, [socket, currentUser]);


    return (
        <div className="chat">
            <ChatBar
                socket={socket}
                users={users}
            />
            <div className='chat__main'>
                <ChatBody
                    messages={messages}
                    typingStatus={typingStatus}
                    lastMessageRef={lastMessageRef}
                    user={currentUser}
                    campaign_name={campaign_name}
                />
                <ChatFooter
                    socket={socket}
                    user={currentUser}
                    chat_id={chatId}
                />
            </div>
        </div>
    )
}

export default ChatPage