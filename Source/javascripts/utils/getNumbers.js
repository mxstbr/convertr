/**
 * Get the numbers out of a string
 * @param {string} text
 * @returns {number} the digits from the string
 */
function getNumbers(text) {
	// Regular expression to get the digits
	const numbers = /([\d]+[\s,.]?[\d]*)+/g;
	// Match the regex
	// Amount = array, amount[0] = number
	return text.match(numbers)[0];
}

module.exports = getNumbers;
