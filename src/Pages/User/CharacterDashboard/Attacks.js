import { useFormik } from "formik";
import { useState, useEffect, useContext } from "react"
import AuthContext from "../../../Context/AuthContext"
import User from "../../../API/api"
import "./CharacterBuilder.css"
import "../../../GeneralComponents/Forms.css"
import "../../../GeneralComponents/TextStyles.css"
import "../../../GeneralComponents/Buttons.css"
import ConfirmationCheck from "../../../GeneralComponents/ConfirmationCheck";

export default function Attacks({ char_id, weapons }) {
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
            if (Object.keys(weapons).length > 0) {
                formik.setValues({
                    weapon1: weapons.weapon1,
                    attackBonus1: weapons.atk_bonus,
                    damageType1: weapons.damage_type,
                    weapon2: weapons.weapon2,
                    attackBonus2: weapons.atk_bonus2,
                    damageType2: weapons.damage_type2,
                    weapon3: weapons.weapon3,
                    attackBonus3: weapons.atk_bonus3,
                    damageType3: weapons.damage_type3,
                    weapon4: weapons.weapon4,
                    attackBonus4: weapons.atk_bonus4,
                    damageType4: weapons.damage_type4,
                    weapon5: weapons.weapon5,
                    attackBonus5: weapons.atk_bonus5,
                    damageType5: weapons.damage_type5
                })
                setHasSaveData(true)
            }

        }
        getUserInfo()
    }, [weapons])


    /** formik for input validation

    Note that we have to initialize ALL of fields with values. 
    These could come from props, but since we don’t want to prefill this form, just use an empty string. If we don’t do this, React will yell at us.
    We also pass in validate function with validators and what to do on form submit
    */
    const formik = useFormik({
        initialValues: {
            weapon1: '',
            attackBonus1: '',
            damageType1: '',
            weapon2: '',
            attackBonus2: '',
            damageType2: '',
            weapon3: '',
            attackBonus3: '',
            damageType3: '',
            weapon4: '',
            attackBonus4: '',
            damageType4: '',
            weapon5: '',
            attackBonus5: '',
            damageType5: ''
        },
        onSubmit: async (values) => {
            const { weapon1, attackBonus1, damageType1, weapon2, attackBonus2, damageType2, weapon3, attackBonus3, damageType3, weapon4, attackBonus4, damageType4, weapon5, attackBonus5, damageType5 } = values;
            User.token = token;
            if (hasSaveData) {
                const response = User.updateCharacterWeapons(char_id, weapon1, attackBonus1, damageType1, weapon2, attackBonus2, damageType2, weapon3, attackBonus3, damageType3, weapon4, attackBonus4, damageType4, weapon5, attackBonus5, damageType5, currentUser)
                showConfimrationCheckMark();
                return response;
            } else {
                const response = User.createCharacterWeapons(char_id, weapon1, attackBonus1, damageType1, weapon2, attackBonus2, damageType2, weapon3, attackBonus3, damageType3, weapon4, attackBonus4, damageType4, weapon5, attackBonus5, damageType5, currentUser)
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
                {/* First weapon */}
                <div className="character-subsection-row inner-section-border">

                    <div className="form-input-frame">
                        <label
                            className="white-font smaller-font"
                            htmlFor="weapon1">
                        </label>
                        <input
                            type="text"
                            id="weapon1"
                            name="weapon1"
                            placeholder="Weapon"
                            className="form-input-med"
                            value={formik.values.weapon1}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="form-input-frame">
                        <label
                            className="white-font smaller-font"
                            htmlFor="attackBonus1">
                        </label>
                        <input
                            type="text"
                            id="attackBonus1"
                            name="attackBonus1"
                            placeholder="Atk Bonus"
                            className="form-input-med"
                            value={formik.values.attackBonus1}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="form-input-frame">
                        <label
                            className="white-font smaller-font"
                            htmlFor="electrum">
                        </label>
                        <input
                            type="text"
                            id="damageType1"
                            name="damageType1"
                            placeholder="Damage/Type"
                            className="form-input-med"
                            value={formik.values.damageType1}
                            onChange={formik.handleChange}
                        />
                    </div>
                </div>

                {/* Second weapon */}
                <div className="character-subsection-row inner-section-border">

                    <div className="form-input-frame">
                        <label
                            className="white-font smaller-font"
                            htmlFor="weapon2">
                        </label>
                        <input
                            type="text"
                            id="weapon2"
                            name="weapon2"
                            placeholder="Weapon"
                            className="form-input-med"
                            value={formik.values.weapon2}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="form-input-frame">
                        <label
                            className="white-font smaller-font"
                            htmlFor="attackBonus2">
                        </label>
                        <input
                            type="text"
                            id="attackBonus2"
                            name="attackBonus2"
                            placeholder="Atk Bonus"
                            className="form-input-med"
                            value={formik.values.attackBonus2}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="form-input-frame">
                        <label
                            className="white-font smaller-font"
                            htmlFor="damageType2">
                        </label>
                        <input
                            type="text"
                            id="damageType2"
                            name="damageType2"
                            placeholder="Damage/Type"
                            className="form-input-med"
                            value={formik.values.damageType2}
                            onChange={formik.handleChange}
                        />
                    </div>
                </div>

                {/* Third weapon */}
                <div className="character-subsection-row inner-section-border">

                    <div className="form-input-frame">
                        <label
                            className="white-font smaller-font"
                            htmlFor="weapon3">
                        </label>
                        <input
                            type="text"
                            id="weapon3"
                            name="weapon3"
                            placeholder="Weapon"
                            className="form-input-med"
                            value={formik.values.weapon3}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="form-input-frame">
                        <label
                            className="white-font smaller-font"
                            htmlFor="attackBonus3">
                        </label>
                        <input
                            type="text"
                            id="attackBonus3"
                            name="attackBonus3"
                            placeholder="Atk Bonus"
                            className="form-input-med"
                            value={formik.values.attackBonus3}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="form-input-frame">
                        <label
                            className="white-font smaller-font"
                            htmlFor="damageType3">
                        </label>
                        <input
                            type="text"
                            id="damageType3"
                            name="damageType3"
                            placeholder="Damage/Type"
                            className="form-input-med"
                            value={formik.values.damageType3}
                            onChange={formik.handleChange}
                        />
                    </div>
                </div>

                {/* Fourth weapon */}
                <div className="character-subsection-row inner-section-border">

                    <div className="form-input-frame">
                        <label
                            className="white-font smaller-font"
                            htmlFor="weapon4">
                        </label>
                        <input
                            type="text"
                            id="weapon4"
                            name="weapon4"
                            placeholder="Weapon"
                            className="form-input-med"
                            value={formik.values.weapon4}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="form-input-frame">
                        <label
                            className="white-font smaller-font"
                            htmlFor="attackBonus4">
                        </label>
                        <input
                            type="text"
                            id="attackBonus4"
                            name="attackBonus4"
                            placeholder="Atk Bonus"
                            className="form-input-med"
                            value={formik.values.attackBonus4}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="form-input-frame">
                        <label
                            className="white-font smaller-font"
                            htmlFor="damageType4">
                        </label>
                        <input
                            type="text"
                            id="damageType4"
                            name="damageType4"
                            placeholder="Damage/Type"
                            className="form-input-med"
                            value={formik.values.damageType4}
                            onChange={formik.handleChange}
                        />
                    </div>
                </div>

                {/* Fifth weapon */}
                <div className="character-subsection-row inner-section-border">

                    <div className="form-input-frame">
                        <label
                            className="white-font smaller-font"
                            htmlFor="weapon5">
                        </label>
                        <input
                            type="text"
                            id="weapon5"
                            name="weapon5"
                            placeholder="Weapon"
                            className="form-input-med"
                            value={formik.values.weapon5}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="form-input-frame">
                        <label
                            className="white-font smaller-font"
                            htmlFor="attackBonus5">
                        </label>
                        <input
                            type="text"
                            id="attackBonus5"
                            name="attackBonus5"
                            placeholder="Atk Bonus"
                            className="form-input-med"
                            value={formik.values.attackBonus5}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="form-input-frame">
                        <label
                            className="white-font smaller-font"
                            htmlFor="damageType5">
                        </label>
                        <input
                            type="text"
                            id="damageType5"
                            name="damageType5"
                            placeholder="Damage/Type"
                            className="form-input-med"
                            value={formik.values.damageType5}
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