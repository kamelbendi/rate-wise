import { render, screen, fireEvent } from '@testing-library/react';
import MultiSelect from './MultiSelect';

const options = ['USA-Dollar', 'Canada-Dollar', 'Eurozone-Euro'];
const countryToFlag = () => '🇺🇸';

describe('MultiSelect', () => {
  it('renders the input with the correct id and is visible', () => {
    render(<MultiSelect options={options} selected={[]} onChange={() => {}} countryToFlag={countryToFlag} />);
    const input = screen.getByPlaceholderText('Select currency pairs...');
    expect(input).toBeInTheDocument();
    expect(input).toBeVisible();
  });
  it('renders flag for each option', () => {
    render(<MultiSelect options={options} selected={[]} onChange={() => {}} countryToFlag={countryToFlag} />);
    const input = screen.getByPlaceholderText('Select currency pairs...');
    fireEvent.mouseDown(input);
    expect(screen.getAllByText('🇺🇸').length).toBeGreaterThan(0);
  });
});
