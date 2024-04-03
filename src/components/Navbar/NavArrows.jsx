import React from 'react';
import { RiArrowDropLeftLine, RiArrowDropRightLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

function NavArrows() {
  const navigate = useNavigate();

  return (
    <div className="navbar__icons flex">
      <button onClick={() => navigate(-1)}>
        <RiArrowDropLeftLine className="navbar__icon" />
      </button>
      <button onClick={() => navigate(1)}>
        <RiArrowDropRightLine className="navbar__icon" />
      </button>
    </div>
  );
}

export default NavArrows;
