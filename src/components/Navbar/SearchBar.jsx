import React, { useState } from 'react';
import { Input } from 'antd';
import { IoSearchSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

function Searchbar() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');

  const handleSearch = () => {
    navigate(`/search/${keyword}`);
  };

  return (
    <div className="navbar__search">
      <Input
        prefix={
          <IoSearchSharp
            className="navbar__input-icon"
            onClick={handleSearch}
          />
        }
        placeholder="Search"
        className="navbar__input"
        onChange={(e) => setKeyword(e.target.value)}
        onPressEnter={handleSearch}
      />
    </div>
  );
}

export default Searchbar;
