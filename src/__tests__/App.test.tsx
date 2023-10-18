import { render, screen } from '@testing-library/react';
import App from '../app/App';

describe('App.tsx component', () => {
  test('renders main text and sub text', () => {
    render(<App />);
    const MainText = screen.getByText(/Template/i);
    expect(MainText).toBeTruthy();
  });
});
