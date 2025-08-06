import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchButton from "./SearchButton";
import SearchModal from "./SearchModal";

function Layout(
  { 
    children, 
    showLogout = false, 
    showNickname = true, 
    showSearchButton = false,
    onClick
  }
  ) {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");

  const handleHomeClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate("/home");
    }
  };

  useEffect(() => {
    if (!showNickname) return;
    fetch(`/api/profile`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.data && result.data.nickname) {
          setNickname(result.data.nickname);
        }
      });
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#121212",
        color: "#fff",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 2rem",
          backgroundColor: "#2c2c2c",
          boxSizing: "border-box",
        }}
      >
        <div
          onClick={handleHomeClick} 
          style={{
            fontWeight: "bold", fontSize: "1.5rem", cursor: "pointer" 
          }}
        >
          🎬 NanFlex</div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              onClick={() => navigate(`/mypage`)}
              style={{
                cursor: "pointer",
                textDecoration: "underline"
              }}>
              {nickname && <div>{nickname} 님</div>}
            </div>
            { showLogout && (
              <button
                onClick={async () => {
                  await fetch(`/api/auth/logout`, {
                    method: "POST",
                    credentials: "include",
                  });
                  window.location.href = "/login";
                }}
                style={{
                  background: "#000",
                  color: "#fff",
                  border: "none",
                  padding: "0.5rem 1rem",
                  cursor: "pointer",
                }}
              >
                로그아웃
              </button>
            )}
            { showSearchButton && (
              <>
                <SearchButton onClick={() => setShowSearch(true)} />
                <SearchModal
                  query={query}
                  setQuery={setQuery}
                  show={showSearch}
                  onClose={() => setShowSearch(false)}
                  onSearch={() => {
                    navigate(`/search?title=${query}`);
                    setShowSearch(false);
                  }}
                />
              </>
            )}
        </div>
      </div>

      <main
        style={{
          flex: 1,
          width: "100%",
          padding: "2rem",
          boxSizing: "border-box",
        }}
      >
        {children}
      </main>
    </div>
  );
}

export default Layout;