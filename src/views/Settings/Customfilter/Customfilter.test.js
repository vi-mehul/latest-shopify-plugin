import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme'
import Dropdowns from './Customfilter';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Customfilter />, div);
  ReactDOM.unmountComponentAtNode(div);
});
