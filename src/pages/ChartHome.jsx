import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchChartHome, selectChartHome } from '../redux/slices/data';
import { Loading, PlaylistTracks } from '../components';

function ChartHome() {
  const chartHome = useSelector(selectChartHome);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(fetchChartHome()).unwrap();
    })();
  }, [dispatch]);

  if (chartHome.loading) return <Loading />;

  return (
    <div>
      <PlaylistTracks tracks={chartHome?.items} />
    </div>
  );
}

export default ChartHome;
