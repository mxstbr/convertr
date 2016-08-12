// The first suffix in the array will be used for output formatting
const units = {
	// Metric
	millimeter: {
		type: 'length',
		system: 'metric',
		suffixes: ['mm', 'millimeter', 'millimeters', 'milimeter', 'milimeters', 'millimetre', 'millimetres', 'milimetre', 'milimetres'],
	},
	centimeter: {
		type: 'length',
		system: 'metric',
		suffixes: ['cm', 'centimeter', 'centimeters', 'centimetre', 'centimetres'],
	},
	meter: {
		type: 'length',
		system: 'metric',
		suffixes: ['m', 'meter', 'meters', 'metre', 'metres'],
	},
	kilometer: {
		type: 'length',
		system: 'metric',
		suffixes: ['km', 'kilometer', 'kilometers', 'kilometre', 'kilometres'],
	},
	milligram: {
		type: 'mass',
		system: 'metric',
		suffixes: ['mg', 'milligram', 'milligrams', 'miligram', 'miligrams'],
	},
	gram: {
		type: 'mass',
		system: 'metric',
		suffixes: ['g', 'gram', 'grams'],
	},
	kilogram: {
		type: 'mass',
		system: 'metric',
		suffixes: ['kg', 'kilogram', 'kilograms'],
	},
	milliliter: {
		type: 'volume',
		system: 'metric',
		suffixes: ['ml', 'milliliter', 'milliliters', 'mililiter', 'mililiters', 'millilitre', 'millilitres', 'mililitre', 'mililitres'],
	},
	liter: {
		type: 'volume',
		system: 'metric',
		suffixes: ['l', 'liter', 'liters', 'litre', 'litres'],
	},
	celsius: {
		type: 'temperature',
		system: 'metric',
		suffixes: ['°C', 'C', '° C', 'degrees C', 'degrees Celsius', 'Celsius'],
	},
	kph: {
		type: 'speed',
		system: 'metric',
		suffixes: ['kph', 'kp/h', 'kilometers per hour', 'kilometers/hour', 'km/h', 'kmh', 'kmph'],
	},
	// Imperial
	inch: {
		type: 'length',
		system: 'imperial',
		suffixes: ['in', 'in\\.', 'inch', 'inches'],
	},
	feet: {
		type: 'length',
		system: 'imperial',
		suffixes: ['ft', 'feet', 'foot'],
	},
	yard: {
		type: 'length',
		system: 'imperial',
		suffixes: ['yd', 'yard', 'yards'],
	},
	mile: {
		type: 'length',
		system: 'imperial',
		suffixes: ['mi', 'mile', 'miles'],
	},
	ounce: {
		type: 'mass',
		system: 'imperial',
		suffixes: ['oz', 'ozs', 'ounce', 'ounces'],
	},
	pound: {
		type: 'mass',
		system: 'imperial',
		suffixes: ['lb', 'lbs', 'pound', 'pounds'],
	},
	stone: {
		type: 'mass',
		system: 'imperial',
		suffixes: ['st', 'stone', 'stones'],
	},
	fluidounce: {
		type: 'volume',
		system: 'imperial',
		suffixes: ['fl oz', 'fl ozs', 'floz', 'flozs', 'fl oz', 'floz', 'fluid ounce', 'fluid ounces'],
	},
	pint: {
		type: 'volume',
		system: 'imperial',
		suffixes: ['pt', 'pint', 'pints'],
	},
	quart: {
		type: 'volume',
		system: 'imperial',
		suffixes: ['qt', 'quart', 'quarts'],
	},
	gallon: {
		type: 'volume',
		system: 'imperial',
		suffixes: ['gal', 'gallon', 'gallons'],
	},
	fahrenheit: {
		type: 'temperature',
		system: 'imperial',
		suffixes: ['°F', 'F', '° F', 'degrees F', 'degrees Fahrenheit', 'Fahrenheit'],
	},
	mph: {
		type: 'speed',
		system: 'imperial',
		suffixes: ['mph', 'mp/h', 'miles per hour', 'miles/hour'],
	},
};

export default units;
