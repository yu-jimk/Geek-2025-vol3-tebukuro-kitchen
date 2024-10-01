"use client"

// src/pages/SearchVideos.tsx
import React, { useState } from 'react';
import youtube from '../../utils/youtube'
import VideoPlayer from './VideoPlayer';

const SearchVideos: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const channelId = '@KikkomanJP'; // 特定のチャンネルIDを設定

  const handleSearch = async () => {
    setLoading(true);
    try {
      const results = await youtube(channelId, keyword);
      setVideos(results);
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
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

      {loading ? <p>Loading...</p> : null}

      <div>
        {videos.map((video) => (
          <VideoPlayer key={video.id.videoId} videoId={video.id.videoId} />
        ))}
      </div>
    </div>
  );
};

export default SearchVideos;
