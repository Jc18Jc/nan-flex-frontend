import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function LoginPage() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new URLSearchParams();
    formData.append("loginId", loginId);
    formData.append("password", password);

    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/login`, {
        method: "POST",
        body: formData,
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (res.ok) {
        navigate("/home"); // ✅ 로그인 성공 시
      } else {
        alert("로그인 실패");
      }
    } catch {
      alert("서버 오류");
    }
  };

  return (
    <Layout showLogout={false}>
      <h1>로그인</h1>
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", width: 300 }}>
        <input
          type="text"
          placeholder="아이디"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
          style={{ marginBottom: "1rem", padding: "0.5rem" }}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: "1rem", padding: "0.5rem" }}
        />
        <button type="submit" style={{ padding: "0.5rem", marginBottom: "0.5rem" }}>
          로그인
        </button>
        <button
          type="button"
          onClick={() => navigate("/signup")}
          style={{
            padding: "0.5rem",
            background: "transparent",
            border: "none",
            color: "gray",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          회원가입
        </button>
      </form>
    </Layout>
  );
}

export default LoginPage;