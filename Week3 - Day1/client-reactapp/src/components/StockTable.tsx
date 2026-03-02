import type { Stock } from "../types/types";
import { StockRow } from "./StockRow";

type StockTableProps = {
  stocks: Stock[];
  history: Record<string, number[]>;
  sortBy: string;
  sortDir: "asc" | "desc";
  onSort: (column: string) => void;
};

const COLUMNS = [
  { key: "symbol", label: "SYMBOL", align: "left" as const },
  { key: "price", label: "PRICE", align: "right" as const },
  { key: "changePercent", label: "CHNG %", align: "right" as const },
  { key: "change", label: "CHNG", align: "right" as const },
  { key: "volume", label: "VOLUME", align: "right" as const },
  { key: "trend", label: "TREND", align: "center" as const, noSort: true },
];

export function StockTable({
  stocks,
  history,
  sortBy,
  sortDir,
  onSort,
}: StockTableProps) {
  return (
    <div className="table-scroll">
      <table className="stock-table">
        <thead>
          <tr>
            {COLUMNS.map((col) => (
              <th
                key={col.key}
                className={`${!col.noSort ? "sortable" : ""} ${sortBy === col.key ? "active" : ""}`}
                onClick={() => !col.noSort && onSort(col.key)}
                style={{ textAlign: col.align }}
              >
                {col.label}
                {sortBy === col.key && (
                  <span style={{ marginLeft: "6px" }}>
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
              history={history[stock.symbol] || []}
            />
          ))}

          {stocks.length === 0 && (
            <tr>
              <td
                colSpan={6}
                style={{
                  textAlign: "center",
                  padding: "120px 0",
                  color: "var(--muted)",
                  fontFamily: '"JetBrains Mono", monospace',
                }}
              >
                <div style={{ fontSize: "1rem", marginBottom: "8px", color: "var(--text)" }}>
                  Waiting for market data...
                </div>
                <div style={{ fontSize: "0.8rem" }}>
                  Connecting to ws://localhost:8080
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
