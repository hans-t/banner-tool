import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Homepage from './homepage';

injectTapEventPlugin();


// component for glueing components from different domain
export default () => (
  <div>
    <Homepage />
  </div>
);
