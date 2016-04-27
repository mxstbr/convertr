const imperialUnits = {
	length: {
		inch: ['in\\.', 'inch', 'inches'],
		feet: ['ft', 'feet', 'foot'],
		yard: ['yd', 'yard', 'yards'],
		mile: ['mi', 'mile', 'miles'],
	},
	mass: {
		ounce: ['oz', 'ozs', 'ounce', 'ounces'],
		pound: ['lb', 'lbs', 'pound', 'pounds'],
		stone: ['st', 'stone', 'stones'],
	},
	volume: {
		fluidounce: ['fl oz', 'fl ozs', 'floz', 'flozs', 'fl oz', 'floz', 'fluid ounce', 'fluid ounces'],
		pint: ['pt', 'pint', 'pints'],
		quart: ['qt', 'quart', 'quarts'],
		gallon: ['gal', 'gallon', 'gallons'],
	},
	temperature: {
		fahrenheit: ['F', '° F', '°F', 'degrees F', 'degrees Fahrenheit', 'Fahrenheit'],
	},
	speed: {
		mph: ['mph', 'mp/h', 'miles per hour', 'miles/hour'],
	},
};

module.exports = imperialUnits;
