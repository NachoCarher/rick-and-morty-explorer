import { useEffect, useReducer, useRef } from "react";
import "./App.css";
import NavButton from "./components/NavButton";

const initialState = {
  status: "loading", // loading, success, error
  error: "",
  data: [],
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
        data: action.payload.results,
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
  const [{ status, data, error, nextPage, prevPage }, dispatch] = useReducer(
    reducer,
    initialState
  );
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
        <NavButton
          PrevNextPage={prevPage}
          dispatch={dispatch}
          currentPage={page}
          type="prev"
        >
          Prev
        </NavButton>
        <span>{page.current}</span>
        <NavButton
          PrevNextPage={nextPage}
          dispatch={dispatch}
          currentPage={page}
          type="next"
        >
          Next
        </NavButton>
      </div>
    </main>
  );
}

export default App;
