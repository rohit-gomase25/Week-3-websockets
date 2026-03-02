import { useParams, useNavigate } from "react-router-dom";

export default function StockOverview() {
  const { symbol } = useParams<{ symbol: string }>();
  const navigate = useNavigate();

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
        maxWidth: "800px", 
        padding: "60px 20px" 
      }}>
        
        {/* Navigation / Header */}
        <div style={{ marginBottom: "40px" }}>
          <button 
            onClick={() => navigate(-1)} 
            style={{ 
              background: "none", 
              border: "none", 
              color: "#484F58", 
              cursor: "pointer", 
              fontFamily: "monospace",
              fontSize: "14px",
              padding: "0",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            ← BACK TO CHART
          </button>
          
          <h1 style={{ 
            fontSize: "32px", 
            color: "#FFB800", 
            fontFamily: "monospace",
            margin: "0" 
          }}>
            {symbol} Overview
          </h1>
          <div style={{ 
            height: "2px", 
            width: "50px", 
            backgroundColor: "#FFB800", 
            marginTop: "12px" 
          }}></div>
        </div>

        {/* Content Section */}
        <div style={{ 
          backgroundColor: "#161B22", 
          padding: "32px", 
          borderRadius: "12px", 
          border: "1px solid #21262D",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
        }}>
          <p style={{ 
            color: "#8B949E", 
            fontFamily: "monospace", 
            fontSize: "16px", 
            lineHeight: "1.8",
            margin: "0"
          }}>
            <span style={{ color: "#E6EDF3", fontWeight: "bold" }}>Details for {symbol}:</span> 
            <br /><br />
            This overview provides a snapshot of the current market performance, 
            trading volume, and historical price trends. Use this section to analyze 
            volatility and make informed trading decisions based on real-time data.
            <br /><br />
            The technical indicators displayed in the previous view are synthesized 
            from live exchange feeds, ensuring you have the most up-to-date 
            perspective on {symbol}'s liquidity and momentum.
          </p>
        </div>

        {/* Decorative Footer */}
        <div style={{ 
          marginTop: "40px", 
          fontSize: "11px", 
          color: "#484F58", 
          fontFamily: "monospace", 
          textAlign: "center",
          letterSpacing: "1px"
        }}>
          MARKET DATA UPDATED REAL-TIME • 2026 TERMINAL
        </div>
      </div>
    </div>
  );
}