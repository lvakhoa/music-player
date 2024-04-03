import React from 'react';
import { Row, Col, Typography } from 'antd';
import Playlist from './Playlist';

const { Title } = Typography;

function PlaylistsContainer({ playlists }) {
  return (
    <Col>
      {playlists?.map((playlist) => (
        <div key={playlist.title} className="home__data">
          <Title level={2} className="home__data-title">
            {playlist.title}
          </Title>
          <Row gutter={[32, 32]}>
            {playlist.items.map((item) => (
              <Col
                xs={24}
                sm={12}
                lg={5}
                key={item.encodeId}
                className="home__card"
              >
                <Playlist
                  encodeId={item.encodeId}
                  thumbnail={item.thumbnail}
                  title={item.title}
                  sortDescription={item.sortDescription}
                />
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </Col>
  );
}

export default PlaylistsContainer;
