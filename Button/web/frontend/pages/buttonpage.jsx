import { useNavigate, TitleBar, Loading } from "@shopify/app-bridge-react";
import {
    Card,
    EmptyState,
    Layout,
    Page,
    SkeletonBodyText,
} from "@shopify/polaris";
import { Button } from '@shopify/polaris';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { data } from "@shopify/app-bridge/actions/Modal";





// export default function ButtonPage() {
//     const navigate = useNavigate();

//     const emptyStateMarkup = (
//         <Card sectioned>
//             <EmptyState
//                 action={{
//                     content: "Go To the page",
//                     external,
//                     onAction: () => navigate("https://api.trustsignal.io/v1/accounts/templates?api_key=205c75ee-12f3-4b0b-963d-8e528556f8c7"),
//                 }}
//             >
//             </EmptyState>
//             <Button
//                 accessibilityLabel="Terms and conditions (opens a new window)"
//                 url="https://api.trustsignal.io/v1/accounts/templates?api_key=205c75ee-12f3-4b0b-963d-8e528556f8c7"
//                 external
//             >
//                 Terms and conditions
//             </Button>
//         </Card>
//     );
//     // -------------------------------------------------------------------
//     async function getList() {
//         const data = await fetch("https://randomuser.me/api/", {
//             method: 'GET',
//             redirect: 'follow',
//             mode: "no-cors"
//         })
//             .then(response => console.log(response.text()))
//             .then(result => console.log(result))
//             .catch(error => console.log('error', error));
//             console.log(data)
//         return await data;

//     }
//     function shoot() {
//         var a = getList();
//         console.log(a);
//     }
//     // ---------------------------------------------------------------
//     return (
//         <div>
//             <hr style={{ color: '#bf0711', height: "10px" }} />
//             {emptyStateMarkup}
//             <hr style={{ color: '#bf0711', height: "10px" }} />
//             <div style={{ color: '#bf0711' }}>
//                 <Button
//                     accessibilityLabel="Terms and conditions (opens a new window)"
//                     url="https://api.trustsignal.io/v1/accounts/templates?api_key=205c75ee-12f3-4b0b-963d-8e528556f8c7"
//                     external
//                 >
//                     Go to website
//                 </Button>

//                 <hr style={{ color: '#bf0711', height: "10px" }} />
//                 <Button
//                     accessibilityLabel="Terms and conditions (opens a new window)"
//                     // url="https://api.trustsignal.io/v1/accounts/templates?api_key=205c75ee-12f3-4b0b-963d-8e528556f8c7"
//                     // external
//                     onClick={shoot}
//                 >
//                     Get Data
//                 </Button>
//                 <p>Data: {data}</p>

//             </div>
//         </div>
//     )
// }

// ====================

// const gitHubUrl = "https://api.trustsignal.io/v1/accounts/templates?api_key=205c75ee-12f3-4b0b-963d-8e528556f8c7";

export default function ButtonPage() {
    const [userData, setUserData] = useState("");
    const gitHubUrl = "https://randomuser.me/api/?results=35";

    const getGitHubUserWithFetch = async () => {
        const response = await fetch(gitHubUrl);
        const jsonData = await response.json();
        setUserData(jsonData.results[0]);
        console.log(jsonData.results[0])

    };

    function shoot() {
        setUserData(getGitHubUserWithFetch());

    }
    return (
        <div className="App">
{/* ========================================================================== */}
<hr />
    <p>name =  {userData.email}</p>
    <h1>{userData.gender}</h1>
    <h1>{userData.location.city}</h1>
    <h1>{userData.location.country}</h1>
    <h1>{userData.email}</h1>
    <button onClick={shoot}>deeksha</button>

        </div>
    );
}