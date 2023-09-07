import { useFormik } from "formik";
import "../../../GeneralComponents/Forms.css"
import "../../../GeneralComponents/Buttons.css"
import { useEffect, useState, useContext } from "react";
import User from "../../../API/api"
import AuthContext from "../../../Context/AuthContext"

export default function NewCharacter({ closeModal, showCharacterForm, setCharId, setCharName }) {
    const [entrySaved, setEntrySaved] = useState(false);
    const [entryName, setEntryName] = useState('');
    const { currentUser, token } = useContext(AuthContext)



    // A custom validation function. This must return an object
    // which keys are symmetrical to our values/initialValues
    const validate = values => {
        const errors = {};
        // values.valueName = valueName;
        if (!values.inputName) {
            errors.inputName = "*"
        }
        return errors
    }

    useEffect(() => {
        function _savedName() {
            if (entryName) {
                setEntrySaved(!entrySaved)
            }

        }
        _savedName()
    }, [entryName])

    const createNewEntry = async (values) => {
        const defaultImg = { url: process.env.PUBLIC_URL + "/avatars/bard.png" }
        const response = await User.createCharacter(values.inputName, currentUser)
        const avatar = await User.createCharacterAvatar(response.newChar.char_id, defaultImg.url, currentUser)
        setCharId(response.newChar.char_id)
        setCharName(response.newChar.char_name)
        showCharacterForm();
    }


    /** formik for input validation

    Note that we have to initialize ALL of fields with values. 
    These could come from props, but since we don’t want to prefill this form, just use an empty string. If we don’t do this, React will yell at us.
    We also pass in validate function with validators and what to do on form submit
    */

    const formik = useFormik({
        initialValues: {
            inputName: ''
        },
        validate,
        onSubmit: values => {
            // check if user selected something fromm a select input, otherwise
            // use default value of first item in the array
            const response = createNewEntry(values)
            if (response) {
                setEntryName(values.inputName)
                setEntrySaved(!entrySaved)
            }
        }
    });

    return (
        <div className="form-container-modal">

            {/* Disply map saved message after it was saved */}
            {entrySaved ?
                <div className="form">
                    <div className="exit-button-holder">
                        {/* Exit button */}
                        <button type="button" className="exit-modal" onClick={closeModal}>X</button>
                    </div>
                    {`${formik.values.inputName} was saved.`}

                </div>
                :
                // display form for saving the map
                <form
                    className="form"
                    onSubmit={formik.handleSubmit}
                >

                    <div className="exit-button-holder">
                        {/* Exit button */}
                        <button className="exit-modal" onClick={closeModal}>X</button>
                    </div>

                    {/* Input fields */}

                    <div className="form-input-frame">
                        {/* formik.touched.username checks to see if the user has interacted with the 
                        input field.
                        formik.errors.username checks to see if there are any errors related to 
                        username field, in this case if it is empty.
                    */}
                        {formik.touched.inputName && formik.errors.inputName ? <div className="form-error">{formik.errors.inputName}
                        </div> : null}
                        <input
                            className={formik.touched.inputName && formik.errors.inputName ? "form-input-error" : "form-input"}
                            type="text"
                            id="inputName"
                            name='inputName'
                            placeholder={`Character Name`}
                            value={formik.values.inputName}
                            onChange={formik.handleChange}
                            // handles displaying errors only after use has interacted with the field otherwise without it they always display
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.inputName && formik.errors.inputName ?
                            <img
                                className="error-icon"
                                src={process.env.PUBLIC_URL + "error_icon.png"}
                                alt="error message"
                            /> : null}
                    </div>


                    <button
                        className="action-button"
                        type="submit"
                    >Save</button>
                </form>
            }
        </div>
    )
}


