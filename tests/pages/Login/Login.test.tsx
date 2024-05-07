import { render, screen } from '@testing-library/react';
import Login from '@pages/Login/Login';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

describe('Login tests', () => {
  const formTestId = 'qwueyque8723hq8w';
  let root: ReactDOM.Root | null;
  let container: HTMLElement | null = null;

  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vitest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vitest.fn(),
        removeListener: vitest.fn(),
        addEventListener: vitest.fn(),
        removeEventListener: vitest.fn(),
        dispatchEvent: vitest.fn(),
      })),
    });
    container = document.createElement('div');
    container.id = 'div_root';
    document.body.append(container);
    root = ReactDOM.createRoot(container);
    document.body.appendChild(container);
    render(<Login data-testid={formTestId} />, { wrapper: BrowserRouter });
  });

  afterEach(() => {
    root?.unmount();
    container?.remove();
    container = null;
  });

  test('should render Login', () => {
    // Arrange
    const el = screen.findByTestId(formTestId);
    // Act
    // Assert
    expect(el).toBeDefined();
  });

  test('should be HTMLFormElement', () => {
    const el = screen.findByTestId(formTestId);

    expect(el).toBeInstanceOf(Promise<HTMLInputElement>);
  });
});
