import { useState } from "react";

function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("클립보드 복사 실패:", err);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <button onClick={handleCopy}>
        <img
          src="/home/images/share.png"
          alt="공유"
          style={{ width: "24px", height: "24px" }}
        />
      </button>
      {copied && (
        <div
          style={{
            position: "absolute",
            top: "-1.5rem",
            right: 0,
            background: "#333",
            color: "#fff",
            padding: "0.25rem 0.5rem",
            borderRadius: "4px",
            fontSize: "0.75rem",
          }}
        >
          복사됨!
        </div>
      )}
    </div>
  );
}

export default ShareButton