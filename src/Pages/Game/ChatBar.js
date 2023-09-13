import React, { useState, useEffect, useContext } from 'react'
import "./Chat.css"
import AuthContext from "../../Context/AuthContext"
import "../../Pages/User/Dashboard.css"
import "../User/CharacterDashboard/CharacterBuilder.css"
import CharacterSheet from './CharacterSheet'
import User from "../../API/api"
import SelectCharacters from './SelectCharacters'
import CharacterBuilder from '../User/CharacterDashboard/CharacterBuilder'
import UserThumbnail from './UserThumbnail'
import SelectMap from './SelectMap'
import ChatMap from './ChatMap'
import DicePanel from './DicePanel'
import { v4 as uuidv4 } from 'uuid';

const ChatBar = ({ socket, users, chatId, room, gameMaps, setGameMaps, setMessages }) => {
    const { currentUser, token } = useContext(AuthContext);
    const [displayUsers, setDisplayUsers] = useState(false);

    // Managing game character
    const [gameCharacter, setGameCharacter] = useState();
    const [showSelectCharacter, setShowSelectCharacter] = useState(false);
    const [allUserCharacters, setAllUserCharacters] = useState();
    const [selectedCharacter, setSelectedCharacter] = useState(false);
    const [displayCharacterBuilder, setDisplayCharacterBuilder] = useState(false);

    // Character sheets for players
    const [characters, setCharacters] = useState({});
    const [displayCharacterSheet, setDisplayCharacterSheet] = useState(false);
    const [charSheetData, setCharSheetData] = useState();
    const [charSheetName, setCharSheetName] = useState();

    // Maps
    const [availableMaps, setAvailableMaps] = useState();
    const [displayAvailableMaps, setDisplayAvailableMaps] = useState();
    const [mapAssets, setMapAssets] = useState({});
    const [showMap, setShowMap] = useState(false)

    // Dice
    const [displayDice, setDisplayDice] = useState(false);


    // get all characters that user has created
    useEffect(() => {
        async function getCharacters() {
            User.token = token;
            let { response } = await User.getCharacters(currentUser)
            setAllUserCharacters(response)
        }
        getCharacters()
    }, [])

    // set new game character
    useEffect(() => {
        async function getGameChar() {
            User.token = token;
            let { character } = await User.getChatCharacter(chatId, currentUser)
            setGameCharacter(character)
        }
        getGameChar()
    }, [selectedCharacter])

    // this gets users and character info that is used to display character sheets. 
    useEffect(() => {
        async function getCharacters() {
            const charArr = [];
            for (let user of users) {
                let response = await User.getChatCharacter(chatId, user)
                let user_char;
                let avatar;
                if (Object.keys(response).length > 0) {
                    user_char = response.character
                    let response2 = await User.getCharactersAvatar(user_char.char_id)
                    avatar = response2.response.img_url
                }
                charArr.push({ username: user, user_char, avatar })
            }
            setCharacters(charArr)
        }
        getCharacters()
    }, [users, displayUsers])

    useEffect(() => {
        async function getMaps() {
            User.token = token;
            const { response } = await User.getMap(currentUser);
            setAvailableMaps(response)
        }
        getMaps()
    }, [])


    // tracking chat messages
    useEffect(() => {
        socket.on("get map", data => setGameMaps(gameMaps => [...gameMaps, { data }]))
        return () => {
            // Clean up socket event listeners when the component unmounts
            // helps improve performance
            socket.off("get map");
        };
    }, [socket])

    // viewing team members

    const showUsers = () => {
        setDisplayUsers(!displayUsers)
    }

    // viewing own characteres
    const showCharacter = () => {
        setShowSelectCharacter(!showSelectCharacter)
    }

    const showCharacterBuilder = () => {
        setDisplayCharacterBuilder(!displayCharacterBuilder)
    }

    const closeCharacterBuilder = () => {
        setDisplayCharacterBuilder(!displayCharacterBuilder)
    }

    // viewing characters of other players and own character
    const showCharacterSheet = (data, char_name) => {
        setDisplayCharacterSheet(!displayCharacterSheet)
        setCharSheetData(data.response)
        setCharSheetName(char_name)
    }

    const closeCharacterSheet = () => {
        setDisplayCharacterSheet(false)
    }

    // showing available maps.
    const showAvailableMaps = () => {
        setDisplayAvailableMaps(!displayAvailableMaps)
        setShowMap(false)
    }

    const openMap = () => {
        setShowMap(!showMap)
    }

    // showing dice 
    const showDice = () => {
        setDisplayDice(!displayDice)
    }

    return (
        <div>
            {/* Show dice pannel */}
            {displayDice
                ?
                <DicePanel
                    closeModal={showDice}
                    socket={socket}
                    chat_id={chatId}
                    room={room}
                />
                :
                null
            }



            {/* Showing users the map */}
            {showMap
                ?
                <ChatMap
                    mapAssets={mapAssets}
                    closeModal={openMap}
                    chat_id={chatId}
                />
                :
                null
            }

            {/* Showing users maps they have created */}
            {displayAvailableMaps
                ?
                <SelectMap
                    availableMaps={availableMaps}
                    closeModal={showAvailableMaps}
                    gameMaps={gameMaps}
                    room={room}
                    socket={socket}
                    setMapAssets={setMapAssets}
                    openMap={openMap}
                />
                :
                null
            }
            {showSelectCharacter
                ?
                <SelectCharacters
                    allUserCharacters={allUserCharacters}
                    closeModal={showCharacter}
                    chatId={chatId}
                    setSelectedCharacter={setSelectedCharacter}
                />
                :
                null
            }

            {displayCharacterBuilder
                ?
                selectedCharacter || gameCharacter
                    ?
                    <CharacterBuilder
                        char_id={gameCharacter ? gameCharacter.char_id : ""}
                        closeModal={closeCharacterBuilder}
                        char_name={gameCharacter ? gameCharacter.char_name : ""}
                    />
                    :
                    <div className="center-content">
                        <div className="character-library-frame"
                            onClick={closeCharacterBuilder}
                        >
                            Please Select a character first or create a new one in a user dashboard.
                        </div>
                    </div>
                :
                null
            }


            {displayUsers
                ?
                <div className='dashboard-expanding-pannel'>
                    {characters.map(char =>
                        <UserThumbnail
                            key={uuidv4()}
                            username={char.username}
                            char_name={char.user_char ? char.user_char.char_name : "No character yet"}
                            char_id={char.user_char ? char.user_char.char_id : ""}
                            img_url={char.avatar ? char.avatar : process.env.PUBLIC_URL + "/avatars/blank_avatar.png"}
                            showCharacterSheet={showCharacterSheet}
                        />

                    )}
                    <div className="exit-button-at-bottom">
                        {/* Exit button */}
                        <button className="exit-modal-blue" onClick={showUsers}>X</button>
                    </div>
                </div >
                :
                null
            }

            {displayCharacterSheet
                ?
                <CharacterSheet
                    closeModal={closeCharacterSheet}
                    char_info={charSheetData}
                    char_name={charSheetName}
                />
                :
                null
            }

            <div className='dashboard-side-menu'>
                <div className="dashboard-side-menu">
                    <div className="dahsboard-btn-link">
                        <button
                            className="dashboard-btn"
                            onClick={showUsers}
                        >
                            Your team
                        </button>
                    </div>

                    <div className="dahsboard-btn-link">
                        <button
                            className="dashboard-btn"
                            onClick={showCharacterBuilder}
                        >
                            Character
                        </button>
                    </div>

                    <div className="dahsboard-btn-link">
                        <button
                            className="dashboard-btn"
                            onClick={showDice}
                        >
                            Roll Dice
                        </button>
                    </div>
                    <div className="dahsboard-btn-link">
                        <button
                            className="dashboard-btn"
                            onClick={showAvailableMaps}
                        >
                            Maps
                        </button>
                    </div>
                    <div className="dahsboard-btn-link">
                        <button
                            className="dashboard-btn"
                            onClick={showCharacter}
                        >
                            Select Character
                        </button>
                    </div>
                </div >
            </div>
        </div>
    )
}

export default ChatBar;

