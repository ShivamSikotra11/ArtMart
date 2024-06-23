import styled from "styled-components";
import HeroSection from "./components/HeroSection";
import Services from "./components/Services";
import Trusted from "./components/Trusted";
import FeatureProducts from "./components/FeatureProducts";
import SnackBar from "./components/SnackBar";


const Home = () => {
  const data = {
    name: "Shopzy",
  };
  return (
    <>
      {/* <SnackBar /> */}
      <HeroSection myData={data} />
      {/* <FeatureProducts></FeatureProducts> */}
      <Services></Services>
      <Trusted></Trusted>
    </>
  );
};

export default Home;
