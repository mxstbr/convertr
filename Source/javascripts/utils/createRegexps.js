import map from 'lodash/map';
const createRegex = require('./createRegex');

/**
 * Create regular expressions from a list of units
 *
 * @param  {object} units The list of units, structured like ../constants/units.js
 * @return {object}       The generated regexps
 */
function createRegexps(units) {
  const regexps = {};
  map(units, (unit, key) => {
	const madeRegex = createRegex(unit.suffixes);
    const currRegex = new RegExp(madeRegex, 'gi');
    regexps[key] = currRegex;
  });
  return regexps;
}

module.exports = createRegexps;
