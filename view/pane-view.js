
module.exports = new (function () {
	'use strict';

	var readFileSync = require('fs').readFileSync;
	var utilities = require('ksxnodemodules').utilities;
	var variables = require('../lib/variables.json');
	var main = require('./main.js');

	var texttittle = variables.text.title;
	var numbertabwidth = variables.number.tabWidth;
	var openuri = variables.uri.open;

	var self = this;

	var domparser = new DOMParser();

	var viewProviderDisposable = atom.views.addViewProvider(PaneView, (pane) => {
		var htmlContent = readFileSync(__dirname + '/index.xml');
		var htmlDocument = domparser.parseFromString(htmlContent, 'text/xml');
		var htmlElement = htmlDocument.documentElement;
		pane.response = new main(new ElementSet(htmlElement), pane);
		return htmlElement;
	})

	var openerDisposable = atom.workspace.addOpener((uri) => {

		if (uri !== openuri) {
			return;
		}

		return new PaneView();

	});

	utilities
		.setMethod
			(self, "open", open)
			(self, "PaneView", PaneView)
		.setConst
			(self, "viewProviderDisposable", viewProviderDisposable)
			(self, "openerDisposable", openerDisposable)
	;

	function open() {
		atom.workspace.open(openuri).then((view) => view.response.reset());
	}

	var pane;

	function PaneView() {

		if (pane) {
			return pane;
		}

		pane = this;

		Object.getOwnPropertyNames(PaneView.prototype).forEach(makePropertyGetter.bind(null, pane));

	}

	((proto) => {
		proto.title = texttittle;
		proto.tabWidth = numbertabwidth;
	})(PaneView.prototype);

	function makePropertyGetter(object, pname) {
		object["get" + pname[0].toUpperCase() + pname.slice(1)] = () => object[pname];
	}

	function ElementSet(element) {
		var set = this;
		(function make(element) {
			var id = element.id;
			if (id) {
				set[id] = element;
			}
			iterateArray(element.children, make);
		})(element);
	}

	var iterateArray = Function.call.bind(Array.prototype.forEach);

})();

// module.exports = function () {
// 	'use strict';
// 	return atom.workspace.open(__dirname + '/index.xml');
// 	// return atom.workspace.open(__dirname + '/index.xml')
// }

// function main(out) {
// 	'use strict';
//
// 	out.open
//
// 	// var readFileSync = require('fs').readFileSync;
// 	// var htmlContent = readFileSync(__dirname + '/index.xml', 'utf8');
// 	// var domparser = new DOMParser();
// 	// var element = domparser.parseFromString(htmlContent, 'text/xml').documentElement;
//
// 	// var iterateArray = Function.call.bind(Array.prototype.forEach);
//
// 	// exportElementById(element);
// 	// function exportElementById(element) {
// 	// 	var id = element.id;
// 	// 	if (id) {
// 	// 		elements_collection[id] = element;
// 	// 	}
// 	// 	iterateArray(element.children, exportElementById);
// 	// }
//
// }
//
// main(exports);
