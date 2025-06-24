import { render, screen } from '@testing-library/react';
import RatesTable from './RatesTable';

const data = [
  { country_currency_desc: 'USA-Dollar', exchange_rate: 1.0, record_date: '2024-01-01' },
  { country_currency_desc: 'Canada-Dollar', exchange_rate: 1.3, record_date: '2024-01-01' },
];
const filters = { country: '', currency: '', usd_rate: '', date: '' };
const countryToFlag = () => '🏳️';

describe('RatesTable', () => {
  it('renders the table', () => {
    render(
      <RatesTable
        data={data}
        countryToFlag={countryToFlag}
        filters={filters}
        onFilterChange={() => {}}
      />
    );
    expect(screen.getByRole('table')).toBeInTheDocument();
  });
});