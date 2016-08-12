import conversionFactory from '../utils/conversion-factory';

/**
 * Map of units
 * Structure:
 * [from]: {
 *   [to]: ConversionFunction(unitAmount, reverse): convertedUnitAmount
 * }
 * @type {Object}
 */
const conversionMap = {
  millimeter: {
    inch: conversionFactory(0.0393701),
    feet: conversionFactory(0.00328084),
    yard: conversionFactory(0.00109361),
    mile: conversionFactory(6.21371e-7),
  },
  centimeter: {
    inch: conversionFactory(0.393700787),
    feet: conversionFactory(0.0328084),
    yard: conversionFactory(0.0109361),
    mile: conversionFactory(6.21371e-6),
  },
  meter: {
    inch: conversionFactory(39.3701),
    feet: conversionFactory(3.28084),
    yard: conversionFactory(1.09361),
    mile: conversionFactory(0.000621371),
  },
  kilometer: {
    inch: conversionFactory(39370.1),
    feet: conversionFactory(3280.84),
    yard: conversionFactory(1093.61),
    mile: conversionFactory(0.621371),
  },
  milligram: {
    ounce: conversionFactory(3.5274e-5),
    pound: conversionFactory(2.20462e-6),
    stone: conversionFactory(1.57473e-7),
  },
  gram: {
    ounce: conversionFactory(0.035274),
    pound: conversionFactory(0.00220462),
    stone: conversionFactory(0.000157473),
  },
  kilogram: {
    ounce: conversionFactory(35.274),
    pound: conversionFactory(2.20462),
    stone: conversionFactory(0.157473),
  },
  milliliter: {
    fluidounce: conversionFactory(0.03519505609893336),
    pint: conversionFactory(0.0017597528049466677584),
    quart: conversionFactory(0.0008798764024733338792),
    gallon: conversionFactory(0.0002199691006183334698),
  },
  liter: {
    fluidounce: conversionFactory(35.1951),
    pint: conversionFactory(1.759755000011),
    quart: conversionFactory(0.87987750000550013496),
    gallon: conversionFactory(0.21996937500137503374),
  },
  celsius: {
    fahrenheit: (unit, reverse) => (
			reverse ? (unit - 32) * (5 / 9) : unit * (9 / 5) + 32
    ),
  },
  kph: {
    mph: conversionFactory(0.621371),
  },
};

export default conversionMap;
