import { useFormik } from "formik";
import { useState, useEffect, useContext } from "react"
import AuthContext from "../../../Context/AuthContext"
import User from "../../../API/api"
import "./CharacterBuilder.css"
import "../../../GeneralComponents/Forms.css"
import "../../../GeneralComponents/TextStyles.css"
import "../../../GeneralComponents/Buttons.css"
import ConfirmationCheck from "../../../GeneralComponents/ConfirmationCheck";

export default function HitPointsArmorClass({ char_id, health }) {
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
            if (Object.keys(health).length > 0) {
                formik.setValues({
                    hit_points: health.hit_points,
                    temp_hit_points: health.temp_hit_points,
                    armor_class: health.armor_class,
                    inspiration: health.inspiration,
                    initiative: health.initiative,
                    speed: health.speed,
                    prof_bonus: health.prof_bonus,
                    hit_dice: health.hit_dice
                })
                setHasSaveData(true)
            }

        }
        getUserInfo()
    }, [health])

    /** formik for input validation
    
        Note that we have to initialize ALL of fields with values. 
        These could come from props, but since we don’t want to prefill this form, just use an empty string. If we don’t do this, React will yell at us.
        We also pass in validate function with validators and what to do on form submit
        */
    const formik = useFormik({
        initialValues: {
            hit_points: '',
            temp_hit_points: '',
            armor_class: '',
            inspiration: '',
            initiative: '',
            speed: '',
            prof_bonus: '',
            hit_dice: ''
        },
        onSubmit: async (values) => {
            const { hit_points, temp_hit_points, armor_class, inspiration, initiative, speed, prof_bonus, hit_dice } = values;
            User.token = token;
            if (hasSaveData) {
                const response = User.updateCharacterHealth(char_id, hit_points, temp_hit_points, armor_class, inspiration, initiative, speed, prof_bonus, hit_dice, currentUser)
                showConfimrationCheckMark();
                return response;
            } else {
                const response = User.createCharacterHealth(char_id, hit_points, temp_hit_points, armor_class, inspiration, initiative, speed, prof_bonus, hit_dice, currentUser)
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
                <div className="character-subsection-row">
                    <div className="character-subsection">
                        <div className="form-input-frame">
                            <label
                                className="white-font smaller-font"
                                htmlFor="hit_points">Hit Points
                            </label>
                            <input
                                type="text"
                                id="hit_points"
                                name="hit_points"
                                placeholder="0"
                                className="form-input-short"
                                value={formik.values.hit_points}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div className="form-input-frame">
                            <label
                                className="white-font smaller-font"
                                htmlFor="temp_hit_points">Temp Hit Points
                            </label>
                            <input
                                type="text"
                                id="temp_hit_points"
                                name="temp_hit_points"
                                placeholder="0"
                                className="form-input-short"
                                value={formik.values.temp_hit_points}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div className="form-input-frame">
                            <label
                                className="white-font smaller-font"
                                htmlFor="armor_class">Armor Class
                            </label>
                            <input
                                type="text"
                                id="armor_class"
                                name="armor_class"
                                placeholder="0"
                                className="form-input-short"
                                value={formik.values.armor_class}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div className="form-input-frame">
                            <label
                                className="white-font smaller-font"
                                htmlFor="inspiration">Inspiration
                            </label>
                            <input
                                type="text"
                                id="inspiration"
                                name="inspiration"
                                placeholder="0"
                                className="form-input-short"
                                value={formik.values.inspiration}
                                onChange={formik.handleChange}
                            />
                        </div>
                    </div>
                    <div className="character-subsection">
                        <div className="form-input-frame">
                            <label
                                className="white-font smaller-font"
                                htmlFor="initiative">Initiative
                            </label>
                            <input
                                type="text"
                                id="initiative"
                                name="initiative"
                                placeholder="0"
                                className="form-input-short"
                                value={formik.values.initiative}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div className="form-input-frame">
                            <label
                                className="white-font smaller-font"
                                htmlFor="speed">Speed
                            </label>
                            <input
                                type="text"
                                id="speed"
                                name="speed"
                                placeholder="0"
                                className="form-input-short"
                                value={formik.values.speed}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div className="form-input-frame">
                            <label
                                className="white-font smaller-font"
                                htmlFor="prof_bonus">Prof Bonus
                            </label>
                            <input
                                type="text"
                                id="prof_bonus"
                                name="prof_bonus"
                                placeholder="0"
                                className="form-input-short"
                                value={formik.values.prof_bonus}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div className="form-input-frame">
                            <label
                                className="white-font smaller-font"
                                htmlFor="hit_dice">Hit Dice
                            </label>
                            <input
                                type="text"
                                id="hit_dice"
                                name="hit_dice"
                                placeholder="0"
                                className="form-input-short"
                                value={formik.values.hit_dice}
                                onChange={formik.handleChange}
                            />
                        </div>

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
