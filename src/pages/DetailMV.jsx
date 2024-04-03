import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchDetailMV, selectDetailMV } from '../redux/slices/data';
import { Loading } from '../components';

function DetailMV() {
  const { mvId } = useParams();
  const detailMV = useSelector(selectDetailMV);
  const dispatch = useDispatch();
  const [quality, setQuality] = useState('360p');

  useEffect(() => {
    (async () => {
      dispatch(fetchDetailMV(mvId));
    })();
  }, [dispatch]);

  const handleModifyQuality = (quality) => {
    setQuality(quality);
    window.scrollTo(0, 0);
  };

  if (detailMV.loading) return <Loading />;

  return (
    <div className="detail__mv">
      <div className="video-wrapper">
        <ReactPlayer
          url={detailMV?.hls?.[quality]}
          playing
          controls
          width="100%"
          height="100%"
        />
      </div>
      <div className="quality-buttons">
        <button
          className="quality-button"
          onClick={() => handleModifyQuality('360p')}
        >
          360p
        </button>
        <button
          className="quality-button"
          onClick={() => handleModifyQuality('480p')}
        >
          480p
        </button>
        <button
          className="quality-button"
          onClick={() => handleModifyQuality('720p')}
        >
          720p
        </button>
      </div>
    </div>
  );
}

export default DetailMV;
