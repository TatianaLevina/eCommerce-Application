import { screen, render } from '@testing-library/react';
import App from '@/App';

describe('App', () => {
  test('should be Node', () => {
    // Arrange
    // Act
    render(<App />);
    // Expect
    expect(screen.getByRole('heading', { level: 1 })).toBeInstanceOf(Node);
  });
});
