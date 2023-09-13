import { useFormik } from "formik";
import { useState, useEffect, useContext } from "react"
import AuthContext from "../../../Context/AuthContext"
import "./CharacterBuilder.css"
import User from "../../../API/api"
import "../../../GeneralComponents/Forms.css"
import "../../../GeneralComponents/TextStyles.css"
import "../../../GeneralComponents/Buttons.css"
import ConfirmationCheck from "../../../GeneralComponents/ConfirmationCheck";

export default function CharacterBaseInfo({ char_id, baseInfo }) {
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
            if (Object.keys(baseInfo).length > 0) {
                formik.setValues({
                    race: baseInfo.char_race,
                    alignment: baseInfo.char_alignment,
                    charClass: baseInfo.char_class,
                    expirience: baseInfo.exp_points,
                    level: baseInfo.char_level
                })
                setHasSaveData(true)
            }

        }
        getUserInfo()
    }, [baseInfo])

    /** formik for input validation
     
    Note that we have to initialize ALL of fields with values. 
    These could come from props, but since we don’t want to prefill this form, just use an empty string. If we don’t do this, React will yell at us.
    We also pass in validate function with validators and what to do on form submit
    */
    const formik = useFormik({
        initialValues: {
            race: '',
            alignment: '',
            charClass: '',
            expirience: '',
            level: ''
        },
        onSubmit: async (values) => {
            const { race, alignment, charClass, expirience, level } = values;
            User.token = token;
            if (hasSaveData) {
                const response = User.updateCharacterInfo(race, alignment, charClass, expirience, level, char_id, currentUser)
                showConfimrationCheckMark();
                return response;
            } else {
                const response = User.createCharacterInfo(char_id, race, alignment, charClass, expirience, level, currentUser)
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
                    <input
                        type="text"
                        id="race"
                        name="race"
                        placeholder="Race"
                        className="form-input"
                        value={formik.values.race}
                        onChange={formik.handleChange}
                    />
                    <input
                        type="text"
                        id="alignment"
                        name="alignment"
                        placeholder="Alignment"
                        className="form-input"
                        value={formik.values.alignment}
                        onChange={formik.handleChange}
                    />
                    <input
                        type="text"
                        id="charClass"
                        name="charClass"
                        placeholder="Class"
                        className="form-input"
                        value={formik.values.charClass}
                        onChange={formik.handleChange}
                    />
                </div>
                <div className="character-subsection">
                    <div className="form-input-frame">
                        <label
                            className="white-font smaller-font"
                            htmlFor="expirience">Exp
                        </label>
                        <input
                            type="text"
                            id="expirience"
                            name="expirience"
                            placeholder="0"
                            className="form-input-short"
                            value={formik.values.expirience}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="form-input-frame">
                        <label
                            className="white-font smaller-font"
                            htmlFor="level">Level
                        </label>
                        <input
                            type="text"
                            id="level"
                            name="level"
                            placeholder="0"
                            className="form-input-short"
                            value={formik.values.level}
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
                        }</button>
                </div>




            </form>
            {confirmationVisible && <ConfirmationCheck />}
        </div>
    )
}