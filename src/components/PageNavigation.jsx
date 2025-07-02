import { useCharacter } from "../contexts/CharacterContext";
import NavButton from "./NavButton";

/* eslint-disable react/prop-types */
function PageNavigation({ page }) {
    const { prevPage, nextPage } = useCharacter();

    return (
        <div className="pagination">
            <NavButton PrevNextPage={prevPage} currentPage={page} type="prev">
                Prev
            </NavButton>
            <span>{page.current}</span>
            <NavButton PrevNextPage={nextPage} currentPage={page} type="next">
                Next
            </NavButton>
        </div>
    );
}

export default PageNavigation;
