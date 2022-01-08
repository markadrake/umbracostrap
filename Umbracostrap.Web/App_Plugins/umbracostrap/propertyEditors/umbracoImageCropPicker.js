"use strict";

(function () {

	var controllerName = "umbracostrapImageCropPicker";
	var controller = function ($scope) {
		$scope.crops = [];
	};

	angular.module("umbraco").controller(controllerName, controller);

})();
