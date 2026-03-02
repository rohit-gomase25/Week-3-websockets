import { useParams, useNavigate } from "react-router-dom";
import { useStore } from "../stores/useStockStore";
import { Sparkline } from "../components/Sparkline";
import { 
  formatPrice, formatPercent, formatChange, 
  formatVolume, getColor, getBgColor 
} from "../helper/helpers";

function StatItem({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <span style={{ fontSize: "10px", color: "#484F58", fontFamily: "monospace", letterSpacing: "1px" }}>
        {label}
      </span>
      <span style={{ fontSize: "14px", fontFamily: "monospace", fontWeight: "bold", color: color || "#8B949E" }}>
        {value}
      </span>
    </div>
  );
}

export function StockDetail() {
  const { symbol } = useParams<{ symbol: string }>();
  const navigate = useNavigate();
  const { stocks, priceHistory } = useStore();

  const stock = symbol ? stocks[symbol] : null;
  const history = symbol ? (priceHistory[symbol] || []) : [];

  const handleClose = () => navigate("/");

  if (!stock) {
    return (
      <div style={{ height: "100vh", backgroundColor: "#0D1117", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#484F58", fontFamily: "monospace" }}>Stock not found</p>
      </div>
    );
  }

  const isPositive = stock.changePercent >= 0;

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#0D1117",
      color: "#E6EDF3",
      display: "flex",
      justifyContent: "center" 
    }}>
      <div style={{
        width: "100%",
        maxWidth: "900px", 
        padding: "40px 20px"
      }}>
        
        {/* Header Section */}
        <div style={{ position: "relative", marginBottom: "32px" }}>
          <button onClick={handleClose} style={{
            position: "absolute", top: "0", right: "0",
            background: "none", border: "none", color: "#484F58",
            fontSize: "32px", cursor: "pointer", lineHeight: 1,
          }}>
            &times;
          </button>

          <div style={{ fontSize: "12px", color: "#484F58", fontFamily: "monospace", marginBottom: "8px" }}>
            {stock.sector}
          </div>
          <h1 style={{ fontSize: "48px", fontWeight: "bold", color: "#FFB800", margin: "0 0 8px 0" }}>
            {stock.symbol}
          </h1>
          <div style={{ fontSize: "18px", color: "#8B949E", marginBottom: "24px" }}>
            {stock.name}
          </div>

          <div style={{ fontSize: "42px", fontWeight: "bold", fontFamily: "monospace", marginBottom: "12px" }}>
            {formatPrice(stock.price)}
          </div>

          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <span style={{
              padding: "4px 12px", borderRadius: "4px",
              backgroundColor: getBgColor(stock.changePercent),
              color: getColor(stock.changePercent),
              fontFamily: "monospace", fontSize: "16px", fontWeight: "bold",
            }}>
              {formatPercent(stock.changePercent)}
            </span>
            <span style={{ fontFamily: "monospace", fontSize: "16px", color: getColor(stock.change) }}>
              {formatChange(stock.change)}
            </span>
          </div>
        </div>

        {/* Chart Section */}
        <div style={{ 
          backgroundColor: "#161B22", 
          borderRadius: "12px", 
          padding: "24px", 
          marginBottom: "40px",
          border: "1px solid #21262D"
        }}>
          <Sparkline prices={history} isGreen={isPositive} width={820} height={250} />
        </div>

        {/* Stats Grid */}
        <div style={{
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", 
          gap: "32px",
          padding: "0 10px"
        }}>
          <StatItem label="OPEN" value={formatPrice(stock.open)} />
          <StatItem label="PREV CLOSE" value={formatPrice(stock.prevClose)} />
          <StatItem label="DAY HIGH" value={formatPrice(stock.high)} color="#00C87C" />
          <StatItem label="DAY LOW" value={formatPrice(stock.low)} color="#FF4D4D" />
          <StatItem label="VOLUME" value={formatVolume(stock.volume)} />
        </div>

        {/* --- NEW BUTTON AT BOTTOM --- */}
        <div style={{ 
          marginTop: "60px", 
          textAlign: "center", 
          borderTop: "1px solid #21262D", 
          paddingTop: "30px" 
        }}>
          <button 
            onClick={() => navigate(`/stock/${symbol}/overview`)}
            style={{
              backgroundColor: "#FFB800",
              color: "#0D1117",
              border: "none",
              padding: "12px 30px",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "bold",
              cursor: "pointer",
              fontFamily: "monospace"
            }}
          >
            VIEW COMPANY OVERVIEW →
          </button>
        </div>
      </div>
    </div>
  );
}