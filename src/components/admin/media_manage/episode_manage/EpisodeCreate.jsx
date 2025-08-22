import { useState } from "react";
import { useAdminSession } from "../../AdminContext";

export default function EpisodeCreate({ mediaId, onBack, onSuccess }) {
const [form, setForm] = useState({
    episodeNumber: "",
    title: "",
    file: null,
  });
  const [showModal, setShowModal] = useState(false);

  const { session } = useAdminSession();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setForm(prev => ({ ...prev, file: files[0] }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session.admin) {
      alert("권한이 없습니다.");
      return;
    }

    if (!form.episodeNumber || !form.title || !form.file) {
      alert("모든 항목을 입력해야 합니다.");
      return;
    }

    const formData = new FormData();
    formData.append("episodeNumber", form.episodeNumber);
    formData.append("title", form.title);
    formData.append("file", form.file);
    formData.append("mediaId", mediaId)

    const res = await fetch(`/api/episode`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });


    if (res.ok) {
      const body = await res.json();
      setShowModal(true);
      setForm({ episodeNumber: "", title: "", file: null });
      const newMedia = body.data;
      onSuccess(newMedia);
    } else {
      const errorBody = await res.json().catch(() => null);

      if (errorBody?.apiHeader) {
        alert(errorBody.message || "요청 처리 실패");

        console.error("API 실패:", {
          code: errorBody.apiHeader.code,
          codeName: errorBody.apiHeader.codeName,
          message: errorBody.message,
        });
      } else {
        alert(`요청 실패 (HTTP ${res.status})`);
        console.error("HTTP 오류:", res.status, res.statusText);
      }
    }
  };

  return (
    <div>
      <div style={{ padding: "2rem"}}>
        <button onClick={onBack}>← 목록으로</button>
      </div>
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "600px",
          padding: "2rem",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          color: "#fff",
        }}
      >
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>에피소드 등록</h2>

        <label>회차</label>
        <input
          name="episodeNumber"
          type="number"
          value={form.episodeNumber}
          onChange={handleChange}
          style={inputStyle}
        />

        <label>제목</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          style={inputStyle}
        />

        <label>영상 파일</label>
        <input
          name="file"
          type="file"
          accept="video/*"
          onChange={handleChange}
          style={inputStyle}
        />

        <button
          type="submit"
          style={{
            marginTop: "1rem",
            padding: "0.75rem",
            backgroundColor: "#333",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          등록 완료
        </button>
      </form>

      {showModal && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex",
          justifyContent: "center", alignItems: "center"
        }}>
          <div style={{ backgroundColor: "#222", padding: "2rem", borderRadius: "10px" }}>
            <p style={{ color: "#fff" }}>에피소드 등록이 완료되었습니다.</p>
            <div style={{ textAlign: "center" }}>
              <button
                onClick={() => {
                  setShowModal(false);
                  onBack();
                }}
                style={{
                  marginTop: "1rem",
                  padding: "0.5rem 1rem",
                  backgroundColor: "#444",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  padding: "0.5rem",
  backgroundColor: "#2e2e2e",
  border: "1px solid #555",
  color: "#fff",
  borderRadius: "4px",
  width: "100%",
  boxSizing: "border-box",
};