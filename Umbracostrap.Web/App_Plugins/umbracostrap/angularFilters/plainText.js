"use strict";

(function () {
	var filterName = "",
		filterFn = function (editorState, entityResource) {
			// TODO: write a plainText filter that strips all HTML from provided datas
		};

	angular.module("umbraco.filters").filter(filterName, filterFn);
})();
