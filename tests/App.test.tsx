import { render, act } from '@testing-library/react';

import App from '@/App';

describe('App', () => {
  let container: HTMLElement | null = null;

  beforeEach(() => {
    container = document.createElement('div');
    container.id = 'div_root';
    document.body.append(container);
  });

  afterEach(() => {
    container?.remove();
    container = null;
  });

  test('should be Node', () => {
    act(() => {
      render(<App />, {
        container: container!,
      });
    });

    const el = container?.querySelector('div');
    expect(el).toBeDefined();
  });
});
