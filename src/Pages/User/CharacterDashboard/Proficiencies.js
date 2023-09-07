import { useFormik } from "formik";
import { useState, useEffect, useContext } from "react"
import AuthContext from "../../../Context/AuthContext"
import User from "../../../API/api"
import "./CharacterBuilder.css"
import "../../../GeneralComponents/Forms.css"
import "../../../GeneralComponents/TextStyles.css"
import "../../../GeneralComponents/Buttons.css"
import ConfirmationCheck from "../../../GeneralComponents/ConfirmationCheck";

export default function Proficiencies({ char_id, proficiencies }) {
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
            if (Object.keys(proficiencies).length > 0) {
                formik.setValues({
                    proficiencies: proficiencies.proficiencies
                })
                setHasSaveData(true)
            }

        }
        getUserInfo()
    }, [proficiencies])

    /** formik for input validation

    Note that we have to initialize ALL of fields with values. 
    These could come from props, but since we don’t want to prefill this form, just use an empty string. If we don’t do this, React will yell at us.
    We also pass in validate function with validators and what to do on form submit
    */
    const formik = useFormik({
        initialValues: {
            proficiencies: ''
        },
        onSubmit: async (values) => {
            const { proficiencies } = values;
            User.token = token;
            if (hasSaveData) {
                const response = User.updateCharacterProficiencies(char_id, proficiencies, currentUser)
                showConfimrationCheckMark();
                return response;
            } else {
                const response = User.createCharacterProficiencies(char_id, proficiencies, currentUser)
                showConfimrationCheckMark();
                setHasSaveData(true)
                return response;
            }
        }
    });

    return (
        <div className="character-section-halved">
            {/* 
            <p className="white-titles">Euipment</p> */}
            <form
                className="character-base-form"
                onSubmit={formik.handleSubmit}
            >

                <div className="character-subsection">
                    <label
                        className="white-font smaller-font"
                        htmlFor="proficiencies">Proficiencies
                    </label>
                    <div className="form-input-frame">

                        <textarea
                            type="text"
                            id="proficiencies"
                            name="proficiencies"
                            placeholder="Proficiencies"
                            className="form-textarea"
                            value={formik.values.proficiencies}
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