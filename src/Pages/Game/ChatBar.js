import React, { useState, useEffect, useContext } from 'react'
import "./Chat.css"
import AuthContext from "../../Context/AuthContext"

const ChatBar = ({ socket, users }) => {
    // const [users, setUsers] = useState([])
    const { currentUser, token } = useContext(AuthContext)

    return (
        <div className='chat__sidebar'>
            <div>
                <h4 className='chat__header'>ACTIVE USERS</h4>
                <div className='chat__users'>
                    {Object.keys(users).map((user) => <p key={user}>{users[user]}</p>)}
                </div>
            </div>
        </div>
    )
}

export default ChatBar;