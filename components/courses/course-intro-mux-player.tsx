"use client";

import MuxPlayer from "@mux/mux-player-react/lazy";

type Props = {
  playbackId: string;
};

/**
 * Lazy Mux Player for the course intro (public playback ID).
 * @see https://docs.mux.com/guides/video/mux-player
 */
export function CourseIntroMuxPlayer({ playbackId }: Props) {
  return (
    <MuxPlayer
      playbackId={playbackId}
      loading="viewport"
      metadataVideoTitle="Frontend System Design Essentials — intro"
      accentColor="#f4c70f"
      className="h-full w-full [&::part(media)]:object-cover"
      streamType="on-demand"
    />
  );
}
