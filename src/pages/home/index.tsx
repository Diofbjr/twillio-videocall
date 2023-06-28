import React from "react"; 
import Inicio from "../../components/Inicio";
import Navbar from "../../components/Navbar";
import Search from '../../components/Search';
import Head from "next/head";

const InicioPage = () => {
	return (
		<>
        <Head>
            <title>Precision Data</title>
            <link
            rel="icon"
            href="" />
        </Head>
			<Navbar />
			<Search/>
			<Inicio />
		</>
	)
}
export default InicioPage;
