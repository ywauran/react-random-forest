import React, { useEffect, useState } from "react";
import { updateSale, getSaleById } from "../../service/sales";
import ToastNotification from "../toast/toast-notification";
import { Button, Select, Spinner, TextInput } from "flowbite-react";

const FormUpdateSale = ({ fetchData, setOpenModal, id }) => {
  const [newSale, setNewSale] = useState({
    salesAmount: 0,
    isDiscount: false,
    stock: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchSaleById = async (id) => {
    try {
      const sale = await getSaleById(id);
      setNewSale(sale);
      ToastNotification.success("Penjualan diperbarui");
    } catch (error) {
      ToastNotification.error("Penjualan gagal diperbarui");
      console.error("Error fetching Sale:", error.message);
    }
  };

  useEffect(() => {
    if (id) {
      fetchSaleById(id);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setNewSale((prevSale) => ({
      ...prevSale,
      [name]: name === "isDiscount" ? newValue === "true" : newValue,
      updatedAt: new Date().toISOString(),
    }));
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      await updateSale(id, newSale);
      fetchData();
      setIsLoading(false);
      setOpenModal(false);
    } catch (error) {
      console.error("Error updating Sale:", error.message);
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
          className="w-full input input-bordered"
          value={newSale.isDiscount.toString()}
          onChange={handleChange}
        >
          <option value="false">Tidak</option>
          <option value="true">Ya</option>
        </Select>
      </div>
      <div>
        <label htmlFor="stock" className="label">
          Stock
        </label>
        <TextInput
          type="number"
          name="stock"
          id="stock"
          className="w-full input input-bordered"
          value={newSale.stock}
          onChange={handleChange}
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
        />
      </div>
      <div className="flex justify-end pt-2 space-x-4">
        <button onClick={() => setOpenModal(false)} color="gray">
          Tidak
        </button>
        <Button color="blue" onClick={handleUpdate} disabled={isLoading}>
          {isLoading ? <Spinner size={"sm"} /> : "Ya"}
        </Button>
      </div>
    </>
  );
};

export default FormUpdateSale;
