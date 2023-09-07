import { useFormik } from "formik";
import { useState, useEffect, useContext } from "react"
import AuthContext from "../../../Context/AuthContext"
import User from "../../../API/api"
import "./CharacterBuilder.css"
import "../../../GeneralComponents/Forms.css"
import "../../../GeneralComponents/TextStyles.css"
import "../../../GeneralComponents/Buttons.css"
import ConfirmationCheck from "../../../GeneralComponents/ConfirmationCheck";

export default function Spells({ char_id, spells }) {
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
            if (Object.keys(spells).length > 0) {
                formik.setValues({
                    spells: spells.spells
                })
                setHasSaveData(true)
            }

        }
        getUserInfo()
    }, [spells])


    /** formik for input validation

    Note that we have to initialize ALL of fields with values. 
    These could come from props, but since we don’t want to prefill this form, just use an empty string. If we don’t do this, React will yell at us.
    We also pass in validate function with validators and what to do on form submit
    */
    const formik = useFormik({
        initialValues: {
            spells: ''
        },
        onSubmit: async (values) => {
            const { spells } = values;
            User.token = token;
            if (hasSaveData) {
                const response = User.updateCharacterSpells(char_id, spells, currentUser)
                showConfimrationCheckMark();
                return response;
            } else {
                const response = User.createCharacterSpells(char_id, spells, currentUser)
                showConfimrationCheckMark();
                setHasSaveData(true)
                return response;
            }
        }
    });

    return (
        <div className="character-section-halved">
            <form
                className="character-base-form"
                onSubmit={formik.handleSubmit}
            >

                <div className="character-subsection">
                    <label
                        className="white-font smaller-font"
                        htmlFor="spells">Spells
                    </label>
                    <div className="form-input-frame">

                        <textarea
                            type="text"
                            id="spells"
                            name="spells"
                            placeholder="Spells"
                            className="form-textarea"
                            value={formik.values.spells}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="character-subsection">

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
                </div>
            </form>
            {confirmationVisible && <ConfirmationCheck />}
        </div>
    )
}