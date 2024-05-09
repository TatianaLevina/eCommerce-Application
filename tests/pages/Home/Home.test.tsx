import { screen, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '@pages/HomePage/HomePage.tsx';

describe('Home', () => {
  test('should render Heading', () => {
    // Arrange
    const text = 'Home Page';
    // Act
    render(<HomePage />, { wrapper: BrowserRouter });
    // Expect
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(text);
  });
});
