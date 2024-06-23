import HeroSection from "./components/HeroSection";
import { useProductContext } from "./context/productContext";

const About = () => {
  const { MyName } = useProductContext();
  const data = {
    name: "Share N Shop ECommerce",
  };
  return (
    <>
      {MyName}
      <HeroSection myData={data} />;
    </>
  );
};

export default About;
