import React from 'react';
import ReactDOM from 'react-dom';
import HTTPClient from './HTTPClient';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<HTTPClient />, div);
  ReactDOM.unmountComponentAtNode(div);
});
