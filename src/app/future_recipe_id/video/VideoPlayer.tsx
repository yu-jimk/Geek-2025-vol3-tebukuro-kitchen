// src/components/VideoPlayer.tsx
import React from 'react';

type VideoPlayerProps = {
  videoId: string;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId }) => {
  return (
    <div style={{ width: '300px', height: '200px' }}>
      <iframe
        width="300"
        height="200"
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube video player"
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
