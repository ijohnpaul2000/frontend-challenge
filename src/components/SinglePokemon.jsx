import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import usePokemon from "../context/pokemonContext";
import ProgressBar from "react-bootstrap/ProgressBar";
import "../index.css";

const SinglePokemon = () => {
  const { name } = useParams();
  const { singlePokemon, loading, error, fetchSinglePokemon } = usePokemon();

  const statsColor = ["#D63944", "#FDA827", "#0089DF", "#8DB1C4", "#3A8B3E"];
  const pokemonName =
    singlePokemon?.name.charAt(0).toUpperCase() + singlePokemon?.name.slice(1);

  const pokemonImage = singlePokemon?.sprites.other.dream_world.front_default;

  //* POKEMON TYPE
  const pokemonType = singlePokemon?.types.map((type) => (
    <div key={type.type.name}>
      <p
        className={`${type.type.name} rounded-full px-4 py-2 font-roboto font-lg text-xl font-semibold cursor-pointer hover:scale-105 duration:300`}
      >
        {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
      </p>
    </div>
  ));

  //* POKEMON ABILITIES
  const pokemonAbilities = singlePokemon?.abilities.map((ability) => (
    <div key={ability.ability.name}>
      <p
        className={`rounded-full py-2 font-roboto font-lg font-semibold text-xl`}
      >
        {ability.ability.name.charAt(0).toUpperCase() +
          ability.ability.name.slice(1)}
      </p>
    </div>
  ));
  const pokemonStats = singlePokemon?.stats.map((stat, index) => (
    <div
      className="flex flex-col mb-4 sm:flex-row gap-x-4"
      key={stat.stat.name}
    >
      <h1 className="font-roboto text-2xl w-full">
        {stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}
      </h1>
      {/* BASE_STAT*/}
      <div className="w-full bg-white relative rounded-full mb-2">
        <div
          className={`bg-red-500  h-full rounded-full flex justify-end pr-2`}
          style={{
            width: `${stat.base_stat}%`,
            backgroundColor: statsColor[index],
          }}
        >
          <p className="font-roboto">
            {stat.base_stat} {stat.base_stat <= 30 ? "%" : "/100%"}
          </p>
        </div>
      </div>
    </div>
  ));

  useEffect(() => {
    fetchSinglePokemon(name);
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <main className="w-full h-full p-4 mt-4 md:mt-20 text-white">
      <section className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-4">
        <div className="w-full h-full flex flex-col order-1 md:order-1 ">
          <img
            src={pokemonImage}
            alt=""
            className={`max-w-[400px] aspect-square ${singlePokemon?.types[0].type.name} rounded-lg shadow-xl py-10`}
          />
        </div>
        <div className="font-roboto order-1 md:order-2 mt-4">
          <h1 className="font-bold text-4xl">
            Name: <span className="text-3xl font-semibold"> {pokemonName}</span>
          </h1>
          <h1 className="text-3xl mt-4">Types:</h1>
          <div className="flex gap-4 my-4">{pokemonType}</div>
          <h1 className="text-3xl mt-4">Abilities: </h1>
          <div className="flex gap-x-4">{pokemonAbilities}</div>
        </div>
        <div className="w-full order-3 ">
          <h1 className="font-roboto text-4xl my-10 font-bold">Stats</h1>
          {pokemonStats}
        </div>
      </section>
    </main>
  );
};

export default SinglePokemon;
