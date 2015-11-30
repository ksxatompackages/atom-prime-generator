
function Main() {
	'use strict';

	var self = this;
	var CompositeDisposable = require('atom').CompositeDisposable;
	var PrimeView = require('./prime-view').PrimeView;

	Object.assign(self, {
	  primeGenView: null,
	  view: null,
	  subscriptions: null,
	  activate: activate,
	  deactivate: deactivate,
	  serialize: serialize,
	  open: open
	});

	function activate(state) {
	  var primeview = self.primeGenView = new PrimeView(state.primeGenViewState);
	  open();
	  var subscriptions = self.subscriptions = new CompositeDisposable();
	  return subscriptions.add(atom.commands.add('atom-workspace', {
	    'prime-generator:open': open
	  }));
	}

	function deactivate() {
		self.view.destroy();
		self.subscriptions.dispose();
		self.primeGenView.destroy();
	}

	function serialize() {
	  return {
	    primeGenViewState: primeview.serialize()
	  }
	}

	function open() {
		self.primeGenView.open();
	}
}

module.exports = new Main();
