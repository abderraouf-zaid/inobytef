import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the new hero heading', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /see risk/i })).toBeInTheDocument();
});
