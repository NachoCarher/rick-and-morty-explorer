import { useCharacter } from "../contexts/CharacterContext";
import Character from "./Character";

import icon from "../assets/fav-icon.png";

/* eslint-disable react/prop-types */
function CharactersList({ characters }) {
  const { dispatch, favCharacters } = useCharacter();

  function isFavorite(character) {
    return favCharacters.includes(character);
  }

  return (
    <ul className="character-container">
      {characters?.map((character) => (
        <li className="character" key={character.id}>
          <button
            className={`fav-button
              ${
                !isFavorite(character)
                  ? "fav-button-not-added"
                  : "fav-button-added"
              }`}
            onClick={() => {
              !isFavorite(character)
                ? dispatch({
                    type: "addFavCharacter",
                    payload: character,
                  })
                : dispatch({
                    type: "deleteFavCharacter",
                    payload: character,
                  });
            }}
          >
            <img src={icon} alt="favorite-icon" />
          </button>
          <Character
            name={character.name}
            image={character.image}
            id={character.id}
          />
        </li>
      ))}
    </ul>
  );
}

export default CharactersList;
