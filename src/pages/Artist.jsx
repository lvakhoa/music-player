import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Image, Typography } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import millify from 'millify';

import {
  fetchArtistInfo,
  fetchArtistSongs,
  selectArtistInfo,
  selectArtistSongs,
  resetArtist,
} from '../redux/slices/data';
import { Loading, PlaylistTracks } from '../components';
import { Loader } from './MV';

const { Title } = Typography;

function Artist() {
  const { artistName } = useParams();
  const artistInfo = useSelector(selectArtistInfo);
  const artistSongs = useSelector(selectArtistSongs);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [artistData, setArtistData] = useState();

  /**
   * Fix performance later, focus on rendering times issue
   * Got problem in render songs. When click another artist from an artist profile, it only renders 1 page of songs
   */
  // console.log(1);

  useEffect(() => {
    setArtistData([]);

    (async () => {
      await dispatch(fetchArtistInfo(artistName)).unwrap();
    })();

    return () => dispatch(resetArtist());
  }, [dispatch, artistName]);

  useEffect(() => {
    (async () => {
      if (artistInfo.id) {
        await dispatch(
          fetchArtistSongs({ id: artistInfo.id, page: 1, count: 20 })
        ).unwrap();
      }
    })();
  }, [artistInfo, dispatch]);

  useEffect(() => {
    if (artistSongs?.items?.length > 0 && !artistSongs.loading) {
      const songsData = [...artistData];
      setArtistData(songsData.concat(artistSongs.items));
    }
  }, [artistSongs]);

  const getNextSongs = () => {
    setPage(page + 1);

    setTimeout(async () => {
      await dispatch(
        fetchArtistSongs({ id: artistInfo.id, page: page + 1, count: 20 })
      ).unwrap();
    }, 1500);
  };

  if (artistInfo.loading) return <Loading />;

  return (
    <>
      <div className="artist">
        <Image
          src={artistInfo?.thumbnailM}
          preview={false}
          className="artist__image"
        />
        <div className="artist__info">
          <Title level={1} className="artist__info-name">
            {artistInfo.name}
          </Title>
          <div className="artist__info-detail">
            <p className="artist__info-realname">
              Real Name: {artistInfo.realname}
            </p>
            <div className="artist__info-birthday-follow">
              <span>
                Birthday:{' '}
                {artistInfo?.birthday?.length > 0 ? artistInfo.birthday : 'N/A'}
              </span>
              <span>
                Total Follow:{' '}
                {artistInfo.totalFollow ? millify(artistInfo.totalFollow) : 0}
              </span>
            </div>
          </div>
          <p className="artist__info-desc">{artistInfo.sortBiography}</p>
        </div>
      </div>
      {artistData?.length > 0 ? (
        <InfiniteScroll
          dataLength={artistData.length}
          next={getNextSongs}
          hasMore={artistSongs.hasMore}
          loader={<Loader />}
          style={{ overflow: 'hidden' }}
        >
          <PlaylistTracks tracks={artistData} />
        </InfiniteScroll>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Artist;
