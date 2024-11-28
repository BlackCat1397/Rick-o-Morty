import React from 'react';
import { render, waitFor, screen } from '@testing-library/react-native';

import { it, jest, describe, expect } from '@jest/globals';

import { CharactersListScreen } from 'src/screens';

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
  const mockUseNavigation = jest.fn();

  return {
    useNavigation: () => ({
      navigate: mockUseNavigation,
    }),
    useFocusEffect: (fn: () => void) => fn(),
  };
});

describe('CharactersListScreen', () => {
  it('renders loading state initially', () => {
    render(<CharactersListScreen />);
    screen.getByTestId('loading-indicator');
  });

  it('renders list of items after loading', async () => {
    render(<CharactersListScreen />);

    await waitFor(() => {
      expect(screen.queryByTestId('loading-indicator')).toBeNull();
    }, {
      timeout: 4000,
    });

    screen.getByText('Item 1');
    screen.getByText('Item 2');
  });
});
