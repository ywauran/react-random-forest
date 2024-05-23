import React, { useState, useEffect } from "react";
import Layout from "../../layout";
import { useParams } from "react-router-dom";
import { getDrugsById } from "../../service/drugs";
import { getSalesByDrugsId } from "../../service/sales";
import ToastNotification from "../../components/toast/toast-notification";
import { TextInput, Timeline } from "flowbite-react";
import DecisionTree from "../../components/decision-tree";
import Accordion from "../../components/accordion";

const CalculateDrugs = () => {
  const { id } = useParams();
  const [drug, setDrug] = useState({});
  const [sales, setSales] = useState([]);
  const [entropy, setEntropy] = useState(0);
  const [gain, setGain] = useState(0);
  const [randomSamples, setRandomSamples] = useState([]);
  const [sampleSize, setSampleSize] = useState(5);
  const [samplesEntropyAndGain, setSamplesEntropyAndGain] = useState([]);

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

        calculateEntropyAndGain(salesData);
      } catch (error) {
        console.error("Error fetching data:", error);
        ToastNotification.error("Gagal mengambil data");
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    // Generate random sample when sales data changes
    setRandomSamples(generateBootstrapSample(sales, sampleSize));
  }, [sales, sampleSize]);

  useEffect(() => {
    // Calculate entropy and gain for each random sample
    const samplesEntropyAndGain = randomSamples.map((sample) => {
      return calculateEntropyAndGain(sample);
    });

    setSamplesEntropyAndGain(samplesEntropyAndGain);
  }, [randomSamples]);

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

  const calculateEntropy = (data) => {
    const total = data.length;
    const highSales = Math.max(
      ...data.map((item) => parseInt(item.salesAmount))
    );
    const lowSales = total - highSales;
    const pHigh = highSales / total;
    const pLow = lowSales / total;
    const entropy = -[pHigh, pLow].reduce(
      (sum, p) => (p > 0 ? sum + p * Math.log2(p) : sum),
      0
    );
    return entropy;
  };

  const calculateEntropyAndGain = (data) => {
    const totalEntropy = calculateEntropy(data);
    const groupedByDiscount = data.reduce((acc, curr) => {
      const key = curr.isDiscount ? true : false;
      if (!acc[key]) acc[key] = [];
      acc[key].push(curr);
      return acc;
    }, {});

    const entropyByDiscount = Object.values(groupedByDiscount).reduce(
      (sum, group) => {
        const groupEntropy = calculateEntropy(group);
        const weight = group.length / data.length;
        return sum + weight * groupEntropy;
      },
      0
    );

    const gain = totalEntropy - entropyByDiscount;
    return { entropy: totalEntropy, gain: gain };
  };

  const handleSampleSizeChange = (event) => {
    const newSize = parseInt(event.target.value);
    setSampleSize(newSize);
  };

  return (
    <Layout>
      <h1 className="mb-8 text-3xl font-bold">Perhitungan {drug?.name}</h1>
      <div>
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
                      <p>
                        Entropy:{" "}
                        {samplesEntropyAndGain[sampleIndex]?.entropy.toFixed(4)}
                      </p>
                      <p>
                        Gain:{" "}
                        {samplesEntropyAndGain[sampleIndex]?.gain.toFixed(4)}
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
              <Timeline.Title>Langkah Kedua</Timeline.Title>
              <Accordion title="Menghitung Entropy dan Gain">
                <Timeline.Body>
                  <p>Entropy: {entropy.toFixed(4)}</p>
                  <p>Gain: {gain.toFixed(4)}</p>
                </Timeline.Body>
              </Accordion>
            </Timeline.Content>
          </Timeline.Item>
          <Timeline.Item>
            <Timeline.Point />
            <Timeline.Content>
              <Timeline.Title>Langkah Ketiga</Timeline.Title>
              <Accordion title="Membuat Pohon Keputusan">
                <Timeline.Body>
                  <p>
                    {gain > 0
                      ? `Keputusan terbaik: Membagi data berdasarkan atribut Diskon`
                      : `Tidak ada pembagian data yang memberikan informasi lebih baik.`}
                  </p>
                  <DecisionTree samplesEntropyAndGain={samplesEntropyAndGain} />
                </Timeline.Body>
              </Accordion>
            </Timeline.Content>
          </Timeline.Item>
          <Timeline.Item>
            <Timeline.Point />
            <Timeline.Content>
              <Timeline.Title>Langkah Keempat</Timeline.Title>
              <Accordion title="Melakukan Prediksi Tiap Sampel Acak">
                <Timeline.Body></Timeline.Body>
              </Accordion>
            </Timeline.Content>
          </Timeline.Item>
          <Timeline.Item>
            <Timeline.Point />
            <Timeline.Content>
              <Timeline.Title>Langkah Kelima</Timeline.Title>
              <Accordion title="Melakukan Prediksi Akhir">
                <Timeline.Body></Timeline.Body>
              </Accordion>
            </Timeline.Content>
          </Timeline.Item>
        </Timeline>
      </div>
    </Layout>
  );
};

export default CalculateDrugs;
