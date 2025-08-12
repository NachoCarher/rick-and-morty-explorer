import { useRef } from "react";
import "./App.css";
import Search from "./components/Search";
import CharactersList from "./components/CharactersList";
import PageNavigation from "./components/PageNavigation";
import { Link } from "react-router";
import { useCharacter } from "./contexts/CharacterContext";

function App() {
  const { error, characters, status, dispatch } = useCharacter();
  const page = useRef(1);

  function handleSubmit(event) {
    event.preventDefault();
    page.current = 1;

    const searchName = event.target[0].value;
    const searchStatus = event.target[1].value;

    fetch(
      `https://rickandmortyapi.com/api/character/?name=${searchName}&status=${searchStatus}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.error) throw data.error;
        dispatch({ type: "dataReceived", payload: data });
      })
      .catch((err) => dispatch({ type: "dataFailed", payload: err }));
  }

  return (
    <main>
      <h1>Rick and Morty explorer</h1>

      <nav>
        <Link to="/favorites" className="nav-link">
          Favorites
        </Link>
      </nav>

      <Search onSubmit={handleSubmit} />

      {status === "loading" && <p>Loading...</p>}
      {status === "error" && <p className="error">💥 {error}</p>}
      {status === "success" && (
        <>
          <CharactersList characters={characters} />
          <PageNavigation page={page} />
        </>
      )}
    </main>
  );
}

export default App;
