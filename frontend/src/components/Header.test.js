import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('renders the title with the correct id and is visible', () => {
    render(<Header />);
    const title = screen.getByTestId('header-title');
    expect(title).toBeInTheDocument();
    expect(title).toBeVisible();
  });
  it('renders the subtitle with the correct id and is visible', () => {
    render(<Header />);
    const subtitle = screen.getByTestId('header-subtitle');
    expect(subtitle).toBeInTheDocument();
    expect(subtitle).toBeVisible();
  });
  it('renders the trending up icon', () => {
    render(<Header />);
    expect(document.querySelector('svg')).toBeInTheDocument();
  });
}); 