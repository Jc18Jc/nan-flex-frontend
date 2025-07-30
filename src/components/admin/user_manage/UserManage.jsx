import { useState } from "react";
import UserSearchModal from "./UserSearchModal";
import UserSection from "./UserSection";

export default function UserManage() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [noSearchResult, setNoSearchResult] = useState(false);

  const handleSearch = async (query) => {
    setNoSearchResult(false);
    setShowSearch(false);
    
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/profile/filter?${query}`, {
      credentials: "include",
    });
    const body = await res.json();
    if (!body.data || body.data.length === 0) {
      setSearchResults([]);
      setNoSearchResult(true);
    }
    setSearchResults(body.data);
  };

  const handleInit = async () => {
    setNoSearchResult(false);
    setShowSearch(false);
    setSearchResults(null);
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
      <UserSection profilesFromParent={searchResults} noSearchResult={noSearchResult} />
      
      { (searchResults || noSearchResult) && (
        <div>
          <button
            onClick={handleInit}
            style={{
              marginTop: "2rem"
            }}
          >
            처음 화면으로
          </button>
        </div>
      )}

      {showSearch && (
        <UserSearchModal onSearch={handleSearch} onClose={() => setShowSearch(false)}/>
      )}

      
    </div>
  );
}