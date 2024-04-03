import React from 'react';
import { Image, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Title } = Typography;

function MVCard({ thumbnailM, thumbnail, encodeId, title, artists }) {
  return (
    <div>
      <Link to={`/mv/${encodeId}`}>
        <Image
          preview={false}
          src={thumbnailM}
          placeholder={<Image preview={false} src={thumbnail} />}
          className="home__card-image"
        />
      </Link>
      <Link to={`/mv/${encodeId}`}>
        <Title level={5} className="card-title">
          {title}
        </Title>
      </Link>
      <span className="info-artists">
        {artists?.map((artist, index) => {
          if (index === 0)
            return (
              <Link
                key={index}
                to={`/artist/${artist.alias}`}
                className="info-artist"
                style={{ color: 'var(--color-text)' }}
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
                style={{ color: 'var(--color-text)' }}
              >
                {artist.name}
              </Link>
            </span>
          );
        })}
      </span>
    </div>
  );
}

export default MVCard;
