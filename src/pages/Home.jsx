import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { selectHomePlaylists, fetchHomeData } from '../redux/slices/data';
import { Loading, PlaylistsContainer } from '../components';

function Home() {
  const homePlaylists = useSelector(selectHomePlaylists);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(fetchHomeData()).unwrap();
    })();
  }, [dispatch]);

  if (homePlaylists.loading) return <Loading />;

  return <PlaylistsContainer playlists={homePlaylists?.items} />;
}

export default Home;
