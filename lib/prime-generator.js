
function Main() {
	'use strict';

	var self = this;
	var CompositeDisposable = require('atom').CompositeDisposable;
	var PrimeView = require('./prime-view').PrimeView;

	Object.assign(self, {
	  primeGenView: null,
	  panelBox: null,
	  subscriptions: null,
	  activate: activate,
	  deactivate: deactivate,
	  serialize: serialize,
	  toggle: toggle
	});

	function activate(state) {
	  var primeview = self.primeGenView = new PrimeView(state.primeGenViewState);
	  self.panelBox = atom.workspace.addRightPanel({
	    item: self.primeGenView.getElement(),
	    visible: false
	  });
	  var subscriptions = self.subscriptions = new CompositeDisposable();
	  return subscriptions.add(atom.commands.add('atom-workspace', {
	    'prime-generator:toggle': toggle
	  }));
	}

	function deactivate() {
		self.panelBox.destroy();
		self.subscriptions.dispose();
		self.primeGenView.destroy();
	}

	function serialize() {
	  return {
	    primeGenViewState: primeview.serialize()
	  }
	}

	function toggle() {
		var panelBox = self.panelBox;
		panelBox[panelBox.isVisible() ? "hide" : "show"]();
	}
}

module.exports = new Main();
