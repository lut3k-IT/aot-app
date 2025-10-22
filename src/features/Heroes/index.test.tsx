import React, { useLayoutEffect, useState } from 'react';
import { Route, Router, Routes } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory, MemoryHistory } from 'history';

import Heroes from '.';

// A custom router that listens to history changes for testing.
const HistoryRouter = ({
  history,
  children,
}: {
  history: MemoryHistory;
  children: React.ReactNode;
}) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      location={state.location}
      navigationType={state.action}
      navigator={history}
    >
      {children}
    </Router>
  );
};

describe('Heroes component', () => {
  it('should clear search params when switching tabs', async () => {
    const user = userEvent.setup();
    const history = createMemoryHistory({
      initialEntries: ['/heroes/gallery?search=test'],
    });

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path='/heroes'
            element={<Heroes />}
          >
            <Route
              path='gallery'
              element={<div>Gallery Content</div>}
            />
            <Route
              path='comparison'
              element={<div>Comparison Content</div>}
            />
            <Route
              path='charts'
              element={<div>Charts Content</div>}
            />
          </Route>
        </Routes>
      </HistoryRouter>
    );

    // Check initial state
    expect(history.location.search).toBe('?search=test');
    expect(screen.getByText('Gallery Content')).toBeInTheDocument();

    // Click the "Comparison" tab
    const comparisonTab = screen.getByRole('tab', { name: /comparison/i });
    await user.click(comparisonTab);

    // Wait for the new tab's content to appear
    await screen.findByText('Comparison Content');

    // Assert that the URL search params are cleared
    expect(history.location.pathname).toBe('/heroes/comparison');
    expect(history.location.search).toBe('');

    // Assert that the correct tab is selected
    expect(
      screen.getByRole('tab', { name: /comparison/i, selected: true })
    ).toBeInTheDocument();
  });
});