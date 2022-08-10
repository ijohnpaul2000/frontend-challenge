import React, { useEffect } from "react";
import PokemonThumbnail from "../components/PokemonThumbnail";
import usePokemon from "../context/pokemonContext";
import ErrorPage from "./ErrorPage";

const Homepage = () => {
  const { pokemon, loading, error } = usePokemon();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <ErrorPage />;
  }
  return (
    <div className="w-screen h-full px-4 py-16 md:py-0">
      <div className="max-w-[1400px] h-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-4 gap-10 place-content-center mt-20">
        {pokemon.slice(0, 12).map((pokemon) => (
          <PokemonThumbnail pokemon={pokemon} key={pokemon.name} />
        ))}
      </div>
    </div>
  );
};

export default Homepage;
