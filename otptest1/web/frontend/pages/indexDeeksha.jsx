import {
    Card,
    Page,
    Layout,
    TextContainer,
    Image,
    Stack,
    Link,
    Text,
} from "@shopify/polaris";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import '../assets/index.css'

export default function HomePage() {
    const navigate = useNavigate();

    var [userData, setUserData] = useState("");
    const initialValues = { sender_id: "", template_id: "", to: "", OTP: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    // ==========================================

    const gitHubUrl = "https://api.github.com/users/deekshasharma";


    // let api = "205c75ee-12f3-4b0b-963d-8e528556f8c7";
    // const gitHubUrl = `https://dev-api.trustsignal.io/v1/verifyuserotp?api_key=${api}`;

    const getGitHubUserWithFetch = async () => {
        const response = await fetch(gitHubUrl);
        const jsonData = await response.json();
        setUserData(jsonData);
        userData = jsonData
        console.log("UDATA in", userData)
    };
    // ========================================
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUserData(await getGitHubUserWithFetch());
        formValues.OTP = userData.id;
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    };
    useEffect(() => {
        console.log("formErrors ", formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log("formValues ", formValues);
        }
    }, [formErrors, userData]);
    const validate = (values) => {
        const errors = {};
        const regex = /\B\+91[0-9]{10}\b/;

        if (!values.sender_id) {
            errors.sender_id = "SenderID is required!";
        }
        else if (!values.template_id) {
            errors.template_id = "TemplateID is required!";
        }
        else if (!values.to) {
            errors.to = "Mobile is required!";
        } else if (!regex.test(values.to)) {
            errors.to = "This is not a valid Mobile start with +91 followed by 10 numbers!";
        }
        else
            navigate('./indexDestination', { state: { to: values.to, template_id: values.template_id, sender_id: values.sender_id, OTP: values.OTP } })
        return errors;
    };

    return (

        <div className="container">
            {Object.keys(formErrors).length === 0 && isSubmit ? (
                <div className="ui message success">Signed in successfully</div>
            ) : null}

            <form>
                <div className="ui divider"></div>
                <div className="ui form">
                    <div className="field">
                        <label>SenderID</label>
                        <input
                            type="text"
                            name="sender_id"
                            placeholder="sender_id"
                            value={formValues.sender_id}
                            onChange={handleChange}
                        />
                    </div>
                    <p>{formErrors.sender_id}</p>
                    <div className="field">
                        <label>TemplateID</label>
                        <input
                            type="text"
                            name="template_id"
                            placeholder="template_id"
                            value={formValues.template_id}
                            onChange={handleChange}
                        />
                    </div>
                    <p>{formErrors.template_id}</p>
                    <div className="field">
                        <label>Mobile</label>
                        <input
                            type="text"
                            name="to"
                            placeholder="+91"
                            value={formValues.to}
                            onChange={handleChange}
                        />
                    </div>
                    <p>{formErrors.to}</p>
                    <button className="fluid ui button blue" onClick={handleSubmit}>Submit</button>

                </div>

            </form>
        </div>

    );
}
