import { useNavigate } from "react-router-dom";

function GeneralMediaSection({ title, movies, hasMore, onLoadMore, emptyPhrase}) {
  const navigate = useNavigate()

  return (
    <div>
      <div style={{ marginBottom: "2rem"}}>
        <h3 style={{ margin: "1rem 0" }}>{title}</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          {movies.length===0 && (<div style={{ marginLeft: '0.5rem', color: 'grey'}}>{`${emptyPhrase}`}</div>)}

          {movies.map((m) => (
            <div
              key={m.id}
              onClick={() => navigate(`/media/${m.id}`)}
              style={{
                backgroundColor: "#1e1e1e",
                borderRadius: "8px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                height: "300px",
                cursor: "pointer",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
            >
              <img
                src={m.imageUrl}
                alt={m.title}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                }}
              />
              <div style={{ padding: "0.5rem", flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: "0.25rem",
                  }}
                >
                  <span style={{ fontWeight: "bold", textDecoration: "underline", fontSize: "1rem" }}>
                    {m.title}
                  </span>
                  <span style={{ fontSize: "0.85rem", color: "#ccc" }}>
                    {m.mediaTypeName}
                  </span>
                </div>
                <div style={{ textAlign: "right", fontSize: "0.85rem", color: "#ccc" }}>
                  <div>{m.ageLimit}+</div>
                  <div>{m.categories?.map((c) => c.name).join(" / ")}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {hasMore && onLoadMore && (
        <button
          onClick={onLoadMore}
          style={{
            marginTop: "2rem",
            padding: "0.75rem 1.5rem",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          더 보기
        </button>
      )}
    </div>
  );
}

export default GeneralMediaSection;