/*
 */

(function () {

	var controllerName = "umbracostrapDataTypePrevalueEditor",
		controller = ($scope, dataTypeResource, dataTypeHelper) => {

			// Initialize our editor values
			if (!$scope.model.value) {
				$scope.model.value = {
					dataType: null,
					crop: null,
					crops: null
				};
			}

			// ... and our other data values
			$scope.dataTypes = null;
			$scope.crops = null;
			$scope.breakpoints = breakpoints;

			// How we get the data type definitions
			var getDataTypes = () => {
				dataTypeResource.getAll()
					.then((data) => {
						$scope.dataTypes = data.filter(x => x.alias === "Umbraco.ImageCropper");
					});
			};

			// Grab data types
			getDataTypes();

			// If dataType is already selected, grab image crop definitions
			if ($scope.model.value.dataType)
				getImageCropDefinitions();

			// If dataType selection changes, grab image crop definitions
			$scope.$watch("model.value.dataType", (newVal, oldVal, scope) => {
				if (newVal === oldVal) return;

				clearCropsSelections();
				getCrops();
			});

			// How we get the image crop definitions, given a valide dataType selection
			var getCrops = () => {
				var key = $scope.model.value.dataType.key;
				if (!key) return;

				dataTypeResource.getById(key).then(data => {
					var cropsPrevalue = data.preValues.find(x => x.key === "crops"),
						crops = cropsPrevalue.value || null;

					$scope.crops = crops;
				});
			}

			// How we clear the crop(s) selections
			var clearCropsSelections = () => {
				$scope.model.value.crop = null;
				$scope.model.value.crops = null;
			};

		};

	angular.module("umbraco").controller(controllerName, controller);

	var breakpoints = [
		{
			label: "XL",
			key: "xl",
			minWidth: 1920,
			maxWidth: null
		},
		{
			label: "L",
			key: "l",
			minWidth: 1440,
			maxWidth: 1919
		},
		{
			label: "M",
			key: "m",
			minWidth: 1024,
			maxWidth: 1439
		},
		{
			label: "S",
			key: "s",
			minWidth: 640,
			maxWidth: 1023
		},
		{
			label: "XS",
			key: "xs",
			minWidth: 0,
			maxWidth: 639
		},
	];
})();
