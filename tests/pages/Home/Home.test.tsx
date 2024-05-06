import { screen, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '@pages/Home/Home';

describe('Home', () => {
  test('should render Heading', () => {
    // Arrange
    const text = 'Home';
    // Act
    render(<Home />, { wrapper: BrowserRouter });
    // Expect
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(text);
  });
});
