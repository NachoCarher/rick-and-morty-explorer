import { useCharacter } from "../contexts/CharacterContext";

/* eslint-disable react/prop-types */
function NavButton({ children, PrevNextPage, currentPage, type }) {
    const { dispatch } = useCharacter();

    function handlePage() {
        if (PrevNextPage) {
            fetch(PrevNextPage)
                .then((response) => response.json())
                .then((data) =>
                    dispatch({ type: "dataReceived", payload: data })
                )
                .catch((err) => dispatch({ type: "dataFailed", payload: err }));
        }

        if (type === "prev") currentPage.current--;
        else if (type === "next") currentPage.current++;
    }

    return (
        <button disabled={!PrevNextPage} onClick={() => handlePage()}>
            {children}
        </button>
    );
}

export default NavButton;
