import "../../../GeneralComponents/Buttons.css";
import "../../../GeneralComponents/Loaders.css";
import "../Dashboard.css";
import GenerateInvitationToken from "./GenerateInvitationToken";
import { useEffect, useState, useContext } from "react";
import User from "../../../API/api";
import AuthContext from "../../../Context/AuthContext";
import GuildMember from "./GuildMember";

// manages creating an invitation link for new guild members 
// as owner of the guild user can manage members of the guild
export default function GuildMembers({ guild_id, closeModal }) {
    const [guildToken, setGuildToken] = useState();
    const [guildMembers, setGuildsMembers] = useState([]);
    const { currentUser, token } = useContext(AuthContext)

    useEffect(() => {
        async function getGuildToken() {
            if (guild_id) {
                User.token = token;
                const response = await User.getGuildToken(guild_id, currentUser)
                if (response.response) {
                    setGuildToken(response.response.invitation_token)
                }
            }
        }
        getGuildToken();
    }, [])

    useEffect(() => {
        async function getGuildMembers() {
            if (guild_id) {
                User.token = token
                const response = await User.getAllGuildMembers(guild_id, currentUser)
                setGuildsMembers(response.response)
            }
        }
        getGuildMembers();
    }, [])

    return (
        <div className="dashboard-modal-alignment">
            <div className="dashboard-modal">
                <div className="exit-button-holder">
                    {/* Exit button */}
                    <button className="exit-modal" onClick={closeModal}>X</button>
                </div>
                <div className="dashboard-component-frame">

                    <h3 className="dashboard-component-title">Invite friends to join the guild.</h3>
                    <div className="dashboard-component-container">
                        <GenerateInvitationToken
                            guildId={guild_id}
                            guildToken={guildToken}
                        />
                    </div>
                </div>
                <div className="dashboard-component-frame">
                    <h3 className="dashboard-component-title">Manage guild members.</h3>
                    <p className="dashboard-component-text">You can remove players from the guild</p>
                    {guildMembers
                        ?
                        <div className="dashboard-component-container">
                            {guildMembers.map(member =>
                                <GuildMember
                                    key={member.username}
                                    guild_id={member.guild_id}
                                    username={member.username}
                                />
                            )}
                        </div>
                        :
                        <div className="loader"></div>
                    }
                </div>
            </div>
        </div>
    )
}