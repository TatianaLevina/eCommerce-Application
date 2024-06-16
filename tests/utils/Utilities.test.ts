import { expect, test } from 'vitest';

import { formatPrice } from '@utils/Utilities';

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
