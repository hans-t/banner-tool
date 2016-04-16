import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';

import FirstPageView from './first-page/view';

injectTapEventPlugin();


// component for glueing components from different domain
export default () => (
  <div>
    <FirstPageView />
  </div>
);
