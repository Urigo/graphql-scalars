import { expect } from 'chai';
import { NonNegativeFloat } from '../';

const { describe, it } = global;

describe('NonNegativeFloat', () => {
  const X = NonNegativeFloat.serialize('some value');

  console.log('X', X);

  it('TBD', async () => {
    expect(X.parseValue(null)).toBe(0);
  });
});
