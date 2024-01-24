import "../Pages/User/CharacterDashboard/CharacterBuilder.css"
import "../GeneralComponents/TextStyles.css"

export default function NotFound() {
    return (
        <div className="character-builder-frame">
            <h1 className="large-bold">I can't seem to find what you are looking for.</h1>
            <img
                className="home-page-img"
                src={process.env.PUBLIC_URL + "not_found.png"}
                alt="not found"
            />

        </div>
    )
}