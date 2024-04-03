import React, { useEffect } from 'react';
// import MusicPlayer from 'react-jinke-music-player';
import { useSelector } from 'react-redux';

import { selectSong } from '../../redux/slices/data';

function Player() {
  const song = useSelector(selectSong);

  return (
    <div className="player">
      {/* <MusicPlayer
        audioLists={[
          {
            name: name,
            musicSrc: src,
            singer: artist,
            cover: thumbnail,
            lyric: lyric,
            duration: duration,
          },
        ]}
      /> */}
    </div>
  );
}

export default Player;
