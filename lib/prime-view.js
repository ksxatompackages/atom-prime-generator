
function main(out) {
	'use strict';

	var utilities = require('ksxnodemodules').utilities;
	var pane_view = require('../view/pane-view.js');

	class PrimeView {

		constructor(serializedState) {
			var self = this;
			utilities
				.setMethod
					(self, "open", pane_view.open)
				.setConst
					(self, "serialize", () => {})
					(self, "destroy", pane_view.dispose)
			;
		}

	}

	utilities
		.setMethod
			(out, "PrimeView", PrimeView)
	;

}

main(exports);
