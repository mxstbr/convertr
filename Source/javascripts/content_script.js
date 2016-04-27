const isWhitespace = require('is-whitespace');
const assign = require('object-assign');

// Constants
const metricUnits = require('./constants/metricUnits');
const imperialUnits = require('./constants/imperialUnits');
// Default settings
let settings = require('./constants/defaultSettings');

// Utilities
const createRegexps = require('./utils/createRegexps');
const parseElement = require('./utils/parseElement');
const stripDigits = require('./utils/stripDigits');
const convertToMetric = require('./utils/convertToMetric');
const convertToImperial = require('./utils/convertToImperial');

// Create the regular expressions to match units
const regexps = {};

// Remove categories (light, mass, ...) before creating regexps
const imperialUnitsWithoutCategories = {};
Object.keys(imperialUnits).forEach((category) => {
	Object.assign(imperialUnitsWithoutCategories, imperialUnits[category]);
});

const metricUnitsWithoutCategories = {};
Object.keys(metricUnits).forEach((category) => {
	Object.assign(metricUnitsWithoutCategories, metricUnits[category]);
});

assign(regexps, createRegexps(imperialUnitsWithoutCategories));
assign(regexps, createRegexps(metricUnitsWithoutCategories));

// Parse on load
window.onload = () => {
	chrome.storage.sync.get('settings', (data) => {
		settings = data.settings;
		run();
	});
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
	parseElement(document.body, (textNode) => {
		const text = textNode.nodeValue;
		if (isWhitespace(text) === false) {
			const newText = parseText(text);
			textNode.nodeValue = newText; // eslint-disable-line no-param-reassign
		}
	});
}

/**
 * Finds and converts all the units found in the text of a textNode
 * @param {string} The text of a textNode
 */
function parseText(text) {
	let newText = text;
	for (const key in regexps) { // eslint-disable-line no-restricted-syntax
		if ({}.hasOwnProperty.call(regexps, key)) {
			// Check if any of the units are in the text
			const match = newText.match(regexps[key]);
			// If they are
			if (match !== null) {
				// Replace all occurences of them
				for (let k = 0; k < match.length; k++) {
					let result;
					const matchcopy = {};

					// Save original
					matchcopy.unit = key;
					matchcopy.original = match[k];
					// Get the digits
					match[k] = stripDigits(match[k]);
					// Remove all spaces
					match[k] = match[k].replace(/\s/g, '');
					// Remove all commatas
					match[k] = match[k].replace(/,/g, '.');

					const isMetric = Object.keys(metricUnitsWithoutCategories).indexOf(key) !== -1;

					const converter = isMetric ? convertToImperial : convertToMetric;
					const unitsToUse = isMetric ? metricUnits : imperialUnits;

					const category = Object.keys(unitsToUse).filter(c => Object.keys(unitsToUse[c]).indexOf(key) !== -1)[0];

					if (settings[category] === true) {
						result = converter(match[k], key);
						newText = newText.replace(matchcopy.original, result);
					}
				}
			}
		}
	}
	return newText;
}
