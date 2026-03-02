type HeaderProps = {
  isConnected: boolean;
};

export function Header({ isConnected }: HeaderProps) {
  return (
    <header className="top-header">
      <div className="top-header-inner">
        <div style={{ display: "flex", alignItems: "center" }}>
          <span className="brand-mark">groww</span>
          <span className="brand-subtitle">dev feed</span>
        </div>

        <div
          className="live-state"
          style={{
            color: isConnected ? "var(--brand)" : "var(--danger)",
          }}
        >
          <span
            className="live-dot"
            style={{
              backgroundColor: isConnected ? "var(--brand)" : "var(--danger)",
              boxShadow: isConnected
                ? "0 0 10px rgba(22, 219, 152, 0.7)"
                : "0 0 10px rgba(255, 87, 104, 0.7)",
            }}
          />
          {isConnected ? "LIVE" : "OFFLINE"}
        </div>
      </div>
    </header>
  );
}
