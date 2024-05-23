import React, { useState } from "react";
import { createDrugs } from "../../service/drugs";
import Loading from "../loading";
import { Button, TextInput } from "flowbite-react";
import ToastNotification from "../toast/toast-notification";
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
      await createDrugs(newDrug);
      fetchData();
      setOpenModal(false);
      ToastNotification.success("Obat berhasil ditambahkan");
    } catch (error) {
      console.error("Error creating Drugs:", error.message);
      ToastNotification.error("Obat gagal ditambahkan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="name" className="label">
          Nama Obat
        </label>
        <TextInput
          type="text"
          name="name"
          id="name"
          className="w-full input input-bordered"
          value={newDrug.name}
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-end pt-2 space-x-4">
        <Button
          color="gray"
          className="w-16 border-2"
          onClick={() => setOpenModal(false)}
        >
          Tidak
        </Button>
        <Button onClick={handleCreate} color="blue" disabled={isLoading}>
          {isLoading ? <Loading size="sm" /> : "Ya"}
        </Button>
      </div>
    </div>
  );
};

export default FormCreateDrugs;
