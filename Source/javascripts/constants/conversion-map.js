import merge from 'lodash/merge';
import conversionFactory from '../utils/conversion-factory';

/**
 * Map of units and their conversions
 *
 * The result looks like this:
 *
 * millimeter: {
 *   inch: (unit) => unit * 0.0383701,
 * },
 * inch: {
 *   millimeter: (unit) => unit / 0.0383701,
 * },
 */
const conversionMap = merge(
  conversionFactory(['millimeter', 'inch'], 0.0393701),
  conversionFactory(['millimeter', 'feet'], 0.00328084),
  conversionFactory(['millimeter', 'yard'], 0.00109361),
  conversionFactory(['millimeter', 'mile'], 6.21371e-7),
  conversionFactory(['centimeter', 'inch'], 0.393700787),
  conversionFactory(['centimeter', 'feet'], 0.0328084),
  conversionFactory(['centimeter', 'yard'], 0.0109361),
  conversionFactory(['centimeter', 'mile'], 6.21371e-6),
  conversionFactory(['meter', 'inch'], 39.3701),
  conversionFactory(['meter', 'feet'], 3.28084),
  conversionFactory(['meter', 'yard'], 1.09361),
  conversionFactory(['meter', 'mile'], 0.000621371),
  conversionFactory(['kilometer', 'inch'], 39370.1),
  conversionFactory(['kilometer', 'feet'], 3280.84),
  conversionFactory(['kilometer', 'yard'], 1093.61),
  conversionFactory(['kilometer', 'mile'], 0.621371),
  conversionFactory(['milligram', 'ounce'], 3.5274e-5),
  conversionFactory(['milligram', 'pound'], 2.20462e-6),
  conversionFactory(['milligram', 'stone'], 1.57473e-7),
  conversionFactory(['gram', 'ounce'], 0.035274),
  conversionFactory(['gram', 'pound'], 0.00220462),
  conversionFactory(['gram', 'stone'], 0.000157473),
  conversionFactory(['kilogram', 'ounce'], 35.274),
  conversionFactory(['kilogram', 'pound'], 2.20462),
  conversionFactory(['kilogram', 'stone'], 0.157473),
  conversionFactory(['milliliter', 'fluidounce'], 0.03519505609893336),
  conversionFactory(['milliliter', 'pint'], 0.0017597528049466677584),
  conversionFactory(['milliliter', 'quart'], 0.0008798764024733338792),
  conversionFactory(['milliliter', 'gallon'], 0.0002199691006183334698),
  conversionFactory(['liter', 'fluidounce'], 35.1951),
  conversionFactory(['liter', 'pint'], 1.759755000011),
  conversionFactory(['liter', 'quart'], 0.87987750000550013496),
  conversionFactory(['liter', 'gallon'], 0.21996937500137503374),
  conversionFactory(['kph', 'mph'], 0.621371)
);

// Hard code celsius and fahrenheit formulas
conversionMap.celsius = {
  fahrenheit: (unit) => unit * (9 / 5) + 32,
};
conversionMap.fahrenheit = {
  celsius: (unit) => (unit - 32) * (5 / 9),
};

export default conversionMap;
