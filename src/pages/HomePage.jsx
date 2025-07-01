import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const size = 10;

  const fetchMovies = async (pageNumber) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/media/filter?page=${pageNumber}&size=${size}`,
        {
          credentials: "include",
        }
      );
      if (!res.ok) throw new Error("미디어 로딩 실패");
      const body = await res.json();
      const list = body.data.content;
      setMovies((prev) => [...prev, ...list]);
      setHasMore(list.length === size);
    } catch (error) {
      console.error("영화 리스트 로딩 에러:", error);
    }
  };

  useEffect(() => {
    if (movies.length === 0 || page > 0) {
      fetchMovies(page);
    }
  }, [page]);

  return (
    <Layout>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>🎥 NanFlex</h1>
      <h3>모두 보기</h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "1rem",
        }}
      >
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
              src={`${import.meta.env.VITE_BASE_URL}/images/${m.thumbnailName}`}
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
                  alignItems: "baseline", // 작은 글자 정렬 맞춤
                  marginBottom: "0.25rem",
                }}
              >
                <span style={{ fontWeight: "bold", textDecoration: "underline", fontSize: "1rem" }}>
                  {m.title}
                </span>
                <span style={{ fontSize: "0.85rem", color: "#ccc", fontWeight: "normal", textDecoration: "none" }}>
                  {m.mediaTypeName}
                </span>
              </div>

              <div style={{ textAlign: "right", fontSize: "0.85rem", color: "#ccc" }}>
                <div>{m.ageLimit}+</div>
                <div>{m.categories?.map(c => c.name).join(" / ")}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <button
          onClick={() => setPage((p) => p + 1)}
          style={{
            marginTop: "2rem",
            padding: "0.75rem 1.5rem",
            background: "#646cff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          더 보기
        </button>
      )}
    </Layout>
  );
}

export default HomePage;