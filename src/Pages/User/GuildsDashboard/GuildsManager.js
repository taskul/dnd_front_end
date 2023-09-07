import { useEffect, useContext, useState } from "react"
import User from "../../../API/api";
import AuthContext from "../../../Context/AuthContext"
import "../Dashboard.css"
import "../../../GeneralComponents/Buttons.css"
import "../../../GeneralComponents/TextStyles.css"
import "../../../GeneralComponents/Loaders.css";
import CreateNewNameForm from "../../../GeneralComponents/CreateNewNameForm";
import GuildsCard from "./GuildsCard";
import ConfirmationModal from "../../../GeneralComponents/ConfirmationModal";
import GuildMembers from "./GuildMembers";
import guildAvatarImgs from "../../../guildAvatarImgData";

export default function GuildsManager() {
    // creating new guild states
    const [savedGuildName, setSavedGuildName] = useState();
    const [showNewGuildForm, setShowNewGuildForm] = useState(false);
    // deleting guild related states
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [deleteGuildId, setDeleteGuildId] = useState();
    // editing guild and managing guild members
    const [showEditGuildForm, setShowEditGuildForm] = useState(false);
    const [guildId, setGuildId] = useState();
    // existing guilds state
    const [guilds, setGuilds] = useState([]);
    const { currentUser, token } = useContext(AuthContext)

    // displays existing guilds
    useEffect(() => {
        async function getGuildsInfo() {
            User.token = token;
            const { response } = await User.getGuild(currentUser)

            setGuilds(guilds => ([
                ...response
            ]))
        }
        getGuildsInfo()
    }, [currentUser, savedGuildName])

    // create guild function that makes an API call to backend to create a new guild
    const createGuild = async (inputData, selectData) => {
        User.token = token;
        const response = await User.createGuild(inputData.inputName, selectData, currentUser)
        setSavedGuildName(inputData.inputName)
    }

    const getSelectedValue = (item) => {
        return item
    }

    // display modal to confirm or decline guild deletion
    const alertAboutDeleting = (id) => {
        setShowConfirmationModal(!showConfirmationModal);
        setDeleteGuildId(id);
    }

    // cancel deleting the guild
    const cancelDelete = () => {
        setShowConfirmationModal(!showConfirmationModal);
        setDeleteGuildId(null)
    }

    // handle deleting a guild
    const deleteGuild = async (id) => {
        // make an API call to delete the guild with provided id
        User.token = token;
        const response = await User.deleteGuild(id, currentUser)
        setShowConfirmationModal(!showConfirmationModal)
        if (response) {
            // filter guilds to exclude item with guild_id matching id
            setGuilds(guilds.filter(g => g.guild_id !== id));
            return response;
        }
    }

    // shows a modal with a name field to create new guild
    const displayCreateGuildModal = () => {
        setShowNewGuildForm(!showNewGuildForm)
    }

    // editing the guild
    const displayEditGuild = (id) => {
        setGuildId(id)
        setShowEditGuildForm(!showEditGuildForm)
    }

    // users that don't own the guild can leave the guild, this will help to manage that
    const leaveGuild = (id) => {
        User.token = token;
        let response = User.leaveGuild(id, currentUser);
        if (response) {
            setGuilds(guilds.filter(g => g.guild_id !== id))
            return response;
        }
    }

    return (
        <div>
            {/* opening a create new guild modal */}
            {showNewGuildForm
                ?
                <CreateNewNameForm
                    createNewEntry={createGuild}
                    closeModal={displayCreateGuildModal}
                    valueName={"guildName"}
                    placeholderName={"Guild Name"}
                    setSavedName={setSavedGuildName}
                    addSelectField={true}
                    selectOptions={guildAvatarImgs}
                    getSelectedValue={getSelectedValue}
                    selectLabel={'Guild Avatar'}
                />
                : null
            }

            {/* Confirming deleting of the guild modal */}
            {showConfirmationModal
                ?
                <ConfirmationModal
                    closeConfirmationModal={cancelDelete}
                    message={"**WARNING** All of the guild and campaign data will be lost. Do you still want this guild to end?"}
                    id={deleteGuildId}
                    confirm={deleteGuild}
                />
                : null
            }

            {/* showing a modal for adding and removing guild members */}
            {showEditGuildForm
                ?
                <GuildMembers
                    closeModal={displayEditGuild}
                    guild_id={guildId}
                />
                : null
            }

            {/* Section for creating a new guild */}
            <div className="dashboard-component-frame">
                <div>
                    <h3 className="dashboard-component-title">Start New Guild</h3>
                    <p className="dashboard-component-text">Want to be a dungeon master? Create a new guild and invite friends to join.
                    </p>
                    <button
                        className="dashboard-action-btn"
                        onClick={displayCreateGuildModal}
                    >
                        Create New Guild
                    </button>
                </div>
            </div>

            {/* Section for displaying existing guilds */}
            <div className="dashboard-component-frame">
                <h3 className="dashboard-component-title">Guilds you belong to:</h3>
                <p className="dashboard-component-text">Once you create the guild. Click on <span className="blue-highlighted-text">Manage button</span> to create an invitation link and manage guild members.</p>
                <p className="dashboard-component-text">* Guilds you created are marked as <span className="blue-highlighted-text">owner</span>.</p>

                <div className="divider"></div>

                <div className="dashboard-component-container">
                    {guilds
                        ?
                        guilds.map(data => (

                            <GuildsCard
                                key={data.guild_name}
                                id={data.guild_id}
                                name={data.guild_name}
                                owner={data.guild_owner}
                                img_data={data.guild_img}
                                deleteGuild={alertAboutDeleting}
                                displayEditGuild={displayEditGuild}
                                leaveGuild={leaveGuild}
                            />)
                        )
                        :
                        <div className="loader"></div>
                    }
                </div>
            </div>
        </div>
    )
}