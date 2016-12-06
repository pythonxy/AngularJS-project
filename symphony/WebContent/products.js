var app = angular.module("symphony", []);

var api = "http://sneakpeeq-sites.s3.amazonaws.com/interviews/ce/feeds/store.js";
	
app.controller('productCtrl', function($scope, $http) {
	$http.get(api).success(function(data, status) {
		$scope.products = data.products;

		$scope.options = [
		                  	{opt : "--Order By--", 	val : ""},
		                  	{opt : "Date", 			val : "createdAt"},
		                  	{opt : "Name", 			val : "name"},
		                  	{opt : "Price", 		val : "defaultPriceInCents"}
		                  ];
		
		// init value for select
		$scope.sortingBy = $scope.options[0].val;
		
		$scope.reverse = false;
		$scope.sortReverse = function(val) {
			$scope.reverse = ($scope.sortingBy === val) ? !$scope.reverse : true;
			$scope.sortingBy = val;
		};

		$scope.clearAll = function() {
			$scope.priceRange = {};
			$scope.sortingBy = null;
			$scope.reverse = null;
		}
		
		$scope.status = status;
		
	}).error(function(data, status) {
		$scope.messages = "Request failed";
		$scope.status = status;
	});
})
.filter('filterRange', function() {
	return function(input, priceRange) {
		var filteredProducts = [];
		angular.forEach(input, function(product) {
			if(priceRange && ((product.defaultPriceInCents / 100) >= priceRange.min && (product.defaultPriceInCents / 100) <= priceRange.max))
				filteredProducts.push(product);
		});
		return filteredProducts.length>0 ? filteredProducts : input 
	};
});