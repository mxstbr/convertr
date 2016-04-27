/**
 * Strips the digits from a String
 * @param {string} text
 * @returns {number} the digits from the string
 */
function stripDigits(text) {
	// Regular expression to get the digits
	const numbers = /([\d]+[\s,.]?[\d]*)+/g;
	// Match the regex
	// Amount = array, amount[0] = number
	return text.match(numbers)[0];
}

module.exports = stripDigits;
