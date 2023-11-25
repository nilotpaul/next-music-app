export function setMediaSession(title: string, artist: string, image: string) {
  try {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title,
        artist,
        artwork: [
          {
            src: image,
            sizes: "512x512",
          },
        ],
      });
    }
  } catch (err) {
    console.error(err);
  }
}

type MediaSeekbarType = {
  duration: number;
  playbackRate: number;
  position: number;
};

export function setMediaSeekbar({
  duration,
  playbackRate,
  position,
}: MediaSeekbarType) {
  try {
    if (!isNaN(duration) && "mediaSession" in navigator) {
      navigator.mediaSession.setPositionState({
        duration,
        playbackRate,
        position,
      });
    }
  } catch (err) {
    console.error(err);
  }
}
