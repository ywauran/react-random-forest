import React, { useEffect, useState } from "react";
import { updateDrugs, getDrugsById } from "../../service/drugs"; // Updated import
import Loading from "../loading";

const FormUpdateDrugs = ({ fetchData, setOpenModal, id }) => {
  // Updated component name
  const [newDrug, setNewDrug] = useState({
    // Updated state variable name
    name: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchDrugById(id); // Updated function call
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDrug((prevDrug) => ({
      // Updated state variable name
      ...prevDrug,
      [name]: value,
      updatedAt: new Date().toISOString(),
    }));
  };

  const fetchDrugById = async (id) => {
    try {
      const drug = await getDrugsById(id); // Updated function call
      setNewDrug(drug); // Updated state variable name
    } catch (error) {
      console.error("Error fetching Drugs:", error.message); // Updated error message
    }
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      await updateDrugs(id, newDrug); // Updated function call
      fetchData();
      setIsLoading(false);
      setOpenModal(false);
    } catch (error) {
      console.error("Error updating Drugs:", error.message); // Updated error message
      setIsLoading(false);
    }
  };

  return (
    <>
      <div>
        <label htmlFor="name" className="label">
          Nama Obat
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="w-full input input-bordered"
          value={newDrug.name} // Updated state variable name
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-end pt-2 space-x-4">
        <button onClick={() => setOpenModal(false)} className="w-16 btn">
          Tidak
        </button>
        <button
          onClick={handleUpdate}
          className="w-16 btn btn-primary"
          disabled={isLoading}
        >
          {isLoading ? <Loading size="sm" /> : "Ya"}
        </button>
      </div>
    </>
  );
};

export default FormUpdateDrugs; // Updated export
