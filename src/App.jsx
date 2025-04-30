import { useEffect, useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "setPage":
      return { ...state, currentPage: action.payload };
    case "setData":
      if (action.payload.error) {
        console.log("error tio");
        return state;
      }
      return { ...state, data: action.payload.results, status: "success" };
    default:
      throw new Error("Unknown");
  }
}

function App() {
  const initialState = {
    status: "loading", // loading, success, error
    error: "",
    data: [],
    filters: {
      name: "",
      condition: "", // dead, alive, etc.
    },
    currentPage: 1,
  };

  const [{ status, data, currentPage }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/?page=${currentPage}`)
      .then((response) => response.json())
      .then((response) => dispatch({ type: "setData", payload: response }))
      .catch((err) => console.error(err));
  }, [currentPage]);

  return (
    <div>
      {status === "success" &&
        data.map((character) => (
          <div className="character" key={character.id}>
            <h2>{character.name}</h2>
            <img src={character.image} alt={character.name} />
          </div>
        ))}
    </div>
  );
}

export default App;
