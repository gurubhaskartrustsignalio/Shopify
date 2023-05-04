import { useNavigate, TitleBar, Loading } from "@shopify/app-bridge-react";
import {
  Card,
  EmptyState,
  Layout,
  Page,
  SkeletonBodyText,
} from "@shopify/polaris";

import React, { useState, useEffect } from 'react'
import axios from 'axios';
import ButtonPage from "./buttonpage";



export default function HomePage() {
  /*
    Add an App Bridge useNavigate hook to set up the navigate function.
    This function modifies the top-level browser URL so that you can
    navigate within the embedded app and keep the browser in sync on reload.
  */
  const navigate = useNavigate();

  const [state, setstate] = useState("");
  /*
    These are mock values. Setting these values lets you preview the loading markup and the empty state.
  */
  const isLoading = false;
  const isRefetching = false;
  const QRCodes = [];

  /* loadingMarkup uses the loading component from AppBridge and components from Polaris  */
  const loadingMarkup = isLoading ? (
    <Card sectioned>
      <Loading />
      <SkeletonBodyText />
    </Card>
  ) : null;

  /* Use Polaris Card and EmptyState components to define the contents of the empty state */
  const emptyStateMarkup =
    !isLoading && !QRCodes?.length ? (
      <Card sectioned>
        <EmptyState
          heading="Create unique QR codes for your product"
          /* This button will take the user to a Create a QR code page */
          action={{
            content: "Go 1",
            onAction: () => navigate("https://api.trustsignal.io/v1/accounts/templates?api_key=205c75ee-12f3-4b0b-963d-8e528556f8c7"),
          }}
          image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
        >
          <p>
            Allow customers to scan codes and buy products using their phones.
          </p>
        </EmptyState>
      </Card>
    ) : null;


  const update = async () => {
      console.log("1")
      // // Await make wait until that 
      // // promise settles and return its result
      // const response = await axios.get("https://api.trustsignal.io/v1/accounts/templates?api_key=205c75ee-12f3-4b0b-963d-8e528556f8c7%27");
      // console.log("2")
      // // After fetching data stored it in posts state.
      // // setstate(response.data);
      // console.log(response)
      // ---------------------------
      // useEffect(() => {
        var requestOptions = "";
         await fetch("https://dev-api.trustsignal.io/v1/accounts/templates?api_key=205c75ee-12f3-4b0b-963d-8e528556f8c7", {
          method: 'GET',
          redirect: 'follow',
          mode:"no-cors"
        })
  .then(response => console.log(response.text()))
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  


    //  }, []);

  }


  /*
    Use Polaris Page and TitleBar components to create the page layout,
    and include the empty state contents set above.
  */
  return (
    <Page>
      <TitleBar
        title="QR codes"
        primaryAction={{
          content: "Go",
          onAction: () => navigate("https://api.trustsignal.io/v1/accounts/templates?api_key=205c75ee-12f3-4b0b-963d-8e528556f8c7"),

        }
        }
        secondaryActions={[
          {
            content: "Secondary action",
            // onAction: () => navigate("https://api.trustsignal.io/v1/accounts/templates?api_key=205c75ee-12f3-4b0b-963d-8e528556f8c7%27"),
            onAction: () => update()

          },
          {
            content: "third action",
            // onAction: () => navigate("https://api.trustsignal.io/v1/accounts/templates?api_key=205c75ee-12f3-4b0b-963d-8e528556f8c7%27"),
            onAction: () => update1()
          }
        ]}
      />
      <Layout>
        <Layout.Section>
          {loadingMarkup}
          {emptyStateMarkup}
        </Layout.Section>
      </Layout>
      <label>
        Text input: <input name="myInput" />
      </label>
      <label>
        Text input: <input name="myInput" />
      </label>
      <h1>My favorite color is !</h1>
<ButtonPage/>
    </Page>
  );
}
