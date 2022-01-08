"use strict";

(function () {
	var controllerName = "umbracostrapBlocksImageController",
        controller = function ($scope, mediaResource) {
            $scope.imageSrc = "";

            var imageUdi = $scope.block.data.image[0].mediaKey;

            mediaResource.getById(imageUdi)
                .then(function (media) {
                    $scope.imageUrl = media.mediaLink;
                });
		};

	angular.module("umbraco").controller(controllerName, controller);
})();