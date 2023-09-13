import "./CharacterBuilder.css";
import { useState, useCallback, useEffect, useContext } from "react";
import User from "../../../API/api"
import AuthContext from "../../../Context/AuthContext"
import AvatarSelector from "./AvatarSelector";
import CharacterBaseInfo from "./CharacterBaseInfo"
import CharacterBaseStats from "./CharacterBaseStats";
import AvatarLibrary from "./AvatarLibrary";
import HitPointsArmorClass from "./HItPointsArmorClass";
import SavingThrows from "./SavingThrows";
import Skills from "./Skills";
import Equipment from "./Equipment";
import Attacks from "./Attacks";
import Spells from "./Spells";
import Proficiencies from "./Proficiencies";

const defaultImg = { url: `${process.env.PUBLIC_URL}/avatars/druid.png`, alt: 'druid' }

export default function CharacterBuilder({ closeModal, char_id, char_name, charToEditId, charToEditName, setUpdatedAvatar }) {
    const { currentUser, token } = useContext(AuthContext)
    const [baseStatsTab, setBaseStatsTab] = useState(true);
    const [appearenceTab, setAppearenceTab] = useState();

    const [avatar, setAvatar] = useState();
    const [showAvatarSelector, setShowAvatarSelector] = useState(false);
    // form data
    const [baseInfo, setBaseInfo] = useState({});
    const [baseStats, setBaseStats] = useState({});
    const [health, setHealth] = useState({});
    const [savingThrows, setSavingThrows] = useState({});
    const [skills, setSkills] = useState({});
    const [charEquipment, setCharEquipment] = useState({});
    const [weapons, setWeapons] = useState({});
    const [spells, setSpells] = useState({});
    const [proficiencies, setProficiencies] = useState({});

    // get all information about the character and then fillout information in the forms that exists
    useEffect(() => {
        async function getCharacterDetails() {
            if (char_id) {
                User.token = token;
                const { response } = await User.getCharactersInfo(char_id, currentUser);
                setBaseInfo(baseInfo => ({ ...response.charactersInfo }));
                setAvatar(response.avatar.img_url);
                setBaseStats(baseStats => ({ ...response.charBaseStats }));
                setHealth(health => ({ ...response.health }));
                setSavingThrows(savingThrows => ({ ...response.savingThrows }));
                setSkills(skills => ({ ...response.skills }));
                setCharEquipment(equipment => ({ ...response.equipment }));
                setWeapons(weapons => ({ ...response.weapons }));
                setSpells(spells => ({ ...response.spells }));
                setProficiencies(proficiencies => ({ ...response.proficiencies }))
            }
        }
        getCharacterDetails()
    }, [currentUser, char_id])

    // Manages tabs 
    const changeTabState = useCallback((e) => {
        if (e.target.id === "tab-stats") {
            setBaseStatsTab(true);
            setAppearenceTab(false);
        } else if (e.target.id === "tab-appearence") {
            setAppearenceTab(true);
            setBaseStatsTab(false);
        }
    })

    // close character builder modal
    const closeSelf = () => {
        closeModal();
    }

    // open avatar selector modal
    const openAvatarSelector = () => {
        setShowAvatarSelector(!showAvatarSelector);
    }

    char_id = char_id ? char_id : charToEditId;
    char_name = char_name ? char_name : charToEditName;

    return (

        <div className="character-builder-frame">
            {/* Exit button */}
            <div className="exit-button-holder">
                <button type="button" className="exit-modal" onClick={closeSelf}>X</button>
            </div>
            <p className="white-titles">Character Name: {char_name}</p>
            {/* Tabs */}
            <div className="character-tabs">
                <button className={baseStatsTab ? `character-tablinks active` : "character-tablinks"} id="tab-stats" onClick={changeTabState}>Base Info</button>
                <button className={appearenceTab ? `character-tablinks active` : "character-tablinks"} id="tab-appearence" onClick={changeTabState}>Attacks/Spells</button>
            </div>
            {baseStatsTab ?
                <div className="character-builder-tabs-container">
                    {showAvatarSelector
                        ?
                        <AvatarLibrary
                            closeModal={openAvatarSelector}
                            avatar={avatar}
                            setAvatar={setAvatar}
                            char_id={char_id}
                            setUpdatedAvatar={setUpdatedAvatar}
                        />
                        :
                        null
                    }
                    {/* Displays user's character avatar
                        Clicking on it opens the AvatarLibrary to chose a new avatar
                    */}
                    <AvatarSelector
                        openAvatarSelector={openAvatarSelector}
                        avatarImg={avatar}
                        char_id={char_id}
                    />
                    <HitPointsArmorClass
                        char_id={char_id}
                        health={health}
                    />
                    <CharacterBaseInfo
                        char_id={char_id}
                        baseInfo={baseInfo}
                    />
                    <SavingThrows
                        char_id={char_id}
                        savingThrows={savingThrows}
                    />
                    <CharacterBaseStats
                        char_id={char_id}
                        baseStats={baseStats}
                    />
                    <Skills
                        char_id={char_id}
                        skills={skills}
                    />
                    <Equipment
                        char_id={char_id}
                        charEquipment={charEquipment}
                    />
                </div>
                :
                null}

            {appearenceTab ?

                <div className="character-builder-tabs-container">
                    <Attacks
                        char_id={char_id}
                        weapons={weapons}
                    />
                    <Spells
                        char_id={char_id}
                        spells={spells}
                    />
                    <Proficiencies
                        char_id={char_id}
                        proficiencies={proficiencies}
                    />
                </div>
                :
                null}
        </div>
    )
}