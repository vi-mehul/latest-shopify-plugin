import React from 'react';
import ReactDOM from 'react-dom';
import Page500View from './Page500View';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Page500View />, div);
  ReactDOM.unmountComponentAtNode(div);
});
