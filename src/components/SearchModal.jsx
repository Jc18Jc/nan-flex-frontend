function SearchModal({ query, setQuery, onSearch, show, onClose }) {
  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "#2c2c2c",
        padding: "1.5rem",
        borderRadius: "8px",
        boxShadow: "0 2px 20px rgba(0, 0, 0, 0.5)",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          fontWeight: "bold",
          fontSize: "1.3rem",
          marginBottom: "1rem",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        검색
        <button
          onClick={onClose}
          style={{
            background: "transparent",
            border: "none",
            color: "#fff",
            fontSize: "1.2rem",
            cursor: "pointer",
          }}
        >
          ✕
        </button>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="검색어 입력"
          style={{
            padding: "0.5rem",
            width: "500px",
            fontSize: "1rem",
            border: "none",
            borderRadius: "4px",
          }}
        />
        <button
          onClick={onSearch}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "0 1rem",
          }}
        >
          <img
            src="/home/images/search.png"
            alt="검색"
            style={{ width: "24px", height: "24px" }}
          />
        </button>
      </div>
    </div>
  );
}

export default SearchModal;