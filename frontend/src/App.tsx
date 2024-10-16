import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NftMarketplacePage from "./pages/NftMarketplacePage";
import NftDetailsPage from "./pages/NftDetailsPage";
import PurchaseHistoryPage from "./pages/PurchaseHistoryPage";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/market" element={<NftMarketplacePage />} />
          <Route path="/market/:nftId" element={<NftDetailsPage />} />
          <Route path="/user/history" element={<PurchaseHistoryPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
