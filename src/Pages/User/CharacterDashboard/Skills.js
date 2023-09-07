import { useFormik } from "formik";
import { useState, useEffect, useContext } from "react"
import AuthContext from "../../../Context/AuthContext"
import User from "../../../API/api"
import "./CharacterBuilder.css"
import "../../../GeneralComponents/Forms.css"
import "../../../GeneralComponents/TextStyles.css"
import "../../../GeneralComponents/Buttons.css"
import ConfirmationCheck from "../../../GeneralComponents/ConfirmationCheck";

export default function Skills({ char_id, skills }) {
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
            if (Object.keys(skills).length > 0) {
                formik.setValues({
                    acrobatics: skills.acrobatics,
                    animalHandling: skills.animalhandling,
                    arcana: skills.arcana,
                    athletics: skills.athletics,
                    deception: skills.deception,
                    history: skills.history,
                    insight: skills.insight,
                    intimidation: skills.intimidation,
                    investigation: skills.investigation,
                    medicine: skills.medicine,
                    nature: skills.nature,
                    perception: skills.perception,
                    performance: skills.performance,
                    persuasion: skills.persuasion,
                    religion: skills.religion,
                    sleightOfHand: skills.sleightofhand,
                    stealth: skills.stealth,
                    survival: skills.survival
                })
                setHasSaveData(true)
            }

        }
        getUserInfo()
    }, [skills])

    /** formik for input validation

    Note that we have to initialize ALL of fields with values. 
    These could come from props, but since we don’t want to prefill this form, just use an empty string. If we don’t do this, React will yell at us.
    We also pass in validate function with validators and what to do on form submit
    */
    const formik = useFormik({
        initialValues: {
            acrobatics: '',
            animalHandling: '',
            arcana: '',
            athletics: '',
            deception: '',
            history: '',
            insight: '',
            intimidation: '',
            investigation: '',
            medicine: '',
            nature: '',
            perception: '',
            performance: '',
            persuasion: '',
            religion: '',
            sleightOfHand: '',
            stealth: '',
            survival: ''
        },
        onSubmit: async (values) => {
            const { acrobatics, animalHandling, arcana, athletics, deception, history, insight, intimidation, investigation, medicine, nature, perception, performance, persuasion, religion, sleightOfHand, stealth, survival } = values;
            User.token = token;
            if (hasSaveData) {
                const response = User.updateCharacterSkills(char_id, acrobatics, animalHandling, arcana, athletics, deception, history, insight, intimidation, investigation, medicine, nature, perception, performance, persuasion, religion, sleightOfHand, stealth, survival, currentUser)
                showConfimrationCheckMark();
                return response;
            } else {
                const response = User.createCharacterSkills(char_id, acrobatics, animalHandling, arcana, athletics, deception, history, insight, intimidation, investigation, medicine, nature, perception, performance, persuasion, religion, sleightOfHand, stealth, survival, currentUser)
                showConfimrationCheckMark();
                setHasSaveData(true)
                return response;
            }
        }
    });

    return (
        <div className="character-section-halved">
            <p className="white-titles">Skills</p>
            <form
                className="character-base-form"
                onSubmit={formik.handleSubmit}
            >

                <div className="character-subsection">

                    <div className="form-input-frame">
                        <label
                            className="white-font smaller-font"
                            htmlFor="acrobatics">Acrobatics
                        </label>
                        <input
                            type="text"
                            id="acrobatics"
                            name="acrobatics"
                            placeholder="0"
                            className="form-input-shortest"
                            value={formik.values.acrobatics}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="form-input-frame">
                        <label
                            className="white-font smaller-font"
                            htmlFor="animalHandling">Animal Handling
                        </label>
                        <input
                            type="text"
                            id="animalHandling"
                            name="animalHandling"
                            placeholder="0"
                            className="form-input-shortest"
                            value={formik.values.animalHandling}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="form-input-frame">
                        <label
                            className="white-font smaller-font"
                            htmlFor="arcana">Arcana
                        </label>
                        <input
                            type="text"
                            id="arcana"
                            name="arcana"
                            placeholder="0"
                            className="form-input-shortest"
                            value={formik.values.arcana}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="form-input-frame">
                        <label
                            className="white-font smaller-font"
                            htmlFor="athletics">Athletics
                        </label>
                        <input
                            type="text"
                            id="athletics"
                            name="athletics"
                            placeholder="0"
                            className="form-input-shortest"
                            value={formik.values.athletics}
                            onChange={formik.handleChange}
                        />
                    </div>

                    <div className="form-input-frame">
                        <label
                            className="white-font smaller-font"
                            htmlFor="deception">Deception
                        </label>
                        <input
                            type="text"
                            id="deception"
                            name="deception"
                            placeholder="0"
                            className="form-input-shortest"
                            value={formik.values.deception}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="form-input-frame">
                        <label
                            className="white-font smaller-font"
                            htmlFor="history">History
                        </label>
                        <input
                            type="text"
                            id="history"
                            name="history"
                            placeholder="0"
                            className="form-input-shortest"
                            value={formik.values.history}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="form-input-frame">
                        <label
                            className="white-font smaller-font"
                            htmlFor="insight">Insight
                        </label>
                        <input
                            type="text"
                            id="insight"
                            name="insight"
                            placeholder="0"
                            className="form-input-shortest"
                            value={formik.values.insight}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="form-input-frame">
                        <label
                            className="white-font smaller-font"
                            htmlFor="intimidation">Intimidation
                        </label>
                        <input
                            type="text"
                            id="intimidation"
                            name="intimidation"
                            placeholder="0"
                            className="form-input-shortest"
                            value={formik.values.intimidation}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="form-input-frame">
                        <label
                            className="white-font smaller-font"
                            htmlFor="investigation">Investigation
                        </label>
                        <input
                            type="text"
                            id="investigation"
                            name="investigation"
                            placeholder="0"
                            className="form-input-shortest"
                            value={formik.values.investigation}
                            onChange={formik.handleChange}
                        />
                    </div>

                </div>


                <div className="character-subsection">
                    <div className="form-input-frame">
                        <label
                            className="white-font smaller-font"
                            htmlFor="medicine">Medicine
                        </label>
                        <input
                            type="text"
                            id="medicine"
                            name="medicine"
                            placeholder="0"
                            className="form-input-shortest"
                            value={formik.values.medicine}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="form-input-frame">
                        <label
                            className="white-font smaller-font"
                            htmlFor="nature">Nature
                        </label>
                        <input
                            type="text"
                            id="nature"
                            name="nature"
                            placeholder="0"
                            className="form-input-shortest"
                            value={formik.values.nature}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="form-input-frame">
                        <label
                            className="white-font smaller-font"
                            htmlFor="perception">Perception
                        </label>
                        <input
                            type="text"
                            id="perception"
                            name="perception"
                            placeholder="0"
                            className="form-input-shortest"
                            value={formik.values.perception}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="form-input-frame">
                        <label
                            className="white-font smaller-font"
                            htmlFor="performance">Performance
                        </label>
                        <input
                            type="text"
                            id="performance"
                            name="performance"
                            placeholder="0"
                            className="form-input-shortest"
                            value={formik.values.performance}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="form-input-frame">
                        <label
                            className="white-font smaller-font"
                            htmlFor="persuasion">Persuasion
                        </label>
                        <input
                            type="text"
                            id="persuasion"
                            name="persuasion"
                            placeholder="0"
                            className="form-input-shortest"
                            value={formik.values.persuasion}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="form-input-frame">
                        <label
                            className="white-font smaller-font"
                            htmlFor="religion">Religion
                        </label>
                        <input
                            type="text"
                            id="religion"
                            name="religion"
                            placeholder="0"
                            className="form-input-shortest"
                            value={formik.values.religion}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="form-input-frame">
                        <label
                            className="white-font smaller-font"
                            htmlFor="sleightOfHand">Sleight Of Hand
                        </label>
                        <input
                            type="text"
                            id="sleightOfHand"
                            name="sleightOfHand"
                            placeholder="0"
                            className="form-input-shortest"
                            value={formik.values.sleightOfHand}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="form-input-frame">
                        <label
                            className="white-font smaller-font"
                            htmlFor="stealth">Stealth
                        </label>
                        <input
                            type="text"
                            id="stealth"
                            name="stealth"
                            placeholder="0"
                            className="form-input-shortest"
                            value={formik.values.stealth}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="form-input-frame">
                        <label
                            className="white-font smaller-font"
                            htmlFor="survival">Survival
                        </label>
                        <input
                            type="text"
                            id="survival"
                            name="survival"
                            placeholder="0"
                            className="form-input-shortest"
                            value={formik.values.survival}
                            onChange={formik.handleChange}
                        />
                    </div>


                </div>
                <div className="character-section">
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
            </form >
            {confirmationVisible && <ConfirmationCheck />}
        </div >
    )
}