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

  console.log(currentCharacter);

  return (
    <main>
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
                  <p>{currentCharacter.location?.name}</p>
                </div>

                <div className="species">
                  <p>Species</p>
                  <p>{currentCharacter.species}</p>
                </div>

                <div className="gender">
                  <p>Gender</p>
                  <p>{currentCharacter.gender}</p>
                </div>

                <div className="origin">
                  <p>Origin</p>
                  <p>{currentCharacter.origin?.name}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}

export default CharacterDetails;
