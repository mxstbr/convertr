// The first value in the array will be used for output formatting!
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
	celsius: ['°C', 'C', '° C', 'degrees C', 'degrees Celsius', 'Celsius'],
	// Speed
	kph: ['kph', 'kp/h', 'kilometers per hour', 'kilometers/hour', 'km/h', 'kmh', 'kmph'],
};

module.exports = metricUnits;
