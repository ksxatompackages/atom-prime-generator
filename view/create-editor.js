
// void createEditor(inout ElementSet elements_collection);

module.exports = function (elements_collection) {
	'use strict';

	var editor = elements_collection.inputEditor = atom.workspace.buildTextEditor({mini: true});
	var editorView = elements_collection.inputEditorView = atom.views.getView(editor);

	editor.setPlaceholderText('positive integer');
	editorView.classList.add('mini');
	elements_collection.addingcontainerdiv.insertBefore(editorView, null);

}
