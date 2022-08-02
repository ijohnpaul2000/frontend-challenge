export const initialState = {
  pokemon: [],
  loading: false,
  error: null,
  singlePokemon: null,
};

export const pokemonReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_POKEMON_PENDING":
      return {
        loading: true,
      };
    case "FETCH_POKEMON_FULFILL":
      return {
        pokemon: action.payload,
        loading: false,
        error: null,
      };
    case "FETCH_POKEMON_REJECT":
      return {
        error: action.payload,
        loading: false,
      };
    case "FETCH_SINGLE_POKEMON_PENDING":
      return {
        loading: true,
      };
    case "FETCH_SINGLE_POKEMON_FULFILL":
      return {
        singlePokemon: action.payload,
        loading: false,
        error: null,
      };
    case "FETCH_SINGLE_POKEMON_REJECT":
      return {
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};
