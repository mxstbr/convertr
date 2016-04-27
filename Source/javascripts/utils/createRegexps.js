const createRegex = require('./createRegex');

function createRegexps(imperialUnits, metricUnits) {
  const regexps = {};
  // Create RegExps for the imperial units
  for (const key in imperialUnits) {
    if ({}.hasOwnProperty.call(imperialUnits, key)) {
      const madeRegex = createRegex(imperialUnits[key]);
      const currRegex = new RegExp(madeRegex, 'gi');
      regexps[key] = currRegex;
    }
  }
  // Create RegExps for the metric units
  for (const key in metricUnits) {
    if ({}.hasOwnProperty.call(metricUnits, key)) {
      const madeRegex = createRegex(metricUnits[key]);
      const currRegex = new RegExp(madeRegex, 'gi');
      regexps[key] = currRegex;
    }
  }
  return regexps;
}

module.exports = createRegexps;
