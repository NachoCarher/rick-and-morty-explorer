import { useEffect, useReducer } from "react";
import "./App.css";

const initialState = {
  status: "loading", // loading, success, error
  error: "",
  data: [],
  filters: {
    name: "",
    condition: "", // dead, alive, unknown
  },
  currentPage: 1,
};

function reducer(state, action) {
  switch (action.type) {
    case "setPage":
      return { ...state, currentPage: action.payload };
    case "dataReceived":
      return {
        ...state,
        data: action.payload.results,
        status: "success",
      };
    case "dataFailed":
      return { ...state, status: "error", error: action.payload };
    default:
      throw new Error("Unknown");
  }
}

function App() {
  const [{ status, data, currentPage, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/?page=${currentPage}`)
      .then((response) => response.json())
      .then((response) => dispatch({ type: "dataReceived", payload: response }))
      .catch((err) => dispatch({ type: "dataFailed", payload: err }));
  }, [currentPage]);

  function handleSubmit(event) {
    event.preventDefault();
    fetch(
      `https://rickandmortyapi.com/api/character/?name=${event.target[0].value}`
    )
      .then((response) => response.json())
      .then((response) =>
        dispatch({ type: "dataReceived", payload: response })
      );
  }

  return (
    <main>
      <h1>Rick and Morty explorer</h1>
      <form onSubmit={() => handleSubmit(event)}>
        <input type="text" placeholder="Birdperson" />
        <input type="submit" value="Search character" />
      </form>

      {status === "loading" && <p>Loading...</p>}
      {status === "error" && (
        <p>
          <span>💥</span> {error}
        </p>
      )}
      {status === "success" && (
        <ul className="character-container">
          {data?.map((character) => (
            <li className="character" key={character.id}>
              <h2>{character.name}</h2>
              <img src={character.image} alt={character.name} />
            </li>
          ))}
        </ul>
      )}

      <div className="pagination">
        <button
          onClick={() =>
            dispatch({ type: "setPage", payload: currentPage - 1 })
          }
        >
          Prev
        </button>
        <span>{currentPage}</span>
        <button
          onClick={() =>
            dispatch({ type: "setPage", payload: currentPage + 1 })
          }
        >
          Next
        </button>
      </div>
    </main>
  );
}

export default App;
