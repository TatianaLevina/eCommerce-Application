import { screen, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';

describe('Home', () => {
  test('should render Heading', () => {
    // Arrange
    render(<Home />, { wrapper: BrowserRouter });
    const text = 'Home';
    // Act
    // Expect
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(text);
    expect('a').toBe('a');
  });
});
