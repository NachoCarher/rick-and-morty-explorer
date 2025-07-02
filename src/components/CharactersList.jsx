import { useCharacter } from "../contexts/CharacterContext";
import Character from "./Character";

/* eslint-disable react/prop-types */
function CharactersList({ characters }) {
    const { dispatch } = useCharacter();

    return (
        <ul className="character-container">
            {characters?.map((character) => (
                <li className="character" key={character.id}>
                    <Character name={character.name} image={character.image} />
                    <button
                        className="fav-button"
                        onClick={() =>
                            dispatch({
                                type: "addFavCharacter",
                                payload: character,
                            })
                        }
                    >
                        ⭐
                    </button>
                </li>
            ))}
        </ul>
    );
}

export default CharactersList;
