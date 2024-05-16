import Layout from "../../layout";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getSalesByDrugsId } from "../../service/sales";
import { getDrugsById } from "../../service/drugs";
import Modal from "../../components/modal/modal";
import FormCreateSales from "../../components/form/form-create-sales";
import FormUpdateSales from "../../components/form/form-update-sales";
import FormDeleteSales from "../../components/form/form-delete-sales";

const DetailDrugs = () => {
  const { id } = useParams();
  const [isModalCreate, setIsModalCreate] = useState(false);
  const [isModalUpdate, setIsModalUpdate] = useState(false);
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [sales, setSales] = useState([]);
  const [idSales, setIdSales] = useState(null);
  const [alkes, setAlkes] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const fetchAlkes = async () => {
    try {
      const alkes = await getDrugsById(id);
      setAlkes(alkes);
    } catch (error) {
      console.error("Error fetching alkes:", error);
    }
  };

  const fetchSalesByAlkesId = async () => {
    try {
      const sales = await getSalesByDrugsId(id);
      console.log(sales);
      setSales(sales);
    } catch (error) {
      console.error("Error fetching sales:", error);
    }
  };

  useEffect(() => {
    fetchSalesByAlkesId();
    fetchAlkes();
  }, [id]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, sales.length);
  const currentSales = sales.slice(startIndex, endIndex);
  const totalPages = Math.ceil(sales.length / pageSize);

  return (
    <Layout>
      {isModalCreate && (
        <Modal
          isOpen={isModalCreate}
          setOpenModal={setIsModalCreate}
          title="Tambah Penjualan"
        >
          <FormCreateSales
            fetchData={fetchSalesByAlkesId}
            id={id}
            setOpenModal={setIsModalCreate}
          />
        </Modal>
      )}

      {isModalUpdate && (
        <Modal
          isOpen={isModalUpdate}
          setOpenModal={setIsModalUpdate}
          title="Edit Penjualan"
        >
          <FormUpdateSales
            fetchData={fetchSalesByAlkesId}
            id={idSales}
            setOpenModal={setIsModalUpdate}
          />
        </Modal>
      )}

      {isModalDelete && (
        <Modal
          isOpen={isModalDelete}
          setOpenModal={setIsModalDelete}
          title="Hapus Penjualan"
        >
          <FormDeleteSales
            fetchData={fetchSalesByAlkesId}
            id={idSales}
            setOpenModal={setIsModalDelete}
          />
        </Modal>
      )}

      <h1 className="mb-8 text-3xl font-bold">{alkes?.name}</h1>
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => setIsModalCreate(true)}
          className="btn btn-primary"
        >
          Tambah
        </button>
        {sales.length > 3 && (
          <Link to={`/drugs/calculate/${id}`} className="btn">
            Lihat Perhitungan
          </Link>
        )}
      </div>
      <div className="overflow-x-auto shadow">
        <table className="table text-center">
          <thead>
            <tr>
              <th>No</th>
              <th>Diskon</th>
              <th>Penjualan</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentSales.map((sale, index) => (
              <tr key={sale.id}>
                <th>{startIndex + index + 1}</th>
                <td>{sale.isDiscount ? "Ya" : "Tidak"}</td>
                <td>{sale.salesAmount}</td>
                <td className="flex items-center justify-center space-x-4">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setIdSales(sale.id);
                      setIsModalUpdate(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-error"
                    onClick={() => {
                      setIdSales(sale.id);
                      setIsModalDelete(true);
                    }}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-4 space-x-4">
        <button
          className="btn"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <button
          className="btn"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </Layout>
  );
};

export default DetailDrugs;
