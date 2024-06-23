import React from 'react';
import { Link } from 'react-router-dom';

const getSong = (songData) => {
  const song = songData?.resources?.['shazam-songs'];
  if (song) {
    for (const key in song) {
      return song[key];
    }
  }
  return null;
}

const DetailsHeader = ({ artistId, artistData, songData }) => {
  const createImage = () => {
    return artistId ? artistData.attributes?.artwork?.url
    .replace('{w}', '500')
    .replace('{h}', '500')
    : getSong(songData)?.attributes?.artwork?.url;
  }

  return (
  <div className="relative w-full flex flex-col">
    <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28" />

    <div className="absolute inset-0 flex items-center">
      <img
        alt="profile"
        src={createImage()}
        className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
      />

      <div className="ml-5">
        <p className="font-bold sm:text-3xl text-xl text-white">
          {artistId ? artistData.attributes?.name : getSong(songData)?.attributes.title}
        </p>
        {!artistId && (
          <Link to={`/artists/${getSong(songData)?.relationships?.artists?.data[0].id}`}>
            <p className="text-base text-gray-400 mt-2">{getSong(songData)?.attributes.artist}</p>
          </Link>
        )}

        <p className="text-base text-gray-400 mt-2">
          {artistId
            ? artistData?.attributes?.genreNames[0]
            : getSong(songData)?.attributes?.genres?.primary}
        </p>
      </div>
    </div>

    <div className="w-full sm:h-44 h-24" />
  </div>
  )
};

export default DetailsHeader;
