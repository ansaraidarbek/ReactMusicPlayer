import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';

import { setActiveSong, playPause } from '../redux/features/playerSlice';
import { useGetSongDetailsQuery, useGetSongRelatedQuery } from '../redux/services/shazamCore';

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid, id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  // const [songSecondId, setSongSecondId] = useState('');
  // const [loading, setLoading] = useState(true);
  const { data: songData, isFetching: isFetchingSongDetails } = useGetSongDetailsQuery({ songid });
  // const { data, isFetching : isFetchinRelatedSongs, error } = useGetSongRelatedQuery({songSecondId});

  // useEffect(() => {
  //   const options = {
  //     method: 'GET',
  //     url: 'https://shazam-core.p.rapidapi.com/v2/tracks/details',
  //     params: {
  //       track_id: '1441164738'
  //     },
  //     headers: {
  //       'X-RapidAPI-Key': '8e7e6648f4msh0ff6b80aec53260p185ae3jsn75be6477e5e6',
  //       'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com'
  //     }
  //   };

  //   try {
  //     axios.request(options).then((res) => setSongSecondId(res?.data[0]?.id)).finally(() => setLoading(false));;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, [songSecondId]);

  if (isFetchingSongDetails) return <Loader title="Searching song details" />;

  // if (error) return <Error />;
  
  
  const handleLyrics = () => {
    const lyrics = songData.resources.lyrics;
    if (lyrics) {
      for (const key in lyrics) {
        return lyrics[key].attributes.text.map((line, i) => (
          <p key={`lyrics-${line}-${i}`} className="text-gray-400 text-base my-1">{line}</p>
        ))
      }
    }
    return <p className="text-gray-400 text-base my-1">Sorry, No lyrics found!</p>;
  }

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col">
      <DetailsHeader
        artistId={artistId}
        songData={songData}
      />

      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>

        <div className="mt-5">
          {handleLyrics()}
        </div>
      </div>

      {/* <RelatedSongs
        data={songData?.data[0]?.id}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      /> */}

    </div>
  );
};

export default SongDetails;
