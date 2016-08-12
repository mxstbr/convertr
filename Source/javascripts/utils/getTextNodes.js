/**
 * Parses an element of the DOM
 * @param {object}   element  An element of the DOM
 * @param {function} callback Called with all text nodes
 */
function getTextNodes(element, callback) {
	const walk = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
	console.time('Convertr');
	while (walk.nextNode()) {
		// Check that we don't parse tags which highly likely don't have visible/parseable text
		if (walk.currentNode.parentElement.tagName !== 'SCRIPT'
				&& walk.currentNode.parentElement.tagName !== 'STYLE'
				&& walk.currentNode.parentElement.tagName !== 'CANVAS'
				&& walk.currentNode.parentElement.tagName !== 'IMG'
				&& walk.currentNode.parentElement.tagName !== 'META'
				&& walk.currentNode.parentElement.tagName !== 'NOSCRIPT'
				&& walk.currentNode.parentElement.tagName !== 'VIDEO') {
			callback(walk.currentNode);
		}
	}
	console.timeEnd('Convertr');
}

module.exports = getTextNodes;
