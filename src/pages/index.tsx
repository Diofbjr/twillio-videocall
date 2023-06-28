import React from "react"; 
import Login from "../components/Home";
import Head from "next/head";

const Page: React.FC = () => {
	return (
    <>
      <Head>
        <title>Precision Data</title>
        <link
          rel="icon"
          href="/assets/Logo.png"/>
      </Head>
      <Login />
    </>
  )
}

export default Page
