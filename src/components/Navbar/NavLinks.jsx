import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Typography } from 'antd';

const { Text } = Typography;

function NavLinks() {
  const { pathname } = useLocation();

  return (
    <div className="navbar__links">
      <Link className="navbar__link" to="/">
        <Text
          className={`navbar__link-title ${
            pathname === '/' ? 'active-link' : null
          }`}
        >
          Home
        </Text>
      </Link>
      <Link className="navbar__link" to="/zingchart">
        <Text
          className={`navbar__link-title ${
            pathname === '/zingchart' ? 'active-link' : null
          }`}
        >
          Zingchart
        </Text>
      </Link>
      <Link className="navbar__link" to="/top100">
        <Text
          className={`navbar__link-title ${
            pathname === '/top100' ? 'active-link' : null
          }`}
        >
          Top100
        </Text>
      </Link>
      <Link className="navbar__link" to="/mv">
        <Text
          className={`navbar__link-title ${
            pathname === '/mv' ? 'active-link' : null
          }`}
        >
          MV
        </Text>
      </Link>
    </div>
  );
}

export default NavLinks;
