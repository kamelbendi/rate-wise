import { render, screen, waitFor, act } from '@testing-library/react';
import App from './App';

// Mock fetch to avoid actual API calls during testing
global.fetch = jest.fn();

describe('App', () => {
  beforeEach(() => {
    // Reset fetch mock before each test
    fetch.mockClear();
  });

  it('renders the header with title and subtitle', async () => {
    // Mock successful API response
    fetch.mockResolvedValueOnce({
      json: async () => []
    });

    await act(async () => {
      render(<App />);
    });
    
    // Check for header elements
    expect(screen.getByTestId('header-title')).toBeInTheDocument();
    expect(screen.getByTestId('header-subtitle')).toBeInTheDocument();
  });

  it('renders loading state initially', async () => {
    // Mock a delayed API response to test loading state
    fetch.mockImplementationOnce(() => new Promise(() => {}));

    await act(async () => {
      render(<App />);
    });
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state when API fails', async () => {
    // Mock failed API response
    fetch.mockRejectedValueOnce(new Error('API Error'));

    await act(async () => {
      render(<App />);
    });
    
    await waitFor(() => {
      expect(screen.getByText('Failed to fetch data')).toBeInTheDocument();
    });
  });

  it('renders table when data is loaded successfully', async () => {
    // Mock successful API response with sample data
    const mockData = [
      { country_currency_desc: 'USA-Dollar', exchange_rate: 1.0, record_date: '2024-01-01' },
      { country_currency_desc: 'Canada-Dollar', exchange_rate: 1.3, record_date: '2024-01-01' }
    ];
    
    fetch.mockResolvedValueOnce({
      json: async () => mockData
    });

    await act(async () => {
      render(<App />);
    });
    
    // Wait for data to load and check for table elements
    await waitFor(() => {
      expect(screen.getByText('USD Exchange Rates')).toBeInTheDocument();
    });
  });

  it('renders MultiSelect component when data is available', async () => {
    // Mock successful API response with sample data
    const mockData = [
      { country_currency_desc: 'USA-Dollar', exchange_rate: 1.0, record_date: '2024-01-01' }
    ];
    
    fetch.mockResolvedValueOnce({
      json: async () => mockData
    });

    await act(async () => {
      render(<App />);
    });
    
    // Wait for data to load and check for MultiSelect
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Select currency pairs...')).toBeInTheDocument();
    });
  });
});
