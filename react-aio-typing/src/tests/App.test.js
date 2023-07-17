import { render, screen } from '@testing-library/react';
import App from '../App';

test('initial signin screen', () => {
    render(<App />);
    const signinButton = screen.getByText("Sign In");
    expect(signinButton).toBeInTheDocument();
});
