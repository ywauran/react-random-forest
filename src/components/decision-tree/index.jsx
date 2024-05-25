import React from "react";
import TreeComponent from "./tree";

const DecisionTree = ({ samplesEntropyAndGain, stock }) => {
  return (
    <div className="container p-4 mx-auto">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stock.map((stock, index) => (
          <div key={index} className="p-4 bg-white border rounded-lg shadow-md">
            <TreeComponent stock={stock} />
          </div>
        ))}
      </div>
      <div className="mt-8">
        {samplesEntropyAndGain.map((sample, sampleIndex) => (
          <div
            key={sampleIndex}
            className="p-4 mb-4 bg-white border rounded-lg shadow-md"
          >
            <h3 className="text-lg font-bold">
              Pohon Keputusan Sampel Acak {sampleIndex + 1}
            </h3>
            {sample.gain > 0 ? (
              <p>Membagi data berdasarkan atribut Diskon</p>
            ) : (
              <p>
                Tidak ada pembagian data yang memberikan informasi lebih baik.
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DecisionTree;
