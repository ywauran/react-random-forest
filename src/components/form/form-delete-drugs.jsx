import React from "react";
import Loading from "../loading";
import { useState } from "react";
import { deleteDrugs } from "../../service/drugs";
import { Button } from "flowbite-react";
import ToastNotification from "../toast/toast-notification";

const FormDeleteDrugs = ({ setOpenModal, id, fetchData }) => {
  const [isLoading, setLoading] = useState(false);
  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteDrugs(id);
      fetchData();
      setOpenModal(false);
      ToastNotification.success("Obat berhasil dihapus");
    } catch (error) {
      console.error("Error deleting Drugs:", error.message);
      ToastNotification.error("Obat gagal dihapus");
      setLoading(false);
    }
  };
  return (
    <>
      <h4 className="text-xl text-center text-semibold">
        Anda yakin ingin menghapus data ini?
      </h4>
      <div className="flex justify-end pt-2 mt-4 space-x-4">
        <Button color={"gray"} onClick={() => setOpenModal(false)}>
          Tidak
        </Button>
        <Button color="blue" onClick={handleDelete} disabled={isLoading}>
          {isLoading ? <Loading size="sm" /> : "Ya"}
        </Button>
      </div>
    </>
  );
};

export default FormDeleteDrugs;
