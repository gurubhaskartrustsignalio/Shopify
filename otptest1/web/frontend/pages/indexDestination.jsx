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
import { TitleBar } from "@shopify/app-bridge-react";
import { useEffect, useState } from "react";
import '../assets/index.css'
import { useLocation, useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate();
    const location = useLocation();
    const initialValues = { to: location.state.to, otp: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    var [userData, setUserData] = useState("t");


    let api = "205c75ee-12f3-4b0b-963d-8e528556f8c7";
    const gitHubUrl = `https://dev-api.trustsignal.io/v1/verifyuserotp?api_key=${api}`;

    const createuserotpWithFetch = async () => {
        console.log("form ", formValues)
        await fetch(gitHubUrl, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formValues)
        }).then((resp) => {
            console.warn("resp",resp);
            resp.json().then((result) => {
                console.warn("result", result)
                setUserData(result);
                formValues.message = result.message;
                formValues.success = result.success;
                console.log("def",formErrors.otp )
                console.log("true ",result.success)
                if (result.success)
                    navigate('/lastpage', { state: { to: formValues.to, message: result.message, success: result.success } })
                if(!result.sucess ) setFormErrors({otp:result.message})
            })
        })

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setUserData(createuserotpWithFetch());
        console.log("Check ", formValues)
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    };

    useEffect(async () => {
        console.log(formErrors);

        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log("useEffect  ", formValues);
        }
    }, [formErrors, userData]);
    const validate = (values) => {
        const errors = {};
        console.log("User ", values)
        if (!values.otp) {
            errors.otp = "OTP is required!";
        }
        return errors;
    };

    return (

        <div className="container">
            {Object.keys(formErrors).length === 0 && isSubmit ? (
                <div className="ui message success">Signed in successfully</div>
            ) : null}

            <form onSubmit={handleSubmit}>
                <div className="ui divider"></div>
                <div className="ui form">
                    <div className="field">
                        <h1>Mobile : <span >{location.state.to}</span></h1>
                        <h1>OTP : <span >{location.state.otp}</span></h1>
                        <h1> TemplateID: <span >{location.state.template_id}</span></h1>
                        <h1>SenderID : <span >{location.state.sender_id}</span></h1>
                    </div>

                    <div className="field">
                        <label>OTP</label>
                        <input
                            type="text"
                            name="otp"
                            placeholder="OTP"
                            value={formValues.otp}
                            onChange={handleChange}
                        />
                    </div>
                    <p>{formErrors.otp}</p>
                    <button className="fluid ui button blue">Submit</button>
                </div>
            </form>
        </div>

    );
    //    ===========================
    // const initialValues = { SenderId: "", TemplateID: "", Mobile: "" };
    // const [formValues, setFormValues] = useState(initialValues);
    // const [formErrors, setFormErrors] = useState({});
    // const [isSubmit, setIsSubmit] = useState(false);

    // // const handleChange = (e) => {
    // //     const { name, value } = e.target;
    // //     setFormValues({ ...formValues, [name]: value });
    // //   };

    //   const handleSubmit = (e) => {
    //     e.preventDefault();
    //     setFormErrors(validate(formValues));
    //     setIsSubmit(true);
    //   };

    // //   useEffect(() => {
    // //     console.log(formErrors);
    // //     if (Object.keys(formErrors).length === 0 && isSubmit) {
    // //       console.log(formValues);
    // //     }
    // //   }, [formErrors]);

    // useEffect(()=>{

    // },[]);


    // return (
    //     <Page narrowWidth>
    //         <TitleBar title="OTP Request" primaryAction={null} />
    //         <Layout>
    //             <Layout.Section>
    //                 <Card sectioned>

    //                     <form>
    //                         <h1>Login Form</h1>
    //                         <div className="ui divider"></div>
    //                         <div className="ui form">
    //                             <div className="field">
    //                                 <label>SenderId</label>
    //                                 <input
    //                                     type="text"
    //                                     name="SenderId"
    //                                     placeholder="SenderId"
    //                                 //   value={formValues.username}
    //                                 //   onChange={handleChange}
    //                                 />
    //                             </div>
    //                             <div className="field">
    //                                 <label>TemplateID</label>
    //                                 <input
    //                                     type="text"
    //                                     name="TemplateID"
    //                                     placeholder="TemplateID"
    //                                 //   value={formValues.username}
    //                                 //   onChange={handleChange}
    //                                 />
    //                             </div>
    //                             <div className="field">
    //                                 <label>Mobile</label>
    //                                 <input
    //                                     type="text"
    //                                     name="Mobile"
    //                                     placeholder="Mobile"
    //                                 //   value={formValues.username}
    //                                 //   onChange={handleChange}
    //                                 />
    //                             </div>
    //                             <button className="fluid ui button blue">Submit</button>
    //                         </div>
    //                     </form>



    //                 </Card>
    //             </Layout.Section>
    //         </Layout>
    //     </Page>
    // );
}
