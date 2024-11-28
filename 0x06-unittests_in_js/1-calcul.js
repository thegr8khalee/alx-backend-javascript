const calculateNumber = (type, a, b) => {
  const a1 = Math.round(a);
  const b1 = Math.round(b);
  const sum = a1 + b1;
  const sub = b1 - a1;
  // const divide = a1 / b1;

  if (type === 'SUM') {
    return sum;
  } else if (type === 'SUBTRACT') {
    return sub;
  } else if (type === 'DIVIDE') {
    if (b != 0) {
      const divide = a1 / b1;
      return divide;
    } else {
      return 'ERROR';
    }
  }
};

module.exports = calculateNumber;
