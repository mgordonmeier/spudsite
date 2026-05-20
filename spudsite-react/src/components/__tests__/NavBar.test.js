import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock the parts of react-router-dom used by NavBar before importing it
jest.mock('react-router-dom', () => ({
  MemoryRouter: ({ children }) => <div>{children}</div>,
  Link: ({ to, children }) => <a href={to}>{children}</a>,
}), { virtual: true });

import NavBar from '../NavBar';
import { MemoryRouter } from 'react-router-dom';

test('renders navigation links', () => {
  render(
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>
  );

  expect(screen.getByText(/Spuds/i)).toBeInTheDocument();
  expect(screen.getByText(/Music/i)).toBeInTheDocument();
});
