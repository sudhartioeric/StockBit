import {render} from '@testing-library/react';
import {Loading} from './index';

test('Rendering loading animate without crashing black border', function () {
  const {getByTestId} = render(<Loading/>),
    loadingContainer = getByTestId('loadingContainer'),
    loadingRing = getByTestId('loadingRing');

  expect(loadingContainer).toBeInTheDocument();
  expect(loadingContainer).toHaveClass('loading-container');
  expect(loadingRing).toBeInTheDocument();
  expect(loadingRing).toHaveClass('loading-ring');
})


test('Rendering loading animate without crashing white border', function () {
  const {getByTestId} = render(<Loading light/>),
    loadingContainer = getByTestId('loadingContainer'),
    loadingRing = getByTestId('loadingRing');

  expect(loadingContainer).toBeInTheDocument();
  expect(loadingContainer).toHaveClass('loading-container');
  expect(loadingRing).toBeInTheDocument();
  expect(loadingRing).toHaveClass('loading-ring');
  expect(loadingRing).toHaveClass('light');
})


test('Rendering loading animate MAIN without crashing white border', function () {
  const {getByTestId} = render(<Loading light main/>),
    loadingRing = getByTestId('loadingRing');

  expect(loadingRing).toBeInTheDocument();
  expect(loadingRing).toHaveClass('loading-ring');
  expect(loadingRing).toHaveClass('light');
})