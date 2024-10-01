
// src/utils/youtube.ts
const youtube = async (channelId: string, keyword: string) => {
  const apiKey = process.env.YOUTUBE_API_KEY!;
  const maxResults = 5; // 表示する動画数

  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCNfcdefRTSfKsKUTlU-dMGg&q=${keyword}&type=video&maxResults=1&key=AIzaSyCoWrPxMJTG792Hk_mXNFo1SFbemoMuSKI`
  );
  
  if (!response.ok) {
    throw new Error("Failed to fetch YouTube videos");
  }

  const data = await response.json();
  return data.items; // 動画リスト
};

export default youtube;