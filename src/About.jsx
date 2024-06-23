import HeroSection from "./components/HeroSection";
import { useProductContext } from "./context/productContext";

const About = () => {
  const { MyName } = useProductContext();
  const data = {
    name: "Shopzy ECommerce",
  };
  return (
    <>
      {MyName}
      <HeroSection myData={data} />;
    </>
  );
};

export default About;
