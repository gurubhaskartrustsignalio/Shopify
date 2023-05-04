
import { useLocation, useNavigate } from "react-router-dom";
export default function LastPage() {
    const location = useLocation();
    console.log(location.state)
// let api ="205c75ee-12f3-4b0b-963d-8e528556f8c7";
// const gitHubUrl = `https://api.trustsignal.io/v1/verifyuserotp?api_key=${api}`;
// console.log(gitHubUrl)
    return (
        <div style={{backgroundColor:"green", border:" 2px solid red", padding:"5px", width:"200px"}}>
            <h1>Welcome You have logged In</h1>
            {/* <h1><span >{location.state}</span></h1> */}
            <h1><span ></span></h1>
            <h1><span >Mobile {location.state.to}</span></h1>
            <h1><span >message {location.state.message}</span></h1>
            <h1><span >{location.state.otp}</span></h1>
        </div>
    )
}