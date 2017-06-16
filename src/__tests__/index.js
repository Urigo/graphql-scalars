import {expect} from 'chai';
import {sum} from '../';
const {describe, it} = global;

describe('sum', () => {
  it('should add two numbers correctly', async () => {
    const result = await sum(10, 20);
    expect(result).to.be.equal(30);
  });
});
