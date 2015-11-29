
function main(out) {
	'use strict';

	var ksxnodemodules = require('ksxnodemodules');
	var elements_collection = require('../view/create-elements.js');
	require('../view/main.js')(elements_collection);

	var utilities = ksxnodemodules.utilities;
	var PrimeGenerator = ksxnodemodules.prime.PrimeGenerator;

	var n = 20;

	class PrimeView {

		constructor(serializedState) {
			var element = this.element = elements_collection.htmlElement;
			utilities
				.setMethod
					(this, "serialize", () => {})
					(this, "getElement", () => element)
				.setConst
					(this, "destroy", element.remove.bind(element))
			;
		}

	}

	utilities
		.setMethod
			(out, "PrimeView", PrimeView)
	;

}

main(exports);
