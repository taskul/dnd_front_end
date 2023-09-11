import "../DashboardCard.css"
import AuthContext from "../../../Context/AuthContext"
import { useContext, useEffect, useState } from "react"
import User from "../../../API/api"
import { useNavigate } from "react-router-dom";

export default function CampaignCard({ guild_id, guild_name, guild_img, campaign_id, campaign_name, campaign_owner, deleteCampaign, addingPlayers }) {
    const { currentUser, token } = useContext(AuthContext)
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function getAllGuildMembers() {
            const { response } = await User.getAllGuildMembers(guild_id, currentUser)
            setUsers(users => ([...response]))
        }
        getAllGuildMembers()
    }, [])

    const navigate = useNavigate();

    // owner can create the new game chat if it doesn't exist and if it does exists then owner conencts to the chat room
    const handleConnectOwner = async () => {

        const response = await User.getGameRoom(campaign_name, campaign_id, currentUser)
        let chatId;
        if (Object.keys(response).length > 0) {
            chatId = response.gameChat.chat_id
            navigate(`/chat/${chatId}/${campaign_name}`)
        } else {
            const newChatRoom = await User.createGameRoom(campaign_name, campaign_id, currentUser);
            if (Object.keys(newChatRoom).length > 0) {
                chatId = newChatRoom.gameChat.chat_id
                navigate(`/chat/${chatId}/${campaign_name}`)
            }
        }
    }

    // players are not able to create new chat rooms, but they can join existing ones if they are part of that campaign
    const handleConnectPlayer = async () => {

        const response = await User.getGameRoom(campaign_name, campaign_id, currentUser)
        let chatId;
        if (Object.keys(response).length > 0) {
            chatId = response.gameChat.chat_id
            navigate(`/chat/${chatId}/${campaign_name}`)
        } else {
            console.log('You are not able to access this game. Please make sure you are part of the campaign')
        }
    }
    // when owner adds new playsers
    const addPlayers = () => {
        addingPlayers(users, campaign_id, guild_id)
    }


    const handleDelete = () => {
        deleteCampaign(campaign_id);
    }

    const handleLeave = () => {

    }

    const guildIcon = JSON.parse(guild_img)

    return (
        <fieldset>
            <legend className="card-legend">{campaign_owner ? "owner" : "player"}</legend>
            <div className="component-card" >
                <p className="card-text">Campaign: {campaign_name}</p>
                <p className="card-text">Guild: {guild_name}</p>
                {/* Checks to see if the user is the owner of the guild and if they are allowed to manage guild or not
            */}

                <img
                    src={guildIcon.url}
                    alt={guildIcon.alt}
                    className="selectField-avatar-icon-small"
                />

                {campaign_owner
                    ?
                    <button
                        className="component-card-btn-one protruding-btn"
                        onClick={addPlayers}
                    >Add Players</button>
                    :
                    null
                }

                {campaign_owner
                    ?
                    <div className="card-btn-holder">
                        <button
                            className="component-card-btn edit-btn"
                            onClick={handleConnectOwner}
                        >Connect</button>
                        <button
                            className="component-card-btn delete-btn"
                            onClick={handleDelete}
                        >Delete</button>
                    </div>
                    :
                    <div className="card-btn-holder">
                        <button
                            className="component-card-btn edit-btn"
                            onClick={handleConnectPlayer}
                        >Join</button>
                        <button
                            className="component-card-btn delete-btn"
                            onClick={handleLeave}
                        >Leave</button>
                    </div>
                }
            </div>
        </fieldset>
    )
}
