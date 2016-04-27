import React from 'react';
import ReactDOM from 'react-dom';

import OptionsPopup from './containers/OptionsPopup';

chrome.storage.sync.get('settings', (data) => {
	ReactDOM.render(<OptionsPopup settings={data.settings} />, document.getElementById('app'));
});
