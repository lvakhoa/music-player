import React from 'react';
import { Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchLyric, fetchSong, fetchSongInfo } from '../../redux/slices/data';

function Track({
  id,
  thumbnailM,
  title,
  artists,
  duration,
  isVIP,
  select,
  handleSelect,
}) {
  const dispatch = useDispatch();

  const handlePlay = () => {
    handleSelect();
    (async () => {
      await dispatch(fetchSong(id)).unwrap();
    })();
    (async () => {
      await dispatch(fetchSongInfo(id)).unwrap();
    })();
    (async () => {
      await dispatch(fetchLyric(id)).unwrap();
    })();
  };

  return (
    <div
      className="track"
      style={{
        backgroundColor: select ? 'var(--color-primary-bg)' : null,
        cursor: !isVIP ? 'pointer' : null,
      }}
      onClick={!isVIP ? handlePlay : null}
    >
      <div className="track__box">
        <Avatar shape="square" size={46} src={thumbnailM} />
        <div className="track__info">
          <p
            className="track__info-title"
            style={select ? { color: 'var(--color-primary)' } : null}
          >
            {title}
          </p>
          <span
            className="info-artists"
            style={select ? { color: 'var(--color-primary)' } : null}
          >
            {artists?.map((artist, index) => {
              if (index === 0)
                return (
                  <Link
                    key={index}
                    to={`/artist/${artist.alias}`}
                    className="info-artist"
                    style={
                      select
                        ? { color: 'var(--color-primary)' }
                        : { color: 'var(--color-text)' }
                    }
                  >
                    {artist.name}
                  </Link>
                );
              return (
                <span key={index}>
                  <span>, </span>
                  <Link
                    to={`/artist/${artist.alias}`}
                    className="info-artist"
                    style={
                      select
                        ? { color: 'var(--color-primary)' }
                        : { color: 'var(--color-text)' }
                    }
                  >
                    {artist.name}
                  </Link>
                </span>
              );
            })}
          </span>
        </div>
      </div>
      <div className="track__desc">
        <div className="track__vip">{isVIP ? 'VIP' : null}</div>
        <div
          className="track__duration"
          style={select ? { color: 'var(--color-primary)' } : null}
        >
          {duration}
        </div>
      </div>
    </div>
  );
}

export default Track;
