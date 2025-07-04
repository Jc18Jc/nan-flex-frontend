import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function MyPage() {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/profile`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setProfile(data.data);
        }
      });
  }, []);

  if (!profile) return <Layout>로딩 중...</Layout>;

  return (
    <Layout>
      <div style={{ padding: "2rem", maxWidth: 400, margin: "0 auto" }}>
        <h2>마이페이지</h2>

        <div style={{ marginBottom: "1rem" }}>
          <strong>닉네임:</strong> {profile.nickname}
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <strong>성별:</strong> {profile.gender === "MALE" ? "남성" : "여성"}
        </div>

        <button
          onClick={() => navigate("/edit-profile")}
          style={{
            padding: "0.75rem",
            width: "100%",
            fontWeight: "bold",
            backgroundColor: "#646cff",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          정보 수정
        </button>
      </div>
    </Layout>
  );
}

export default MyPage;