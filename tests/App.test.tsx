import { screen, render } from '@testing-library/react';
import App from '../src/App';

describe('App', () => {
  test('should be Node', () => {
    // Arrange
    render(<App />);
    // Act
    // Expect
    expect(screen.getByRole('heading', { level: 1 })).toBeInstanceOf(Node);
    expect('a').toBe('a');
  });
});
