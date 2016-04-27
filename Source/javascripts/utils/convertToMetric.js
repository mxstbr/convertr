const convertToMetric = (value, unit, precision = 2) => {
	const unitMap = {
		inch: 'cm',
		feet: 'cm',
		yard: 'm',
		mile: 'km',

		ounce: 'g',
		pound: 'kg',
		stone: 'kg',

		fluidounce: 'ml',
		pint: 'l',
		quart: 'l',
		gallon: 'l',

		fahrenheit: '°C',

		mph: 'kph',
	};

	const convertMap = {
		inch: (v) => v * 2.56,
		feet: (v) => v * 30.48,
		yard: (v) => v * 0.9144,
		mile: (v) => v * 1.609344,

		ounce: (v) => v * 28.349523,
		pound: (v) => v * 0.45359237,
		stone: (v) => v * 6.35029318,

		fluidounce: (v) => v * 29.57270,
		pint: (v) => v * 0.473176473,
		quart: (v) => v * 1.13652297,
		gallon: (v) => v * 3.78541178,

		fahrenheit: (v) => ((v - 32) * (5 / 9)),

		mph: (v) => v * 1.609344,
	};

	const converter = convertMap[unit];
	if (!converter) { return null; }

	let metricResult = convertMap[unit](value);
	metricResult = metricResult.toFixed(Number(precision));

	const metricUnit = unitMap[unit];

	return `${metricResult} ${metricUnit}`;
};

module.exports = convertToMetric;
