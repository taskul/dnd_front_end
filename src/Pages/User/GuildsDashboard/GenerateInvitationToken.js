import { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import "../../../GeneralComponents/Buttons.css"
import "../../../GeneralComponents/TextStyles.css"
import User from '../../../API/api';
import AuthContext from '../../../Context/AuthContext';

export default function GenerateInvitationToken({ guildToken, guildId }) {
    const [invitationLinkState, setInvitationLinkState] = useState();
    const [confirmationMessage, setConfirmationMessage] = useState(false);
    const { currentUser, token } = useContext(AuthContext)

    let baseUrl;
    let invitationLink;

    // if (window.location.hostname === 'localhost' || window.location.hostname === "127.0.0.1") {
    //     baseUrl = `http://localhost:3000/signup?token=`
    // }
    const BASE_URL = process.env.REACT_APP_BASE_URL

    // if user already created a token for the guild, then parent component will get that token and the token will be displayed to user to copy and send out again.
    invitationLink = guildToken ? `${BASE_URL}/signup?token=${guildToken}` : null;

    const generateToken = async () => {
        let newToken = uuidv4();
        invitationLink = `${BASE_URL}/signup?token=${newToken}`;

        // create a database entry with an invitation token
        const response = await User.createGuildToken(newToken, guildId, currentUser)
        setInvitationLinkState(invitationLink)
    }

    const copyLink = async () => {
        await navigator.clipboard.writeText(invitationLink)
        setConfirmationMessage(!confirmationMessage)
    }

    return (
        <div>
            <p >
                <span className='blue-highlighted-text smaller-font'>Link: </span>
                <span className='smaller-font'>{invitationLink || invitationLinkState}</span>
            </p>
            {invitationLink || invitationLinkState
                ?
                <button onClick={copyLink} className='dashboard-action-btn'>Copy Link</button>
                :
                <button onClick={generateToken} className='dashboard-action-btn'>Create Invitation Link</button>
            }
            {confirmationMessage
                ?
                <span className='smaller-font'>Link has been copied</span>
                :
                null
            }

        </div>
    )
}