import { useEffect, useState } from "react";

function MediaDetail({ mediaId, onBack, onEdit }) {
  const [media, setMedia] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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

  const handleDelete = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/media/${mediaId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("삭제 실패");
      alert("삭제가 완료되었습니다.");
      setShowDeleteModal(false);
      onBack();
    } catch (err) {
      console.error("삭제 에러:", err);
      alert("삭제 실패");
    }
  };

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

        <button
          onClick={() => setShowDeleteModal(true)}
          style={{
            backgroundColor: "transparent",
            border: "1px solid #fff",
            color: "#fff",
            padding: "0.5rem 1rem",
            cursor: "pointer",
            borderRadius: "4px",
            marginTop: "0.5rem"
          }}
        >
          삭제
        </button>
      </div>

      {showDeleteModal && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "#2c2c2c",
            padding: "2rem",
            borderRadius: "8px",
            boxShadow: "0 2px 20px rgba(0,0,0,0.5)",
            color: "#fff",
            zIndex: 1000,
          }}
        >
          <h3>정말 삭제하시겠습니까?</h3>
          <p>{media.title} 미디어가 삭제됩니다.</p>
          <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "center", gap: "1rem" }}>
            <button
              onClick={handleDelete}
              style={{
                padding: "0.5rem 1rem",
                background: "#d9534f",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
              }}
            >
              삭제
            </button>
            <button
              onClick={() => setShowDeleteModal(false)}
              style={{
                padding: "0.5rem 1rem",
                background: "#555",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
              }}
            >
              취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MediaDetail;