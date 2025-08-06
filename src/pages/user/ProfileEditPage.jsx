import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";

function ProfileEditPage() {
  const [nickname, setNickname] = useState("");
  const [gender, setGender] = useState("male");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/profile`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        const profile = data.data;
        if (profile) {
          setNickname(profile.nickname);
          setGender(profile.gender);
        }
      });
  }, []);

  const handleSubmit = async () => {
    if (!nickname) {
      setError("닉네임을 입력하세요.");
      return;
    }

    try {
      const res = await fetch(`/api/profile`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname, gender }),
      });

      const result = await res.json();

      if (!result.apiHeader.success) {
        setError(result.message || "프로필 수정 실패");
      } else {
        navigate("/mypage");
      }
    } catch {
      setError("서버 오류가 발생했습니다.");
    }
  };

  return (
    <Layout>
      <div style={{ padding: "2rem", maxWidth: 400, margin: "0 auto" }}>
        <h2>프로필 수정</h2>

        <label>
          닉네임
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임을 입력하세요"
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
          />
        </label>

        <div style={{ marginTop: "1rem" }}>
          성별
          <label style={{ marginLeft: "1rem" }}>
            <input
              type="radio"
              value="MALE"
              checked={gender === "MALE"}
              onChange={() => setGender("MALE")}
            /> 남성
          </label>
          <label style={{ marginLeft: "1rem" }}>
            <input
              type="radio"
              value="FEMALE"
              checked={gender === "FEMALE"}
              onChange={() => setGender("FEMALE")}
            /> 여성
          </label>
        </div>

        {error && <div style={{ color: "red", marginTop: "1rem" }}>{error}</div>}

        <button
          onClick={handleSubmit}
          style={{
            marginTop: "1.5rem",
            padding: "0.75rem",
            width: "100%",
            fontWeight: "bold",
          }}
        >
          저장하기
        </button>
      </div>
    </Layout>
  );
}

export default ProfileEditPage;