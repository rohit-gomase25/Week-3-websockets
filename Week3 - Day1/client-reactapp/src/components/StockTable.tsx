import type { Stock } from "../types/types";
import { StockRow } from "./StockRow";

type StockTableProps = {
  stocks:   Stock[];
  history:  Record<string, number[]>;
  sortBy:   string;
  sortDir:  "asc" | "desc";
  onSort:   (column: string) => void;
};

const COLUMNS = [
  { key: "symbol",        label: "SYMBOL", align: "left"   as const },
  { key: "price",         label: "PRICE",  align: "right"  as const },
  { key: "changePercent", label: "CHNG %", align: "right"  as const },
  { key: "change",        label: "CHNG",   align: "right"  as const },
  { key: "volume",        label: "VOLUME", align: "right"  as const },
  { key: "trend",         label: "TREND",  align: "center" as const, noSort: true },
];

export function StockTable({ stocks, history, sortBy, sortDir, onSort }: StockTableProps) {
  return (
    <div style={{ flex: 1, overflowY: "auto", backgroundColor: "#0D1117" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
        
        <thead style={{
          position: "sticky", top: 0, zIndex: 10,
          backgroundColor: "#0D1117",
          borderBottom: "1px solid #21262D",
        }}>
          <tr>
            {COLUMNS.map((col) => (
              <th
                key={col.key}
                onClick={() => !col.noSort && onSort(col.key)}
                style={{
                  padding: "12px 16px", textAlign: col.align,
                  fontSize: "10px", letterSpacing: "1px",
                  fontWeight: "bold", fontFamily: "monospace",
                  color: sortBy === col.key ? "#FFB800" : "#8B949E",
                  cursor: col.noSort ? "default" : "pointer",
                  userSelect: "none",
                  transition: "color 0.2s",
                }}
              >
                {col.label}
                {sortBy === col.key && (
                  <span style={{ marginLeft: "4px" }}>
                    {sortDir === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {stocks.map((stock) => (
            <StockRow
              key={stock.symbol}
              stock={stock}
              // We only need the history array for the sparkline now
              history={history[stock.symbol] || []}
            />
          ))}
          
          {stocks.length === 0 && (
            <tr>
              <td colSpan={6} style={{ textAlign: "center", padding: "100px 0",
                                       color: "#484F58", fontFamily: "monospace" }}>
                <div style={{ fontSize: "14px", marginBottom: "8px" }}>Waiting for market data...</div>
                <div style={{ fontSize: "11px" }}>Connecting to ws://localhost:8080</div>
              </td>
            </tr>
          )}
        </tbody>

      </table>
    </div>
  );
}