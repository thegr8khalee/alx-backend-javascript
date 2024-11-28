const assert = require('assert');
const calculateNumber = require('./0-calcul');

describe('calculateNumber', () => {
  it('Should return 4 when inputs 1.4 and 2.6', () => {
    assert.strictEqual(calculateNumber(1.4, 2.6), 4);
  });
  it('should return 6 when inputs are 2.5 and 2.5', () => {
    assert.strictEqual(calculateNumber(2.5, 2.5), 6);
  });

  it('should return 0 when inputs are -0.4 and 0.4', () => {
    assert.strictEqual(calculateNumber(-0.4, 0.4), 0);
  });

  it('should return -1 when inputs are -0.6 and -0.4', () => {
    assert.strictEqual(calculateNumber(-0.6, -0.4), -1);
  });

  it('should return 10 when inputs are 9.7 and 0.3', () => {
    assert.strictEqual(calculateNumber(9.7, 0.3), 10);
  });

  it('should handle large numbers correctly', () => {
    assert.strictEqual(calculateNumber(12345.6, 54321.3), 66667);
  });

  it('should handle zero inputs correctly', () => {
    assert.strictEqual(calculateNumber(0, 0), 0);
  });
});
