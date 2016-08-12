const isWhitespace = require('is-whitespace');
const findKey = require('lodash/findKey');
const map = require('lodash/map');

// Constants
import units from './constants/units';
import conversionMap from './constants/conversion-map';
// Default settings
const defaultSettings = require('./constants/default-settings');
let settings = false;
let windowLoaded = false;

// Utilities
const createRegexps = require('./utils/createRegexps');
const getTextNodes = require('./utils/getTextNodes');
const getNumbers = require('./utils/getNumbers');

// Create the regular expressions to match units
const regexps = createRegexps(units);

// Parse on load
window.onload = () => {
	windowLoaded = true;
	if (settings) run();
};

// Load settings
chrome.storage.sync.get('settings', (data) => {
	settings = data.settings || defaultSettings;
	if (windowLoaded) run();
});

// Reparse with new settings when they change
chrome.storage.onChanged.addListener((changes) => {
	// Update settings with changes
	// TODO Without mutation would be nicer...
	settings = changes.settings.newValue;
	run();
});

/*
 * Main function
 */
function run() {
	// Parse the body
	getTextNodes(document.body, (textNode) => {
		const text = textNode.nodeValue;
		if (isWhitespace(text) === false) {
			const newText = convertUnits(text);
			textNode.nodeValue = newText; // eslint-disable-line no-param-reassign
		}
	});
}

/**
 * Finds and converts all the units found in a string
 */
function convertUnits(text) {
	let newText = text;
	map(regexps, (_, unit) => { // eslint-disable-line no-restricted-syntax
		// Check if we're converting the current unit system and unit type, if not bail out
		const systemEnabled = units[unit].system === 'metric' ? settings.metric : !settings.metric;
		const typeEnabled = settings[units[unit].type];
		if (!systemEnabled || !typeEnabled) {
			return;
		}
		// Check if any of the units are in the text
		const unitsInText = text.match(regexps[unit]);
		if (unitsInText === null) {
			return;
		}

		// Replace all the occurences of the current unit
		map(unitsInText, (unitInText) => {
			let result;
			// Get the digits
			const digits = getNumbers(unitInText);
			// Remove all spaces and commatas
			const normalizedDigits = digits.replace(/\s/g, '').replace(/,/g, '.');
			// TODO Sophisticated logic to find out into which unit to convert to
			const convertTo = findKey(conversionMap[unit], () => true);
			// Convert numbers to new unit
			result = conversionMap[unit][convertTo](normalizedDigits);
			// Cut to decimalPlaces decimal places
			result = result.toFixed(settings.decimalPlaces.valueOf());
			// Format for output
			result = ` ${result} ${units[convertTo].suffixes[0]} `;
			// Replace the original text with the converted, formatted result
			newText = newText.replace(unitInText, result);
		});
	});
	return newText;
}
