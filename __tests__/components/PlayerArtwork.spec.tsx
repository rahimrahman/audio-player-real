import React from 'react';
import PlayerArtwork from '../../src/components/PlayerArtwork';

import * as ShallowRenderer from 'react-test-renderer/shallow';

it('artwork image center justified', () => {
  const shallowRenderer = ShallowRenderer.createRenderer();
  shallowRenderer.render(
    <PlayerArtwork artwork={'http://localhost/image.png'} />,
  );

  const result = shallowRenderer.getRenderOutput();
  expect(result.props.style.justifyContent).toBe('center');
});
