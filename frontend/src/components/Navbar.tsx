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
      <nav className="flex flex-col sm:flex-row justify-between items-center h-auto sm:h-[175px] p-5 w-full max-w-[1200px] mx-auto">
        <div className="flex justify-start w-full sm:w-auto mb-4 sm:mb-0">
          {isInUserHistory || isInMarket ? (
            <button
              className="customButton mt-2 sm:mt-0 sm:ml-5 px-6 sm:px-5"
              onClick={navigateToHome}
            >
              Home
            </button>
          ) : (
            <>
              <button
                className="customButton mt-2 sm:mt-0 sm:ml-5 sm:px-5 mr-2"
                onClick={navigateToMarket}
              >
                Marketplace
              </button>
              <button
                className="customButton mt-2 sm:mt-0 sm:ml-5 px-6 sm:px-5"
                onClick={navigateToHistory}
              >
                History
              </button>
            </>
          )}
        </div>

        {/* Logo con classi responsive */}
        <div className="flex justify-center w-full sm:w-auto lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
          <img
            src={logo}
            alt="Logo"
            className="w-[120px] sm:w-[150px] lg:w-[170px]"
          />
        </div>

        <div className="flex justify-end w-full sm:w-auto mt-2 sm:mt-0">
          <w3m-button />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
