import { useRef } from "react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const play = () => audioRef.current?.play();
  const pause = () => audioRef.current?.pause();

  return (
    <div className="fixed top-4 right-4 flex items-center gap-2 bg-black/50 p-2 rounded-lg shadow-lg z-50">
      <button
        onClick={play}
        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
      >
        On
      </button>
      <button
        onClick={pause}
        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Off
      </button>
      <audio ref={audioRef} src="music.mp3" loop />
    </div>
  );
}
