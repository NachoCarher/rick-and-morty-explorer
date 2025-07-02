import NavButton from "./NavButton";

/* eslint-disable react/prop-types */
function PageNavigation({ page, prevPage, nextPage, dispatch }) {
    return (
        <div className="pagination">
            <NavButton
                PrevNextPage={prevPage}
                dispatch={dispatch}
                currentPage={page}
                type="prev"
            >
                Prev
            </NavButton>
            <span>{page.current}</span>
            <NavButton
                PrevNextPage={nextPage}
                dispatch={dispatch}
                currentPage={page}
                type="next"
            >
                Next
            </NavButton>
        </div>
    );
}

export default PageNavigation;
