import React from "react";
import Loading from "../loading";
import { useState } from "react";
import { deleteSale } from "../../service/sales";
import { Button } from "flowbite-react";
import ToastNotification from "../toast/toast-notification";

const FormDeleteSales = ({ setOpenModal, id, fetchData }) => {
  const [isLoading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteSale(id);
      fetchData();
      setOpenModal(false);
      ToastNotification.success("Penjualan berhasil dihapus");
    } catch (error) {
      console.error("Error deleting Sale:", error.message);
      setLoading(false);
      ToastNotification.error("Penjualan gagal dihapus");
    }
  };
  return (
    <>
      <h4 className="text-lg text-center text-semibold">
        Anda yakin ingin menghapus data ini?
      </h4>
      <div className="flex justify-end pt-2 mt-4 space-x-4">
        <Button color="gray" onClick={() => setOpenModal(false)}>
          Tidak
        </Button>
        <Button onClick={handleDelete} color="blue" disabled={isLoading}>
          {isLoading ? <Loading size="sm" /> : "Ya"}
        </Button>
      </div>
    </>
  );
};

export default FormDeleteSales;
