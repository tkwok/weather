/* Created by Tony Kwok on 12/29/2916 */

(function() {
    weatherApp.controller('homePageController', ['$scope', '$location', 'forecastService','commonServices', function($scope, $location, forecastService, commonServices) {
        $scope.city = forecastService.getCity();
        
        function init() {                                   
        }                                         
                                                 
        $scope.$watch('city', function() {
             forecastService.setCity($scope.city);     
        });

        $scope.submit = function() {
            if ($scope.cityNameForm.$valid) {
                $location.path("forecast");    
            }
        };
                                                 
        init();                                         
    }]);

    weatherApp.controller('forecastPageController', ['$scope', '$routeParams', 'forecastService', 'weatherService', 'appConstants', function($scope, $routeParams, forecastService, weatherService, appConstants) {    
        
        $scope.selectedIndex = 0;
        $scope.city = forecastService.city;
        $scope.days = $routeParams.days || "2"; // default to 2 days
        $scope.weatherResult = weatherService.getWeather($scope.city, $scope.days);
        $scope.dateFormat = angular.copy(appConstants.WEATHER_DATE_FORMAT);
        
        $scope.convertToFahrenheit = function(degK) {
            return Math.round((1.8 * (degK - 273)) + 32);
        };

        $scope.convertToDate = function(dt) {
            return new Date(dt * 1000);
        };        
    }]);
})();