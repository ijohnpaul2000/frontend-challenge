import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { initialState, pokemonReducer } from "./reducers/pokemonReducer";

const PokemonContext = createContext(null);

const URL = "https://pokeapi.co/api/v2/pokemon/" || process.env.POKEMON_URL;
export const PokemonProvider = ({ children }) => {
  const [state, dispatch] = useReducer(pokemonReducer, initialState);
  //* made a piece of state, because useReducer arrays are not iterable.
  const [allPokemons, setAllPokemons] = useState([]);

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    url: URL,
    method: "GET",
  };

  const fetchAllPokemon = async () => {
    dispatch({ type: "FETCH_POKEMON_PENDING" });

    try {
      const response = await axios(config);
      //* Set the reducer  with the response data
      dispatch({ type: "FETCH_POKEMON_FULFILL", payload: response.data });

      //* Set all pokemons stats and etc.
      const createPokemonObject = (result) => {
        result.forEach(async (pokemon) => {
          const response = await axios(URL + pokemon.name);
          setAllPokemons((prevList) => [...prevList, response.data]);
        });
      };
      createPokemonObject(response.data.results);
      await console.log(allPokemons);
    } catch (error) {
      dispatch({ type: "FETCH_POKEMON_REJECT", payload: error });
    }
  };

  const fetchSinglePokemon = async (name) => {
    dispatch({ type: "FETCH_SINGLE_POKEMON_PENDING" });

    try {
      const response = await axios(URL + name);
      dispatch({
        type: "FETCH_SINGLE_POKEMON_FULFILL",
        payload: response.data,
      });
    } catch (error) {
      dispatch({ type: "FETCH_SINGLE_POKEMON_REJECT", payload: error });
    }
  };

  const value = {
    pokemon: state.pokemon,
    loading: state.loading,
    error: state.error,
    singlePokemon: state.singlePokemon,
    fetchAllPokemon,
    fetchSinglePokemon,
    allPokemons,
  };

  return (
    <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
  );
};

const usePokemon = () => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error("usePokemon must be used within a PokemonProvider");
  }
  return context;
};

export default usePokemon;
