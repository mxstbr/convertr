import React from 'react';
import ReactDOM from 'react-dom';

import OptionsPopup from './containers/OptionsPopup';

import defaultSettings from './constants/defaultSettings';

chrome.storage.sync.get('settings', (data) => {
	const settings = data.settings || defaultSettings;
	ReactDOM.render(<OptionsPopup settings={settings} />, document.getElementById('app'));
});
