import { createContext, useContext, useEffect, useReducer } from "react";

const initialState = {
  status: "loading", // loading, success, error
  error: "",
  characters: [],
  filters: {
    name: "",
    condition: "", // dead, alive, unknown
  },
  nextPage: "",
  prevPage: "",
  favCharacters: [],
  currentCharacter: null,
};

const CharacterContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        characters: action.payload.results,
        status: "success",
        nextPage: action.payload.info.next,
        prevPage: action.payload.info.prev,
      };
    case "dataFailed":
      return { ...state, status: "error", error: action.payload };

    case "addFavCharacter":
      if (state.favCharacters.includes(action.payload)) return state;
      return {
        ...state,
        favCharacters: [...state.favCharacters, action.payload],
      };

    case "deleteFavCharacter":
      if (!state.favCharacters.includes(action.payload)) return state;
      return {
        ...state,
        favCharacters: state.favCharacters.filter(
          (character) => character !== action.payload
        ),
      };

    case "showCharacter":
      return { ...state, currentCharacter: action.payload, status: "success" };

    default:
      throw new Error("Unknown action type");
  }
}

// eslint-disable-next-line react/prop-types
function CharacterProvider({ children }) {
  const [
    {
      status,
      characters,
      error,
      nextPage,
      prevPage,
      favCharacters,
      currentCharacter,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/`)
      .then((response) => response.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed", payload: err }));
  }, [dispatch]);

  async function getCharacter(id) {
    if (!id) return;

    try {
      fetch(`https://rickandmortyapi.com/api/character/${id}`)
        .then((res) => res.json())
        .then((data) => dispatch({ type: "showCharacter", payload: data }));
    } catch (error) {
      dispatch({ type: "dataFailed", payload: error });
    }
  }

  return (
    <CharacterContext.Provider
      value={{
        status,
        characters,
        error,
        nextPage,
        prevPage,
        favCharacters,
        currentCharacter,
        getCharacter,
        dispatch,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
}

function useCharacter() {
  if (CharacterContext === undefined)
    throw new Error(
      "CharacterContext should be consumend inside CharacterProvider"
    );

  const context = useContext(CharacterContext);

  return context;
}

export { CharacterProvider, useCharacter };
