const { expect } = require('chai');
const calculateNumber = require('./2-calcul_chai');

describe('calculateNumber', () => {
  it('should return 6 for SUM with 1.4 and 4.5', () => {
    expect(calculateNumber('SUM', 1.4, 4.5)).to.equal(6);
  });

  it('should return 6 for SUM with 2.5 and 2.5', () => {
    expect(calculateNumber('SUM', 2.5, 2.5)).to.equal(6);
  });

  it('should return -4 for SUBTRACT with 1.4 and 4.5', () => {
    expect(calculateNumber('SUBTRACT', 1.4, 4.5)).to.equal(-4);
  });

  it('should return 0 for SUBTRACT with 2.5 and 2.5', () => {
    expect(calculateNumber('SUBTRACT', 2.5, 2.5)).to.equal(0);
  });

  it('should return 0.2 for DIVIDE with 1.4 and 4.5', () => {
    expect(calculateNumber('DIVIDE', 1.4, 4.5)).to.equal(0.2);
  });

  it('should return "ERROR" for DIVIDE by 0', () => {
    expect(calculateNumber('DIVIDE', 2.5, 0)).to.equal('ERROR');
  });

  it('should handle negative numbers correctly for SUM', () => {
    expect(calculateNumber('SUM', -1.4, -2.6)).to.equal(4);
  });

  it('should handle negative numbers correctly for SUBTRACT', () => {
    expect(calculateNumber('SUBTRACT', -2.5, -2.5)).to.equal(0);
  });

  it('should handle large numbers correctly for DIVIDE', () => {
    expect(calculateNumber('DIVIDE', 12345.6, 123.0)).to.equal(
      100.3739837398374
    );
  });

  it('should return "ERROR" for DIVIDE by 0 with large numbers', () => {
    expect(calculateNumber('DIVIDE', 12345.6, 0)).to.equal('ERROR');
  });
});
