import React from 'react';
import ReactDOM from 'react-dom';
import RegisterView from './RegisterView';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RegisterView />, div);
  ReactDOM.unmountComponentAtNode(div);
});
