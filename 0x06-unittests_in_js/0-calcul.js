const calculateNumber = (a, b) => {
  const a1 = Math.round(a);
  const b1 = Math.round(b);
  const sum = a1 + b1;

  return sum;
};

module.exports = calculateNumber;
