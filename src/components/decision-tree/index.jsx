import TreeComponent from "./tree";

const DecisionTree = ({ samplesEntropyAndGain }) => {
  return (
    <div>
      <TreeComponent />
      {samplesEntropyAndGain.map((sample, sampleIndex) => (
        <div key={sampleIndex}>
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
  );
};

export default DecisionTree;
