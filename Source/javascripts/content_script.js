const isWhitespace = require('is-whitespace');
const assign = require('object-assign');
const findKey = require('lodash/findKey');
const map = require('lodash/map');

// Constants
const metricUnits = require('./constants/metricUnits');
const imperialUnits = require('./constants/imperialUnits');
const conversionMap = require('./constants/conversion-map').default;
// Default settings
let settings = require('./constants/defaultSettings');

// Utilities
const createRegexps = require('./utils/createRegexps');
const getTextNodes = require('./utils/getTextNodes');
const getNumbers = require('./utils/getNumbers');

// Create the regular expressions to match units
const regexps = {};
assign(regexps, createRegexps(imperialUnits));
assign(regexps, createRegexps(metricUnits));

// Parse on load
window.onload = () => {
	run();
};

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
		// Check if any of the units are in the text
		const unitsInText = text.match(regexps[unit]);
		// If they are
		if (unitsInText !== null) {
			// Replace all occurences of them
			for (let k = 0; k < unitsInText.length; k++) {
				let result;

				// Get the digits
				const digits = getNumbers(unitsInText[k]);
				// Remove all spaces and commatas
				const normalizedDigits = digits.replace(/\s/g, '').replace(/,/g, '.');

				// Convert to appropriate units and round to decimalPlaces decimal Places
				// Default: 2
				// TODO Sophisticated logic to find out into which unit to convert
				const convertTo = findKey(conversionMap[unit], () => true);
				result = conversionMap[unit][convertTo](normalizedDigits);
				result = result.toFixed(settings.decimalPlaces.valueOf());
				if (imperialUnits[unit]) {
					result = ` ${result} ${metricUnits[convertTo][0]} `;
				} else {
					result = ` ${result} ${imperialUnits[convertTo][0]} `;
				}

				if (result === undefined) {
					result = unitsInText[k];
				}

				newText = newText.replace(unitsInText[k], result);
			}
		}
	});
	return newText;
}
