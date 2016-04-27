const convertToImperial = (value, unit, precision = 2) => {
	const unitMap = {
		millimeter: 'in.',
		centimeter: 'in.',
		meter: 'yd',
		kilometer: 'mi',

		milligram: 'oz',
		gram: 'lbs',
		kilogram: 'lbs',

		milliliter: 'fl oz',
		liter: 'gal',

		celsius: '°F',

		kph: 'mph',
	};

	const convertMap = {
		millimeter: (v) => v * 0.0393700787,
		centimeter: (v) => v * 0.393700787,
		meter: (v) => v * 1.0936133,
		kilometer: (v) => v * 0.62137119,

		milligram: (v) => v * 0.0000352739619,
		gram: (v) => v * 0.0022046226,
		kilogram: (v) => v * 2.2046226,

		milliliter: (v) => v * 0.03381497,
		liter: (v) => v * 0.2641795,

		celsius: (v) => (v * (9 / 5)) + 32,

		kph: (v) => v / 1.609344,
	};

	const converter = convertMap[unit];
	if (!converter) { return null; }

	let imperialResult = convertMap[unit](value);
	imperialResult = imperialResult.toFixed(Number(precision));

	const imperialUnit = unitMap[unit];

	return `${imperialResult} ${imperialUnit}`;
};

module.exports = convertToImperial;
