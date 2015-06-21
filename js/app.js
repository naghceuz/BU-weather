angular.module('myApp',[])
	.controller('MainController', function($scope, $timeout){

		$scope.date = {};

		var updateTime = function(){
			$scope.date.raw = new Date();
			$timeout(updateTime, 1000);
		}

		updateTime();

	} )


// use service
// because ersists across controllers for the 
// duration of the application’s lifetime and is the appropriate place for us to hide business logic away from the controller.
angular.module('myApp', [])
	.provider('Weather', function(){

		var apiKey = "e9a44beac5a80b8d";

		this.getUrl = function(type, ext){
			return "http://api.wunderground.com/api/" +
				this.apiKey + '/' + type + '/q' + ext 
				+ '.json';
		};

		this.setApiKey = function(key){
			if(key) this.apiKey = key;
		};

		this.$get = function($http){
			return{
				//service object


			};
		}

	})

	.config(function(WeatherProvider){
		WeatherProvider.setApiKey('e9a44beac5a80b8d');
	})



















