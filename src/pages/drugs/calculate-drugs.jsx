import React, { useState, useEffect } from "react";
import Layout from "../../layout";
import { useParams } from "react-router-dom";
import { getDrugsById } from "../../service/drugs";
import { getSalesByDrugsId } from "../../service/sales";

const CalculateDrugs = () => {
  const { id } = useParams();
  const [drug, setDrug] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetcDrug = await getDrugsById(id);
        setDrug(fetcDrug);
        const fetchedSales = await getSalesByDrugsId(id);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Tambahkan penanganan kesalahan di sini jika diperlukan
      }
    };

    fetchData();
  }, [id]);

  return (
    <Layout>
      <h1 className="mb-8 text-3xl font-bold">Perhitungan {drug?.name}</h1>
    </Layout>
  );
};

export default CalculateDrugs;
