import React, { useState } from "react";
import { createDrugs } from "../../service/drugs"; // Assuming you have a createDrugs service function
import Loading from "../loading";

const FormCreateDrugs = ({ fetchData, setOpenModal }) => {
  const [newDrug, setNewDrug] = useState({
    name: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  const [isLoading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDrug((prevDrug) => ({
      ...prevDrug,
      [name]: value,
      updatedAt: new Date().toISOString(),
    }));
  };

  const handleCreate = async () => {
    setLoading(true);
    try {
      const createdDrug = await createDrugs(newDrug);
      fetchData();
      setOpenModal(false);
      setLoading(false);
    } catch (error) {
      console.error("Error creating Drugs:", error.message);
      setLoading(false);
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
          value={newDrug.name}
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-end pt-2 space-x-4">
        <button onClick={() => setOpenModal(false)} className="w-16 btn">
          Tidak
        </button>
        <button
          onClick={handleCreate}
          className="w-16 btn btn-primary"
          disabled={isLoading}
        >
          {isLoading ? <Loading size="sm" /> : "Ya"}
        </button>
      </div>
    </>
  );
};

export default FormCreateDrugs;
