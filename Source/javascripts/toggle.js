import React from 'react';
import ReactDOM from 'react-dom';
import defaultSettings from './constants/defaultSettings';

import OptionsPopup from './containers/OptionsPopup';

chrome.storage.sync.get('settings', (data) => {
	ReactDOM.render(<OptionsPopup settings={data.settings || defaultSettings} />, document.getElementById('app'));
});
