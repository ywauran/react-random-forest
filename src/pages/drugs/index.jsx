import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../../layout";
import Modal from "../../components/modal/modal";
import FormCreateDrugs from "../../components/form/form-create-drugs";
import FormUpdateDrugs from "../../components/form/form-update-drugs";
import FormDeleteDrugs from "../../components/form/form-delete-drugs";
import { getAllDrugs, deleteDrugs, updateDrugs } from "../../service/drugs";
import { Table, Button, Spinner } from "flowbite-react";

const PAGE_SIZE = 5;

const Drugs = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalCreate, setIsModalCreate] = useState(false);
  const [isModalUpdate, setIsModalUpdate] = useState(false);
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [id, setId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchDrugs();
  }, [currentPage]);

  const fetchDrugs = async () => {
    setIsLoading(true);
    try {
      const response = await getAllDrugs();
      setData(response.drugs);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching Drugs:", error);
      setIsLoading(false);
    }
  };

  const totalPages = Math.ceil(data.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = Math.min(startIndex + PAGE_SIZE, data.length);
  const currentData = data.slice(startIndex, endIndex);
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <Layout>
      {isModalCreate && (
        <Modal
          title="Tambah Obat"
          setOpenModal={setIsModalCreate}
          children={
            <FormCreateDrugs
              setOpenModal={setIsModalCreate}
              fetchData={fetchDrugs}
            />
          }
        />
      )}

      {isModalUpdate && (
        <Modal
          title="Edit Obat"
          setOpenModal={setIsModalUpdate}
          children={
            <FormUpdateDrugs
              id={id}
              setOpenModal={setIsModalUpdate}
              data={data}
              fetchData={fetchDrugs}
            />
          }
        />
      )}

      {isModalDelete && (
        <Modal
          title="Hapus Obat"
          setOpenModal={setIsModalDelete}
          children={
            <FormDeleteDrugs
              setOpenModal={setIsModalDelete}
              fetchData={fetchDrugs}
              id={id}
            />
          }
        />
      )}
      <h1 className="mb-8 font-bold " style={{ fontSize: "30px" }}>
        Data Obat
      </h1>
      <>
        <div className="flex items-center justify-end mb-8">
          <Button onClick={() => setIsModalCreate(true)} color={"blue"}>
            Tambah
          </Button>
        </div>
        <div className="p-10 overflow-x-auto bg-white shadow">
          <Table>
            <Table.Head>
              <Table.HeadCell>No</Table.HeadCell>
              <Table.HeadCell>Nama</Table.HeadCell>
              <Table.HeadCell>Aksi</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {isLoading ? (
                <tr>
                  <td colSpan="3" className="mt-4 text-center">
                    <Spinner color={"gray"} size={"lg"} />
                  </td>
                </tr>
              ) : (
                currentData.map((drugItem, index) => (
                  <Table.Row
                    key={drugItem.id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {startIndex + index + 1}
                    </Table.Cell>
                    <Table.Cell>{drugItem.name}</Table.Cell>
                    <Table.Cell className="flex items-center justify-center space-x-4">
                      <Button color="gray">
                        <Link
                          to={`/drugs/${drugItem.id}`}
                          className="hover:underline"
                        >
                          Detail
                        </Link>
                      </Button>
                      <Button
                        color="blue"
                        className="hover:underline"
                        onClick={() => {
                          setIsModalUpdate(true);
                          setId(drugItem.id);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        color="failure"
                        className="hover:underline"
                        onClick={() => {
                          setIsModalDelete(true);
                          setId(drugItem.id);
                        }}
                      >
                        Hapus
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))
              )}
            </Table.Body>
          </Table>
        </div>
        <div className="flex justify-end mt-4 space-x-4">
          <Button
            size={"xs"}
            color="blue"
            onClick={handlePrevPage}
            disabled={!canGoPrev}
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
            size={"xs"}
            color={"blue"}
            onClick={handleNextPage}
            disabled={!canGoNext}
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
      </>
    </Layout>
  );
};

export default Drugs;
