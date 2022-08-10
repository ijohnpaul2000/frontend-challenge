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
        ...state,
        loading: true,
      };
    case "FETCH_POKEMON_FULFILL":
      return {
        ...state,
        pokemon: [...state.pokemon, action.payload],
        loading: false,
        error: null,
      };
    case "FETCH_POKEMON_REJECT":
      return {
        pokemon: [],
        singlePokemon: null,
        error: action.payload,
        loading: false,
      };
    case "FETCH_SINGLE_POKEMON_PENDING":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_SINGLE_POKEMON_FULFILL":
      return {
        ...state,
        singlePokemon: action.payload,
        loading: false,
        error: null,
      };
    case "FETCH_SINGLE_POKEMON_REJECT":
      return {
        ...state,
        singlePokemon: null,
        error: action.payload,
        loading: false,
      };
    case "CLEAR_ALL_POKEMON":
      return {
        state: initialState,
      };

    default:
      return state;
  }
};
