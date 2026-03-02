import { useNavigate } from "react-router-dom";
import {
  formatChange,
  formatPercent,
  formatPrice,
  formatVolume,
  getBgColor,
  getColor,
} from "../helper/helpers";
import type { Stock } from "../types/types";
import { Sparkline } from "./Sparkline";

type StockRowProps = {
  stock: Stock;
  history: number[];
  isSelected?: boolean;
};

export function StockRow({ stock, history = [] }: StockRowProps) {
  const navigate = useNavigate();

  const price = stock?.price || 0;
  const changePercent = stock?.changePercent || 0;
  const change = stock?.change || 0;
  const volume = stock?.volume || 0;
  const isPositive = changePercent >= 0;

  return (
    <tr className="stock-row" onClick={() => navigate(`/stock/${stock.symbol}`)}>
      <td>
        <div className="symbol-title">{stock?.symbol || "---"}</div>
        <div className="symbol-sector">{stock?.sector || ""}</div>
      </td>

      <td style={{ textAlign: "right" }}>
        <span className="mono" style={{ fontWeight: 700, fontSize: "1.02rem" }}>
          {formatPrice(price)}
        </span>
      </td>

      <td style={{ textAlign: "right" }}>
        <span
          className="price-pill mono"
          style={{
            backgroundColor: getBgColor(changePercent),
            color: getColor(changePercent),
          }}
        >
          {formatPercent(changePercent)}
        </span>
      </td>

      <td style={{ textAlign: "right" }}>
        <span className="mono" style={{ color: getColor(change), fontSize: "0.85rem" }}>
          {formatChange(change)}
        </span>
      </td>

      <td style={{ textAlign: "right" }}>
        <span className="mono" style={{ color: "var(--muted)", fontSize: "0.78rem" }}>
          {formatVolume(volume)}
        </span>
      </td>

      <td style={{ textAlign: "center" }}>
        <Sparkline
          prices={Array.isArray(history) ? history : []}
          isGreen={isPositive}
          width={76}
          height={28}
        />
      </td>
    </tr>
  );
}
