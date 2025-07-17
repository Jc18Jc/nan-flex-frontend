import { useState } from "react";
import MediaSection from "./MediaSection";
import MediaUpdate from "./MediaUpdate";
import MediaDetail from "./MediaDetail";
import MediaCreate from "./MediaCreate";
import AdminMediaSearchModal from "./AdminMediaSearchModal";
import EpisodeManage from "./episode_manage/EpisodeManage";

function MediaManage() {
  const [selectedMediaId, setSelectedMediaId] = useState(null);
  const [media, setMedia] = useState(null)
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [manageEpisode, setManageEpisode] = useState(false);

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

  if (selectedMediaId && manageEpisode) {
    return (
      <EpisodeManage
        mediaId={selectedMediaId}
        media={media}
        onBack={() => setManageEpisode(false)}
        setMedia={setMedia}
      />
    );
  }

  if (selectedMediaId) {
    return (
      <MediaDetail
        mediaId={selectedMediaId}
        onBack={() => setSelectedMediaId(null)}
        onEdit={() => setIsEditing(true)}
        onManageEpisode={(media) => {
          setMedia(media)
          setManageEpisode(true)
        }}
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
          <button
            onClick={() => setIsCreating(true)}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#444",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            등록
          </button>

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