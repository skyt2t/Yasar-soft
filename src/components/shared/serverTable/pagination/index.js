import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";

const Pagination = ({
    pageChangeHandler,
    totalRows,
    rowsPerPage,
    currentPage,
}) => {
    // Calculating max number of pages
    const noOfPages = Math.ceil(totalRows / rowsPerPage);

    // Creating an array with length equal to no.of pages
    const pagesArr = [...new Array(noOfPages)];

    // State variable to hold the current page. This value is
    // passed to the callback provided by the parent
    // const [currentPage, setCurrentPage] = useState(1);

    // Navigation arrows enable/disable state
    const [canGoBack, setCanGoBack] = useState(false);
    const [canGoNext, setCanGoNext] = useState(true);

    // These variables give the first and last record/row number
    // with respect to the current page
    const [pageFirstRecord, setPageFirstRecord] = useState(1);
    const [pageLastRecord, setPageLastRecord] = useState(rowsPerPage);

    // Onclick handlers for the butons
    const onNextPage = () => pageChangeHandler(currentPage + 1);
    const onPrevPage = () => pageChangeHandler(currentPage - 1);
    const onPageSelect = (pageNo) => pageChangeHandler(pageNo);

    // Disable previous and next buttons in the first and last page
    // respectively
    useEffect(() => {
        if (noOfPages === currentPage) {
            setCanGoNext(false);
        } else {
            setCanGoNext(true);
        }
        if (currentPage === 1) {
            setCanGoBack(false);
        } else {
            setCanGoBack(true);
        }
    }, [noOfPages, currentPage]);

    // To set the starting index of the page
    useEffect(() => {
        const skipFactor = (currentPage - 1) * rowsPerPage;
        // Some APIs require skip for paginaiton. If needed use that instead
        // pageChangeHandler(skipFactor);
        // pageChangeHandler(currentPage)
        setPageFirstRecord(skipFactor + 1);
    }, [currentPage]);

    // To set the last index of the page
    useEffect(() => {
        const count = pageFirstRecord + rowsPerPage;
        setPageLastRecord(count > totalRows ? totalRows : count - 1);
    }, [pageFirstRecord, rowsPerPage, totalRows]);

    return (
        <>
            {noOfPages > 1 ? (
                <div className={styles.pagination}>
                    <div className={styles.pageInfo}>
                        Showing {pageFirstRecord} - {pageLastRecord} of {totalRows}
                    </div>
                    <div className={styles.pagebuttons}>
                        <button
                            className={styles.pageBtn}
                            onClick={onPrevPage}
                            disabled={!canGoBack}
                        >
                            &#8249;
                        </button>
                        <select name="pagesArr" id="pagesArr" onChange={(e) => onPageSelect(e.target.value)}>


                            {pagesArr.map((num, index) => (
                                <option
                                    id="pagesArr"
                                >
                                    {index + 1}
                                </option>
                            ))}
                        </select>
                        <button
                            className={styles.pageBtn}
                            onClick={onNextPage}
                            disabled={!canGoNext}
                        >
                            &#8250;
                        </button>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default Pagination;