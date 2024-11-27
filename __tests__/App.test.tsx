/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: import explicitly to use the types shipped with jest.
import { it, jest } from '@jest/globals';

import { render } from '@testing-library/react-native';


jest.useFakeTimers();
it('renders correctly', () => {
  render(<App />);
});
