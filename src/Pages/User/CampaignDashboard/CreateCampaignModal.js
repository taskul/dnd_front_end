import { useFormik } from "formik";
import "../../../GeneralComponents/Forms.css"
import "../../../GeneralComponents/Buttons.css"
import { useEffect, useState } from "react";
import "../../../GeneralComponents/SelectorsMenu.css"
import "../../../GeneralComponents/TextStyles.css"



export default function CreateCampaignModal({ closeModal, guilds, createCampaign, addedCampaign, setAddedCampaign }) {
    const [entrySaved, setEntrySaved] = useState(false);
    const [entryName, setEntryName] = useState('');
    const [guildOptions, setGuildOptions] = useState(guilds)
    const [selectedGuild, setSelectedGuild] = useState();
    const [selectDefaultValue, setSelectDefaultValue] = useState();

    // A custom validation function. This must return an object
    // which keys are symmetrical to our values/initialValues
    const validate = values => {
        const errors = {};
        // values.valueName = valueName;
        if (!values.campaignName) {
            errors.campaignName = "*"
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

    // closing the form
    const closeSelf = () => {
        closeModal()
    }

    /** formik for input validation

    Note that we have to initialize ALL of fields with values. 
    These could come from props, but since we don’t want to prefill this form, just use an empty string. If we don’t do this, React will yell at us.
    We also pass in validate function with validators and what to do on form submit
    */
    const formik = useFormik({
        initialValues: {
            campaignName: ""
        },
        validate,
        onSubmit: values => {
            try {
            let guildId = selectedGuild ? selectedGuild : selectDefaultValue;
            const response = createCampaign(values.campaignName, guildId)
            if (response) {
                setEntryName(values.campaignName)
                setEntrySaved(!entrySaved)
                setAddedCampaign(addedCampaign => ([
                    addedCampaign,
                    response
                ]))
            }
        } catch (err) {
            console.log(err)
        }
    }
    });

    // handles the change in the select input field
    const handleChange = (e) => {
        setSelectedGuild(e.target.value)
    }

    // handles the default value in the select input field
    const handleDefaultOption = (value) => {
        if (!selectDefaultValue) {
            setSelectDefaultValue(value)
        }
    }

    return (
        <div className="form-container-modal">

            {/* Disply map saved message after it was saved */}
            {
            guildOptions.length === 0 ?
            <div className="form">
                <h3 className="white-titles">You need to create a guild first before starting a campaign.</h3>
            </div>
            :
            entrySaved ?
                <div className="form">
                    {/* Exit button */}
                    <div className="exit-button-holder">
                        <button type="button" className="exit-modal" onClick={closeSelf}>X</button>
                    </div>
                    {`${formik.values.campaignName} campaign was created.`}

                </div>
                :
                // display form for saving the map
                <form
                    className="form"
                    onSubmit={formik.handleSubmit}
                >

                    {/* Exit button */}
                    <div className="exit-button-holder">
                        <button type="button" className="exit-modal" onClick={closeSelf}>X</button>
                    </div>

                    {/* Select fields */}
                    <div>
                        <h3 className="white-titles">Your campaigns need to be assigned to a guild.</h3>
                        <span className="selector-menu-label white-titles">Select Guild</span>
                        <select
                            onChange={handleChange}
                            className="selector-menu-input"
                            defaultValue={handleDefaultOption(guildOptions[0].guild_id)}
                        >
                            {guildOptions.map((guild, idx) => (
                                <option key={idx} value={guild.guild_id}>
                                    {guild.guild_name}
                                </option>
                            ))}
                        </select>
                    </div>



                    <div className="form-input-frame">
                        {/* formik.touched.username checks to see if the user has interacted with the 
                        input field.
                        formik.errors.username checks to see if there are any errors related to 
                        username field, in this case if it is empty.
                    */}
                        {formik.touched.campaignName && formik.errors.campaignName ? <div className="form-error">{formik.errors.campaignName}
                        </div> : null}
                        <input
                            className={formik.touched.campaignName && formik.errors.campaignName ? "form-input-error" : "form-input"}
                            type="text"
                            id="campaignName"
                            name='campaignName'
                            placeholder={`Campaign Name`}
                            value={formik.values.campaignName}
                            onChange={formik.handleChange}
                            // handles displaying errors only after use has interacted with the field otherwise without it they always display
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.campaignName && formik.errors.campaignName ?
                            <img
                                className="error-icon"
                                src={process.env.PUBLIC_URL + "error_icon.png"}
                                alt="error message"
                            /> : null}
                    </div>


                    <button
                        className="action-button"
                        type="submit"
                    >Create</button>
                </form>
            }
        </div>
    )
}


