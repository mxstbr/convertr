/**
 * Generate a conversion function with the specified factor
 * The returned function takes a number and optionally a boolean,
 * if the boolean is true the conversion will work reverse
 * @param  {Number} factor The factor used in the conversion
 * @return {Function}      The conversion function
 */
function conversionFactory(factor) {
  /**
   * Convert a unit to and from the original unit
   * @param  {Number}  unit  The unit amount
   * @param  {Boolean} reverse If the conversion should work reverse
   * @return {Number}          The converted unit
   */
  return function convert(unit, reverse) {
    return reverse ? (unit / factor) : (unit * factor);
  };
}

export default conversionFactory;