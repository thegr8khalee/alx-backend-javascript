const ass = require('assert');
const calculateNumber = require('./0-calcul');

describe('calculateNumber', () => {
  it('Should return 4 when inputs 1.4 and 2.6', () => {
    ass.strictEqual(calculateNumber(1.4, 2.6), 4);
  });
});
