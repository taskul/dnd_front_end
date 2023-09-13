import React, { useEffect, useState, useRef, useContext } from 'react'
import { useParams } from 'react-router-dom';
import ChatBar from './ChatBar'
import ChatBody from './ChatBody'
import ChatFooter from './ChatFooter'
import "./Chat.css"
import AuthContext from "../../Context/AuthContext"
import User from "../../API/api"
import socketIO from "socket.io-client"

const socket = socketIO.connect("http://localhost:4000")



const ChatPage = () => {
    let { campaign_name, chatId } = useParams();
    const [messages, setMessages] = useState([])
    const [typingStatus, setTypingStatus] = useState("")
    const lastMessageRef = useRef(null);
    const { currentUser, token } = useContext(AuthContext)
    const [users, setUsers] = useState([]);
    const [room, setRoom] = useState(`/${chatId}/${campaign_name}`);
    const [gameMaps, setGameMaps] = useState([]);


    // uploading old messages
    useEffect(() => {
        async function getMessages() {
            User.token = token;
            const response = await User.getMessages(chatId, campaign_name, currentUser);
            setMessages(response.gameChat)
        }
        getMessages();
    }, [])

    // tracking chat messages
    useEffect(() => {
        socket.on("chat message", data => setMessages([...messages, data]))
        return () => {
            // Clean up socket event listeners when the component unmounts
            // helps improve performance
            socket.off('chat message');
        };
    }, [socket, messages])

    // tracking user is typing
    useEffect(() => {
        socket.on("typingResponse", data => setTypingStatus(data))
    }, [socket])


    // scroll last message into view
    useEffect(() => {
        const chatContainer = lastMessageRef.current;

        if (chatContainer) {
            // Scroll to the last message with a delay for a smoother effect
            setTimeout(() => {
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }, 100);
        }

    }, [messages]);


    // Setting users, connecting and disconcting events
    useEffect(() => {
        if (currentUser.trim() !== '') {
            let username = currentUser;
            socket.emit('set username', { username, room });

        }
        socket.on('user connected', (users) => {
            setUsers(users);
        });

        socket.on('user disconnected', (users) => {
            setUsers(users.filter(u => u !== currentUser));
            socket.emit('leave room', room);
        });

        // Detect when the user is leaving the chat page
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            // Clean up socket event listeners when the component unmounts
            // helps improve performance
            socket.off('user connected');
            socket.off('user disconnected');
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [socket]);

    // this will be used when user clicks on the link and leaves the chat lobby
    const handleBeforeUnload = (event) => {
        // Notify the server that the user is disconnecting before leaving the page
        let username = currentUser;
        socket.emit('leave room', { username, room });
    };

    const changeRoom = (newRoom) => {
        // Leave the current room and join the new one
        socket.emit('leave room', room);
        socket.emit('join room', newRoom);
        setRoom(newRoom);
    };

    return (
        <div className="chat">
            <ChatBar
                socket={socket}
                users={users}
                chatId={chatId}
                room={room}
                gameMaps={gameMaps}
                setGameMaps={setGameMaps}
                setMessages={setMessages}
            />
            <div className='chat__main'>
                <ChatBody
                    socket={socket}
                    room={room}
                    messages={messages}
                    typingStatus={typingStatus}
                    lastMessageRef={lastMessageRef}
                    user={currentUser}
                    campaign_name={campaign_name}
                />
                <ChatFooter
                    socket={socket}
                    usename={currentUser}
                    chat_id={chatId}
                    room={room}
                />
            </div>
        </div>
    )
}

export default ChatPage