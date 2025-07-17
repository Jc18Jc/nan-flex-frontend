import { useState } from "react";
import EpisodeSection from "./EpisodeSection";
import EpisodeCreate from "./EpisodeCreate";

export default function EpisodeManage({ mediaId, onBack, media, setMedia }) {
  const [isCreating, setIsCreating] = useState(false);

  if (isCreating) {
    return <EpisodeCreate 
      mediaId={mediaId} 
      onBack={() => setIsCreating(false)} 
      onSuccess={(newEpisode) => {
        const updatedEpisodes = [...media.episodes, newEpisode].sort((a, b) => a.episodeNumber - b.episodeNumber);
        setMedia({ ...media, episodes: updatedEpisodes });
      }}
    />;
  }

  return (
    <div>
      <EpisodeSection
        media={media}
        onSelectEpisode={(id) => setSelectedEpisodeId(id)}
        onCreate={() => setIsCreating(true)}
        onBack={onBack}
        setMedia={setMedia}
      />
    </div>
  );
}