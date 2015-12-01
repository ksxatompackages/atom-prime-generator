
module.exports = function (elements_collection) {
	'use strict';

	var PrimeGenerator = require('ksxnodemodules').prime.PrimeGenerator;

	var inputEditor = elements_collection.inputEditor;
	var addingcontainerdiv = elements_collection.addingcontainerdiv;
	var errormessagespan = elements_collection.errormessagespan;
	var outputspan = elements_collection.outputspan;

	addingcontainerdiv.addEventListener('keydown', (event) => event.keyCode === 13 && main(), false);
	elements_collection.addingbutton.addEventListener('click', main, false);
	elements_collection.resetbutton.addEventListener('click', reset, false);
	elements_collection.getbutton.addEventListener('click', createEditorPane, false);
	elements_collection.htmlElement.addEventListener('keydown', (event) => {
		switch (event.keyCode) {
			case 27:
				reset();
				break;
			case 83:
			case 115:
				if (event.ctrlKey && !event.shiftKey && !event.altKey) {
					createEditorPane();
				}
				break;
		}
	}, false);

	var primegen, length;

	reset();

	function main() {

		var n = parseInt(inputEditor.getText() || 0);

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
		++length;
	}

	function msgErr(error) {
		errormessagespan.textContent = error;
	}

	function reset() {
		primegen = new PrimeGenerator();
		length = 1;
		outputspan.textContent = '2';
		inputEditor.setText('');
		msgErr('');
	}

	function createEditorPane() {
		atom.workspace.open("first-" + String(length) + "-primes.txt").then((editor) => editor.setText(outputspan.textContent));
	}

}
