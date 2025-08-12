import { useParams, Link } from "react-router";
import { useCharacter } from "../contexts/CharacterContext";
import { useEffect } from "react";
import "./CharacterDetails.css";

function CharacterDetails() {
  const { id } = useParams();
  const { getCharacter, currentCharacter } = useCharacter();

  useEffect(
    function () {
      getCharacter(id);
    },
    [getCharacter, id]
  );

  return (
    <>
      <h1>Rick and Morty explorer</h1>
      <nav>
        <Link to="/" className="nav-link">
          Home
        </Link>
      </nav>
      <section className="character-section">
        {!currentCharacter ? (
          <p>Loading character...</p>
        ) : (
          <>
            <img
              src={currentCharacter.image}
              alt="character's name"
              className="character-img"
            />
            <div className="character-info">
              <h2>{currentCharacter.name}</h2>
              <div className="character-details">
                <div className="status">
                  <p>Status</p>
                  <p>{currentCharacter.status}</p>
                </div>

                <div className="location">
                  <p>Location</p>
                  <p>Planet Earth</p>
                </div>

                <div className="species">
                  <p>Species</p>
                  <p>Humano</p>
                </div>

                <div className="gender">
                  <p>Gender</p>
                  <p>Masculino</p>
                </div>

                <div className="origin">
                  <p>Origin</p>
                  <p>Tierra (C-137)</p>
                </div>

                <div className="current-location">
                  <p>Current location</p>
                  <p>Ciudadela de los Ricks</p>
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
}

export default CharacterDetails;
