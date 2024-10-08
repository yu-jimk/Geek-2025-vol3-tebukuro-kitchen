"use client";

import youtube from "@/app/utils/youtube";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

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

const YtModal = ({
  modalClose,
  keyword,
}: {
  modalClose: () => void;
  keyword: string;
}) => {
  const [video, setVideo] = useState<Video | null>(null);
  const bgClickClose = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      modalClose();
    }
  };

  useEffect(() => {
    if (keyword !== "") {
      const handleSearch = async () => {
        try {
          const result = await youtube(keyword);
          setVideo(result);
          console.log(result);
        } catch (error) {
          console.error("Error fetching video:", error);
        }
      };
      handleSearch();
    }
  }, []);

  return (
    <>
      <div className="bg-black bg-opacity-50 fixed inset-x-0 -top-10 bottom-0">
        <div
          onClick={bgClickClose}
          className="flex justify-center items-center h-full"
        >
          <div>
            <div className="flex w-full justify-end">
              <IoMdClose onClick={modalClose} className="w-10 h-10 m-2" />
            </div>
            <div>
              {video === null ? (
                <div className="w-72 h-52 bg-white text-black text-center flex flex-col justify-center">
                  動画をロード中です
                  <div className="flex justify-center">
                    <div className="mt-5 w-10 h-10 rounded-full animate-spin border-orange-400 border-4 border-t-transparent"></div>
                  </div>
                </div>
              ) : (
                <iframe
                  width="300"
                  height="200"
                  src={`https://www.youtube.com/embed/${video?.id.videoId}?autoplay=1&mute=1`}
                  title="YouTube video player"
                ></iframe>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default YtModal;
