import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import "../../GeneralComponents/Forms.css"
import "../../GeneralComponents/Buttons.css"



// A custom validation function. This must return an object
// which keys are symmetrical to our values/initialValues
const validate = values => {
    const errors = {};
    if (!values.username) {
        errors.username = "*"
    }
    if (!values.password) {
        errors.password = "*"
    }
    return errors
}

export default function Login({ authenticate }) {
    const navigate = useNavigate();

    /** formik for input validation

    Note that we have to initialize ALL of fields with values. 
    These could come from props, but since we don’t want to prefill this form, just use an empty string. If we don’t do this, React will yell at us.
    We also pass in validate function with validators and what to do on form submit
    */
    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validate,
        onSubmit: async (values) => {
            const response = await authenticate(values)
            if (response.success) {
                navigate("/dashboard")
            }
        }
    });

    return (
        <div className="form-container">
            <form
                className="form"
                onSubmit={formik.handleSubmit}
            >
                <div className="form-input-frame">
                    {/* formik.touched.username checks to see if the user has interacted with the 
                        input field.
                        formik.errors.username checks to see if there are any errors related to 
                        username field, in this case if it is empty.
                    */}
                    {formik.touched.username && formik.errors.username ? <div className="form-error">{formik.errors.username}
                    </div> : null}
                    <input
                        className={formik.touched.username && formik.errors.username ? "form-input-error" : "form-input"}
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        // handles displaying errors only after use has interacted with the field otherwise without it they always display
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.username && formik.errors.username ?
                        <img
                            className="error-icon"
                            src={process.env.PUBLIC_URL + "error_icon.png"}
                            alt="error message"
                        /> : null}
                </div>

                <div className="form-input-frame">
                    {formik.touched.password && formik.errors.password ? <div className="form-error">{formik.errors.password}
                    </div> : null}
                    <input
                        className={formik.touched.password && formik.errors.password ? "form-input-error" : "form-input"}
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password ?
                        <img
                            className="error-icon"
                            src={process.env.PUBLIC_URL + "error_icon.png"}
                            alt="error message"
                        /> : null}
                </div>

                <button
                    className="action-button"
                    type="submit"
                >Login</button>
            </form>
        </div>
    )
}