/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const PagnitionUl = styled.ul`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  margin-top: 0;
  margin-bottom: 24px;
  a.page-link {
    text-decoration: none;
    box-sizing: border-box;
    margin: 0px 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 14px;
    border: none;
    outline: none;
    min-width: 28px;
    height: 28px;
    padding: 0px;
    background-color: transparent;
    border-radius: 4px;
    color: #d9d9d9;
    font-weight: 400;
    :hover {
      background-color: #eaecef;
      color: #14151a;
    }
  }
  a.page-link.active {
    box-sizing: border-box;
    margin: 0px 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 14px;
    border: none;
    outline: none;
    min-width: 28px;
    height: 28px;
    padding: 0px;
    background-color: #eaecef;
    border-radius: 4px;
    color: #1e2329;
    font-weight: 500;
    :disabled {
      cursor: default;
    }
  }
`;

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";
const range = (from, to, step = 1) => {
  let i = from;
  const rangeArray = [];

  while (i <= to) {
    rangeArray.push(i);
    i += step;
  }

  return rangeArray;
};

const Pagination = (props) => {
  const {
    totalRecords,
    pageLimit,
    pageNeighbours,
    onPageChanged,
    currentPage,
  } = props;

  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    setTotalPages(Math.ceil(totalRecords / pageLimit));
  }, [totalRecords]);

  const fetchPageNumbers = () => {
    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

      let pages = range(startPage, endPage);

      const hasLeftSpill = startPage > 2;
      const hasRightSpill = totalPages - endPage > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }
        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }
      return [1, ...pages, totalPages];
    }
    return range(1, totalPages);
  };

  const pages = fetchPageNumbers() || [];
  return (
    <>
      <PagnitionUl>
        {pages.map((page, index) => {
          if (page === LEFT_PAGE)
            return (
              <li key={index} className="page-item">
                <a
                  href="/"
                  className="page-link"
                  aria-label="Previous"
                  onClick={(e) => onPageChanged(e, currentPage - 2)}
                >
                  <span aria-hidden="true">&laquo;</span>
                  <span className="sr-only">Previous</span>
                </a>
              </li>
            );

          if (page === RIGHT_PAGE)
            return (
              <li key={index} className="page-item">
                <a
                  className="page-link"
                  href="/"
                  aria-label="Next"
                  onClick={(e) => onPageChanged(e, currentPage + 2)}
                >
                  <span aria-hidden="true">&raquo;</span>
                  <span className="sr-only">Next</span>
                </a>
              </li>
            );

          return (
            <li key={index} className="page-item">
              <a
                className={`page-link ${
                  currentPage === page ? "active disabled" : ""
                }`}
                href="/"
                onClick={(e) => onPageChanged(e, page)}
              >
                {page}
              </a>
            </li>
          );
        })}
      </PagnitionUl>
    </>
  );
};

Pagination.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  pageLimit: PropTypes.number.isRequired,
  pageNeighbours: PropTypes.number.isRequired,
  onPageChanged: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
