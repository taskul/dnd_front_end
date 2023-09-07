import { useFormik } from "formik";
import { useState, useEffect, useContext } from "react"
import AuthContext from "../../../Context/AuthContext"
import User from "../../../API/api"
import "./CharacterBuilder.css"
import "../../../GeneralComponents/Forms.css"
import "../../../GeneralComponents/TextStyles.css"
import "../../../GeneralComponents/Buttons.css"
import ConfirmationCheck from "../../../GeneralComponents/ConfirmationCheck";

export default function Equipment({ char_id, charEquipment }) {
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
            if (Object.keys(charEquipment).length > 0) {
                formik.setValues({
                    copper: charEquipment.copper,
                    silver: charEquipment.silver,
                    electrum: charEquipment.electrum,
                    gold: charEquipment.gold,
                    platinum: charEquipment.platinum,
                    equipment: charEquipment.equipment
                })
                setHasSaveData(true)
            }

        }
        getUserInfo()
    }, [charEquipment])

    /** formik for input validation

    Note that we have to initialize ALL of fields with values. 
    These could come from props, but since we don’t want to prefill this form, just use an empty string. If we don’t do this, React will yell at us.
    We also pass in validate function with validators and what to do on form submit
    */
    const formik = useFormik({
        initialValues: {
            copper: '',
            silver: '',
            electrum: '',
            gold: '',
            platinum: '',
            equipment: ''
        },
        onSubmit: async (values) => {
            const { copper, silver, electrum, gold, platinum, equipment } = values;
            User.token = token;
            if (hasSaveData) {
                const response = User.updateCharacterEquipment(char_id, copper, silver, electrum, gold, platinum, equipment, currentUser)
                showConfimrationCheckMark();
                return response;
            } else {
                const response = User.createCharacterEquipment(char_id, copper, silver, electrum, gold, platinum, equipment, currentUser)
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

                    <div className="form-input-frame">
                        <label
                            className="white-font smaller-font"
                            htmlFor="copper">CP
                        </label>
                        <input
                            type="text"
                            id="copper"
                            name="copper"
                            placeholder="0"
                            className="form-input-short"
                            value={formik.values.copper}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="form-input-frame">
                        <label
                            className="white-font smaller-font"
                            htmlFor="silver">SP
                        </label>
                        <input
                            type="text"
                            id="silver"
                            name="silver"
                            placeholder="0"
                            className="form-input-short"
                            value={formik.values.silver}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="form-input-frame">
                        <label
                            className="white-font smaller-font"
                            htmlFor="electrum">EP
                        </label>
                        <input
                            type="text"
                            id="electrum"
                            name="electrum"
                            placeholder="0"
                            className="form-input-short"
                            value={formik.values.electrum}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="form-input-frame">
                        <label
                            className="white-font smaller-font"
                            htmlFor="gold">GP
                        </label>
                        <input
                            type="text"
                            id="gold"
                            name="gold"
                            placeholder="0"
                            className="form-input-short"
                            value={formik.values.gold}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="form-input-frame">
                        <label
                            className="white-font smaller-font"
                            htmlFor="platinum">PP
                        </label>
                        <input
                            type="text"
                            id="platinum"
                            name="platinum"
                            placeholder="0"
                            className="form-input-short"
                            value={formik.values.platinum}
                            onChange={formik.handleChange}
                        />
                    </div>
                </div>


                <div className="character-subsection">

                    <div className="form-input-frame">
                        {/* <label
                            className="white-font smaller-font"
                            htmlFor="equipment">Equipment
                        </label> */}
                        <textarea
                            type="text"
                            id="equipment"
                            name="equipment"
                            placeholder="Equipment"
                            className="form-textarea"
                            value={formik.values.equipment}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="character-subsection-row">

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