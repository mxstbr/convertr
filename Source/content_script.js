// Default settings
var settings = {
	"metric": true,
	"length": true,
	"mass": true,
	"volume": true,
	"temperature": true,
	"speed": true
}

// Initialize globally needed variables
var decimalPlaces = 2;
var regexps = {};

var imperialUnits = {
	// Length
	"inch"		: ["in", "inch", "inches"],
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


// Generate regular expressions
if (settings["metric"]) {
	// Create RegExps for the imperial units
	for (var key in imperialUnits) {
		var madeRegex = createRegex(imperialUnits[key]);
		var currRegex = new RegExp(madeRegex, "gi");
		regexps[key] = currRegex;
	}
} else {
	// Create RegExps for the metric units
	for (var key in metricUnits) {
		var madeRegex = createRegex(metricUnits[key]);
		var currRegex = new RegExp(madeRegex, "gi");
		regexps[key] = currRegex;
	}
}

// Get the settings on load
window.onload = getSettings();

// --------------------------------
//
// Functions
//
//

// Parse the DOM
function parse(element) {
 	var elements = document.getElementsByTagName("p");
    for(var i = 0; i < elements.length; i++) {
        if(elements[i].childNodes[0].nodeType == 3) {
            handleNode(elements[i].childNodes[0]);
        }
    }
}

// Called when a text node is found
function handleNode(textNode) {
	var text = textNode.nodeValue;
	var newText;

	newText = handleText(text);

	textNode.nodeValue = newText;
}

// Called when a text node is found
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

				if (settings["metric"]) {
					// Convert to appropriate units and round to decimalPlaces decimal Places
					// Default: 2
					switch (key) {
						case "inch":
							if (settings["length"]) {
								result = match[k] * 2.54;
								result = result.toFixed(decimalPlaces);
								result = " " + result + " cm ";
							} else {
								result = matchcopy.original;
							}
							break;
						case "feet":
							if (settings["length"]) {
								result = match[k] * 30.48;
								result = result.toFixed(decimalPlaces);
								result = " " + result + " cm ";
							} else {
								result = matchcopy.original;
							}
							break;
						case "yard":
							if (settings["length"]) {
								result = match[k] * 0.9144;
								result = result.toFixed(decimalPlaces);
								result = " " + result + "m ";
							} else {
								result = matchcopy.original;
							}
							break;
						case "mile":
							if (settings["length"]) {
								result = match[k] * 1.609344;
								result = result.toFixed(decimalPlaces);
								result = " " + result + " km ";
							} else {
								result = matchcopy.original;
							}
							break;
						case "ounce":
							if (settings["mass"]) {
								result = match[k] * 28.349523;
								result = result.toFixed(decimalPlaces);
								result = " " + result + " g ";
							} else {
								result = matchcopy.original;
							}
							break;
						case "pound":
							if (settings["mass"]) {
								result = match[k] * 0.45359237;
								result = result.toFixed(decimalPlaces);
								result = " " + result + " kg ";
							} else {
								result = matchcopy.original;
							}
							break;
						case "stone":
							if (settings["mass"]) {
								result = match[k] * 6.35029318;
								result = result.toFixed(decimalPlaces);
								result = " " + result + " kg ";
							} else {
								result = matchcopy.original;
							}
							break;
						case "fluidounce":
							if (settings["volume"]) {
								result = match[k] * 29.57270;
								result = result.toFixed(decimalPlaces);
								result = " " + result + " ml ";
							} else {
								result = matchcopy.original;
							}
							break;
						case "pint":
							if (settings["volume"]){
								result = match[k] * 0.473176473;
								result = result.toFixed(decimalPlaces);
								result = " " + result + " l ";
							} else {
								result = matchcopy.original;
							}
							break;
						case "quart":
							if (settings["volume"]) {
								result = match[k] * 1.13652297;
								result = result.toFixed(decimalPlaces);
								result = " " + result + " l ";
							} else {
								result = matchcopy.original;
							}
							break;
						case "gallon":
							if (settings["volume"]) {
								result = match[k] * 4.54609188;
								result = result.toFixed(decimalPlaces);
								result = " " + result + " l ";
							} else {
								result = matchcopy.original;
							}
							break;
						case "fahrenheit":
							if (settings["temperature"]) {
								result = ((match[k] - 32) * (5/9));
								result = result.toFixed(decimalPlaces);
								result = " " + result + " °C ";
							} else {
								result = matchcopy.original;
							}
							break;
						case "mph":
							if (settings["speed"]) {
								result = match[k] * 1.609344;
								result = result.toFixed(decimalPlaces);
								result = " " + result + " kph ";
							} else {
								result = matchcopy.original;
							}
							break;
					}
				} else {
					switch (key) {
						case "millimeter":
							if (settings["length"]) {
								result = match[k] * 0.0393700787;
								result = result.toFixed(decimalPlaces);
								result = " " + result + " in ";
							} else {
								result = matchcopy.original;
							}
							break;
						case "centimeter":
							if (settings["length"]) {
								result = match[k] * 0.393700787;
								result = result.toFixed(decimalPlaces);
								result = " " + result + " in ";
							} else {
								result = matchcopy.original;
							}
							break;
						case "meter":
							if (settings["length"]) {
								result = match[k] * 1.0936133;
								result = result.toFixed(decimalPlaces);
								result = " " + result + " yd ";
							} else {
								result = matchcopy.original;
							}
							break;
						case "kilometer":
							if (settings["length"]) {
								result = match[k] * 0.62137119;
								result = result.toFixed(decimalPlaces);
								result = " " + result + " mi ";
							} else {
								result = matchcopy.original;
							}
							break;
						case "milligram":
							if (settings["mass"]) {
								result = match[k] * 0.0000352739619;
								result = result.toFixed(decimalPlaces);
								result = " " + result + " oz ";
							} else {
								result = matchcopy.original;
							}
							break;
						case "gram":
							if (settings["mass"]) {
								result = match[k] * 0.0022046226;
								result = result.toFixed(decimalPlaces);
								result = " " + result + " lbs ";
							} else {
								result = matchcopy.original;
							}
							break;
						case "kilogram":
							if (settings["mass"]) {
								result = match[k] * 2.2046226;
								result = result.toFixed(decimalPlaces);
								result = " " + result + " lbs ";
							} else {
								result = matchcopy.original;
							}
							break;
						case "milliliter":
							if (settings["volume"]) {
								result = match[k] * 0.03381497;
								result = result.toFixed(decimalPlaces);
								result = " " + result + " fl oz ";
							} else {
								result = matchcopy.original;
							}
							break;
						case "liter":
							if (settings["volume"]) {
								result = match[k] * 0.2641795;
								result = result.toFixed(decimalPlaces);
								result = " " + result + " gal ";
							} else {
								result = matchcopy.original;
							}
							break;
						case "celsius":
							if (settings["temperature"]) {
								result = (match[k] * (9/5)) + 32;
								result = result.toFixed(decimalPlaces);
								result = " " + result + " °F ";
							} else {
								result = matchcopy.original;
							}
							break;
						case "kph":1.609344
							if (settings["speed"]) {
								result = match[k] / 1.609344;
								result = result.toFixed(decimalPlaces);
								result = " " + result + " mph ";
							} else {
								result = matchcopy.original;
							}
							break;
					}
				}
				text = text.replace(matchcopy.original, result);
			}
		}
		match = null;
	}
	return text;
}

// Creates a regex for the specified array of units
// E.g. createRegex(["mg", "milligram", ",milligrams"]) = "\b([\d]+[ ,.]?[\d]*) ?((mg)?(milligram)?(milligrams)?)*\b"
function createRegex(vals) {
	var units = "";
	for (var i in vals) {
		units += vals[i] + "|";
	}
	// Remove last |
	units = units.slice(0, -1);
	var regex = "(\\b([\\d]?[\\s,.]?[\\d])+\\s?(" + units + ")+)\\b";
	return regex;
}

// Strip the digits
function stripDigits(text) {
	// Regular expression to get the digits
	var numbers = /([\d]?[\s,.]?[\d])+/g;
	// Match the reges
	var amount = text.match(numbers);
	// Amount = array, amount[0] = number
	amount = amount[0];
	return amount;
}

// Check if a string contains another string
String.prototype.contains = function(it) {
	return this.indexOf(it) !== -1;
};

// Get the current settings
function getSettings() {
	chrome.storage.sync.get('settings', function(response) {
		for (var key in response.settings) {
			settings[key] = response.settings[key];
		}
		parse(document.body);
	});
}

// Add onchange event listener to storage
chrome.storage.onChanged.addListener(function(changes, namespace) {
	getSettings();
});