import Head from "next/head";
import Rengas from "./Rengas/index";

const Home = () => (
  <div className="container">
    <Head>
      <title>Renga</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Rengas></Rengas>
  </div>
);

export default Home;
