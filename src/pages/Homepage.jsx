import React, { useEffect } from "react";
import PokemonThumbnail from "../components/PokemonThumbnail";
import usePokemon from "../context/pokemonContext";
import ErrorPage from "./ErrorPage";

const Homepage = () => {
  const { allPokemons, pokemon, loading, error, fetchAllPokemon } =
    usePokemon();

  useEffect(() => {
    fetchAllPokemon();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <ErrorPage />;
  }
  return (
    <div className="w-screen h-full px-4">
      <div className="max-w-[1400px] h-full mx-auto grid grid-cols-1 md:grid-cols-3 grid-rows-4 gap-10 place-content-center mt-20">
        {allPokemons.slice(0, 12).map((pokemon) => (
          <PokemonThumbnail pokemon={pokemon} key={pokemon.name} />
        ))}
      </div>
    </div>
  );
};

export default Homepage;
