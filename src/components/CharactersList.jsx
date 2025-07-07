import { useCharacter } from "../contexts/CharacterContext";
import Character from "./Character";

import icon from "../assets/fav-icon.png";

/* eslint-disable react/prop-types */
function CharactersList({ characters }) {
  const { dispatch } = useCharacter();

  return (
    <ul className="character-container">
      {characters?.map((character) => (
        <li className="character" key={character.id}>
          <button
            className="fav-button"
            onClick={() =>
              dispatch({
                type: "addFavCharacter",
                payload: character,
              })
            }
          >
            <img src={icon} alt="favorite-icon" />
          </button>
          <Character name={character.name} image={character.image} />
        </li>
      ))}
    </ul>
  );
}

export default CharactersList;
