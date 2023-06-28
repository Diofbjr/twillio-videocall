import React from "react";
import Head from "next/head";
import type { NextPage } from "next";
import VideoProvider from "../../components/VideoProvider/VideoProvider";


const Home: NextPage = () => {
    return (
    <>
        <Head>
            <title>Precision Data</title>
            <link
            rel="icon"
            href="" />
        </Head>
        <VideoProvider />
    
    </>
        
    );
};

export default Home;
