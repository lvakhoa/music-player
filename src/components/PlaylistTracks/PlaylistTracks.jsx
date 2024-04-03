import React, { useState } from 'react';
import moment from 'moment';

import Track from './Track';

function PlaylistTracks({ tracks }) {
  const [selectTrack, setSelectTrack] = useState();

  return (
    <div className="playlist__tracks">
      {tracks?.map((track, index) => (
        <Track
          key={index}
          id={track.encodeId}
          thumbnailM={track.thumbnailM}
          title={track.title}
          artists={track.artists}
          duration={moment(new Date(track.duration * 1000)).format('mm:ss')}
          isVIP={track.streamingStatus === 2}
          select={index === selectTrack}
          handleSelect={() => setSelectTrack(index)}
        />
      ))}
    </div>
  );
}

export default PlaylistTracks;
