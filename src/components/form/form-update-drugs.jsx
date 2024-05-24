import React, { useEffect, useState } from "react";
import { updateDrugs, getDrugsById } from "../../service/drugs";
import Loading from "../loading";
import ToastNotification from "../toast/toast-notification";
import { Button, TextInput, Spinner } from "flowbite-react";

const FormUpdateDrugs = ({ fetchData, setOpenModal, id }) => {
  const [newDrug, setNewDrug] = useState({
    name: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchDrugById(id);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDrug((prevDrug) => ({
      ...prevDrug,
      [name]: value,
      updatedAt: new Date().toISOString(),
    }));
  };

  const fetchDrugById = async (id) => {
    try {
      const drug = await getDrugsById(id);
      setNewDrug(drug);
    } catch (error) {
      console.error("Error fetching Drugs:", error.message);
    }
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      await updateDrugs(id, newDrug);
      fetchData();
      setIsLoading(false);
      setOpenModal(false);
      ToastNotification.success("Obat berhasil diubah");
    } catch (error) {
      console.error("Error updating Drugs:", error.message);
      ToastNotification.error("Obat gagal diubah");
      setIsLoading(false);
    }
  };

  return (
    <>
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
        <Button color="gray" onClick={() => setOpenModal(false)}>
          Tidak
        </Button>
        <Button color={"blue"} onClick={handleUpdate} disabled={isLoading}>
          {isLoading ? <Spinner size={"sm"} /> : "Ya"}
        </Button>
      </div>
    </>
  );
};

export default FormUpdateDrugs;
