import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import "./styles.css";

import data from "./data.json";

export default function PaginationApp() {
  const [users] = useState(data.slice(0, 50));
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;

  const displayUsers = users.slice(pagesVisited, pagesVisited + usersPerPage).map((user) => (
    <div className="user">
      <h3>Firstname: {user.firstName}</h3>
      <h3>Lastname: {user.lastName}</h3>
      <h3>Email: {user.email}</h3>
    </div>
  ));

  const pageCount = Math.ceil(users.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="App">
      <div>
        <ReactPaginate
          pageCount={pageCount}
          onPageChange={changePage}
          previousLabel={"Previous"}
          nextLabel={"Next"}
          containerClassName={"paginationBtns"}
          previousLinkClassName={"previousBtns"}
          lastLinkClassName={"nextBtn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
        {displayUsers}
      </div>
    </div>
  );
}
