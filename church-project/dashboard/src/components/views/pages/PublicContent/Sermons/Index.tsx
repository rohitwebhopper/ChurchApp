import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "./index.module.css";
import videoFile from "@/assets/Envirnmenttestvedio.mp4";
import previewImg from "@/assets/sermon-on-the-mount-thumbnail.jpg";
import Grid from "@/components/ui/Grid/Index";
import UploadModal from "@/components/views/model/sermons/Index";
import FloatingUploadButton from "@/components/ui/FloatingButton/Index";
import { FaTrash } from "react-icons/fa";
import Tooltip from "@/components/ui/ToolTip/Index";


interface VideoData {
  id: number;
  title: string;
  description?: string;
  file: string | null;
  previewImage?: string | null;
}

const initialVideos: VideoData[] = [
  {
    id: 1,
    title: "Sunday Sermon - Faith & Hope",
    description: "Inspiring message about faith and hope.",
    file: videoFile,
    previewImage: previewImg,
  },
  {
    id: 2,
    title: "Wednesday Bible Study",
    description: "Midweek study focusing on Bible teachings.",
    file: videoFile,
    previewImage: previewImg,
  },
  {
    id: 3,
    title: "Special Youth Gathering",
    description: "Youth fellowship and spiritual growth.",
    file: videoFile,
    previewImage: previewImg,
  },
];

const SermonsGallery: React.FC = () => {
  const { t } = useTranslation();
  const [videos, setVideos] = useState<VideoData[]>(initialVideos);
  const [selectedVideoId, setSelectedVideoId] = useState<number | null>(null);
  const [playingVideoId, setPlayingVideoId] = useState<number | null>(null);

  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});
  const playbackTimes = useRef<{ [key: number]: number }>({});

  const handleCardClick = (id: number) => {
    setSelectedVideoId(id);
  };

  const handlePlay = (currentId: number) => {
    setPlayingVideoId(currentId);

    Object.entries(videoRefs.current).forEach(([id, ref]) => {
      const numericId = Number(id);
      if (ref && numericId !== currentId && !ref.paused) {
        playbackTimes.current[numericId] = ref.currentTime;
        ref.pause();
      }
    });

    const ref = videoRefs.current[currentId];
    if (ref) {
      const savedTime = playbackTimes.current[currentId];
      if (savedTime !== undefined) {
        ref.currentTime = savedTime;
      }
    }
  };

  const handlePause = (id: number) => {
    const ref = videoRefs.current[id];
    if (ref) {
      playbackTimes.current[id] = ref.currentTime;
    }

    if (playingVideoId === id) {
      setPlayingVideoId(null);
    }
  };

  useEffect(() => {
    if (selectedVideoId !== null) {
      const ref = videoRefs.current[selectedVideoId];
      const savedTime = playbackTimes.current[selectedVideoId];
      if (ref) {
        if (savedTime !== undefined) {
          ref.currentTime = savedTime;
        }
        ref.play().catch(() => {});
      }
    }
  }, [selectedVideoId]);

  const handleAddVideo = (newVideo: VideoData) => {
    setVideos((prev) => [...prev, newVideo]);
    setSelectedVideoId(newVideo.id);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  const handleDelete = (id: number) => {
  setVideos((prev) => prev.filter((video) => video.id !== id));
  if (selectedVideoId === id) {
    setSelectedVideoId(null);
  }
};


  return (
    <>
      <div className={styles.galleryContainer}>
        <h2 className={styles.galleryTitle}>{t("translate.sermonsGallery")}</h2>
        <Grid gap="md">
          <Grid.Row>
            {videos.map((video) => {
              const videoRef = videoRefs.current[video.id];
              const isVisible =
                selectedVideoId === video.id &&
                videoRef &&
                (!videoRef.paused || videoRef.currentTime > 0);

              return (
                <Grid.Column
                  key={video.id}
                  span={{ base: 12, sm: 6, md: 4 }}
                  className={styles.card}
                >
                  <div onClick={() => handleCardClick(video.id)}>
                    <div className={styles.thumbnailWrapper}>
                      <video
                        ref={(el: any) => (videoRefs.current[video.id] = el)}
                        src={
                          typeof video.file === "string"
                            ? video.file
                            : undefined
                        }
                        className={styles.videoPlayer}
                        controls
                        style={{ display: isVisible ? "block" : "none" }}
                        onClick={(e) => e.stopPropagation()}
                        onPlay={() => handlePlay(video.id)}
                        onPause={() => handlePause(video.id)}
                      />
                      {!isVisible && video.previewImage && (
                        <img
                          src={video.previewImage}
                          alt={video.title}
                          className={styles.thumbnail}
                        />
                      )}
                    </div>

                    <div className={styles.cardHeader}>
                      <div className={styles.cardTitle}>{video.title}</div>
                    </div>

                    <div className={styles.cardDescription}>
                      {video.description}
                    </div>
                    <div className={styles.deletebtn}>
                      <Tooltip text="Delete this video" position="left">
                        <FaTrash
                          className={styles.deleteIcon}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(video.id);
                          }}
                        />
                      </Tooltip>
                    </div>
                  </div>
                </Grid.Column>
              );
            })}
          </Grid.Row>
        </Grid>
      </div>

      <FloatingUploadButton onClick={openModal} />

      <UploadModal
        isModalOpen={isModalOpen}
        onClose={closeModal}
        onAddVideo={handleAddVideo}
        lastId={videos.length ? videos[videos.length - 1].id : 0}
      />
    </>
  );
};

export default SermonsGallery;
