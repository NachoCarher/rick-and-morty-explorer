import { useNavigate, useParams } from "react-router";
import { useCharacter } from "../contexts/CharacterContext";
import { useEffect } from "react";
import "./CharacterDetails.css";

function CharacterDetails() {
  const { id } = useParams();
  const { getCharacter, currentCharacter } = useCharacter();
  const navigate = useNavigate();

  useEffect(
    function () {
      getCharacter(id);
    },
    [getCharacter, id]
  );

  console.log(currentCharacter);

  // solo se muestran detalles del mismo personaje, da igual el que pulses
  // los detalles están hardcodeados, hay que sacarlos del currentcharacter

  // intentar hacer el diseño basandose en este bentogrid
  // https://bentogrids.com/shots/cltigec6a0007tmjhbowur3gu
  // donde en el centro va la imagen y en el resto de filas o columnas los textitos

  return (
    <>
      <h1 onClick={() => navigate("/")}>Rick and Morty explorer</h1>
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
