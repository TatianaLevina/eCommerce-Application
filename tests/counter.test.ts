// import { expect, expectTypeOf, test } from 'vitest';
import { setupCounter } from '../src/counter';

test('setupCounter parameter type to equal HTMLButtonElement', () => {
  expectTypeOf(setupCounter).parameters.toEqualTypeOf<[HTMLButtonElement]>;
});

test('renders', () => {
  const btn = document.createElement('button');
  setupCounter(btn);
  expect(btn.innerHTML).toContain('count is 0');
});
