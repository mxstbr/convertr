/**
 * Generate a conversion function with the specified factor
 *
 * @param  {Array}  units  The units, e.g. ['millimeter', 'miles']
 * @param  {Number} factor The factor used in the conversion
 * @return {Function}      The conversion function
 */
function conversionFactory(units, factor) {
  return {
    [units[0]]: {
      [units[1]]: (unit) => unit * factor,
    },
    [units[1]]: {
      [units[0]]: (unit) => unit / factor,
    },
  };
}

export default conversionFactory;
