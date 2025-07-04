import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Layout({ children, showLogout = true, showNickname = true}) {
    const navigate = useNavigate();
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    if (!showNickname) return;
    fetch(`${import.meta.env.VITE_BASE_URL}/profile`, {
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
          onClick={() => navigate("/home")} 
          style={{
            fontWeight: "bold", fontSize: "1.5rem", cursor: "pointer" 
          }}
        >
          🎬 NanFlex</div>
        
        { showLogout && (
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div 
            onClick={() => navigate(`/mypage`)}
              style={{
                cursor: "pointer",
                textDecoration: "underline"
              }}>
            {nickname && <div>{nickname} 님</div>}
            </div>
              <button
                onClick={async () => {
                  await fetch(`${import.meta.env.VITE_BASE_URL}/auth/logout`, {
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
          </div>
        )}
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