/* eslint-disable react/prop-types */
function Search({ onSubmit }) {
  return (
    <>
      <form className="search-form" onSubmit={onSubmit}>
        <input type="text" placeholder="Birdperson" />
        <select name="select">
          <option value="">Choose status</option>
          <option value="Dead">Dead</option>
          <option value="Alive">Alive</option>
          <option value="Unknown">Unknown</option>
        </select>
        <input
          className="search-button"
          type="submit"
          value="Search character"
        />
      </form>
    </>
  );
}

export default Search;
