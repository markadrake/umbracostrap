"use strict";

(function () {
	var controllerName = "umbracostrapBlocksCarouselController",
		controller = function ($scope, mediaResource, $q) {

			console.log($scope.block);
			console.log($scope.block.data);
			$scope.images = null;

			var getImgUrl = (imageUdi) => {
				return $q((resolve, reject) => {
					mediaResource.getById(imageUdi)
						.then((media) => {
							resolve(media.mediaLink);
						}, (error) => {
							reject(null);
						});
				});
			};

			var slides = $scope.block.data.slides.contentData || null;
			$q.all(slides.map((slide) => getImgUrl(slide.image[0].mediaKey)))
				.then((result) => {
					console.log(result);
					$scope.images = result;
				});
		};

	angular.module("umbraco").controller(controllerName, controller);
})();