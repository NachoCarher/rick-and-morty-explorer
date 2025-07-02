import { useEffect, useReducer, useRef } from "react";
import "./App.css";
import Search from "./components/Search";
import CharactersList from "./components/CharactersList";
import PageNavigation from "./components/PageNavigation";

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
};

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
        default:
            throw new Error("Unknown");
    }
}

function App() {
    const [{ status, characters, error, nextPage, prevPage }, dispatch] =
        useReducer(reducer, initialState);
    const page = useRef(1);

    useEffect(() => {
        fetch(`https://rickandmortyapi.com/api/character/`)
            .then((response) => response.json())
            .then((data) => dispatch({ type: "dataReceived", payload: data }))
            .catch((err) => dispatch({ type: "dataFailed", payload: err }));
    }, []);

    function handleSubmit(event) {
        event.preventDefault();
        page.current = 1;

        fetch(
            `https://rickandmortyapi.com/api/character/?name=${event.target[0].value}`
        )
            .then((response) => response.json())
            .then((data) => dispatch({ type: "dataReceived", payload: data }))
            .catch((err) => dispatch({ type: "dataFailed", payload: err }));
    }

    return (
        <main>
            <h1>Rick and Morty explorer</h1>
            <Search onSubmit={handleSubmit} />

            {status === "loading" && <p>Loading...</p>}
            {status === "error" && (
                <p>
                    <span>💥</span> {error}
                </p>
            )}
            {status === "success" && <CharactersList characters={characters} />}

            <PageNavigation
                page={page}
                prevPage={prevPage}
                nextPage={nextPage}
                dispatch={dispatch}
            />
        </main>
    );
}

export default App;
