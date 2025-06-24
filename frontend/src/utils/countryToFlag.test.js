import countryToFlag from './countryToFlag';
import { render, screen } from '@testing-library/react';

describe('countryToFlag', () => {
  it('returns the unknown flag for unknown country', () => {
    const flag = countryToFlag('Unknownland');
    render(<span data-testid="flag-Unknownland">{flag}</span>);
    expect(screen.getByTestId('flag-Unknownland')).toHaveTextContent('🏳️');
  });
}); 