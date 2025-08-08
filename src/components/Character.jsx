/* eslint-disable react/prop-types */

import { useNavigate } from "react-router";

function Character({ name, image, id }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/characters/${id}`);
  }

  return (
    <>
      <h2>{name}</h2>
      <img src={image} alt={name} onClick={handleClick} />
    </>
  );
}

export default Character;
