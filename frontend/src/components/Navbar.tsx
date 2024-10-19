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
              style={{ paddingLeft: "40px", paddingRight: "40px" }}
              className="customButton mt-2 sm:mt-0 sm:ml-5 px-6 sm:px-10"
              onClick={navigateToHome}
            >
              Home
            </button>
          ) : (
            <>
              <button
                className="customButton mt-2 sm:mt-0 sm:ml-5 px-6 sm:px-10"
                onClick={navigateToMarket}
              >
                Marketplace
              </button>
              <button
                className="customButton mt-2 sm:mt-0 sm:ml-5 px-6 sm:px-10"
                onClick={navigateToHistory}
              >
                History
              </button>
            </>
          )}
        </div>

        <div className="flex justify-center w-full sm:w-auto">
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
