angular.module('myApp',[])
	.controller('MainController', function($scope, $timeout, Weather){

		

		Weather.getWeatherForecast("CA/San_Francisco")
		.then(function(data){
			$scope.weather.forecast = data;
		});

		$scope.date = {};

		var updateTime = function(){
			$scope.date.raw = new Date();
			$timeout(updateTime, 1000);
		}

		$scope.weather = {}
		updateTime();

	} )

// use service
// because ersists across controllers for the 
// duration of the application’s lifetime and is the appropriate place for us to hide business logic away from the controller.

	.provider('Weather', function(){

		var apiKey = "";

		this.setApiKey = function(key){
			if(key) this.apiKey = key;
		};

		this.getUrl = function(type, ext){
			return "http://api.wunderground.com/api/" +
				this.apiKey + '/' + type + '/q/' + 
				ext + '.json';
		};

		

		this.$get = function($q, $http){
			var self = this;
			return{
				getWeatherForecast: function(city){
					var d = $q.defer();
					$http(
					{
						method: 'GET',
						url: self.getUrl('forecast',city),
						cache:true
					}).success(function(data){
						// The wunderground API returns the
						// object that nests the forecasts inside 
						// the forecast.simpleforecast key
						d.resolve(data.forecast.simpleforecast);
					}).error(function(err){
						d.reject(err);
					});
					return d.promise;
				}
			};
		}

	})

	.config(function(WeatherProvider){
		WeatherProvider.setApiKey('e9a44beac5a80b8d');
	})



















