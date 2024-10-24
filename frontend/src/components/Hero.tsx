import { useNavigate } from "react-router-dom";
import heroImg from "../assets/imgs/hero.png";

const Hero = () => {
  const navigate = useNavigate();
  const navigateToMarket = () => {
    navigate("/market");
  };

  return (
    <>
      <div className="bgLab flex flex-col justify-start items-center min-h-screen">
        <div className="w-full text-center">
          <h2 className="text-white text-4xl bg-[#2c2c2c] p-5 VT323">
            Madness is the Spark of Innovation - Join the Lab!
          </h2>
        </div>
        <div className="flex flex-col justify-center items-center p-5 w-[95%] md:w-[80%] lg:w-[65%] xl:w-[60%] 2xl:w-[55%] rounded-xl bg-[#00274d] mt-5">
          <img src={heroImg} alt="NFT Collection" className="rounded-xl mb-5" />{" "}
          <button className="customButton" onClick={navigateToMarket}>
            Step Into the Lab!
          </button>
        </div>
      </div>
    </>
  );
};

export default Hero;
