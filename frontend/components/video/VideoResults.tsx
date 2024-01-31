"use client";

import { searchVideo } from "@/lib/apis/private/videos";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import ReactPlayer from "react-player";

const VideoResults = ({ query }: { query: string }) => {
  const [videos, setVideos] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currentUrl, setCurrentUrl] = useState<string>("");
  const handleSearch = async (query: string, signal?: AbortSignal) => {
    setVideos([]);
    setLoading(true);
    try {
      const response = await searchVideo({ keyword: query }, signal);
      const responseData = await response.json();

      if (response.ok) {
        setVideos(responseData);
      } else {
        throw responseData;
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => {
      if (query !== "") {
        handleSearch(query, controller.signal);
      }
    }, 100);
    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [query]);

  return (
    <>
      <div className="flex flex-col gap-3 mt-5">
        {loading && <div>Loading...</div>}
        {!loading &&
          videos &&
          videos.length > 0 &&
          videos.map((video) => (
            <div
              key={video?.id}
              className="py-2 px-3 border border-darksecond"
              aria-label="click"
              onClick={() => {
                setCurrentUrl(video?.url);
                setOpenModal(true);
              }}
            >
              {video?.title}
            </div>
          ))}
        {/* <ReactPlayer url="http://localhost:8000/uploads/sample.mp4" /> */}
      </div>
      <Modal
        isOpen={openModal}
        onRequestClose={() => setOpenModal(false)}
        shouldCloseOnOverlayClick={true}
      >
        <ReactPlayer height={"100%"} width={"100%"} url={currentUrl} />
      </Modal>
    </>
  );
};

export default VideoResults;
