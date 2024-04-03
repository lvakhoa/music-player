import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

import { fetchListMV, selectListMV } from '../redux/slices/data';
import { Loading, MVCard } from '../components';

export function Loader() {
  return (
    <div className="loader">
      <Spin size="large" />
    </div>
  );
}

function MV() {
  const listMV = useSelector(selectListMV);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [listMVData, setListMVData] = useState([]);

  useEffect(() => {
    (async () => {
      await dispatch(fetchListMV(1)).unwrap();
    })();
  }, [dispatch]);

  useEffect(() => {
    if (listMV?.items?.length > 0 && !listMV.loading) {
      const list = [...listMVData];
      setListMVData(list.concat(listMV?.items));
    }
  }, [listMV]);

  const getMoreMV = () => {
    setPage(page + 1);

    setTimeout(() => {
      (async () => {
        await dispatch(fetchListMV(page + 1)).unwrap();
      })();
    }, 1500);
  };

  return (
    <div>
      {listMVData.length > 0 ? (
        <InfiniteScroll
          dataLength={listMVData.length}
          next={getMoreMV}
          hasMore={listMV.hasMore}
          loader={<Loader />}
          style={{ overflow: 'hidden' }}
        >
          <Row gutter={[26, 32]}>
            {listMVData?.map((item) => (
              <Col lg={5} key={item.title} className="home__card">
                <MVCard
                  thumbnailM={item.thumbnailM}
                  thumbnail={item.thumbnail}
                  encodeId={item.encodeId}
                  title={item.title}
                  artists={item.artists}
                />
              </Col>
            ))}
          </Row>
        </InfiniteScroll>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default MV;
