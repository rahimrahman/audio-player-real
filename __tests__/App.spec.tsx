import 'react-native';
import React from 'react';
import App from '../src/App';

import * as ShallowRenderer from 'react-test-renderer/shallow';

it('renders correctly', () => {
  const shallowRenderer = ShallowRenderer.createRenderer();
  shallowRenderer.render(<App />);
});
