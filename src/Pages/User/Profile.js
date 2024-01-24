import User from "../../API/api";
import AuthContext from "../../Context/AuthContext"
import { useState, useContext, useEffect } from "react";
import "../../GeneralComponents/TextStyles.css"
import "../User/CharacterDashboard/CharacterBuilder.css"

export default function Profile() {
    const { currentUser, token } = useContext(AuthContext)
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        document.title = "DND DEN user profile"
     }, []);


    useEffect(() => {
        async function getUserInfo() {
            User.token = token;
            const response = await User.getCurrentUserInfo(currentUser)
            setUserInfo({ ...response.user })
        }
        getUserInfo()

    }, [])

    return (
        <div className="character-builder-frame">
            <div className="character-info">
                <h3 className="white-titles underlined">{userInfo.username}:</h3>
                <p className="white-titles">First Name: {userInfo.firstName ? userInfo.firstName : "--"}</p>
                <p className="white-titles">Last Name: {userInfo.lastName ? userInfo.lastName : "--"}</p>
                <p className="white-titles">email: {userInfo.email}</p>
            </div>
        </div>
    )
}
