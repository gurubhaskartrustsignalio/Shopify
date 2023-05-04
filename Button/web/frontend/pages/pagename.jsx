import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  EmptyState,
  Layout,
  Page,
  SkeletonBodyText,
} from "@shopify/polaris";

export default function PageName() {
  const [cardData, setCardData] = useState([]);
  const [visible, setVisible] = useState(5);
var response="hse";
  const allCardData = async () => {
    response = await axios.get("https://randomuser.me/api/?results=35");
    setCardData(response.data.results);
    console.log(response.data.results)
    response = response.data.results
  };

  
  const loadMore = () => {
    setVisible(visible + 5);
  };

  useEffect(() => {
    allCardData();
  }, []);

  // ==================================================
  const [userData, setUserData] = useState("");
  const gitHubUrl = "https://api.github.com/users/deekshasharma";
  // const gitHubUrl = "https://randomuser.me/api/?results=35";
  
  const getGitHubUserWithFetch = async () => {
    const response = await fetch(gitHubUrl);
    const jsonData = await response.json();
    setUserData(jsonData);
    console.log(jsonData )
    
};

function shoot() {
  setUserData(getGitHubUserWithFetch());
      
      }

// ==============================================
const [name,setname] = useState("hol");
const cns=()=>{
setname("Poda")
}

// =========================================
  return (
    <div className="App">
      <p>he  {response}</p>
      {/* <p>{cardData}</p> */}
        <button onClick={allCardData}>Load 5 More</button>
        {/* ================================================= */}
     <hr style={{color:"red"}}/>
     <h1>{name}</h1>
         <button onClick={cns}>click</button>

         {/* ======================================== */}

    <hr />
    <p>name =  {userData.name}</p>
    <button onClick={shoot}>deeksha</button>

    </div>
  );
};


