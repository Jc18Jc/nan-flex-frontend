import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";

function WatchPage() {
  const { episodeId } = useParams();
  const [ep, setEpisode] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/episode/${episodeId}`, {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => setEpisode(data.data));
  }, [episodeId]);

  if (!ep) return <div>로딩 중...</div>;

  return (
    <Layout>
      <div style={{ padding: "2rem" }}>
        <div>
          <button onClick={() => navigate(`/media/${ep.mediaId}`)}>← 목록으로</button>
        </div>
        <h2>{ep.episodeNumber}화 {ep.title}</h2>

        <div style={{ position: "relative", width: "100%", paddingTop: "56.25%" }}>
          <video
            controls
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "85%",
              height: "85%",
              objectFit: "contain"
            }}
          >
            <source
              src={ep.videoUrl}
              type="video/mp4"
            />
            브라우저가 video 태그를 지원하지 않습니다.
          </video>
        </div>
      </div>
    </Layout>
  );
}

export default WatchPage;