import React from 'react';
import ReactDOM from 'react-dom';
import Toast from './Toast';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Toast />, div);
  ReactDOM.unmountComponentAtNode(div);
});
