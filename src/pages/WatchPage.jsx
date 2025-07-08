import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";

function WatchPage() {
  const { episodeId } = useParams();
  const [ep, setEpisode] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/episode/${episodeId}`, {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => setEpisode(data.data));
  }, [episodeId]);

  if (!ep) return <div>로딩 중...</div>;

  return (
    <Layout>
      <div style={{ padding: "2rem" }}>
        <h2>{ep.episodeNumber}화 {ep.title}</h2>
        <video controls style={{ width: "100%" }}>
          <source src={`${import.meta.env.VITE_BASE_URL}/videos/${ep.videoName}`} type="video/mp4" />
          브라우저가 video 태그를 지원하지 않습니다.
        </video>
      </div>
    </Layout>
  );
}

export default WatchPage;