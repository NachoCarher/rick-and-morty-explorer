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

  function handleSelect(event) {
    page.current = 1;

    fetch(
      `https://rickandmortyapi.com/api/character/?status=${event.target.value}`
    )
      .then((response) => response.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed", payload: err }));
  }

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

      <nav>
        <Link to="/favorites" className="nav-link">
          Favorites
        </Link>
      </nav>

      <Search onSubmit={handleSubmit} onSelect={handleSelect} />

      {status === "loading" && <p>Loading...</p>}
      {status === "error" && (
        <p>
          <span>💥</span> {error}
        </p>
      )}
      {status === "success" && <CharactersList characters={characters} />}

      <PageNavigation page={page} />
    </main>
  );
}

export default App;
