import { useState } from "react";

export default function UserSearchModal({ onSearch, onClose }) {
  const [searchType, setSearchType] = useState("고유 번호");
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!keyword.trim()) return;

    let queryParam = "";
    switch (searchType) {
      case "고유 번호":
        queryParam = `authId=${keyword}`;
        break;
      case "아이디":
        queryParam = `loginId=${keyword}`;
        break;
      case "닉네임":
        queryParam = `nickname=${keyword}`;
        break;
      default:
        return;
    }

    onSearch(queryParam);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "#1e1e1e",
          padding: "2rem",
          borderRadius: "8px",
          width: "300px",
          color: "#fff",
        }}
      >
        <h3 style={{ marginBottom: "1rem" }}>검색</h3>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            style={{ padding: "0.5rem" }}
          >
            <option>고유 번호</option>
            <option>아이디</option>
            <option>닉네임</option>
          </select>

          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            style={{ padding: "0.5rem" }}
          />

          <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
            <button type="submit" style={{ flex: 1, padding: "0.5rem", cursor: "pointer" }}>
              검색
            </button>
            <button type="button" onClick={onClose} style={{ flex: 1, padding: "0.5rem", cursor: "pointer" }}>
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}