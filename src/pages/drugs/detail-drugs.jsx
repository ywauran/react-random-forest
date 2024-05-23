import Layout from "../../layout";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getSalesByDrugsId } from "../../service/sales";
import { getDrugsById } from "../../service/drugs";
import Modal from "../../components/modal/modal";
import FormCreateSales from "../../components/form/form-create-sales";
import FormUpdateSales from "../../components/form/form-update-sales";
import FormDeleteSales from "../../components/form/form-delete-sales";
import { Button, Table } from "flowbite-react";

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
        <Button onClick={() => setIsModalCreate(true)} color={"blue"}>
          Tambah
        </Button>
        {sales.length > 3 && (
          <Button color={"white"} className="border-2 btn btn-outline">
            <Link to={`/drugs/calculate/${id}`} className="btn">
              Lihat Perhitungan
            </Link>
          </Button>
        )}
      </div>
      <div className="overflow-x-auto shadow">
        <Table hoverable={true}>
          <Table.Head>
            <Table.HeadCell>No</Table.HeadCell>
            <Table.HeadCell>Diskon</Table.HeadCell>
            <Table.HeadCell>Penjualan</Table.HeadCell>
            <Table.HeadCell>Aksi</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {currentSales.length > 0 ? (
              <>
                {currentSales.map((sale, index) => (
                  <Table.Row
                    key={sale.id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {startIndex + index + 1}
                    </Table.Cell>
                    <Table.Cell>{sale.isDiscount ? "Ya" : "Tidak"}</Table.Cell>
                    <Table.Cell>{sale.salesAmount}</Table.Cell>
                    <Table.Cell className="flex items-center justify-center space-x-4">
                      <Button
                        color={"gray"}
                        className="btn btn-outline"
                        onClick={() => {
                          setIdSales(sale.id);
                          setIsModalUpdate(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        color={"red"}
                        className="btn btn-error"
                        onClick={() => {
                          setIdSales(sale.id);
                          setIsModalDelete(true);
                        }}
                      >
                        Hapus
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}{" "}
              </>
            ) : (
              <Table.Row>
                <Table.Cell colSpan={4} className="text-center">
                  Tidak ada penjualan
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
      <div className="flex justify-end mt-4 space-x-4">
        <Button
          color="blue"
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
        </Button>
        <Button
          color={"blue"}
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
        </Button>
      </div>
    </Layout>
  );
};

export default DetailDrugs;
