import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme'
import Productfilter from './Productfilter';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Productfilter />, div);
  ReactDOM.unmountComponentAtNode(div);
});
