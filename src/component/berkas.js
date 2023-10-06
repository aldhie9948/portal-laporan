import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { findStocks } from "../services/barang";
import { useQRCode } from "next-qrcode";

const Berkas = ({ item, uuid }) => {
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const [barang, setBarang] = useState(null);
  const { SVG } = useQRCode();

  useEffect(() => {
    if (item) {
      setBarang(item);
    } else {
      findStocks({ keyword: searchParams.get("kode_barang"), limit: 1 }).then(
        (result) => {
          if (result.status === "OK" && result.data.length > 0)
            setBarang(result.data[0]);
        }
      );
      document.body.classList.add("body-berkas");
      setTimeout(() => {
        // window.print();
      }, 2000);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {barang && (
        <div className="bg-white rounded p-[0.5cm] w-[21cm] relative">
          <table className="border border-black w-full">
            <thead>
              <tr>
                <td
                  className="text-left text-[0.5rem] leading-none font-medium tracking-wider"
                  colSpan={15}
                >
                  FPSM-7-5-1-03/R0
                </td>
              </tr>
              <tr>
                <td colSpan={4} className="h-[2.5cm]"></td>
                <td colSpan={11} rowSpan={2} className="font-bold text-xl ps-2">
                  LAPORAN PRODUKSI HARIAN OPERATOR{" "}
                </td>
              </tr>
              <tr>
                <td
                  colSpan={4}
                  className="text-[0.6rem] tracking-wider text-center"
                >
                  PT. NANDYA KARYA PERKASA
                </td>
              </tr>
              <tr className="border-y text-xs border-black">
                <td colSpan={4} className="ps-2 !border-none">
                  Bagian
                </td>

                <td colSpan={11} className="ps-3 !border-none">
                  <span className="pe-2">:</span>
                </td>
              </tr>
              <tr className="border-y text-xs border-black">
                <td colSpan={4} className="ps-2 !border-none">
                  No Dies & Nama Dies / Jig
                </td>

                <td colSpan={11} className="ps-3 !border-none">
                  <span className="pe-2">:</span>
                </td>
              </tr>
              <tr className="border-y text-xs border-black">
                <td colSpan={4} className="ps-2 !border-none">
                  Proses
                </td>

                <td colSpan={11} className="ps-3 !border-none">
                  <span className="pe-2">:</span> {barang.nama_barang}
                </td>
              </tr>
              <tr className="border-y text-xs border-black">
                <td colSpan={4} className="ps-2 !border-none">
                  Circle Time{" "}
                </td>

                <td colSpan={11} className="ps-3 !border-none">
                  <span className="pe-2">:</span>
                </td>
              </tr>
            </thead>
            <tbody className="text-center text-xs">
              <tr className="">
                <td rowSpan={2} className="w-10">
                  No
                </td>
                <td rowSpan={2} className="w-14">
                  Tanggal
                </td>
                <td rowSpan={2} className="rotate-90 w-10">
                  Shift
                </td>
                <td colSpan={2}>Jam Kerja</td>
                <td rowSpan={2} className="w-16">
                  No Nama Mesin
                </td>
                <td rowSpan={2} className="w-16">
                  Operator
                </td>
                <td rowSpan={2} className="w-16">
                  Rencana Produksi
                </td>
                <td colSpan={3}>Hasil Aktual</td>
                <td rowSpan={2} className="w-12">
                  Cek Jig
                </td>
                <td colSpan={3} rowSpan={2} className="w-28">
                  Keterangan
                </td>
              </tr>
              <tr>
                <td className="w-12">Start</td>
                <td className="w-12">Finish</td>
                <td className="w-12">OK</td>
                <td className="w-12">NG</td>
                <td className="w-12">Total</td>
              </tr>
              {[...Array(22)].map((i) => (
                <tr className="h-10">
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                </tr>
              ))}
            </tbody>
          </table>
          <div className="w-[2.5cm] h-[2.5cm] absolute top-10 right-8">
            <SVG text={barang.qrcode} options={{ margin: 0 }} />
          </div>
          <img
            className="absolute w-[5rem] h-[5rem] top-9 left-[4.5rem]"
            src="./assets/images/logo.png"
            alt="logo nkp"
          />
        </div>
      )}
    </>
  );
};

export default Berkas;
