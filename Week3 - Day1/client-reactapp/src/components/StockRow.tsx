import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Stock } from "../types/types";
import { Sparkline } from "./Sparkline";
import { formatPrice, formatPercent, formatChange,
         formatVolume, getColor, getBgColor } from "../helper/helpers";

type StockRowProps = {
  stock: Stock;
  history: number[];
  isSelected?: boolean; // Optional now if handled by URL
};

export function StockRow({ stock, history = [] }: StockRowProps) {
  const navigate = useNavigate();
  const prevPrice = useRef<number>(stock?.price || 0);
  const [flash, setFlash] = useState<string>("");

  useEffect(() => {
    if (!stock?.price || stock.price === prevPrice.current) return;

    setFlash(stock.price > prevPrice.current ? "flash-up" : "flash-down");
    prevPrice.current = stock.price;

    const timer = setTimeout(() => setFlash(""), 600);
    return () => clearTimeout(timer);
  }, [stock?.price]);

  const price = stock?.price || 0;
  const changePercent = stock?.changePercent || 0;
  const change = stock?.change || 0;
  const volume = stock?.volume || 0;
  const isPositive = changePercent >= 0;

  // Navigate to the dynamic stock detail route
  const handleClick = () => {
    navigate(`/stock/${stock.symbol}`);
  };

  return (
    <tr
      className={flash}
      onClick={handleClick}
      style={{
        cursor: "pointer",
        borderBottom: "1px solid #161B22",
        transition: "background-color 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#161B22")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
    >
      <td style={{ padding: "10px 16px" }}>
        <div style={{ fontWeight: "bold", color: "#E6EDF3", fontSize: "13px" }}>
          {stock?.symbol || "---"}
        </div>
        <div style={{ fontSize: "10px", color: "#484F58", marginTop: "2px" }}>
          {stock?.sector || ""}
        </div>
      </td>

      <td style={{ padding: "10px 16px", textAlign: "right" }}>
        <span style={{ fontFamily: "monospace", fontWeight: "bold", fontSize: "14px", color: "#E6EDF3" }}>
          {formatPrice(price)}
        </span>
      </td>

      <td style={{ padding: "10px 16px", textAlign: "right" }}>
        <span style={{
          display: "inline-block", padding: "2px 8px", borderRadius: "4px",
          backgroundColor: getBgColor(changePercent),
          color: getColor(changePercent),
          fontFamily: "monospace", fontSize: "12px", fontWeight: "bold",
        }}>
          {formatPercent(changePercent)}
        </span>
      </td>

      <td style={{ padding: "10px 16px", textAlign: "right" }}>
        <span style={{ fontFamily: "monospace", fontSize: "12px", color: getColor(change) }}>
          {formatChange(change)}
        </span>
      </td>

      <td style={{ padding: "10px 16px", textAlign: "right" }}>
        <span style={{ fontFamily: "monospace", fontSize: "11px", color: "#484F58" }}>
          {formatVolume(volume)}
        </span>
      </td>

      <td style={{ padding: "10px 16px", textAlign: "center" }}>
        <Sparkline prices={Array.isArray(history) ? history : []} isGreen={isPositive} width={70} height={26} />
      </td>
    </tr>
  );
}