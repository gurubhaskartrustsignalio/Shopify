import { useEffect, useState } from "react";
export default function Apicall() {
    const [userData, setUserData] = useState("");
    const gitHubUrl = "https://api.github.com/users/deekshasharma";

    const getGitHubUserWithFetch = async () => {
        const response = await fetch(gitHubUrl);
        const jsonData = await response.json();
        setUserData(jsonData);

    };
    function shoot() {
        setUserData(getGitHubUserWithFetch());

        console.log("UDATA dek", userData)
    }

    useEffect(() => {

    }, [userData])
    return (
        <>
            <p>name =  {userData.name}</p>
            <button onClick={shoot}>deeksha</button>
        </>
    )
}