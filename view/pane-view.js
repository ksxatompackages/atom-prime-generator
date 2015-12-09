
module.exports = new (function () {
	'use strict';

	var readFileSync = require('fs').readFileSync;
	var utilities = require('ksxnodemodules').utilities;
	var variables = require('../lib/variables.json');
	var createEditor = require('./create-editor.js');
	var main = require('./main.js');

	var openuri = variables.uri.open;

	var self = this;

	var domparser = new DOMParser();

	var viewProviderDisposable = atom.views.addViewProvider(PaneView, (pane) => {
		var htmlContent = readFileSync(__dirname + '/index.xml');
		var htmlDocument = domparser.parseFromString(htmlContent, 'text/xml');
		var htmlElement = htmlDocument.documentElement;
		setTimeout(() => {
			var elements_collection = new ElementSet(htmlElement);
			createEditor(elements_collection);
			main(elements_collection);
		})
		return htmlElement;
	});

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
			(self, "dispose", dispose)
		.setConst
			(self, "viewProviderDisposable", viewProviderDisposable)
			(self, "openerDisposable", openerDisposable)
	;

	function open() {
		return atom.workspace.open(openuri);
	}

	var pane;

	function PaneView() {

		if (pane) {
			return pane;
		}

		pane = this;

		Object.getOwnPropertyNames(PaneView.prototype).forEach(makePropertyGetter.bind(null, pane));

	}

	Object.assign(PaneView.prototype, variables.number, variables.text);

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

	function dispose() {
		viewProviderDisposable.dispose();
		openerDisposable.dispose();
	}

})();
