import { useEffect, useContext, useState } from "react"
import User from "../../../API/api"
import AuthContext from "../../../Context/AuthContext"
import "../Dashboard.css"
import "../../../GeneralComponents/Buttons.css"
import "../../../GeneralComponents/Loaders.css";
import "../../../GeneralComponents/TextStyles.css";
import CreateCampaignModal from "./CreateCampaignModal";
import CampaignCard from "./CampaignCard";
import ConfirmationModal from "../../../GeneralComponents/ConfirmationModal";
import AddPlayers from "./AddPlayers";

export default function CampaignManager() {
    const [existingCampaigns, setExistingCampaigns] = useState([]);
    const { currentUser, token } = useContext(AuthContext)
    // campaigns are assigned to guilds, so we need to get guilds
    const [guilds, setGuilds] = useState([]);
    const [showNewCampaignModal, setShowNewCampaignModal] = useState(false);
    // used to refresh use effect and show the new campaign right away when created
    const [addedCampaign, setAddedCampaign] = useState([]);
    // deleting campaign related states
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [deleteCampaignId, setDeleteCampaignId] = useState();

    // adding Players
    const [showAddPlayers, setShowAddPlayers] = useState(false);
    const [guildMembers, setGuildMembers] = useState([]);
    // holds the campaign id that will be used to add new players
    const [addingPlayersCampaign, setAddingPlayersComapin] = useState();
    const [guildIdForCampaign, setGuildIdForCampaign] = useState();

    useEffect(() => {
        document.title = "Campaign manager page"
     }, []);


    useEffect(() => {
        async function getGuildsInfo() {
            User.token = token;
            const { response } = await User.getGuild(currentUser)
            const { campaigns } = await User.getCampaign(currentUser)

            setGuilds(guilds => ([
                ...response
            ]))
            setExistingCampaigns(existingCampaigns => ([
                ...campaigns
            ]))
        }
        getGuildsInfo()
    }, [addedCampaign])

    // Manging creating a campaign
    const newCampaignModal = () => {
        setShowNewCampaignModal(!showNewCampaignModal)
    }

    const createCampaign = async (formData, guild_id) => {
        User.token = token;
        if (guild_id) {
            const response = await User.createCampaign(formData, guild_id)
            const { campaign_id, campaign_name } = response.newCampaign;
            const newMember = await User.addCampaignMember(campaign_id, guild_id, currentUser, true)
            setAddedCampaign(response)
        }
    }

    // adding Playsers
    const addingPlayers = (users, campaign_id, guid_id) => {
        setGuildMembers(users)
        setAddingPlayersComapin(campaign_id)
        setGuildIdForCampaign(guid_id)
        setShowAddPlayers(!showAddPlayers)
    }

    const closeAddingPlayersModal = () => {
        setShowAddPlayers(!showAddPlayers)
        setAddingPlayersComapin(null)
        setGuildMembers([])
    }

    // Managing deleting campaign
    const alertAboutDeleting = (campaign_id) => {
        setShowConfirmationModal(!showConfirmationModal);
        setDeleteCampaignId(campaign_id);
    }

    const cancelDelete = () => {
        setShowConfirmationModal(!showConfirmationModal);
        setDeleteCampaignId(null)
    }

    const deleteCampaign = async (id) => {
        User.token = token;
        const response = await User.deleteCampaign(id, currentUser);
        // filter campaigns to exclude item with campaign_id matching id
        setExistingCampaigns(existingCampaigns.filter(c => c.campaign_id !== id));
        return response;
    }


    return (
        <div>
            {/* Show add new players modal */}
            {showAddPlayers
                ?
                <AddPlayers
                    addingPlayers={addingPlayers}
                    closeModal={closeAddingPlayersModal}
                    guildMembers={guildMembers}
                    campaign_id={addingPlayersCampaign}
                    guid_id={guildIdForCampaign}
                />
                :
                null
            }

            {showNewCampaignModal
                ?
                <CreateCampaignModal
                    guilds={guilds}
                    createCampaign={createCampaign}
                    closeModal={setShowNewCampaignModal}
                    addedCampaign={addedCampaign}
                    setAddedCampaign={setAddedCampaign}
                />
                :
                null
            }

            {showConfirmationModal
                ?
                <ConfirmationModal
                    closeConfirmationModal={cancelDelete}
                    message={"**Warning** All of the campaign data will be lost. Do you still want this campaign to end?"}
                    id={deleteCampaignId}
                    confirm={deleteCampaign}
                />
                : null
            };


            <div className="dashboard-component-frame">
                <div>
                    <h3 className="dashboard-component-title">Start New Campaign</h3>
                    <p className="dashboard-component-text">Want to be a dungeon master? Create a new campaign and invite friends to join.
                    </p>
                    <button
                        className="dashboard-action-btn"
                        onClick={newCampaignModal}
                    >
                        Create New Campaign
                    </button>
                </div>
            </div>

            <div className="dashboard-component-frame">
                <h3 className="dashboard-component-title">Campaigns you are part of:</h3>
                <p className="dashboard-component-text">* Campaigns you created are marked as <span className="blue-highlighted-text">owner</span>.</p>
                <div className="divider"></div>
                <div className="dashboard-component-container">
                    {existingCampaigns
                        ?
                        existingCampaigns.map(data =>
                            <CampaignCard
                                key={data.campaign_id}
                                guild_id={data.guild_id}
                                guild_name={data.guild_name}
                                guild_img={data.guild_img}
                                campaign_owner={data.campaign_owner}
                                campaign_id={data.campaign_id}
                                campaign_name={data.campaign_name}
                                deleteCampaign={alertAboutDeleting}
                                addingPlayers={addingPlayers}
                            />
                        )
                        :
                        <div className="loader"></div>
                    }
                </div>
            </div>
        </div>
    )
}