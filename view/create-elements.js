
function main(elements_collection) {
	'use strict';

	var readFileSync = require('fs').readFileSync;
	var htmlContent = readFileSync(__dirname + '/index.xml', 'utf8');
	var domparser = new DOMParser();
	var element = domparser.parseFromString(htmlContent, 'text/xml').documentElement;

	var iterateArray = Function.call.bind(Array.prototype.forEach);

	exportElementById(element);
	function exportElementById(element) {
		var id = element.id;
		if (id) {
			elements_collection[id] = element;
		}
		iterateArray(element.children, exportElementById);
	}

}

main(exports);
