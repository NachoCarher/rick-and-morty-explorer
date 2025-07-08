import { Link } from "react-router";
import CharactersList from "./CharactersList";
import { useCharacter } from "../contexts/CharacterContext";

function Favorites() {
  const { favCharacters } = useCharacter();

  return (
    <main>
      <h1>Rick and Morty explorer</h1>
      <nav>
        <Link to="/" className="nav-link">
          Home
        </Link>
      </nav>
      <h2 className="fav-title">Favorites page</h2>
      <CharactersList characters={favCharacters} />
    </main>
  );
}

export default Favorites;
