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
            return {
                ...state,
                favCharacters: [...state.favCharacters, action.payload],
            };

        default:
            throw new Error("Unknown action type");
    }
}

// eslint-disable-next-line react/prop-types
function CharacterProvider({ children }) {
    const [
        { status, characters, error, nextPage, prevPage, favCharacters },
        dispatch,
    ] = useReducer(reducer, initialState);

    useEffect(() => {
        fetch(`https://rickandmortyapi.com/api/character/`)
            .then((response) => response.json())
            .then((data) => dispatch({ type: "dataReceived", payload: data }))
            .catch((err) => dispatch({ type: "dataFailed", payload: err }));
    }, [dispatch]);

    return (
        <CharacterContext.Provider
            value={{
                status,
                characters,
                error,
                nextPage,
                prevPage,
                favCharacters,
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
