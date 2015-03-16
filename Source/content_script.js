// Default settings
var settings = {
	"metric": true,
	"length": true,
	"mass": true,
	"volume": true,
	"temperature": true,
	"speed": true,
	"decimalPlaces": 2
}

// Initialize globally needed variables
var regexps = {};
var original;

var imperialUnits = {
	// Length
	"inch"		: ["in\\.", "inch", "inches"],
	"feet"		: ["ft", "feet", "foot"],
	"yard"		: ["yd", "yard", "yards"],
	"mile"		: ["mi", "mile", "miles"],
	// Mass
	"ounce"		: ["oz", "ozs", "ounce", "ounces"],
	"pound"		: ["lb", "lbs", "pound", "pounds"],
	"stone"		: ["st", "stone", "stones"],
	// Volume
	"fluidounce": ["fl oz", "fl ozs", "floz", "flozs", "fl oz", "floz", "fluid ounce", "fluid ounces"],
	"pint" 		: ["pt", "pint", "pints"],
	"quart"		: ["qt", "quart", "quarts"],
	"gallon"	: ["gal", "gallon", "gallons"],
	// Temperature
	"fahrenheit": ["F", "° F", "°F", "degrees F", "degrees Fahrenheit", "Fahrenheit"],
	// Speed
	"mph"		: ["mph", "mp/h", "miles per hour", "miles/hour"]
}

var metricUnits = {
	// Length
	"millimeter": ["mm", "millimeter", "millimeters", "milimeter", "milimeters"],
	"centimeter": ["cm", "centimeter", "centimeters"],
	"meter"		: ["m", "meter", "meters"],
	"kilometer"	: ["km", "kilometer", "kilometers"],
	// Mass
	"milligram"	: ["mg", "milligram", "milligrams", "miligram", "miligrams"],
	"gram" 		: ["g", "gram", "grams"],
	"kilogram"	: ["kg", "kilogram", "kilograms"],
	// Volume
	"milliliter": ["ml", "milliliter", "milliliters", "mililiter", "mililiters"],
	"liter"		: ["l", "liter", "liters"],
	// Temperature
	"celsius"	: ["C", "° C", "°C", "degrees C", "degrees Celsius", "Celsius"],
	// Speed
	"kph"		: ["kph", "kp/h", "kilometers per hour", "kilometers/hour"]
}

// The elements on the page the extension looks through
// WARINING: Changing this might break certain, big sites like google.com and facebook.com
var elements = ["a", "blockquote", "div", "em", "s", "strong", "u", "td", "th", "dd", "label", "p", "li", "span", "h1", "h2", "h3", "h4", "h5", "h6"];

// Get the settings on load
window.onload = getSettings();

// --------------------------------
//
// Functions
//
//

/**
 * Parses an element of the DOM
 * @param element An element of the DOM
 */
function parse(element) {
	for (var j = 0; j < elements.length; j++) {
		var nodes = element.getElementsByTagName(elements[j]);

	    for(var i = 0; i < nodes.length; i++) {
	    	for (var k = 0; k < nodes[i].childNodes.length; k++) {
		    	if (nodes[i].childNodes[k] !== undefined) {
			        if(nodes[i].childNodes[k].nodeType === 3) {
			            handleNode(nodes[i].childNodes[k]);
			        }
			    }
			}
	    }
	}
}

/**
 * Handles the finding of a DOM node with a nodeType of 3
 * @param textNode A DOM text node
 */
function handleNode(textNode) {
	var text = textNode.nodeValue;
	var newText;

	newText = handleText(text);

	textNode.nodeValue = newText;
}

/**
 * Finds and converts all the units found in the text of a textNode
 * @param text The text of a textNode
 */
function handleText(text) {
	for (var key in regexps) {
		// Check if any of the units are in the text
		var match = text.match(regexps[key]);
		// If they are
		if (match !== null) {
			// Replace all occurences of them
			for (var k = 0; k < match.length; k++) {
				var result;
				var matchcopy = {};

				// Save original
				matchcopy.unit = key;
				matchcopy.original = match[k];
				// Get the digits
				match[k] = stripDigits(match[k]);
				// Remove all spaces
				match[k] = match[k].replace(/\s/g, '');
				// Remove all commatas
				match[k] = match[k].replace(/\,/g, '.');

				// Convert to appropriate units and round to decimalPlaces decimal Places
				// Default: 2
				if (settings["length"] === settings["metric"]) {
					switch (key) {
						case "inch":
							result = match[k] * 2.54;
							result = result.toFixed(settings["decimalPlaces"].valueOf());
							result = " " + result + " cm ";
							break;
						case "feet":
							result = match[k] * 30.48;
							result = result.toFixed(settings["decimalPlaces"].valueOf());
							result = " " + result + " cm ";
							break;
						case "yard":
							result = match[k] * 0.9144;
							result = result.toFixed(settings["decimalPlaces"].valueOf());
							result = " " + result + " m ";
							break;
						case "mile":
							result = match[k] * 1.609344;
							result = result.toFixed(settings["decimalPlaces"].valueOf());
							result = " " + result + " km ";
							break;
					}
				} else {
					switch (key) {
						case "millimeter":
							result = match[k] * 0.0393700787;
							result = result.toFixed(settings["decimalPlaces"].valueOf());
							result = " " + result + " in. ";
							break;
						case "centimeter":
							result = match[k] * 0.393700787;
							result = result.toFixed(settings["decimalPlaces"].valueOf());
							result = " " + result + " in. ";
							break;
						case "meter":
							result = match[k] * 1.0936133;
							result = result.toFixed(settings["decimalPlaces"].valueOf());
							result = " " + result + " yd ";
							break;
						case "kilometer":
							result = match[k] * 0.62137119;
							result = result.toFixed(settings["decimalPlaces"].valueOf());
							result = " " + result + " mi ";
							break;
					}
				}

				if (settings["mass"] === settings["metric"]) {
					switch (key) {
						case "ounce":
							result = match[k] * 28.349523;
							result = result.toFixed(settings["decimalPlaces"].valueOf());
							result = " " + result + " g ";
							break;
						case "pound":
							result = match[k] * 0.45359237;
							result = result.toFixed(settings["decimalPlaces"].valueOf());
							result = " " + result + " kg ";
							break;
						case "stone":
							result = match[k] * 6.35029318;
							result = result.toFixed(settings["decimalPlaces"].valueOf());
							result = " " + result + " kg ";
							break;
					}
				} else {
					switch (key) {
						case "milligram":
							result = match[k] * 0.0000352739619;
							result = result.toFixed(settings["decimalPlaces"].valueOf());
							result = " " + result + " oz ";
							break;
						case "gram":
							result = match[k] * 0.0022046226;
							result = result.toFixed(settings["decimalPlaces"].valueOf());
							result = " " + result + " lbs ";
							break;
						case "kilogram":
							result = match[k] * 2.2046226;
							result = result.toFixed(settings["decimalPlaces"].valueOf());
							result = " " + result + " lbs ";
							break;
					}
				}

				if (settings["volume"] === settings["metric"]) {
					switch (key) {
						case "fluidounce":
							result = match[k] * 29.57270;
							result = result.toFixed(settings["decimalPlaces"].valueOf());
							result = " " + result + " ml ";
							break;
						case "pint":
							result = match[k] * 0.473176473;
							result = result.toFixed(settings["decimalPlaces"].valueOf());
							result = " " + result + " l ";
							break;
						case "quart":
							result = match[k] * 1.13652297;
							result = result.toFixed(settings["decimalPlaces"].valueOf());
							result = " " + result + " l ";
							break;
						case "gallon":
							result = match[k] * 3.78541178;
							result = result.toFixed(settings["decimalPlaces"].valueOf());
							result = " " + result + " l ";
							break;
					}
				} else {
					switch (key) {
						case "milliliter":
							result = match[k] * 0.03381497;
							result = result.toFixed(settings["decimalPlaces"].valueOf());
							result = " " + result + " fl oz ";
							break;
						case "liter":
							result = match[k] * 0.2641795;
							result = result.toFixed(settings["decimalPlaces"].valueOf());
							result = " " + result + " gal ";
							break;
					}
				}

				if (settings["temperature"] === settings["metric"]) {
					switch (key) {
						case "fahrenheit":
							result = ((match[k] - 32) * (5/9));
							result = result.toFixed(settings["decimalPlaces"].valueOf());
							result = " " + result + " °C ";
							break;
					}
				} else {
					switch (key) {
						case "celsius":
							result = (match[k] * (9/5)) + 32;
							result = result.toFixed(settings["decimalPlaces"].valueOf());
							result = " " + result + " °F ";
							break;
					}
				}

				if (settings["speed"] === settings["metric"]) {
					switch (key) {
						case "mph":
							result = match[k] * 1.609344;
							result = result.toFixed(settings["decimalPlaces"].valueOf());
							result = " " + result + " kph ";
							break;
					}
				} else {
					switch (key) {
						case "kph":
							result = match[k] / 1.609344;
							result = result.toFixed(settings["decimalPlaces"].valueOf());
							result = " " + result + " mph ";
							break;
					}
				}

				if (result === undefined) {
					result = matchcopy.original;
				}

				text = text.replace(matchcopy.original, result);
			}
		}
		match = null;
	}
	return text;
}

/**
 * Creates a regex for the specified units
 * @param {array} vals An array of units to be converted, e.g. ["mg", "milligram", ",milligrams"]
 * @returns {regexp} a regex for the specified units
 */
function createRegex(vals) {
	var units = "";
	for (var i in vals) {
		units += vals[i] + "|";
	}
	// Remove last |
	units = units.slice(0, -1);
	var regex = "(([\\d]+[\\s,.]?[\\d]*)+\\s?(" + units + ")+)(?!\\w)";
	return regex;
}

/**
 * Strips the digits from a String
 * @param {string} text
 * @returns {number} the digits from the string
 */
function stripDigits(text) {
	// Regular expression to get the digits
	var numbers = /([\d]+[\s,.]?[\d]*)+/g;
	// Match the reges
	var amount = text.match(numbers);
	// Amount = array, amount[0] = number
	amount = amount[0];
	return amount;
}

/**
 * Checks if a string contains another string
 * @param {string} it the string to be found in the passed string
 * @returns {boolean}
 */
String.prototype.contains = function(it) {
	return this.indexOf(it) !== -1;
};

/**
 * Gets the current settings with the Chrome Storage API
 */
function getSettings() {
	chrome.storage.sync.get('settings', function(response) {
		for (var key in response.settings) {
			settings[key] = response.settings[key];
		}
		// Create RegExps for the imperial units
		for (var key in imperialUnits) {
			var madeRegex = createRegex(imperialUnits[key]);
			var currRegex = new RegExp(madeRegex, "gi");
			regexps[key] = currRegex;
		}
		// Create RegExps for the metric units
		for (var key in metricUnits) {
			var madeRegex = createRegex(metricUnits[key]);
			var currRegex = new RegExp(madeRegex, "gi");
			regexps[key] = currRegex;
		}
		console.log(regexps["centimeter"]);
		parse(document.body);
	});
}

/**
 * Adds onchange listener to the Chrome Storage
 */
chrome.storage.onChanged.addListener(function(changes, namespace) {
	getSettings();
});