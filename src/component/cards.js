import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import Card from "./card";

const Cards = ({ items }) => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const pageCount = Math.ceil(items.length / itemsPerPage);
  const currentItems = items.slice(itemOffset, endOffset);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className="flex items-center justify-end mb-5">
        <div className="flex items-center  gap-4 font-bold border-2 border-slate-300 rounded px-3 py-2">
          <h1>Tampilkan:</h1>
          <select
            className="outline-none bg-transparent cursor-pointer"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(e.target.value)}
            name="show"
          >
            {[5, 10, 25, 50, 100].map((numb) => (
              <option value={numb} key={numb}>
                {numb}
              </option>
            ))}
          </select>
        </div>
      </div>
      {currentItems.length < 1 ? (
        <h1 className="text-center italic text-sm text-slate-500">
          Data Berkas Laporan Produksi Harian Operator Kosong, Silahkan Coba
          Lagi..
        </h1>
      ) : (
        <>
          {currentItems.map((item, index) => (
            <Card key={index} item={item} />
          ))}
        </>
      )}
      <ReactPaginate
        breakLabel="..."
        nextLabel={<FaArrowRight />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel={<FaArrowLeft />}
        renderOnZeroPageCount={null}
        containerClassName="flex items-center justify-center p-4 rounded gap-5"
        activeClassName="sm:border sm:border-slate-400 rounded text-blue-700 sm:bg-blue-100 bg-transparent"
        pageClassName="text-lg w-10 py-2 font-bold text-center"
        previousClassName="text-2xl p-3 border-slate-400 text-slate-700"
        nextClassName="text-2xl p-3 border-slate-400 text-slate-700"
      />
    </>
  );
};

export default Cards;
