import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";

function ProfileCreatePage() {
  const [nickname, setNickname] = useState("");
  const [gender, setGender] = useState("male");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!nickname) {
      setError("닉네임을 입력하세요.");
      return;
    }

    try {
      const res = await fetch(`/api/profile`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname, gender }),
      });

      const body = await res.json();

      if (!body.apiHeader.success) {
        setError(body.message || "프로필 생성 실패");
      } else {
        navigate("/home");
      }
    } catch {
      setError("서버 오류가 발생했습니다.");
    }
  };

  return (
    <Layout showNickName={false} showLogout={true}>
      <div style={{ padding: "2rem", maxWidth: 400, margin: "0 auto" }}>
        <h2>프로필 생성</h2>

        <label>
          닉네임
          <input
            type="text"
            placeholder="닉네임을 입력하세요"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
          />
        </label>

        <div style={{ marginTop: "1rem" }}>
          성별
          <label style={{ marginLeft: "1rem" }}>
            <input
              type="radio"
              value="male"
              checked={gender === "male"}
              onChange={() => setGender("male")}
            /> 남성
          </label>
          <label style={{ marginLeft: "1rem" }}>
            <input
              type="radio"
              value="female"
              checked={gender === "female"}
              onChange={() => setGender("female")}
            /> 여성
          </label>
        </div>

        {error && (
          <div style={{ color: "red", marginTop: "1rem" }}>{error}</div>
        )}

        <button
          onClick={handleSubmit}
          style={{
            marginTop: "1.5rem",
            padding: "0.75rem",
            width: "100%",
            fontWeight: "bold",
          }}
        >
          프로필 생성
        </button>
      </div>
    </Layout>
  );
}

export default ProfileCreatePage;