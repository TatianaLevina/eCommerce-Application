import { formatPrice } from '@utils/Utilities';
import { expect, test } from 'vitest';

describe('Utils', () => {
  test('should be definded', () => {
    const testNumber = 10000;

    expect(formatPrice(testNumber)).toBeDefined();
  });

  test('should return string type', () => {
    const testNumber = 10000;

    expect(formatPrice(testNumber)).toBeTypeOf('string');
  });

  test('should return concrete string', () => {
    const testNumber = 10000;

    expect(formatPrice(testNumber)).toBe('100.00');
  });
});
