import React, { useState } from "react";
import { createSale } from "../../service/sales";
import Loading from "../loading";
import { Button, TextInput, Select } from "flowbite-react";
import ToastNotification from "../toast/toast-notification";

const FormCreateSales = ({ fetchData, setOpenModal, id }) => {
  const [newSale, setNewSale] = useState({
    salesAmount: 0,
    stock: 0,
    isDiscount: false,
    updatedAt: new Date().toISOString(),
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSale((prevSale) => ({
      ...prevSale,
      [name]: name === "isDiscount" ? value === "true" : value,
      updatedAt: new Date().toISOString(),
    }));
  };

  const handleCreate = async () => {
    setIsLoading(true);
    try {
      await createSale(newSale, id);
      fetchData();
      setIsLoading(false);
      setOpenModal(false);
      ToastNotification.success("Penjualan berhasil ditambahkan");
    } catch (error) {
      console.error("Error creating Sale:", error.message);
      ToastNotification.error("Penjualan gagal ditambahkan");
      setIsLoading(false);
    }
  };

  return (
    <>
      <div>
        <label htmlFor="isDiscount" className="label">
          Diskon
        </label>
        <Select
          name="isDiscount"
          id="isDiscount"
          value={newSale.isDiscount.toString()}
          onChange={handleChange}
        >
          <option value="false">Tidak</option>
          <option value="true">Ya</option>
        </Select>
      </div>

      <div>
        <label htmlFor="stock" className="label">
          Stok Tersedia
        </label>

        <TextInput
          type="number"
          name="stock"
          id="stock"
          className="w-full input input-bordered"
          value={newSale.stock}
          onChange={handleChange}
          min={0}
        />
      </div>
      <div>
        <label htmlFor="salesAmount" className="label">
          Penjualan
        </label>

        <TextInput
          type="number"
          name="salesAmount"
          id="salesAmount"
          className="w-full input input-bordered"
          value={newSale.salesAmount}
          onChange={handleChange}
          min={0}
        />
      </div>

      <div className="flex justify-end pt-2 space-x-4">
        <Button color={"gray"} onClick={() => setOpenModal(false)}>
          Tidak
        </Button>
        <Button color={"blue"} onClick={handleCreate} disabled={isLoading}>
          {isLoading ? <Loading size="sm" /> : "Ya"}
        </Button>
      </div>
    </>
  );
};

export default FormCreateSales;
