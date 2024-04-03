import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTop100, selectTop100 } from '../redux/slices/data';
import { Loading, PlaylistsContainer } from '../components';

function Top100() {
  const top100 = useSelector(selectTop100);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(fetchTop100()).unwrap();
    })();
  }, [dispatch]);

  if (top100.loading) return <Loading />;

  return <PlaylistsContainer playlists={top100.items} />;
}

export default Top100;
