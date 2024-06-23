import React from 'react';
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';

const handleMusic = (song, activeSong) => {
  if (song.title) {
    return  activeSong?.title === song.title;
  }
  return  activeSong.attributes?.albumName === song.attributes?.albumName;
}

const PlayPause = ({ isPlaying, activeSong, song, handlePause, handlePlay }) => (isPlaying && handleMusic(song, activeSong) ? (
  <FaPauseCircle
    size={35}
    className="text-gray-300"
    onClick={handlePause}
  />
) : (
  <FaPlayCircle
    size={35}
    className="text-gray-300"
    onClick={handlePlay}
  />
));

export default PlayPause;
