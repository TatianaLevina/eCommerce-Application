import { main } from '../src/main';

describe('main method tests', () => {
  test('app is created', () => {
    main();
    expect(document.body.querySelector('#app')).toBeDefined();
  });

  test('app is DOM element', () => {
    main();
    expect(document.body.querySelector('#app')).toBeInstanceOf(Node);
  });
});
