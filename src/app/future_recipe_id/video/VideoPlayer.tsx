
import React from "react";

const VideoPlayer = ({ videoId }: { videoId: string }) => {
  return (
    <div style={{ width: "300px", height: "200px" }}>
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
