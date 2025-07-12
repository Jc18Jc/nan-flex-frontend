// MediaManage.jsx
import { useState } from "react";
import MediaSection from "./MediaSection";
import MediaUpdate from "./MediaUpdate";
import MediaDetail from "./MediaDetail";
import CreateButton from "./CreateButton";
import MediaCreate from "./MediaCreate";
import AdminMediaSearchModal from "./AdminMediaSearchModal";

function MediaManage() {
  const [selectedMediaId, setSelectedMediaId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState(null);

  const handleAdminSearch = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/media/filter?title=${encodeURIComponent(query)}`,
        { credentials: "include" }
      );
      if (!res.ok) throw new Error("검색 실패");
      const result = await res.json();
      setFilteredMovies(result.data.content);
      setShowSearch(false);
    } catch (err) {
      console.error("검색 오류:", err);
    }
  };

  if (isCreating) {
    return (
      <div style={{ padding: "2rem" }}>
        <MediaCreate onBack={() => setIsCreating(false)} />
      </div>
    );
  }

  if (selectedMediaId && isEditing) {
    return (
      <MediaUpdate
        mediaId={selectedMediaId}
        onBack={() => setIsEditing(false)}
      />
    );
  }

  if (selectedMediaId) {
    return (
      <MediaDetail
        mediaId={selectedMediaId}
        onBack={() => setSelectedMediaId(null)}
        onEdit={() => setIsEditing(true)}
      />
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 1rem",
        }}
      >
        <div style={{ fontSize: "20px", fontWeight: "bold" }}>리스트</div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <CreateButton onClick={() => setIsCreating(true)} label="등록" />
          <button
            onClick={() => setShowSearch(true)}
            style={{
              backgroundColor: "transparent",
              border: "1px solid #fff",
              color: "#fff",
              padding: "0.5rem 1rem",
              cursor: "pointer",
              borderRadius: "4px",
            }}
          >
            검색
          </button>
        </div>
      </div>

      <MediaSection
        onSelectMedia={(id) => setSelectedMediaId(id)}
        movies={filteredMovies}
      />

      <AdminMediaSearchModal
        show={showSearch}
        onClose={() => setShowSearch(false)}
        onSelect={(id) => {
          setSelectedMediaId(id);
          setShowSearch(false);
        }}
      />
    </div>
  );
}

export default MediaManage;