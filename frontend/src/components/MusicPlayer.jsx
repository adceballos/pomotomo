import { useRef, useState, useEffect } from 'react';
import { FaPause } from 'react-icons/fa'
import { FaPlay } from 'react-icons/fa'
import { FaBackward } from 'react-icons/fa'
import { FaForward } from 'react-icons/fa'

const tracks = [
    { name: 'Track 1', src: '/music/track1.mp3' },
    { name: 'Track 2', src: '/music/track2.mp3' },
  ];
  
  const MusicPlayer = () => {
    const audioRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
  
    // Update time and duration
    useEffect(() => {
      const audio = audioRef.current;
  
      const updateTime = () => setCurrentTime(audio.currentTime);
      const setTotalDuration = () => setDuration(audio.duration);
  
      audio.addEventListener('timeupdate', updateTime);
      audio.addEventListener('loadedmetadata', setTotalDuration);
  
      return () => {
        audio.removeEventListener('timeupdate', updateTime);
        audio.removeEventListener('loadedmetadata', setTotalDuration);
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
        const previous = (currentTrack - 1) % tracks.length;
        setCurrentTime(previous);
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
      const seconds = Math.floor(time % 60).toString().padStart(2, '0');
      return `${minutes}:${seconds}`;
    };
  
    return (
      <div className="fixed bottom-0 left-0 w-full bg-black/90 text-white px-6 py-3 flex flex-col gap-1 shadow-md z-50">
        <audio ref={audioRef} src={tracks[currentTrack].src} autoPlay loop />
  
        {/* Track Info and Controls */}
        <div className="flex justify-between items-center w-full">
          <div className="text-sm font-medium">{tracks[currentTrack].name}</div>
          <div className="flex gap-4 items-center w-fit mx-auto">
            <button onClick={backTrack}><FaBackward/></button>
            <button onClick={togglePlay}>
              {playing ? <FaPause /> : <FaPlay />}
            </button>
            <button onClick={skipTrack}><FaForward/></button>
            <div>
            <button onClick={toggleMute}>
              {muted ? '🔇' : '🔊'}
            </button>
            </div>
          </div>
        </div>
  
        {/* Progress Bar */}
        <div className="flex items-center gap-2">
          <span className="text-xs w-300 text-right">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1 bg-gray-600 rounded-lg cursor-pointer appearance-none"
          />
          <span className="text-xs w-300">{formatTime(duration)}</span>
        </div>
      </div>
    );
  };
  
  export default MusicPlayer;