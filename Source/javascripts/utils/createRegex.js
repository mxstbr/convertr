/**
 * Creates a regex for the specified units
 * @param {Array} vals An array of units to be converted, e.g. ["mg", "milligram", ",milligrams"]
 * @returns {String} a regex for the specified units
 */
function createRegex(vals) {
	let units = '';
	for (let i = 0; i < vals.length; i++) {
		units += `${vals[i]}|`;
	}
	// Remove last |
	units = units.slice(0, -1);
	const regex = `(((\\b|\\s|^)+[\\d]+[\\s,.-]?[\\d]*)+\\s?(${units})+)(?!\\w)`;
	return regex;
}

module.exports = createRegex;
