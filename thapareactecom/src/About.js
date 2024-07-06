import HeroSection from "./components/HeroSection";
import { useProductContext } from "./context/productcontex";

const About = () => {
  const { myName } = useProductContext();

  const data = {
    name: "About Page",
  };

  return (
    <>
      {myName}
      <HeroSection myData={data} />
      
    </>
  );
};

export default About;