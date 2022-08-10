import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { initialState, pokemonReducer } from "./reducers/pokemonReducer";

const PokemonContext = createContext(null);

const URL = "https://pokeapi.co/api/v2/pokemon/" || process.env.POKEMON_URL;
export const PokemonProvider = ({ children }) => {
  const [state, dispatch] = useReducer(pokemonReducer, initialState);
  const effectRan = useRef(false);

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

      //* Set all pokemons stats and etc.
      const createPokemonObject = (result) => {
        result.forEach(async (pokemon) => {
          const response = await axios(URL + pokemon.name);
          dispatch({
            type: "FETCH_POKEMON_FULFILL",
            payload: response.data,
          });
        });
      };
      createPokemonObject(response.data.results);
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

  useEffect(() => {
    if (effectRan.current === false) {
      fetchAllPokemon();
      console.log("effect ran");

      return () => {
        effectRan.current = true;
      };
    }
  }, []);

  const value = {
    pokemon: state.pokemon,
    loading: state.loading,
    error: state.error,
    singlePokemon: state.singlePokemon,
    fetchAllPokemon,
    fetchSinglePokemon,
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
