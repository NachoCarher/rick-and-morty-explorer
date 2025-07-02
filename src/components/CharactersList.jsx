import Character from "./Character";

/* eslint-disable react/prop-types */
function CharactersList({ characters }) {
    return (
        <ul className="character-container">
            {characters?.map((character) => (
                <li className="character" key={character.id}>
                    <Character name={character.name} image={character.image} />
                </li>
            ))}
        </ul>
    );
}

export default CharactersList;
