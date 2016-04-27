const createRegex = require('./createRegex');

/**
 * Create regular expressions from a list of units
 *
 * @param  {object} units The list of units, structured like ../constants/*Units.js
 *
 * @return {object}       The generated regexps
 */
function createRegexps(units) {
  const regexps = {};
  for (const key in units) {
    if ({}.hasOwnProperty.call(units, key)) {
      const madeRegex = createRegex(units[key]);
      const currRegex = new RegExp(madeRegex, 'gi');
      regexps[key] = currRegex;
    }
  }
  return regexps;
}

module.exports = createRegexps;
