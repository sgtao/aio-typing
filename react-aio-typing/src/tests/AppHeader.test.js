import { render, screen } from '@testing-library/react';
import AppHeader from '../components/AppHeader';

test('renders learn react link', () => {
  render(<AppHeader />);
  const headerElement = screen.getByText(/react-aio-typing/i);
  expect(headerElement).toBeInTheDocument();
});
