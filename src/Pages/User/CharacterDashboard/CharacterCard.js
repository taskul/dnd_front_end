import "../DashboardCard.css"
import { useEffect, useState, useContext } from "react";
import User from "../../../API/api";


export default function CharacterCard({ char_id, char_name, img_url, editCharacter, deleteChar }) {

    const handleEditChar = () => {
        editCharacter(char_id, char_name)
    }

    const handleDelete = () => {
        deleteChar(char_id);
    }

    return (
        <fieldset>

            <div className="component-card" >
                <p className="card-text">Character: {char_name}</p>
                {/* Checks to see if the user is the owner of the guild and if they are allowed to manage guild or not
            */}
                <img
                    className="avatar-img-thumbnail"
                    src={img_url}
                    alt="Character avatar"
                />

                <div className="card-btn-holder">
                    <button
                        className="component-card-btn edit-btn"
                        onClick={handleEditChar}
                    >Edit</button>
                    <button
                        className="component-card-btn delete-btn"
                        onClick={handleDelete}
                    >Delete</button>
                </div>
            </div>
        </fieldset>
    )
}