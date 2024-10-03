"use client";

import React, { useState } from "react";
import youtube from "../../utils/youtube";
import YtModal from "../cook/YtModal";

type Thumbnail = {
  url: string;
  width: number;
  height: number;
};

type Snippet = {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    default: Thumbnail;
    medium: Thumbnail;
    high: Thumbnail;
  };
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: string;
};

type Video = {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  snippet: Snippet;
};

const SearchVideo = () => {
  const [keyword, setKeyword] = useState("");
  const [video, setVideo] = useState<Video[]>([]);

  const handleSearch = async () => {
    try {
      const result = await youtube(keyword);
      setVideo(result);
      console.log(result);
    } catch (error) {
      console.error("Error fetching video:", error);
    }
  };

  return (
    <div className="text-black">
      <h1>動画を検索</h1>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="キーワードを入力"
      />
      <button onClick={handleSearch}>検索</button>

      <div>
        {video.map((video) => (
          <YtModal modalClose={()=>console.log("A")} keyword={video.id.videoId} key={video.id.videoId}/>
        ))}
      </div>
    </div>
  );
};

export default SearchVideo;
