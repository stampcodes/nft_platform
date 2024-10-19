import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/imgs/logo.png";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isInUserHistory = location.pathname === "/user/history";
  const isInMarket = location.pathname === "/market";
  // const isInMarketNFT = location.pathname.startsWith("/market/");

  const navigateToMarket = () => {
    navigate("/market");
  };

  const navigateToHistory = () => {
    navigate("/user/history");
  };

  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <>
      <nav className="flex justify-around items-center h-[175px]">
        <img
          src={logo}
          alt="Logo"
          className="w-[170px] absolute left-[875px] top-0 "
        />
        {isInUserHistory || isInMarket ? (
          <button className="customButton" onClick={navigateToHome}>
            Home
          </button>
        ) : (
          <div>
            <button className="customButton ml-5" onClick={navigateToMarket}>
              Marketplace
            </button>
            <button className="customButton ml-5" onClick={navigateToHistory}>
              History
            </button>
          </div>
        )}
        <div className="mr-5">
          <w3m-button />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
