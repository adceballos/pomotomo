import { useRef, useState, useEffect } from "react";
import {
  FaPause,
  FaPlay,
  FaBackward,
  FaForward,
  FaVolumeMute,
  FaVolumeDown,
  FaVolumeUp,
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa";

const tracks = [
  { name: "Track 1", artist: "Singer", img: "", src: "/music/track1.mp3" },
];

const MusicPlayer = () => {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isExpanded, setIsExpanded] = useState(true);

  // Update time and duration
  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const setTotalDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", setTotalDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", setTotalDuration);
    };
  }, [currentTrack]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(!playing);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    audio.muted = !muted;
    setMuted(!muted);
  };

  const skipTrack = () => {
    const next = (currentTrack + 1) % tracks.length;
    setCurrentTrack(next);
    setPlaying(false);
    setTimeout(() => {
      audioRef.current.play();
      setPlaying(true);
    }, 0);
  };

  const backTrack = () => {
    const previous = (currentTrack - 1 + tracks.length) % tracks.length;
    setCurrentTrack(previous);
    setPlaying(false);
    setTimeout(() => {
      audioRef.current.play();
      setPlaying(true);
    }, 0);
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume / 100; // Convert to a value between 0 and 1
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <audio ref={audioRef} src={tracks[currentTrack].src} autoPlay loop />
      {/* Expand/Collapse Button */}
      <button
        onClick={toggleExpand}
        className={`fixed ${
          isExpanded ? "bottom-22" : "bottom-1"
        } right-5 flex items-center justify-center m-2 p-1 text-white transition-all ease-in-out duration-300`}
      >
        {isExpanded ? <FaChevronDown /> : <FaChevronUp />}
      </button>
      <div
        className={`fixed bottom-0 left-0 w-full bg-black/90 text-white px-6 py-3 flex flex-col shadow-md z-50 transition-transform ease-in-out duration-300 ${
          isExpanded ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Top Row: Music Controls */}
        <div className="flex justify-between items-center w-full">
          {/* Left Side: Track Info */}
          <div className="flex items-center w-1/3 min-w-0">
            <img
              src={tracks[currentTrack].img}
              alt={tracks[currentTrack].name}
              className="w-12 h-12 rounded-lg mr-4 relative top-1 object-cover"
            />
            <div className="flex flex-col">
              <span className="text-sm truncate">
                {tracks[currentTrack].name}
              </span>
              <span className="text-sm text-gray-300 truncate">
                {tracks[currentTrack].artist}
              </span>
            </div>
          </div>

          {/* Center: Playback Controls */}
          <div className="flex gap-12 items-center justify-center w-1/3">
            <button onClick={backTrack}>
              <FaBackward size={16} />
            </button>
            <button onClick={togglePlay}>
              {playing ? <FaPause size={24} /> : <FaPlay size={24} />}
            </button>
            <button onClick={skipTrack}>
              <FaForward size={16} />
            </button>
          </div>

          {/* Right Side: Volume Control */}
          <div className="flex justify-end items-center w-1/3">
            <button onClick={toggleMute}>
              {muted || volume === 0 ? (
                <FaVolumeMute size={16} />
              ) : volume < 50 ? (
                <FaVolumeDown size={16} />
              ) : (
                <FaVolumeUp size={16} />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="w-30 h-1 appearance-none bg-gray-600 rounded-lg cursor-pointer ml-2 accent-white focus:outline-none"
              style={{
                background: `linear-gradient(to right, #ffffff ${volume}%, #4e4e4e ${volume}%)`,
              }}
            />
          </div>
        </div>

        {/* Bottom Row: Progress Bar */}
        <div className="flex items-center gap-2">
          <span className="text-xs w-300 text-right">
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1 appearance-none bg-gray-600 rounded-lg cursor-pointer accent-white focus:outline-none"
            style={{
              background: `linear-gradient(to right, #ffffff ${
                (currentTime / duration) * 100
              }%, #4e4e4e ${(currentTime / duration) * 100}%)`,
            }}
          />
          <span className="text-xs w-300">{formatTime(duration)}</span>
        </div>
      </div>
    </>
  );
};

export default MusicPlayer;