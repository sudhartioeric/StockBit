import {render} from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import {LayoutPage} from './index';

test('Rendering Layout Page without crashing', function () {
  const {getByTestId} = render(
    <Router>
      <LayoutPage/>
    </Router>
  ), container = getByTestId('container'),
    containerNavbar = getByTestId('containerNavbar'),
    searchInput = getByTestId('searchingInput'),
    buttonSearching = getByTestId('buttonSearching'),
    containerBody = getByTestId('containerBody');
  expect(container).toHaveClass('container');
  expect(container).toBeInTheDocument();
  expect(containerNavbar).toHaveClass('container__navbar');
  expect(containerNavbar).toBeInTheDocument();
  expect(searchInput).toBeInTheDocument();
  expect(searchInput).toHaveClass('searching-input');
  expect(buttonSearching).toBeInTheDocument();
  expect(containerBody).toBeInTheDocument();
  expect(containerBody).toHaveClass('container__body');
  expect(getByTestId('logoStockBit')).toBeInTheDocument();
})