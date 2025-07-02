/* eslint-disable react/prop-types */
function Character({ name, image }) {
    return (
        <>
            <h2>{name}</h2>
            <img src={image} alt={name} />
        </>
    );
}

export default Character;
