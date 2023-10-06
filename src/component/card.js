import { useState } from "react";
import {
  FaFileAlt,
  FaFolderOpen,
  FaPrint,
  FaTimesCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Berkas from "./berkas";

const Card = ({ item }) => {
  const [showBerkas, setShowBerkas] = useState(false);

  return (
    <div className="mb-5 bg-white/50 p-4 rounded-lg shadow-md">
      <div className="flex sm:flex-nowrap flex-wrap items-center gap-4 ">
        <FaFileAlt className="text-3xl sm:block hidden" />
        <div className="sm:w-2/5 w-full">
          <small>Nama Barang : </small>
          <h1 className="font-bold tracking-wider xl:text-base lg:text-sm text-sm">
            {item.nama_barang}
          </h1>
        </div>
        <div className="sm:w-fit w-full">
          <small>Kode Barang : </small>
          <h1 className="font-bold tracking-wider xl:text-base lg:text-sm text-sm">
            {item.kode_barang}
          </h1>
        </div>
        <div className="flex items-center sm:justify-end justify-center gap-2 flex-grow">
          <button
            onClick={() => setShowBerkas(!showBerkas)}
            className="sm:flex items-center justify-center bg-blue-200 text-blue-700 px-5 py-2 rounded-full gap-2 transition-all duration-200 focus:bg-blue-300 active:ring active:ring-blue-100 hidden"
          >
            {showBerkas ? (
              <>
                <FaTimesCircle />
                <h1>Tutup</h1>
              </>
            ) : (
              <>
                <FaFolderOpen />
                <h2>Buka</h2>
              </>
            )}
          </button>
          <Link target="_blank" to={`/berkas?kode_barang=${item.kode_barang}`}>
            <button className="flex items-center justify-center bg-slate-200 text-slate-700 px-5 py-2 rounded-full gap-2 transition-all duration-200 focus:bg-slate-300 active:ring active:ring-slate-100 ">
              <FaPrint />
              <h1>Cetak</h1>
            </button>
          </Link>
        </div>
      </div>
      <div className={` transition-all duration-200 ${showBerkas && "my-10"}`}>
        {showBerkas && (
          <div className="flex justify-center">
            <Berkas item={item} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
