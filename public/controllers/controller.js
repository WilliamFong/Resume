var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http){
	
	var refresh = function(){
		$http.get('/resumelist').success(function(response){
			$scope.resumelist = response;
		});
	};
	refresh();
	
	$scope.addContact = function(){
		console.log($scope.contact);
		$http.post('/resumelist', $scope.contact).success(function(response){
			console.log(response);
			refresh();
			$scope.contact = "";
		});
	};
	
	$scope.remove = function(id){
		console.log(id);
		$http.delete('/resumelist/' + id).success(function(response){
			refresh();
		});
	};
	
	$scope.edit = function(id){
		console.log(id);
		$http.get('/resumelist/' + id).success(function(response){
			$scope.contact = response;
		});
	};
	
	$scope.update = function(){
		console.log($scope.contact._id);
		$http.put('/resumelist/' + $scope.contact._id, $scope.contact).success(function(response){
			refresh();
			$scope.contact = "";
		});
	};
	
	$scope.deselect = function(){
		$scope.contact = "";
	}
	
}]);