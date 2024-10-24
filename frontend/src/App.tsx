import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NftMarketplacePage from "./pages/NftMarketplacePage";
import NftDetailsPage from "./pages/NftDetailsPage";
import PurchaseHistoryPage from "./pages/PurchaseHistoryPage";
import { useEffect } from "react";

const App = () => {
  const handleMouseMove = (e: MouseEvent) => {
    const x = `${e.clientX}px`;
    const y = `${e.clientY}px`;
    document.documentElement.style.setProperty("--x", x);
    document.documentElement.style.setProperty("--y", y);
  };
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/market" element={<NftMarketplacePage />} />
          <Route path="/market/:tokenId" element={<NftDetailsPage />} />
          <Route path="/user/history" element={<PurchaseHistoryPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
