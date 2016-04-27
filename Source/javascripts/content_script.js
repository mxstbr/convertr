// Default settings
const settings = {
	metric: true,
	length: true,
	mass: true,
	volume: true,
	temperature: true,
	speed: true,
	decimalPlaces: 2,
};

// Initialize globally needed variables
const regexps = {};

const imperialUnits = {
	// Length
	inch: ['in\\.', 'inch', 'inches'],
	feet: ['ft', 'feet', 'foot'],
	yard: ['yd', 'yard', 'yards'],
	mile: ['mi', 'mile', 'miles'],
	// Mass
	ounce: ['oz', 'ozs', 'ounce', 'ounces'],
	pound: ['lb', 'lbs', 'pound', 'pounds'],
	stone: ['st', 'stone', 'stones'],
	// Volume
	fluidounce: ['fl oz', 'fl ozs', 'floz', 'flozs', 'fl oz', 'floz', 'fluid ounce', 'fluid ounces'],
	pint: ['pt', 'pint', 'pints'],
	quart: ['qt', 'quart', 'quarts'],
	gallon: ['gal', 'gallon', 'gallons'],
	// Temperature
	fahrenheit: ['F', '° F', '°F', 'degrees F', 'degrees Fahrenheit', 'Fahrenheit'],
	// Speed
	mph: ['mph', 'mp/h', 'miles per hour', 'miles/hour'],
};

const metricUnits = {
	// Length
	millimeter: ['mm', 'millimeter', 'millimeters', 'milimeter', 'milimeters', 'millimetre', 'millimetres', 'milimetre', 'milimetres'],
	centimeter: ['cm', 'centimeter', 'centimeters', 'centimetre', 'centimetres'],
	meter: ['m', 'meter', 'meters', 'metre', 'metres'],
	kilometer: ['km', 'kilometer', 'kilometers', 'kilometre', 'kilometres'],
	// Mass
	milligram: ['mg', 'milligram', 'milligrams', 'miligram', 'miligrams'],
	gram: ['g', 'gram', 'grams'],
	kilogram: ['kg', 'kilogram', 'kilograms'],
	// Volume
	milliliter: ['ml', 'milliliter', 'milliliters', 'mililiter', 'mililiters', 'millilitre', 'millilitres', 'mililitre', 'mililitres'],
	liter: ['l', 'liter', 'liters', 'litre', 'litres'],
	// Temperature
	celsius: ['C', '° C', '°C', 'degrees C', 'degrees Celsius', 'Celsius'],
	// Speed
	kph: ['kph', 'kp/h', 'kilometers per hour', 'kilometers/hour', 'km/h', 'kmh', 'kmph'],
};

// Get the settings on load
window.onload = getSettings();

// --------------------------------
//
// Functions
//
//

/**
 * Parses an element of the DOM
 * @param {element} An element of the DOM
 */
function parse(element) {
	const walk = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
	console.time('Convertr');
	while (walk.nextNode()) {
		// Check that we don't parse tags which highly likely don't have visible/parseable text
		if (walk.currentNode.parentElement.tagName !== 'SCRIPT'
				&& walk.currentNode.parentElement.tagName !== 'STYLE'
				&& walk.currentNode.parentElement.tagName !== 'CANVAS'
				&& walk.currentNode.parentElement.tagName !== 'IMG'
				&& walk.currentNode.parentElement.tagName !== 'META'
				&& walk.currentNode.parentElement.tagName !== 'NOSCRIPT'
				&& walk.currentNode.parentElement.tagName !== 'VIDEO') {
			handleNode(walk.currentNode);
		}
	}
	console.timeEnd('Convertr');
}

/**
 * Handles the finding of a DOM node with a nodeType of 3
 * @param textNode A DOM text node
 */
function handleNode(textNode) {
	const text = textNode.nodeValue;
	if (onlyContainsWhitespace(text) === false) {
		const newText = handleText(text);
		// TODO Fix this stupid mutation
		textNode.nodeValue = newText; // eslint-disable-line no-param-reassign
	}
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
			let match = text.match(regexps[key]);
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
							default:
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
							default:
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
							default:
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
							default:
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
							default:
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
							default:
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
							default:
								break;
						}
					} else {
						switch (key) {
							case 'celsius':
								result = (match[k] * (9 / 5)) + 32;
								result = result.toFixed(settings.decimalPlaces.valueOf());
								result = ` ${result} °F `;
								break;
							default:
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
							default:
								break;
						}
					} else {
						switch (key) {
							case 'kph':
								result = match[k] / 1.609344;
								result = result.toFixed(settings.decimalPlaces.valueOf());
								result = ` ${result} mph `;
								break;
							default:
								break;
						}
					}

					if (result === undefined) {
						result = matchcopy.original;
					}

					newText = text.replace(matchcopy.original, result);
				}
			}
			match = null;
		}
	}
	return newText;
}

/**
 * Creates a regex for the specified units
 * @param {Array} vals An array of units to be converted, e.g. ["mg", "milligram", ",milligrams"]
 * @returns {String} a regex for the specified units
 */
function createRegex(vals) {
	let units = '';
	for (let i = 0; i < vals.length; i++) {
		units += `${vals[i]}|`;
	}
	// Remove last |
	units = units.slice(0, -1);
	const regex = `(((\\b|\\s|^)+[\\d]+[\\s,.-]?[\\d]*)+\\s?(${units})+)(?!\\w)`;
	return regex;
}

/**
 * Checks if a string only contains whitespace, i.e. is empty
 * @param {string} str The string to check for whitespace
 */
function onlyContainsWhitespace(str) {
	for (let i = 0; i < str.length; i++) {
		const currentChar = str.charCodeAt(i);
		switch (currentChar) { // eslint-disable-line default-case
			case 0x0009: case 0x000A: case 0x000B: case 0x000C: case 0x000D: case 0x0020:
			case 0x0085: case 0x00A0: case 0x1680: case 0x180E: case 0x2000: case 0x2001:
			case 0x2002: case 0x2003: case 0x2004: case 0x2005: case 0x2006: case 0x2007:
			case 0x2008: case 0x2009: case 0x200A: case 0x2028: case 0x2029: case 0x202F:
			case 0x205F: case 0x3000: continue;
		}
		return false;
	}
	return true;
}

/**
 * Strips the digits from a String
 * @param {string} text
 * @returns {number} the digits from the string
 */
function stripDigits(text) {
	// Regular expression to get the digits
	const numbers = /([\d]+[\s,.]?[\d]*)+/g;
	// Match the regex
	// Amount = array, amount[0] = number
	return text.match(numbers)[0];
}

/**
 * Checks if a string contains another string
 * @param {string} it the string to be found in the passed string
 * @returns {boolean}
 */
String.prototype.contains = function contains(it) { // eslint-disable-line no-extend-native
	return this.indexOf(it) !== -1;
};

/**
 * Gets the current settings with the Chrome Storage API
 */
function getSettings() {
	chrome.storage.sync.get('settings', (response) => {
		for (const key in response.settings) {
			if ({}.hasOwnProperty.call(response.settings, key)) {
				settings[key] = response.settings[key];
			}
		}
		// Create RegExps for the imperial units
		for (const key in imperialUnits) {
			if ({}.hasOwnProperty.call(imperialUnits, key)) {
				const madeRegex = createRegex(imperialUnits[key]);
				const currRegex = new RegExp(madeRegex, 'gi');
				regexps[key] = currRegex;
			}
		}
		// Create RegExps for the metric units
		for (const key in metricUnits) {
			if ({}.hasOwnProperty.call(metricUnits, key)) {
				const madeRegex = createRegex(metricUnits[key]);
				const currRegex = new RegExp(madeRegex, 'gi');
				regexps[key] = currRegex;
			}
		}
		parse(document.body);
	});
}

/**
 * Adds onchange listener to the Chrome Storage
 */
chrome.storage.onChanged.addListener(() => {
	getSettings();
});
