import React from "react";
import Loading from "../loading";
import { useState } from "react";
import { deleteDrugs } from "../../service/drugs"; // Updated import

const FormDeleteDrugs = ({ setOpenModal, id, fetchData }) => {
  // Updated component name
  const [isLoading, setLoading] = useState(false);
  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteDrugs(id); // Updated function call
      fetchData();
      setOpenModal(false);
    } catch (error) {
      console.error("Error deleting Drugs:", error.message); // Updated error message
      setLoading(false);
    }
  };
  return (
    <div>
      <h4 className="text-lg text-center text-semibold">
        Anda yakin ingin menghapus data ini?
      </h4>
      <div className="flex justify-end pt-2 mt-4 space-x-4">
        <button onClick={() => setOpenModal(false)} className="w-16 btn">
          Tidak
        </button>
        <button
          onClick={handleDelete}
          className="w-16 btn btn-primary"
          disabled={isLoading}
        >
          {isLoading ? <Loading size="sm" /> : "Ya"}
        </button>
      </div>
    </div>
  );
};

export default FormDeleteDrugs; // Updated export
