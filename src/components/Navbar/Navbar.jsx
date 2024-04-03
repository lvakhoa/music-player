import React from 'react';

import NavArrows from './NavArrows';
import NavLinks from './NavLinks';
import SearchBar from './SearchBar';

function Navbar() {
  return (
    <nav className="navbar container">
      <NavArrows />
      <NavLinks />
      <SearchBar />
    </nav>
  );
}

export default Navbar;
