import { Routes, Route } from "react-router-dom";
import { useWebSocket } from "./webSockets/useWebSocket";
import Dashboard from "./pages/Dashboard";
import { StockDetail } from "./pages/stockDetails";
import StockOverview from "./pages/StockOverview";

export default function App() {
  useWebSocket();

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      
      {/* Route for the main detail page */}
      <Route path="/stock/:symbol" element={<StockDetail />} />

      {/* Independent Route for overview - it won't show StockDetail content */}
      <Route path="/stock/:symbol/overview" element={<StockOverview />} />
      
      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  );
}