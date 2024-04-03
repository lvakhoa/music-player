import React from 'react';
import { Image, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Title } = Typography;

function Playlist({ encodeId, thumbnail, title, sortDescription }) {
  return (
    <>
      <Link to={`playlist/${encodeId}`}>
        <Image preview={false} src={thumbnail} className="home__card-image" />
      </Link>

      <Link to={`playlist/${encodeId}`}>
        <Title level={5} className="card-title">
          {title}
        </Title>
      </Link>
      <p className="home__card-desc">{sortDescription}</p>
    </>
  );
}

export default Playlist;
