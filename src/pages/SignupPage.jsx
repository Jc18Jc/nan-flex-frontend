import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function JoinPage() {
  const navigate = useNavigate();
  const today = new Date();

  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [day, setDay] = useState(today.getDate());
  const [certified, setCertified] = useState(false);
  const [error, setError] = useState("");

const handleJoin = async () => {
  setError("");

  if (!loginId || !password || !passwordConfirm) {
    setError("모든 필드를 입력해주세요.");
    return;
  }

  if (password !== passwordConfirm) {
    setError("비밀번호가 일치하지 않습니다.");
    return;
  }

  const birthDate = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/join`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ loginId, password, birthDate }),
    });

    const result = await res.json();

    if (!result.apiHeader.success) {
      const code = result.apiHeader.code;
      if (code === 409) {
        setError("이미 사용 중인 아이디입니다.");
      } else {
        setError(result.message || "회원가입 실패");
      }
    } else {
      alert("회원가입이 완료되었습니다.");
      navigate("/login");
    }
  } catch (err) {
    console.error(err);
    setError("서버 오류가 발생했습니다.");
  }
};

  const handleCertify = () => setCertified(true);

  return (
    <Layout showLogout={false}>
      <div style={{ padding: "2rem" }}>
        <h1 style={{ marginBottom: "1rem" }}>회원가입</h1>

        <div style={{ maxWidth: 400, display: "flex", flexDirection: "column", gap: "1rem" }}>
          <label>
            아이디
            <input
              type="text"
              placeholder="아이디를 입력하세요"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              style={{ padding: "0.5rem", width: "100%" }}
            />
          </label>

          <label>
            비밀번호
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: "0.5rem", width: "100%" }}
            />
          </label>

          <label>
            비밀번호 확인
            <input
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              style={{ padding: "0.5rem", width: "100%" }}
            />
          </label>

          <label>
            생년월일
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.25rem" }}>
              <select
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                style={{ fontSize: "1rem", padding: "0.5rem", minWidth: "90px" }}
              >
                {Array.from({ length: 100 }, (_, i) => today.getFullYear() - i).map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
              -
              <select
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
                style={{ fontSize: "1rem", padding: "0.5rem", minWidth: "70px" }}
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m} value={m}>{String(m).padStart(2, "0")}</option>
                ))}
              </select>
              -
              <select
                value={day}
                onChange={(e) => setDay(Number(e.target.value))}
                style={{ fontSize: "1rem", padding: "0.5rem", minWidth: "70px" }}
              >
                {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                  <option key={d} value={d}>{String(d).padStart(2, "0")}</option>
                ))}
              </select>

              <button
                onClick={handleCertify}
                style={{ padding: "0.5rem 1rem", marginLeft: "0.5rem" }}
              >
                {certified ? "인증완료" : "인증받기"}
              </button>
            </div>
          </label>

          {error && <div style={{ color: "red", fontSize: "0.9rem" }}>{error}</div>}

          <button onClick={handleJoin} style={{ padding: "0.75rem", marginTop: "1rem" }}>
            회원가입
          </button>
          <button
            type="button"
            onClick={() => navigate("/login")}
            style={{
              padding: "0.5rem",
              background: "transparent",
              border: "none",
              color: "gray",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            로그인 페이지로 이동
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default JoinPage;