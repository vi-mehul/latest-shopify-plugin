import React from 'react';
import ReactDOM from 'react-dom';
import Page404view from './Page404view';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Page404view />, div);
  ReactDOM.unmountComponentAtNode(div);
});
