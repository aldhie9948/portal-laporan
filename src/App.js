import Cards from "./component/cards";
import Spinner from "./component/spinner";
import { findStocks, getStocks } from "./services/barang";
import { useEffect, useState } from "react";
import { FaFileAlt, FaSearch } from "react-icons/fa";
import { registerServiceWorker } from "./util/service-worker";

const App = () => {
  const [barang, setBarang] = useState([]);
  const [limit, setLimit] = useState(100);
  const [keyword, setKeyword] = useState("");
  const [showSpinnerBtn, setShowSpinnerBtn] = useState(false);

  const findBarangHandler = async () => {
    try {
      setShowSpinnerBtn(true);
      const results = await findStocks({ keyword, limit });
      if (results.status === "OK") {
        setBarang(results.data);
      }
      setTimeout(() => {
        setShowSpinnerBtn(false);
      }, 1000);
    } catch (error) {
      console.log("findBarangHandler: ", error.message);
      setShowSpinnerBtn(false);
    }
  };

  useEffect(() => {
    getStocks({ limit }).then(({ status, data }) => {
      if (status === "OK") setBarang(data);
    });
    registerServiceWorker();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (keyword === "") {
      getStocks({ limit }).then(({ status, data }) => {
        if (status === "OK") setBarang(data);
      });
    }
    // eslint-disable-next-line
  }, [keyword]);
  return (
    <>
      <main className="px-4">
        <header className="flex justify-center items-center gap-4 mb-5">
          <FaFileAlt className="text-5xl sm:text-7xl text-blue-700" />
          <div>
            <h1 className="text-slate-500 font-light sm:text-xl text-base">
              PORTAL BERKAS
            </h1>
            <h1 className="font-bold text-lg sm:text-5xl text-red-500 drop-shadow">
              Laporan Produksi Harian Operator
            </h1>
          </div>
        </header>
        <div className="flex justify-center items-center gap-4 xl:w-1/2 lg:w-2/3 w-full bg-white sm:py-3 py-2 sm:px-5 px-3 rounded-lg mx-auto shadow-lg transition-all duration-200 mb-10 mt-16 focus-within:shadow-none">
          <input
            type="search"
            id="search"
            name="search"
            placeholder="Cari kode atau nama barang..."
            className="outline-none bg-transparent w-full sm:ms-0 ms-3"
            autoComplete="off"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <select
            className="outline-none cursor-pointer sm:block hidden"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
          >
            {[5, 10, 25, 50, 100, 250, 500].map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
          <button
            disabled={showSpinnerBtn}
            onClick={findBarangHandler}
            className="bg-blue-200 text-blue-700 font-bold enabled:hover:bg-blue-300 enabled:active:ring enabled:active:ring-blue-300 enabled:active:bg-blue-400 rounded-lg px-8 py-2 disabled:cursor-not-allowed"
          >
            {showSpinnerBtn ? (
              <div className="flex items-center justify-center gap-2">
                <Spinner className="sm:!w-6 sm:!h-6 !w-4 !h-4" />
                <h1 className="sm:block hidden">Loading..</h1>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <FaSearch className="" />
                <h1 className="sm:block hidden">Cari</h1>
              </div>
            )}
          </button>
        </div>
        <div>
          {showSpinnerBtn ? (
            <div className="flex justify-center mt-40">
              <Spinner />
            </div>
          ) : (
            <>
              <div>
                <Cards items={barang} itemsPerPage={10} />
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default App;
