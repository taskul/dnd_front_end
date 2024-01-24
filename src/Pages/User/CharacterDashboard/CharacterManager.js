import { useEffect, useContext, useState } from "react"
import User from "../../../API/api"
import AuthContext from "../../../Context/AuthContext"
import "../Dashboard.css"
import "../../../GeneralComponents/Buttons.css"
import CharacterBuilder from "./CharacterBuilder";
import NewCharacter from "./NewCharacter"
import CharacterCard from "./CharacterCard"
import ConfirmationModal from "../../../GeneralComponents/ConfirmationModal"

export default function CharacterManager() {
    const { currentUser, token } = useContext(AuthContext)
    // showing forms
    // creating new character name states
    const [showNewCharName, setShowNewCharName] = useState(false);
    const [showNewCharacterForm, setShowNewCharacterForm] = useState(false);

    // all existing characters are kept in this state
    const [characters, setCharacters] = useState([])

    // used for creating new character
    const [charId, setCharId] = useState('');
    const [charName, setCharName] = useState('');
    // user for editing existing character
    const [charToEditId, setCharToEditId] = useState('');
    const [charToEditName, setCharToEditName] = useState('');

    // delete character modal
    const [showDeleteCharConfirmation, setShowDeleteCharConfirmation] = useState(false)
    const [deleteCharId, setDeleteCharId] = useState();
    // updating a change to avatar
    const [updatedAvatar, setUpdatedAvatar] = useState();

    useEffect(() => {
        document.title = "Character builder page"
     }, []);


    // get a list of existing characters
    useEffect(() => {
        async function getCharacters() {
            User.token = token;
            const { response } = await User.getCharacters(currentUser)

            setCharacters(characters => ([
                ...response
            ]))
        }
        getCharacters()
    }, [currentUser, charToEditId, charId, updatedAvatar])


    // show a create new character form which is used to create a new entry in the database with char_id and char_name, that is then used in character builder modal
    const showNewCharNameForm = () => {
        setShowNewCharName(!showNewCharName)
    }

    // show character builder
    const showCharacterBuilder = () => {
        setShowNewCharacterForm(!showNewCharacterForm)
    }

    // hides New character name form, and shows the character builder forms
    const createCharacter = async () => {
        setShowNewCharName(!showNewCharName)
        setShowNewCharacterForm(!showNewCharacterForm)

    }

    // editing character
    const editCharacter = async (char_id, char_name) => {
        const data = { char_id, char_name }
        setCharToEditId(char_id)
        setCharToEditName(char_name)

        setShowNewCharacterForm(!showNewCharacterForm)
    }

    // display modal to confirm or decline character deletion
    const alertAboutDeleting = (id) => {
        setShowDeleteCharConfirmation(!showDeleteCharConfirmation);
        setDeleteCharId(id);
    }

    // deleting character
    const deleteChar = async (char_id) => {
        User.token = token;
        const response = await User.deleteCharacter(char_id, currentUser);
        setShowDeleteCharConfirmation(!showDeleteCharConfirmation);
        if (response) {
            setCharacters(characters.filter(c => c.char_id !== char_id));
            return response;
        }
    }

    // cancelling of deletion of the character
    const cancelDelete = () => {
        setShowDeleteCharConfirmation(!showDeleteCharConfirmation)
    }

    return (
        <div>

            {showDeleteCharConfirmation
                ?
                <ConfirmationModal
                    closeConfirmationModal={cancelDelete}
                    message={"**WARNING** All of the character data will be lost. Do you still want to eliminate this character?"}
                    id={deleteCharId}
                    confirm={deleteChar}
                />
                :
                null
            }


            {/* first show create new character form */}
            {showNewCharName
                ?
                <NewCharacter
                    closeModal={showNewCharNameForm}
                    showCharacterForm={createCharacter}
                    setCharId={setCharId}
                    setCharName={setCharName}
                />
                :
                null
            }


            {/* Showing character builder form */}
            {showNewCharacterForm
                ?
                <CharacterBuilder
                    closeModal={showCharacterBuilder}
                    char_id={charId}
                    char_name={charName}
                    charToEditId={charToEditId}
                    charToEditName={charToEditName}
                    setUpdatedAvatar={setUpdatedAvatar}
                />
                : null
            }

            <div className="dashboard-component-frame">
                <div>
                    <h3 className="dashboard-component-title">Create New Character</h3>
                    <button
                        className="dashboard-action-btn"
                        onClick={showNewCharNameForm}
                    >
                        Create New Character
                    </button>
                </div>
            </div>

            <div className="dashboard-component-frame">
                <h3 className="dashboard-component-title">Your Characters</h3>
                {characters.map(data =>
                    <CharacterCard
                        key={data.char_id}
                        char_id={data.char_id}
                        char_name={data.char_name}
                        img_url={data.img_url}
                        editCharacter={editCharacter}
                        deleteChar={alertAboutDeleting}
                    />
                )}
            </div>
        </div>
    )
}