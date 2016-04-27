/**
 * Checks if a string only contains whitespace, i.e. is empty
 * @param {string} str The string to check for whitespace
 */
function onlyContainsWhitespace(str) {
	for (let i = 0; i < str.length; i++) {
		const currentChar = str.charCodeAt(i);
		switch (currentChar) { // eslint-disable-line default-case
			case 0x0009: case 0x000A: case 0x000B: case 0x000C: case 0x000D: case 0x0020:
			case 0x0085: case 0x00A0: case 0x1680: case 0x180E: case 0x2000: case 0x2001:
			case 0x2002: case 0x2003: case 0x2004: case 0x2005: case 0x2006: case 0x2007:
			case 0x2008: case 0x2009: case 0x200A: case 0x2028: case 0x2029: case 0x202F:
			case 0x205F: case 0x3000: continue;
		}
		return false;
	}
	return true;
}

module.exports = onlyContainsWhitespace;
