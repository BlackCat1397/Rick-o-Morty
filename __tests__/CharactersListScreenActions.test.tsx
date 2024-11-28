
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';

import { it, jest, describe, expect } from '@jest/globals';

import App from '../App';

jest.mock('src/api', () => ({
  getCharacters: (): Promise<{ data: { results: Array<Pick<Character, 'id' | 'name'>> }}> => Promise.resolve({
    data: {
      results: [
        { id: '1', name: 'Item 1' },
        { id: '2', name: 'Item 2' },
      ],
    },
  }),
}));

jest.mock('@react-navigation/native', () => {
  const originalNavigationModule = jest.requireActual('@react-navigation/native');

  return {
    ...originalNavigationModule,
    useFocusEffect: (fn: () => void) => fn(),
  };
});

describe('CharactersListScreen -> press handlers', () => {
  it('navigates to detail screen when item is pressed', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Item 1')).toBeTruthy();
    }, {
      timeout: 3000,
    });

    fireEvent.press(screen.getByText('Item 1'));

    await waitFor(() => {
      screen.getByText('1');
    }, {
      timeout: 3000,
    });
  });
});
