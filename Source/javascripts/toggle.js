import React from 'react';
import ReactDOM from 'react-dom';
import defaultSettings from './constants/default-settings';

import OptionsPopup from './containers/OptionsPopup';

chrome.storage.sync.get('settings', (data) => {
	const settings = data.settings || defaultSettings;
	ReactDOM.render(<OptionsPopup settings={settings} />, document.getElementById('app'));
});
