
module.exports = function (elements_collection) {
	'use strict';

	var PrimeGenerator = require('ksxnodemodules').prime.PrimeGenerator;

	var addingquantityinput = elements_collection.addingquantityinput;
	var errormessagespan = elements_collection.errormessagespan;
	var outputspan = elements_collection.outputspan;

	addingquantityinput.addEventListener('keydown', (event) => event.keyCode === 13 && main(), false);
	elements_collection.addingbutton.addEventListener('click', main, false);
	elements_collection.resetbutton.addEventListener('click', reset, false);
	elements_collection.htmlElement.addEventListener('keydown', (event) => {
		if (event.keyCode !== 27) {
			return;
		}
		if (event.target === addingquantityinput && addingquantityinput.value !== '') {
			reset();
			return;
		}
		require('../lib/prime-generator.js').panelBox.hide();
	}, false)

	var primegen;

	reset();

	function main() {

		var n = parseInt(addingquantityinput.value);

		if (!isFinite(n) || n < 0) {
			msgErr("Invalid input.");
			return;
		}

		msgErr('');

		generateprimes(n);

	}

	function generateprimes(n) {
		for (let prime of primegen) {
			if (!n) break;
			print(', ' + String(prime));
			--n;
		}
	}

	function print(content) {
		outputspan.textContent += content;
	}

	function msgErr(error) {
		errormessagespan.textContent = error;
	}

	function reset() {
		primegen = new PrimeGenerator();
		outputspan.textContent = '2';
		addingquantityinput.value = '';
		msgErr('');
	}

}