/* eslint-disable react/prop-types */
function Search({ onSubmit, onSelect }) {
  return (
    <>
      <form className="search-form" onSubmit={onSubmit}>
        <input type="text" placeholder="Birdperson" />
        <input
          className="search-button"
          type="submit"
          value="Search character"
        />
      </form>

      <select name="select" onChange={onSelect}>
        <option value="Dead">Dead</option>
        <option value="Alive">Alive</option>
        <option value="Unknown">Unknown</option>
      </select>
    </>
  );
}

export default Search;
