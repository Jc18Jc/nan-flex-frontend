import { useEffect, useState } from "react";

function MediaSection({ onSelectMedia }) {
  const [movies, setMovies] = useState([]);
  const [moviesPage, setMoviesPage] = useState(0);
  const [hasMoreMovies, setHasMoreMovies] = useState(true);

  const fetchMovies = async (pageNumber) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/media/filter?page=${pageNumber}&size=30&sort=createdAt,desc`,
        {
          credentials: "include",
        }
      );
      if (!res.ok) throw new Error("미디어 로딩 실패");
      const body = await res.json();
      const list = body.data.content;

      setMovies(list);
      setHasMoreMovies(!body.data.last);
    } catch (error) {
      console.error("영화 리스트 로딩 에러:", error);
    }
  };

  useEffect(() => {
    fetchMovies(moviesPage);
  }, [moviesPage]);

  return (
    <div style={{ padding: "2rem" }}>
      <div style={{ marginTop: "1.5rem" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          {movies.map((m) => (
            <div
              key={m.id}
              onClick={() => onSelectMedia(m.id)}
              style={{
                display: "flex",
                gap: "1rem",
                cursor: "pointer",
              }}
            >
              <img
                src={m.imageUrl}
                alt={m.title}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    fontWeight: "bold",
                    textDecoration: "underline",
                  }}
                >
                  {m.title}
                </div>
              </div>
            </div>
          ))}
        </div>

        {(
          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
            }}
          >
            <button
              onClick={() => setMoviesPage((prev) => Math.max(prev - 1, 0))}
              disabled={moviesPage === 0}
            >
              이전
            </button>
            <span>{moviesPage + 1} 페이지</span>
            <button
              onClick={() => setMoviesPage((prev) => prev + 1)}
              disabled={!hasMoreMovies}
            >
              다음
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MediaSection;