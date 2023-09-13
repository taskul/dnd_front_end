import { useState, useContext, useEffect } from "react"
import AuthContext from "../../Context/AuthContext"
import "../User/CharacterDashboard/CharacterBuilder.css"
import "../Game/Chat.css"
import User from "../../API/api"

export default function UserThumbnail({ username, char_name, char_id, img_url, showCharacterSheet }) {
    const { currentUser, token } = useContext(AuthContext)
    const [charData, setCharData] = useState();

    useEffect(() => {
        async function getCharInfo() {
            if (char_id) {
                User.token = token;
                const response = await User.getCharactersInfo(char_id, username)
                setCharData(response)
            }
        }
        getCharInfo()
    }, [])


    // if there si a char_id then get the information about the character. 
    const openCharacterSheet = async () => {
        if (charData) {
            showCharacterSheet(charData, char_name)
        }

    }


    return (
        <fieldset className="user-thumbnail" onClick={openCharacterSheet}>
            <legend className="user-thumbnail-legend">{username}</legend>
            <img className="small-avatar" src={img_url} />
            <p>{char_name}</p>
        </fieldset>
    )
}