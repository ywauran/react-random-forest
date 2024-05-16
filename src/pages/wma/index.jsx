import React, { useState } from "react";

const WmaCalculator = () => {
  const [n, setN] = useState(3);

  const [data, setData] = useState([
    { month: "January", week: 1, "Jumlah Terjual": 1000 },
    { month: "January", week: 2, "Jumlah Terjual": 1200 },
    { month: "February", week: 1, "Jumlah Terjual": 1300 },
    { month: "February", week: 2, "Jumlah Terjual": 1500 },
    { month: "March", week: 1, "Jumlah Terjual": 1700 },
    { month: "March", week: 2, "Jumlah Terjual": 1800 },
    { month: "April", week: 1, "Jumlah Terjual": 1900 },
    { month: "April", week: 2, "Jumlah Terjual": 2000 },
    { month: "May", week: 1, "Jumlah Terjual": 2100 },
    { month: "May", week: 2, "Jumlah Terjual": 2200 },
  ]);

  const calculateWma = () => {
    const wmaValues = [];
    const weights = Array.from({ length: n }, (_, i) => i + 1); // Weights
    const weightsSum = weights.reduce((acc, val) => acc + val, 0);

    for (let i = 0; i < data.length; i++) {
      if (i >= n - 1) {
        const sum = data
          .slice(i - n + 1, i + 1)
          .reduce(
            (acc, item, index) => acc + item["Jumlah Terjual"] * weights[index],
            0
          );
        const wma = sum / weightsSum;
        wmaValues.push(wma.toFixed(2)); // Rounding to 2 decimal places
      } else {
        wmaValues.push(null);
      }
    }
    return wmaValues;
  };

  const handleNChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setN(value);
    }
  };

  const wmaValues = calculateWma();

  return (
    <div>
      <label>
        Number of Periods (N):
        <input type="number" value={n} onChange={(e) => setN(e.target.value)} />
      </label>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Week</th>
            <th>Jumlah Terjual</th>
            <th>{n} Month WMA</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.month}</td>
              <td>{item.week}</td>
              <td>{item["Jumlah Terjual"]}</td>
              <td>{index >= n - 1 ? wmaValues[index] : ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WmaCalculator;
