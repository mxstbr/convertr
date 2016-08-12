// The first value in the array will be used for output formatting!
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
	fahrenheit: ['°F', 'F', '° F', 'degrees F', 'degrees Fahrenheit', 'Fahrenheit'],
	// Speed
	mph: ['mph', 'mp/h', 'miles per hour', 'miles/hour'],
};

module.exports = imperialUnits;
