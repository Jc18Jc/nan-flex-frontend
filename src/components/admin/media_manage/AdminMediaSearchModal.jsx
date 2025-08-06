import { useState } from "react";

function AdminMediaSearchModal({ show, onClose, onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  if (!show) return null;

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch(
        `/api/media/filter?title=${encodeURIComponent(query)}`,
        { credentials: "include" }
      );
      if (!res.ok) throw new Error("검색 실패");

      const body = await res.json();
      setResults(body.data.content || []);
    } catch (err) {
      console.error("검색 실패:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "#2c2c2c",
        padding: "2rem",
        borderRadius: "10px",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.6)",
        zIndex: 1000,
        minWidth: "600px",
        maxHeight: "80vh",
        overflowY: "auto",
        color: "#fff",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
        <h2 style={{ margin: 0 }}>미디어 검색</h2>
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

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="제목을 입력하세요"
          style={{
            flex: 1,
            padding: "0.5rem",
            fontSize: "1rem",
            border: "none",
            borderRadius: "4px",
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          onClick={handleSearch}
          style={{
            background: "#646cff",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          검색
        </button>
      </div>

      {isLoading && <p>검색 중...</p>}

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {results.length === 0 && !isLoading && <p>검색 결과가 없습니다.</p>}

        {results.map((media) => (
          <div
            key={media.id}
            onClick={() => onSelect(media.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              padding: "0.5rem",
              background: "#1e1e1e",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#1e1e1e")}
          >
            <img
              src={media.imageUrl}
              alt={media.title}
              style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "4px" }}
            />
            <div>
              <div style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{media.title}</div>
              <div style={{ fontSize: "0.9rem", color: "#aaa" }}>
                {media.mediaTypeName} / {media.releaseYear} / {media.ageLimit}+<br />
                {media.categories?.map((c) => c.name).join(", ")}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminMediaSearchModal;