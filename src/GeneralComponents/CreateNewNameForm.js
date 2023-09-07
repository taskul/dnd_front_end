import { useFormik } from "formik";
import "./Forms.css"
import "./Buttons.css"
import { useEffect, useState } from "react";


// Generic form that can be used to save a name for creation on a new database entry
/**
 * savedName and setSavedName are used in maps to overwriting existing map name
 * createNewEntry is used by parent component to save values from the from
 * closeModal closes this modal
 * placeholderName is used to change placeholder in input field
 * addSelectedField is a boolean value, false by default, but if true then the form will also displace a select drop down options
 * selectOptions accepts an array of objects that will be used as name/value in select option field
 * selectLabel creates a label for selectOptions if needed.
 */
export default function CreateNewNameForm({ savedName, setSavedName, createNewEntry, closeModal, placeholderName, addSelectField, selectOptions, selectLabel }) {
    const [entrySaved, setEntrySaved] = useState(false);
    const [entryName, setEntryName] = useState('');
    // needs a boolean input
    const [selectFieldIncluded, setSelectFieldIncluded] = useState(addSelectField);
    const [selectedItem, setSelectedItem] = useState(0);
    // used to display the image next to the select drop down field
    const [selectedIdx, setSelectedIdx] = useState(0);

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



    // handles the change in the select input field
    const handleChange = (e) => {
        setSelectedIdx(e.target.value)
        setSelectedItem(selectOptions[e.target.value])
    }


    /** formik for input validation

    Note that we have to initialize ALL of fields with values. 
    These could come from props, but since we don’t want to prefill this form, just use an empty string. If we don’t do this, React will yell at us.
    We also pass in validate function with validators and what to do on form submit
    */
    let nameHolder = savedName ? savedName : '';
    const formik = useFormik({
        initialValues: {
            inputName: nameHolder
        },
        validate,
        onSubmit: values => {
            // check if user selected something fromm a select input, otherwise
            // use default value of first item in the array
            let selectedOption;
            if (selectFieldIncluded) {
                selectedOption = selectedItem ? selectedItem : selectOptions[0]
            }
            const response = createNewEntry(values, selectedOption)
            if (response) {
                setEntryName(values.inputName)
                setEntrySaved(!entrySaved)
                setSavedName(values.inputName)
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

                    {/* Select field */}
                    {selectFieldIncluded
                        ?
                        <div>
                            <span className="selector-menu-label white-titles">{selectLabel}</span>
                            <select
                                onChange={handleChange}
                                className="selector-menu-input"
                            >
                                {selectOptions.map((item, idx) => (
                                    <option key={idx} value={idx}>
                                        {item.name}
                                    </option>

                                ))}
                            </select>
                            <img
                                src={selectOptions[selectedIdx].url}
                                className="selectField-avatar-icon-small" />
                        </div>
                        :
                        null
                    }

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
                            placeholder={`${placeholderName}`}
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


