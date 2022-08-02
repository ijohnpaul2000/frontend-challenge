import React from "react";
import { Link } from "react-router-dom";
const Nav = () => {
  return (
    <header className="w-full h-[80px] bg-[#703B58] px-4">
      <nav className="max-w-[1400px] h-full mx-auto flex items-center">
        <Link
          to="/"
          className="text-white font-bold text-2xl cursor-pointer active:scale-95 duration-300"
        >
          Pokédex
        </Link>
      </nav>
    </header>
  );
};

export default Nav;
