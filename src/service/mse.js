export function calculateMSE(actual, predicted) {
  if (actual.length !== predicted.length) {
    throw new Error("The arrays must be of equal length.");
  }

  const sumOfPercentageErrors = actual.reduce((acc, value, index) => {
    const error = Math.abs((value - predicted[index]) / value);
    return acc + error;
  }, 0);

  return (sumOfPercentageErrors / actual.length) * 100;
}
