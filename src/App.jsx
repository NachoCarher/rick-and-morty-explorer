import { useEffect, useReducer } from "react";

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
      return { ...state, data: action.payload.results, status: "success" };
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

  return (
    <main>
      {status === "loading" && <p>Loading...</p>}
      {status === "error" && (
        <p>
          <span>💥</span> {error}
        </p>
      )}
      {status === "success" &&
        data?.map((character) => (
          <div className="character" key={character.id}>
            <h2>{character.name}</h2>
            <img src={character.image} alt={character.name} />
          </div>
        ))}
    </main>
  );
}

export default App;
