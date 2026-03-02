import { useNavigate, useParams } from "react-router-dom";

export default function StockOverview() {
  const { symbol } = useParams<{ symbol: string }>();
  const navigate = useNavigate();

  return (
    <div className="overview-wrap">
      <section className="overview-card">
        <button className="outline-btn" onClick={() => navigate(-1)}>
          ← Back to Chart
        </button>

        <h1 className="overview-title">{symbol} Overview</h1>
        <p className="overview-subtitle">
          Live market snapshots help you read momentum, participation, and short-term volatility.
          Use this pane to complement chart action and evaluate the stock context before entries.
        </p>

        <div className="overview-grid">
          <article className="metric">
            <label>MARKET CAP TIER</label>
            <strong>Large Cap</strong>
          </article>
          <article className="metric">
            <label>SESSION BIAS</label>
            <strong style={{ color: "var(--brand)" }}>Positive</strong>
          </article>
          <article className="metric">
            <label>VOLATILITY MODE</label>
            <strong style={{ color: "var(--warn)" }}>Elevated</strong>
          </article>
        </div>

        <p className="overview-subtitle" style={{ marginTop: "22px", marginBottom: 0 }}>
          For {symbol}, combine trend direction with volume expansion for confirmation. Avoid
          reacting to isolated ticks; prioritize structure and sustained flow.
        </p>
      </section>
    </div>
  );
}
