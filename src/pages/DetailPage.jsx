import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ShareButton from "../components/ShareButton";
import Layout from "../components/Layout";

function DetailPage() {
  const { mediaId } = useParams();
  const [media, setMedia] = useState(null);
  const [watchLater, setWatchLater] = useState(false);
  const [forbidden, setForbidden] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/media/${mediaId}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.apiHeader.success || data.apiHeader.code === 403) {
          setForbidden(true);
        } else {
          setMedia(data.data);
        }
      });


    fetch(`${import.meta.env.VITE_BASE_URL}/later/${mediaId}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setWatchLater(data.data.watchLater))
  }, [mediaId]);


  if (forbidden) {
    return (
      <Layout>
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🚫</div>
          <div style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>시청 연령 제한으로 접근할 수 없습니다.</div>
          <div
            onClick={() => navigate("/home")}
            style={{
              fontWeight: "bold",
              textDecoration: "underline",
              color: "#646cff",
              cursor: "pointer",
              fontSize: "1.1rem",
            }}
          >
            홈으로 가기
          </div>
        </div>
      </Layout>
    );
  }

  if (!media) return <div>로딩 중...</div>;

  return (
    <Layout>
      <div style={{ padding: "2rem" }}>
        <div style={{ position: "relative" }}>
          <img
            src={`${import.meta.env.VITE_BASE_URL}/images/${media.thumbnailName}`}
            alt={media.title}
            style={{ width: "100%", height: "300px", objectFit: "cover" }}
          />
        </div>

        <div style={{ marginTop: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h2 style={{ fontSize: "1.8rem", fontWeight: "bold", margin: 0 }}>{media.title}</h2>
              <div>총 조회수 {media.totalViewCount ?? 0}</div>
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              <ShareButton/>
              <button
                onClick={async () => {
                  try {
                    if (watchLater) {
                      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/later/${mediaId}`, {
                        method: "DELETE",
                        credentials: "include",
                      });
                      if (res.ok) setWatchLater(false);
                    } else {
                      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/later`, {
                        method: "POST",
                        credentials: "include",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ mediaId }),
                      });
                      if (res.ok) setWatchLater(true);
                    }
                  } catch (error) {
                    console.error("북마크 처리 실패:", error);
                  }
                }}
              >
                {watchLater ? "⭐" : "☆"}
              </button>
            </div>
          </div>
          <hr style={{ margin: "1rem 0" }} />

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
            {media.episodes.map((ep) => (
              <div 
                key={ep.id} 
                onClick={() => navigate(`/watch/${ep.id}`)}
                style={{ 
                  display: "flex",
                  gap: "1rem",
                  cursor: "pointer"
                }}
              >
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                    background: "black",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {media.title}
                </div>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{ fontWeight: "bold", textDecoration: "underline" }}>
                    {ep.episodeNumber}화 {ep.title}
                  </div>
                  <div>{Math.floor(ep.duration / 60)}분</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default DetailPage;