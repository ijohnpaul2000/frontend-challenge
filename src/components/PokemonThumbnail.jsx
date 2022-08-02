import React from "react";
import "../index.css";
import { Link } from "react-router-dom";

const PokemonThumbnail = ({ pokemon, pokemon: { types } }) => {
  return (
    <Link
      className="text-sm text-blue-200 font-base"
      to={`pokemon/${pokemon.name}`}
    >
      <article className="group">
        <div
          className={`${types[0].type.name} min-w-[250px] min-h-[150px]   rounded-2xl shadow-xl flex items-center justify-around group-hover:scale-105 duration-300 cursor-pointer`}
        >
          <img
            src={pokemon.sprites.front_default}
            className="h-[150px] group-hover:rotate-6 duration-300"
          />
          <div className="h-full">
            <h1 className="h-full flex flex-col font-roboto text-[#EEFFFF] font-bold text-2xl hover:cursor-pointer">
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </h1>
            <p className="font-roboto text-md text-gray-50">
              Click for more details!
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default PokemonThumbnail;
