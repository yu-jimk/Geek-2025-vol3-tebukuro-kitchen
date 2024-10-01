
// src/utils/youtube.ts
const youtube = async (keyword: string) => {
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCNfcdefRTSfKsKUTlU-dMGg&q=${keyword}&type=video&maxResults=1&key=${apiKey}`
  );
  
  if (!response.ok) {
    throw new Error("Failed to fetch YouTube videos");
  }

  const data = await response.json();
  return data.items; // 動画リスト
};

export default youtube;