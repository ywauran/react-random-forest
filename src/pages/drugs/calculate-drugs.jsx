import React, { useState, useEffect } from "react";
import Layout from "../../layout";
import { useParams } from "react-router-dom";
import { getDrugsById } from "../../service/drugs";
import { getSalesByDrugsId } from "../../service/sales";
import ToastNotification from "../../components/toast/toast-notification";
import { Select, TextInput, Timeline } from "flowbite-react";
import DecisionTree from "../../components/decision-tree";
import Accordion from "../../components/accordion";

const CalculateDrugs = () => {
  const { id } = useParams();
  const [drug, setDrug] = useState({});
  const [sales, setSales] = useState([]);
  const [randomSamples, setRandomSamples] = useState([]);
  const [sampleSize, setSampleSize] = useState(5);
  const [samplesEntropyAndGain, setSamplesEntropyAndGain] = useState([]);
  const [isDiscount, setIsDiscount] = useState(false);
  const [stock, setStock] = useState(0);
  const [predictions, setPredictions] = useState([]);
  const [finalPrediction, setFinalPrediction] = useState(null);
  const [thresholds, setThresholds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const toastNotification = ToastNotification.loading("Memuat data...");
      try {
        const fetchedDrug = await getDrugsById(id);
        setDrug(fetchedDrug);
        const salesData = await getSalesByDrugsId(id);
        setSales(salesData);
        ToastNotification.success("Berhasil mengambil data");
        ToastNotification.dismiss(toastNotification);
      } catch (error) {
        console.error("Error fetching data:", error);
        ToastNotification.error("Gagal mengambil data");
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const samples = generateBootstrapSample(sales, sampleSize);
    setRandomSamples(samples);
    const entropyAndGain = samples.map((sample) =>
      calculateEntropyAndGain(sample)
    );
    setSamplesEntropyAndGain(entropyAndGain);
  }, [sales, sampleSize]);

  const generateBootstrapSample = (array, size) => {
    const bootstrapSamples = [];
    const n = array.length;
    for (let i = 0; i < size; i++) {
      const sample = [];
      for (let j = 0; j < n; j++) {
        const randomIndex = Math.floor(Math.random() * n);
        sample.push(array[randomIndex]);
      }
      bootstrapSamples.push(sample);
    }
    return bootstrapSamples;
  };

  const handleSampleSizeChange = (event) => {
    const newSize = parseInt(event.target.value);
    setSampleSize(newSize);
  };

  const calculateEntropy = (array) => {
    const uniqueValues = [...new Set(array)];
    let entropy = 0;
    for (let i = 0; i < uniqueValues.length; i++) {
      const value = uniqueValues[i];
      const probability =
        array.filter((item) => item === value).length / array.length;
      entropy -= probability * Math.log2(probability);
    }
    return entropy;
  };

  const calculateEntropyAndGain = (sample) => {
    const totalEntropy = calculateEntropy(
      sample.map((sale) => sale.salesAmount)
    );

    // Calculate entropy for discount
    const discountTrue = sample.filter((sale) => sale.isDiscount);
    const discountFalse = sample.filter((sale) => !sale.isDiscount);
    const entropyDiscountTrue = calculateEntropy(
      discountTrue.map((sale) => sale.salesAmount)
    );
    const entropyDiscountFalse = calculateEntropy(
      discountFalse.map((sale) => sale.salesAmount)
    );

    const entropyDiscount =
      (discountTrue.length / sample.length) * entropyDiscountTrue +
      (discountFalse.length / sample.length) * entropyDiscountFalse;

    const gainDiscount = totalEntropy - entropyDiscount;

    const threshold = Math.floor(sample.length / 2);
    const salesAmountLow = sample.slice(0, threshold);
    const salesAmountHigh = sample.slice(threshold);
    const entropySalesAmountLow = calculateEntropy(
      salesAmountLow.map((sale) => sale.salesAmount)
    );
    const entropySalesAmountHigh = calculateEntropy(
      salesAmountHigh.map((sale) => sale.salesAmount)
    );

    const entropySalesAmount =
      (salesAmountLow.length / sample.length) * entropySalesAmountLow +
      (salesAmountHigh.length / sample.length) * entropySalesAmountHigh;

    const gainSalesAmount = totalEntropy - entropySalesAmount;

    return {
      entropy: totalEntropy,
      gainDiscount,
      gainSalesAmount,
    };
  };

  const predictSales = (e) => {
    e.preventDefault();
    console.log(randomSamples);
    let temp = [];
    let predictions = randomSamples.map((sample) => {
      const filteredSales = sample.filter(
        (sale) => sale.isDiscount === isDiscount
      );
      if (filteredSales.length === 0) return 0;
      const avgSalesAmount =
        filteredSales.reduce(
          (sum, sale) => sum + parseInt(sale.salesAmount),
          0
        ) / filteredSales.length;
      temp.push(avgSalesAmount);
      return avgSalesAmount;
    });
    setThresholds(temp);
    console.log(temp);
    setPredictions(predictions);

    const avgPrediction =
      predictions.reduce((a, b) => a + b, 0) / predictions.length;
    setFinalPrediction(avgPrediction);
  };

  return (
    <Layout>
      <h1 className="mb-8 text-3xl font-bold">Perhitungan {drug?.name}</h1>
      <div>
        <div>
          <label className="block mb-4 font-semibold" htmlFor="name">
            Diskon
          </label>

          <Select
            name="isDiscount"
            id="isDiscount"
            value={isDiscount}
            className="w-32"
            onChange={(e) => setIsDiscount(e.target.value === "true")}
          >
            <option value="false">Tidak</option>
            <option value="true">Ya</option>
          </Select>
        </div>

        <div className="mb-8">
          <label className="block mb-4 font-semibold" htmlFor="salesAmount">
            Jumlah penjualan
          </label>
          <TextInput
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            min={0}
            step={1}
            className="w-32"
            color={"gray"}
          />
        </div>
        <div className="mb-8">
          <label className="block mb-4 font-semibold" htmlFor="sampleSize">
            Jumlah sampel acak:
          </label>
          <TextInput
            type="number"
            value={sampleSize}
            onChange={handleSampleSizeChange}
            min={1}
            step={1}
            className="w-32"
            color={"gray"}
          />
        </div>
        <button
          onClick={(e) => predictSales(e)}
          className="px-4 py-2 mb-8 text-white bg-blue-500 rounded-md"
        >
          Prediksi Penjualan
        </button>
        {finalPrediction !== null && (
          <div className="mb-8">
            <h3 className="text-lg font-bold">
              Prediksi Penjualan: {finalPrediction.toFixed(2)}
            </h3>
          </div>
        )}
        <Timeline>
          <Timeline.Item>
            <Timeline.Point />
            <Timeline.Content>
              <Timeline.Title>Data Penjualan Obat</Timeline.Title>
              <Accordion defaultOpen={true}>
                <Timeline.Body>
                  {sales.map((sale, index) => (
                    <div key={index}>
                      <p>Diskon: {sale.isDiscount ? "Ya" : "Tidak"}</p>
                      <p>Jumlah Penjualan: {sale.salesAmount}</p>
                    </div>
                  ))}
                </Timeline.Body>
              </Accordion>
            </Timeline.Content>
          </Timeline.Item>
          <Timeline.Item>
            <Timeline.Point />
            <Timeline.Content>
              <Timeline.Title>Langkah Pertama</Timeline.Title>
              <Accordion title="Sampel Acak">
                <Timeline.Body>
                  {randomSamples.map((sample, sampleIndex) => (
                    <div key={sampleIndex}>
                      <h3 className="text-lg font-bold">
                        Sampel Acak {sampleIndex + 1}
                      </h3>
                      {sample.map((sale, index) => (
                        <div key={index}>
                          <p>Diskon: {sale.isDiscount ? "Ya" : "Tidak"}</p>
                          <p>Jumlah Penjualan: {sale.salesAmount}</p>
                        </div>
                      ))}
                    </div>
                  ))}
                </Timeline.Body>
              </Accordion>
            </Timeline.Content>
          </Timeline.Item>
          <Timeline.Item>
            <Timeline.Point />
            <Timeline.Content>
              <Timeline.Title>Langkah Kedua</Timeline.Title>
              <Accordion title="Menghitung Entropy dan Gain">
                <Timeline.Body>
                  {samplesEntropyAndGain.map((sample, sampleIndex) => (
                    <div key={sampleIndex}>
                      <h3 className="text-lg font-bold">
                        Sampel Acak {sampleIndex + 1}
                      </h3>
                      <p>Entropy: {sample.entropy.toFixed(4)}</p>
                      <p>Gain Diskon: {sample.gainDiscount.toFixed(4)}</p>
                      <p>
                        Gain Jumlah Penjualan:{" "}
                        {sample.gainSalesAmount.toFixed(4)}
                      </p>
                    </div>
                  ))}
                </Timeline.Body>
              </Accordion>
            </Timeline.Content>
          </Timeline.Item>
          <Timeline.Item>
            <Timeline.Point />
            <Timeline.Content>
              <Timeline.Title>Langkah Ketiga</Timeline.Title>
              <Accordion title="Membuat Pohon Keputusan">
                <Timeline.Body className="flex flex-col items-center justify-center">
                  <DecisionTree
                    samplesEntropyAndGain={samplesEntropyAndGain}
                    stock={thresholds}
                  />
                </Timeline.Body>
              </Accordion>
            </Timeline.Content>
          </Timeline.Item>
          <Timeline.Item>
            <Timeline.Point />
            <Timeline.Content>
              <Timeline.Title>Langkah Keempat</Timeline.Title>
              <Accordion title="Melakukan Prediksi Tiap Sampel Acak">
                <Timeline.Body>
                  {predictions.map((item, sampleIndex) => (
                    <div key={sampleIndex}>
                      <h3 className="text-lg font-bold">
                        Prediksi Sampel Acak {sampleIndex + 1}
                      </h3>
                      <p>Prediksi: {item}</p>
                    </div>
                  ))}
                </Timeline.Body>
              </Accordion>
            </Timeline.Content>
          </Timeline.Item>
          <Timeline.Item>
            <Timeline.Point />
            <Timeline.Content>
              <Timeline.Title>Langkah Kelima</Timeline.Title>
              <Accordion title="Melakukan Prediksi Akhir">
                <Timeline.Body>
                  <h3 className="text-lg font-bold">
                    Prediksi Akhir:{" "}
                    {finalPrediction !== null
                      ? finalPrediction.toFixed(2)
                      : "Belum dihitung"}
                  </h3>
                </Timeline.Body>
              </Accordion>
            </Timeline.Content>
          </Timeline.Item>
        </Timeline>
      </div>
    </Layout>
  );
};

export default CalculateDrugs;
