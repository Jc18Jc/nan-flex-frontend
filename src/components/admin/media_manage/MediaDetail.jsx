import { useEffect, useState } from "react";

function MediaDetail({ mediaId, onBack, onEdit }) {
  const [media, setMedia] = useState(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/media/${mediaId}`, {
          credentials: "include",
        });
        const result = await res.json();
        const data = result.data;

        const categoryNames = data.categories.map((category) => category.name);
        setMedia({ ...data, categoryNames });
      } catch (err) {
        console.error("미디어 상세 로딩 실패", err);
      }
    };

    fetchMedia();
  }, [mediaId]);

  if (!media) return <div>로딩 중...</div>;

  return (
    <div style={{ padding: "2rem", color: "#fff" }}>
      <button onClick={onBack}>← 목록으로</button>
        <div style={{
            maxWidth: "600px",
            padding: "2rem",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            color: "#fff",
          }}
        >
        <h2>{media.title}</h2>
        <img
          src={`${import.meta.env.VITE_BASE_URL}/images/${media.thumbnailName}`}
          alt={media.title}
          style={{ width: "200px", height: "200px", objectFit: "cover" }}
        />
        <p><strong>유형:</strong> {media.mediaTypeName}</p>
        <p><strong>국가:</strong> {media.country}</p>
        <p><strong>출시 연도:</strong> {media.releaseYear}</p>
        <p><strong>연령 제한:</strong> {media.ageLimit === 0 ? "ALL" : media.ageLimit + "+"}</p>
        <p><strong>설명:</strong> {media.description }</p>
        {media && media.categoryNames && (
          <p><strong>카테고리:</strong> {media.categoryNames.join(", ")}</p>
        )}
        <button
          style={{
            marginTop: "1.5rem",
            padding: "0.5rem 1rem",
            background: "#333",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
          onClick={onEdit}
        >
          수정
        </button>
      </div>
    </div>
  );
}

export default MediaDetail;