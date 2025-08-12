import { useState } from "react";

export default function EpisodeSection({ media, onCreate, onBack, setMedia }) {
  const [editingEpisodeId, setEditingEpisodeId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [selectEpisodeId, setSelectedEpisodeId] = useState(null);

  const handleMediaClick = (id) => {
    if (selectEpisodeId === null) {
      setSelectedEpisodeId(id);
    } else if (selectEpisodeId === id) {
      setSelectedEpisodeId(null);
    } else {
      setSelectedEpisodeId(id)
    }
  }

  const handleDeleteEpisode = async (id) => {
    const res = await fetch(`/api/episode/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (res.ok) {
      const result = await res.json();
      if (!result.apiHeader.success || result.apiHeader.code === 404) {
        alert("삭제 실패");
        return;
      }

      const updatedEpisodes = media.episodes.filter((ep) => ep.id !== id);
      setMedia({ ...media, episodes: updatedEpisodes });

      alert("삭제 완료");
    } else {
      alert("삭제 실패");
    }
  }

  const handleSaveEdit = async (episodeNumber, title, file) => {
    const formData = new FormData();
    formData.append("episodeNumber", episodeNumber);
    formData.append("title", title);
    if (file) {
      formData.append("file", file)
    }

    const res = await fetch(`/api/episode/${editingEpisodeId}`, {
      method: "PUT",
      body: formData,
      credentials: "include",
    })

    if (res.ok) {
      const result = await res.json();
      const updatedEpisode = result.data;

      const updatedEpisodes = media.episodes
        .map((ep) => (ep.id === updatedEpisode.id ? updatedEpisode : ep))
        .sort((a, b) => a.episodeNumber - b.episodeNumber);

      setMedia({ ...media, episodes: updatedEpisodes });

      alert("수정 성공");
      setEditingEpisodeId(null);
    } else {
      alert("수정 실패");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <button onClick={onBack}>← 목록으로</button>
      <div style={{ marginTop: "1.5rem" }}>
        <div style={{
          justifyContent: "space-between",                
          display: "flex",
          alignItems: "center",
        }}>
          <h2>{media.title}</h2>
          <img
            src="/home/images/add.png"
            alt="추가"
            style={{ 
              width: "36px", 
              height: "36px",
              cursor: "pointer"
            }}
            onClick={onCreate}
          />
        </div>
        <hr></hr>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          {media.episodes.map((ep) => (
            <div key={ep.id}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem",
                  cursor: "pointer",
                  borderBottom: "1px solid #444",
                  padding: "1rem 0"
                }}
                onClick={() => handleMediaClick(ep.id)}
              >
                <div style={{ display: "flex", gap: "1rem", flex: 1 }}>
                  <img
                    src={ep.thumbnailUrl}
                    alt="썸네일"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover"
                    }}
                  />

                  {editingEpisodeId === ep.id ? (
                    <div style={{  display:"flex", flexDirection: "column", flex: 1 }}>
                      <input style = {inputStyle} type="number" name="episodeNumber" defaultValue={ep.episodeNumber} placeholder="회차" />
                      <input style = {inputStyle} type="text" name="title" defaultValue={ep.title} placeholder="제목" />
                      <input style = {inputStyle} type="file" name = "file"/>
                      <div style={{ marginTop: "0.5rem" }}>
                        <button 
                          style = {{ margin: "0.5rem"}} 
                          onClick={(e) => {
                            const container = e.target.closest("div").parentNode;
                            const episodeNumber = container.querySelector("[name='episodeNumber']")?.value;
                            const title = container.querySelector("[name='title']")?.value;
                            const file = container.querySelector("[name='file']")?.files[0];
                            const finalEpisodeNumber = episodeNumber !== "" ? episodeNumber : ep.episodeNumber;
                            const finalTitle = title !== "" ? title : ep.title;
                            handleSaveEdit(finalEpisodeNumber, finalTitle, file);
                          }}
                        >저장</button>
                        <button onClick={() => setEditingEpisodeId(null)}>취소</button>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                      <div style={{ fontWeight: "bold", textDecoration: "underline" }}>
                        {ep.episodeNumber}화 {ep.title}
                      </div>
                      <div>{Math.floor(ep.duration / 60)}분</div>
                      <div>등록: {ep.releaseDate}</div>
                    </div>
                  )}
                </div>

                {editingEpisodeId !== ep.id && (
                  <div style={{ display: "flex", gap: "0.5rem" }} onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => setEditingEpisodeId(ep.id)}>
                      <img
                        src="/home/images/update.png"
                        alt="수정"
                        style={{ width: "24px", height: "24px" }}
                      />
                    </button>
                    <button onClick={() => setConfirmDeleteId(ep.id)}>
                      <img
                        src="/home/images/delete.png"
                        alt="삭제"
                        style={{ width: "24px", height: "24px" }}
                      />
                    </button>
                  </div>
                )}
              </div>
              {selectEpisodeId && selectEpisodeId === ep.id && (
                <div>
                  <video controls style={{width: "640px", height: "360px"}}>
                    <source src={ep.videoUrl} type="video/mp4" />
                    브라우저가 video 태그를 지원하지 않습니다.
                  </video>
                </div>
              )}
            </div>
          ))}



          {confirmDeleteId !== null && (
            <div style={{
              position: "fixed",
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}>
              <div style={{
                backgroundColor: "#222",
                padding: "2rem",
                borderRadius: "10px",
                textAlign: "center",
                color: "#fff",
              }}>
                <p>정말 삭제하시겠습니까?</p>
                <div style={{ marginTop: "1rem", display: "flex", gap: "1rem", justifyContent: "center" }}>
                  <button
                    onClick={() => {
                      handleDeleteEpisode(confirmDeleteId);
                      setConfirmDeleteId(null);
                    }}
                    style={{ backgroundColor: "#c00", color: "white", padding: "0.5rem 1rem" }}
                  >
                    삭제
                  </button>
                  <button
                    onClick={() => setConfirmDeleteId(null)}
                    style={{ padding: "0.5rem 1rem" }}
                  >
                    취소
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>

  );
}

const inputStyle = {
  padding: "0.5rem",
  backgroundColor: "#2e2e2e",
  border: "1px solid #555",
  color: "#fff",
  borderRadius: "4px",
  width: "300px",
  boxSizing: "border-box",
  marginTop: "0.5rem"
};