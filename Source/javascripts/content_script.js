// Constants
const metricUnits = require('./constants/metricUnits');
const imperialUnits = require('./constants/imperialUnits');

// Utilities
const createRegexps = require('./utils/createRegexps');
const parseElement = require('./utils/parseElement');
const stripDigits = require('./utils/stripDigits');
const isWhitespace = require('is-whitespace');

// Default settings
let settings = require('./constants/defaultSettings');
// Initialize globally needed variables
let regexps = {};

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
	// Create the regular expressions
	// TODO Figure out if we need to do this everytime
	regexps = createRegexps(imperialUnits, metricUnits);
	// Parse the body
	parseElement(document.body, (textNode) => {
		const text = textNode.nodeValue;
		if (isWhitespace(text) === false) {
			const newText = handleText(text);
			textNode.nodeValue = newText; // eslint-disable-line no-param-reassign
		}
	});
}

/**
 * Finds and converts all the units found in the text of a textNode
 * @param {string} The text of a textNode
 */
function handleText(text) {
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

					// Convert to appropriate units and round to decimalPlaces decimal Places
					// Default: 2
					if (settings.length === settings.metric) {
						switch (key) {
							case 'inch':
								result = match[k] * 2.54;
								result = result.toFixed(settings.decimalPlaces.valueOf());
								result = ` ${result} cm `;
								break;
							case 'feet':
								result = match[k] * 30.48;
								result = result.toFixed(settings.decimalPlaces.valueOf());
								result = ` ${result} cm `;
								break;
							case 'yard':
								result = match[k] * 0.9144;
								result = result.toFixed(settings.decimalPlaces.valueOf());
								result = ` ${result} m `;
								break;
							case 'mile':
								result = match[k] * 1.609344;
								result = result.toFixed(settings.decimalPlaces.valueOf());
								result = ` ${result} km `;
								break;
						}
					} else {
						switch (key) {
							case 'millimeter':
								result = match[k] * 0.0393700787;
								result = result.toFixed(settings.decimalPlaces.valueOf());
								result = ` ${result} in. `;
								break;
							case 'centimeter':
								result = match[k] * 0.393700787;
								result = result.toFixed(settings.decimalPlaces.valueOf());
								result = ` ${result} in. `;
								break;
							case 'meter':
								result = match[k] * 1.0936133;
								result = result.toFixed(settings.decimalPlaces.valueOf());
								result = ` ${result} yd `;
								break;
							case 'kilometer':
								result = match[k] * 0.62137119;
								result = result.toFixed(settings.decimalPlaces.valueOf());
								result = ` ${result} mi `;
								break;
						}
					}

					if (settings.mass === settings.metric) {
						switch (key) {
							case 'ounce':
								result = match[k] * 28.349523;
								result = result.toFixed(settings.decimalPlaces.valueOf());
								result = ` ${result} g `;
								break;
							case 'pound':
								result = match[k] * 0.45359237;
								result = result.toFixed(settings.decimalPlaces.valueOf());
								result = ` ${result} kg `;
								break;
							case 'stone':
								result = match[k] * 6.35029318;
								result = result.toFixed(settings.decimalPlaces.valueOf());
								result = ` ${result} kg `;
								break;
						}
					} else {
						switch (key) {
							case 'milligram':
								result = match[k] * 0.0000352739619;
								result = result.toFixed(settings.decimalPlaces.valueOf());
								result = ` ${result} oz `;
								break;
							case 'gram':
								result = match[k] * 0.0022046226;
								result = result.toFixed(settings.decimalPlaces.valueOf());
								result = ` ${result} lbs `;
								break;
							case 'kilogram':
								result = match[k] * 2.2046226;
								result = result.toFixed(settings.decimalPlaces.valueOf());
								result = ` ${result} lbs `;
								break;
						}
					}

					if (settings.volume === settings.metric) {
						switch (key) {
							case 'fluidounce':
								result = match[k] * 29.57270;
								result = result.toFixed(settings.decimalPlaces.valueOf());
								result = ` ${result} ml `;
								break;
							case 'pint':
								result = match[k] * 0.473176473;
								result = result.toFixed(settings.decimalPlaces.valueOf());
								result = ` ${result} l `;
								break;
							case 'quart':
								result = match[k] * 1.13652297;
								result = result.toFixed(settings.decimalPlaces.valueOf());
								result = ` ${result} l `;
								break;
							case 'gallon':
								result = match[k] * 3.78541178;
								result = result.toFixed(settings.decimalPlaces.valueOf());
								result = ` ${result} l `;
								break;
						}
					} else {
						switch (key) {
							case 'milliliter':
								result = match[k] * 0.03381497;
								result = result.toFixed(settings.decimalPlaces.valueOf());
								result = ` ${result} fl oz `;
								break;
							case 'liter':
								result = match[k] * 0.2641795;
								result = result.toFixed(settings.decimalPlaces.valueOf());
								result = ` ${result} gal `;
								break;
						}
					}

					if (settings.temperature === settings.metric) {
						switch (key) {
							case 'fahrenheit':
								result = ((match[k] - 32) * (5 / 9));
								result = result.toFixed(settings.decimalPlaces.valueOf());
								result = ` ${result} °C `;
								break;
						}
					} else {
						switch (key) {
							case 'celsius':
								result = (match[k] * (9 / 5)) + 32;
								result = result.toFixed(settings.decimalPlaces.valueOf());
								result = ` ${result} °F `;
								break;
						}
					}

					if (settings.speed === settings.metric) {
						switch (key) {
							case 'mph':
								result = match[k] * 1.609344;
								result = result.toFixed(settings.decimalPlaces.valueOf());
								result = ` ${result} kph `;
								break;
						}
					} else {
						switch (key) {
							case 'kph':
								result = match[k] / 1.609344;
								result = result.toFixed(settings.decimalPlaces.valueOf());
								result = ` ${result} mph `;
								break;
						}
					}

					if (result === undefined) {
						result = matchcopy.original;
					}

					newText = newText.replace(matchcopy.original, result);
				}
			}
		}
	}
	return newText;
}
