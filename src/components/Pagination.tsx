// DynamicPage.tsx
import React, { useState, useEffect } from "react";
import "../pagination.css"; // Import CSS file for styling
import ReactPaginate from "react-paginate";

interface Props {
  itemsPerPage: number;
  totalCount: number;
  getDataByPage: (page: number) => void;
}

const DynamicPage = (props: Props) => {
  let itemsPerPage = props.itemsPerPage;
  const page = "0";
  const [currentPage, setCurrentPage] = useState<number>(parseInt(page) || 0);
  const pageCount = Math.ceil(props.totalCount / itemsPerPage);
  //   console.log(currentPage);

  const handlePageClick = (data: any) => {
    console.log(data.selected);
    setCurrentPage(data.selected);
    props.getDataByPage(data.selected);
  };

  useEffect(() => {
    // Fetch data for the current page
  }, [currentPage]); // Add dependencies as needed

  return (
    <div className="mt-3">
      {/* Render your data here */}
      <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={handlePageClick}
        forcePage={currentPage}
        containerClassName={"pagination justify-content-center"} // Bootstrap class
        activeClassName={"active"}
        previousLabel={"Previous"} // Bootstrap's previous button label
        nextLabel={"Next"} // Bootstrap's next button label
        breakLabel={"..."} // Bootstrap's break label
        pageClassName={"page-item"} // Bootstrap class
        pageLinkClassName={"page-link"} // Bootstrap class
        previousClassName={"page-item"} // Bootstrap class
        nextClassName={"page-item"} // Bootstrap class
        previousLinkClassName={"page-link"} // Bootstrap class
        nextLinkClassName={"page-link"} // Bootstrap class
      />
    </div>
  );
};

export default DynamicPage;
