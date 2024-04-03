import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Image, Typography } from 'antd';
import { MdOutlineAdsClick } from 'react-icons/md';

import { fetchSearchResults, selectSearchResults } from '../redux/slices/data';
import { Loading, PlaylistTracks } from '../components';

const { Title } = Typography;

export function Card({ image, title, link, subtitle }) {
  const navigate = useNavigate();

  return (
    <div className="artist-card" onClick={() => navigate(link)}>
      <div className="artist-card-image-container">
        <Image
          src={image}
          preview={false}
          width="200px"
          className="artist-card-image"
        />
        <div className="navigate-button">
          <button onClick={() => navigate(link)}>
            <MdOutlineAdsClick className="navigate-icon" />
          </button>
        </div>
      </div>
      <Title level={4} style={{ color: '#fff', marginTop: '1rem' }}>
        {title}
      </Title>
      <span className="artist-card-subtitle">{subtitle}</span>
    </div>
  );
}

function Search() {
  const { keyword } = useParams();
  const searchResults = useSelector(selectSearchResults);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await dispatch(fetchSearchResults(keyword)).unwrap();
    })();
  }, [dispatch, keyword]);

  if (searchResults.loading) return <Loading />;

  return (
    <>
      <div className="flex-container">
        <div className="top">
          <Title level={3} style={{ color: '#fff', marginBottom: '2.5rem' }}>
            Top result
          </Title>
          <div
            className="top__result"
            onClick={() => navigate(`/artist/${searchResults?.top?.alias}`)}
          >
            <Image
              src={searchResults?.top?.thumbnail}
              preview={false}
              className="top__result-image"
              width="100px"
            />
            <Title
              level={1}
              style={{ color: '#fff', marginBottom: '0.75rem', width: '350px' }}
            >
              {searchResults?.top?.name}
            </Title>
            <p className="top__result-subtitle">Artist</p>
            <div className="navigate-button">
              <button
                onClick={() => navigate(`/artist/${searchResults?.top?.alias}`)}
              >
                <MdOutlineAdsClick className="navigate-icon" />
              </button>
            </div>
          </div>
        </div>

        <div>
          <Title level={3} style={{ color: '#fff', marginBottom: '0.75rem' }}>
            Songs
          </Title>
          <PlaylistTracks
            tracks={searchResults?.songs?.slice(0, 4)}
            className="search-songs"
          />
        </div>
      </div>

      <div className="search__artists">
        <Title level={3} style={{ color: '#fff', marginBottom: '2.5rem' }}>
          Artists
        </Title>
        <div className="search__artists-container">
          {searchResults?.artists?.slice(0, 4).map((artist) => (
            <Card
              key={artist.id}
              image={artist.thumbnailM}
              title={artist.name}
              link={`/artist/${artist.alias}`}
              subtitle="Artists"
            />
          ))}
        </div>
      </div>

      <div className="search__artists">
        <Title level={3} style={{ color: '#fff', marginBottom: '2.5rem' }}>
          Playlists
        </Title>
        <div className="search__artists-container">
          {searchResults?.playlists?.slice(0, 4).map((playlist, index) => (
            <Card
              key={index}
              image={playlist.thumbnailM}
              title={playlist.title}
              link={`/playlist/${playlist.encodeId}`}
              subtitle="By ZingMP3"
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Search;
