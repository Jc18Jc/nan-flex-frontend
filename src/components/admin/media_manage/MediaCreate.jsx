import { useState } from "react";

function MediaCreate({ onBack }) {
  const [form, setForm] = useState({
    title: "",
    mediaTypeName: "드라마",
    country: "",
    releaseYear: new Date().getFullYear(),
    ageLimit: 0,
    description: "",
    categoryCodes: [],
  });
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [showModal, setShowModal] = useState(false);


  const categoryOptions = ["코미디", "공포", "로맨스", "SF", "액션", "가족", "스포츠", "뮤지컬", "판타지", "애니메이션"];
  const ageOptions = [0, 7, 12, 15, 19];
  const mediaTypes = ["드라마", "예능", "영화"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryToggle = (code) => {
    setForm((prev) => ({
      ...prev,
      categoryCodes: prev.categoryCodes.includes(code)
        ? prev.categoryCodes.filter((c) => c !== code)
        : [...prev.categoryCodes, code],
    }));
  };

  const validateForm = () => {
    return (
      form.title &&
      form.mediaTypeName &&
      form.country &&
      form.releaseYear &&
      form.ageLimit !== undefined &&
      form.description &&
      form.categoryCodes.length > 0 &&
      thumbnailFile
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => formData.append(`${key}`, v));
      } else {
        formData.append(key, value);
      }
    });
    formData.append("file", thumbnailFile);

    const res = await fetch(`/api/media`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    if (res.ok) {
      alert("등록 완료!");
      onBack();
    } else {
      alert("등록 실패");
    }
  };

  return (
    <div>
      <button onClick={onBack}>← 목록으로</button>
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
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>영상 등록</h2>

        <label>제목</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          style={inputStyle}
        />

        <label>유형</label>
        <select
          name="mediaTypeName"
          value={form.mediaTypeName}
          onChange={handleChange}
          style={inputStyle}
        >
          {mediaTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <label>국가</label>
        <input
          name="country"
          value={form.country}
          onChange={handleChange}
          style={inputStyle}
        />

        <label>출시 연도</label>
        <select
          name="releaseYear"
          value={form.releaseYear}
          onChange={handleChange}
          style={inputStyle}
        >
          {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>

        <label>연령 제한</label>
        <select
          name="ageLimit"
          value={form.ageLimit}
          onChange={handleChange}
          style={inputStyle}
        >
          {ageOptions.map(age => (
            <option key={age} value={age}>{age}</option>
          ))}
        </select>

        <label>설명</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          style={{ ...inputStyle, resize: "none" }}
        />

        <label>카테고리</label>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.75rem",
          marginBottom: "1rem",
        }}>
          {categoryOptions.map(name => (
            <label key={name} style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
              <input
                type="checkbox"
                checked={form.categoryCodes.includes(name)}
                onChange={() => handleCategoryToggle(name)}
              />
              {name}
            </label>
          ))}
        </div>

        <label>썸네일 파일</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setThumbnailFile(e.target.files[0])}
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
            <p style={{ color: "#fff" }}>등록이 완료되었습니다.</p>
            <div style={{ textAlign: "center", justifyContent: "center"}}>
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

export default MediaCreate;