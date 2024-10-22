import { Helmet } from "react-helmet-async";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Quantum Mad Labs - Home</title>
      </Helmet>
      <Navbar />
      <Hero />
    </>
  );
};

export default HomePage;
