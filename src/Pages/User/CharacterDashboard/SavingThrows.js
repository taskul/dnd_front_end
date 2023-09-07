import { useFormik } from "formik";
import { useState, useEffect, useContext } from "react"
import AuthContext from "../../../Context/AuthContext"
import User from "../../../API/api"
import "./CharacterBuilder.css"
import "../../../GeneralComponents/Forms.css"
import "../../../GeneralComponents/TextStyles.css"
import "../../../GeneralComponents/Buttons.css"
import ConfirmationCheck from "../../../GeneralComponents/ConfirmationCheck";

export default function SavingThrows({ char_id, savingThrows }) {
    const { currentUser, token } = useContext(AuthContext)
    const [hasSaveData, setHasSaveData] = useState(false);

    const [confirmationVisible, setConfirmationVisible] = useState(false);
    // controls visibility of the confirmation check mark
    const showConfimrationCheckMark = () => {
        setConfirmationVisible(true);

        setTimeout(() => {
            setConfirmationVisible(false);
        }, 2000);
    }


    useEffect(() => {
        async function getUserInfo() {
            if (Object.keys(savingThrows).length > 0) {
                formik.setValues({
                    strength: savingThrows.str,
                    dexterity: savingThrows.dex,
                    constitution: savingThrows.con,
                    intelligence: savingThrows.intel,
                    wisdom: savingThrows.wis,
                    charisma: savingThrows.cha
                })
                setHasSaveData(true)
            }

        }
        getUserInfo()
    }, [savingThrows])

    /** formik for input validation

    Note that we have to initialize ALL of fields with values. 
    These could come from props, but since we don’t want to prefill this form, just use an empty string. If we don’t do this, React will yell at us.
    We also pass in validate function with validators and what to do on form submit
    */
    const formik = useFormik({
        initialValues: {
            strength: '',
            dexterity: '',
            constitution: '',
            intelligence: '',
            wisdom: '',
            charisma: ''
        },
        onSubmit: async (values) => {
            const { strength, dexterity, constitution, intelligence, wisdom, charisma } = values;
            User.token = token;
            if (hasSaveData) {
                const response = User.updateCharacterSavingThrows(char_id, strength, dexterity, constitution, intelligence, wisdom, charisma, currentUser)
                showConfimrationCheckMark();
                return response;
            } else {
                const response = User.createCharacterSavingThrows(char_id, strength, dexterity, constitution, intelligence, wisdom, charisma, currentUser)
                showConfimrationCheckMark();
                setHasSaveData(true)
                return response;
            }
        }

    });

    return (
        <div className="character-section-halved">

            <p className="white-font smaller-font">Saving Throws</p>
            <form
                className="character-base-form"
                onSubmit={formik.handleSubmit}
            >
                <div className="character-subsection">



                    <div className="form-input-frame">
                        <label
                            className="white-font smaller-font"
                            htmlFor="strength">Str
                        </label>
                        <input
                            type="text"
                            id="strength"
                            name="strength"
                            placeholder="0"
                            className="form-input-short"
                            value={formik.values.strength}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="form-input-frame">
                        <label
                            className="white-font smaller-font"
                            htmlFor="dexterity">Dex
                        </label>
                        <input
                            type="text"
                            id="dexterity"
                            name="dexterity"
                            placeholder="0"
                            className="form-input-short"
                            value={formik.values.dexterity}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="form-input-frame">
                        <label
                            className="white-font smaller-font"
                            htmlFor="constitution">Con
                        </label>
                        <input
                            type="text"
                            id="constitution"
                            name="constitution"
                            placeholder="0"
                            className="form-input-short"
                            value={formik.values.constitution}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="form-input-frame">
                        <label
                            className="white-font smaller-font"
                            htmlFor="intelligence">Int
                        </label>
                        <input
                            type="text"
                            id="intelligence"
                            name="intelligence"
                            placeholder="0"
                            className="form-input-short"
                            value={formik.values.intelligence}
                            onChange={formik.handleChange}
                        />
                    </div>

                </div>


                <div className="character-subsection">
                    <div className="form-input-frame">
                        <label
                            className="white-font smaller-font"
                            htmlFor="wisdom">Wis
                        </label>
                        <input
                            type="text"
                            id="wisdom"
                            name="wisdom"
                            placeholder="0"
                            className="form-input-short"
                            value={formik.values.wisdom}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="form-input-frame">
                        <label
                            className="white-font smaller-font"
                            htmlFor="charisma">Cha
                        </label>
                        <input
                            type="text"
                            id="charisma"
                            name="charisma"
                            placeholder="0"
                            className="form-input-short"
                            value={formik.values.charisma}
                            onChange={formik.handleChange}
                        />
                    </div>

                    <button
                        className="action-button"
                        type="submit"
                    >
                        {hasSaveData
                            ?
                            "Update"
                            :
                            "Save"
                        }

                    </button>

                </div>
            </form>
            {confirmationVisible && <ConfirmationCheck />}
        </div>
    )
}