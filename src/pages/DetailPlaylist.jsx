import React, { useEffect, useState } from 'react';
import { Image, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import { FaPlay } from 'react-icons/fa';
import moment from 'moment/moment';
import millify from 'millify';

import {
  fetchDetailPlaylist,
  selectDetailPlaylist,
} from '../redux/slices/data';
import { Loading, PlaylistTracks } from '../components';

const { Title } = Typography;

function DetailPlaylist() {
  const { playlistId } = useParams();
  const dispatch = useDispatch();
  const detailPlaylist = useSelector(selectDetailPlaylist);

  useEffect(() => {
    const getDetailPlaylist = async () => {
      await dispatch(fetchDetailPlaylist(playlistId)).unwrap();
    };

    getDetailPlaylist();
  }, [dispatch, playlistId]);

  if (detailPlaylist.loading) return <Loading />;

  return (
    <>
      <div className="detail">
        <Image
          src={detailPlaylist?.thumbnailM}
          preview={false}
          className="detail__image"
        />
        <div className="detail__content">
          <Title level={1} className="detail__content-title">
            {detailPlaylist?.title}
          </Title>
          <p className="detail__content-subtitle">
            Playlist by{' '}
            {detailPlaylist?.artists?.map((artist, index) => {
              if (index === 0)
                return (
                  <Link
                    key={index}
                    to={`/artist/${artist.alias}`}
                    className="artist-link"
                  >
                    {artist.name}
                  </Link>
                );
              return (
                <span key={index}>
                  <span>, </span>
                  <Link to={`/artist/${artist.alias}`} className="artist-link">
                    {artist.name}
                  </Link>
                </span>
              );
            })}
          </p>
          <div className="detail__content-info">
            <span className="detail__content-desc">
              Updated at{' '}
              {moment(
                new Date(detailPlaylist?.contentLastUpdate * 1000)
              ).format('DD/MM/YYYY')}
            </span>
            <span className="detail__content-desc">
              {detailPlaylist?.song?.total} Songs
            </span>
            <span className="detail__content-desc like">
              <AiOutlineHeart className="detail__content-icon" />{' '}
              {detailPlaylist?.like ? millify(detailPlaylist?.like) : 0}
            </span>
          </div>
          <p className="detail__content-desc">
            {detailPlaylist.sortDescription}
          </p>
          <button className="play-button">
            <FaPlay style={{ marginRight: '0.5rem' }} />
            Play
          </button>
        </div>
      </div>
      <PlaylistTracks tracks={detailPlaylist?.song?.items} />
    </>
  );
}

export default DetailPlaylist;
