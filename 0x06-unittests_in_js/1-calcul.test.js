const assert = require('assert');
const calculateNumber = require('./1-calcul');

describe('calculateNumber', () => {
  it('should return 4 for SUM with 1.4 and 2.6', () => {
    assert.strictEqual(calculateNumber('SUM', 1.4, 2.6), 4);
  });

  it('should return 6 for SUM with 2.5 and 2.5', () => {
    assert.strictEqual(calculateNumber('SUM', 2.5, 2.5), 6);
  });

  it('should return 2 for SUBTRACT with 1.4 and 2.6', () => {
    assert.strictEqual(calculateNumber('SUBTRACT', 1.4, 2.6), 2);
  });

  it('should return 0 for SUBTRACT with 2.5 and 2.5', () => {
    assert.strictEqual(calculateNumber('SUBTRACT', 2.5, 2.5), 0);
  });

  it('should return 2 for DIVIDE with 2.5 and 2.0', () => {
    assert.strictEqual(calculateNumber('DIVIDE', 2.5, 2.0), 2);
  });

  it('should return "ERROR" for DIVIDE by 0', () => {
    assert.strictEqual(calculateNumber('DIVIDE', 2.5, 0), 'ERROR');
  });

  it('should handle negative numbers correctly for SUM', () => {
    assert.strictEqual(calculateNumber('SUM', -1.4, -2.6), -4);
  });

  it('should handle negative numbers correctly for SUBTRACT', () => {
    assert.strictEqual(calculateNumber('SUBTRACT', -2.5, -2.5), 0);
  });

  it('should handle large numbers correctly for DIVIDE', () => {
    assert.strictEqual(calculateNumber('DIVIDE', 12345.6, 123.0), 100.0);
  });

  it('should return "ERROR" for DIVIDE by 0 with large numbers', () => {
    assert.strictEqual(calculateNumber('DIVIDE', 12345.6, 0), 'ERROR');
  });
});
