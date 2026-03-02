import { useMemo, useState } from "react";
import { Header } from "../headers/header";
import { StockTable } from "../components/StockTable";
import { useStore } from "../stores/useStockStore";
import type { Stock } from "../types/types";

export default function Dashboard() {
  const { stocks, isConnected, priceHistory } = useStore();
  const [searchText, setSearchText] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("symbol");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const filteredStocks = useMemo(() => {
    const query = searchText.toUpperCase().trim();
    const all = Object.values(stocks);
    if (!query) return all;
    return all.filter(
      (s) => s.symbol.includes(query) || s.name.toUpperCase().includes(query),
    );
  }, [stocks, searchText]);

  const sortedStocks = useMemo(() => {
    return [...filteredStocks].sort((a, b) => {
      const va = a[sortBy as keyof Stock];
      const vb = b[sortBy as keyof Stock];
      let cmp = 0;

      if (typeof va === "string" && typeof vb === "string") {
        cmp = va.localeCompare(vb);
      } else if (typeof va === "number" && typeof vb === "number") {
        cmp = va - vb;
      }

      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [filteredStocks, sortBy, sortDir]);

  function handleSort(column: string) {
    if (sortBy === column) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
      return;
    }
    setSortBy(column);
    setSortDir("asc");
  }

  return (
    <div className="dashboard-shell">
      <Header isConnected={isConnected} />

      <main className="dashboard-main">
        <div className="search-bar-wrap">
          <input
            className="search-input"
            type="text"
            placeholder="Search stocks..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <span className="stocks-count">{sortedStocks.length} stocks</span>
        </div>

        <section className="table-card">
          <StockTable
            stocks={sortedStocks}
            history={priceHistory}
            sortBy={sortBy}
            sortDir={sortDir}
            onSort={handleSort}
          />
        </section>
      </main>

      <footer className="footer-strip">
        <div className="footer-inner">
          <span>ws://localhost:8080</span>
          <span>Simulated data - for learning only</span>
        </div>
      </footer>
    </div>
  );
}
