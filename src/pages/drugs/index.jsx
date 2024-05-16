import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../../layout";
import Modal from "../../components/modal/modal";
import FormCreateDrugs from "../../components/form/form-create-drugs";
import FormUpdateDrugs from "../../components/form/form-update-drugs";
import FormDeleteDrugs from "../../components/form/form-delete-drugs";
import { getAllDrugs } from "../../service/drugs"; // Updated import

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
    fetchDrugs(); // Updated function call
  }, [currentPage]); // Trigger fetchDrugs on page change

  const fetchDrugs = async () => {
    setIsLoading(true);
    try {
      const response = await getAllDrugs(); // Updated function call
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

      <h1 className="mb-8 text-3xl font-bold">Data Obat</h1>
      <>
        <div className="flex items-center justify-end mb-8">
          <button
            onClick={() => setIsModalCreate(true)}
            className="btn btn-primary"
          >
            Tambah
          </button>
        </div>
        <div className="overflow-x-auto bg-white shadow">
          <table className="table text-center">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="3">Loading...</td>
                </tr>
              ) : (
                currentData.map((drugItem, index) => (
                  <tr key={drugItem.id}>
                    <th>{startIndex + index + 1}</th>

                    <td className="font-semibold">{drugItem.name}</td>
                    <td className="flex items-center justify-center space-x-4">
                      <button
                        className="btn btn-error"
                        onClick={() => {
                          setId(drugItem.id);
                          setIsModalDelete(true);
                        }}
                      >
                        Hapus
                      </button>
                      <button
                        onClick={() => {
                          setId(drugItem.id);
                          setIsModalUpdate(true);
                        }}
                        className="btn btn-primary"
                      >
                        Edit
                      </button>
                      <Link to={`/drugs/${drugItem.id}`} className="btn">
                        Detail
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-4 space-x-4">
          <button
            className="btn"
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
          </button>
          <button
            className="btn"
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
          </button>
        </div>
      </>
    </Layout>
  );
};

export default Drugs;
