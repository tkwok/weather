/* Created by Tony Kwok on 12/29/2916 */
(function () {
    weatherApp.controller("appController", ['$scope', '$timeout', '$mdSidenav',
        function ($scope, $timeout, $mdSidenav) {
            $scope.toggleLeft = buildDelayedToggler('left');

            function debounce(func, wait, context) {
                var timer;
                return function debounced() {
                    var context = $scope,
                        args = Array.prototype.slice.call(arguments);
                    
                    $timeout.cancel(timer);
                    timer = $timeout(function () {
                        timer = undefined;
                        func.apply(context, args);
                    }, wait || 10);
                };
            }

            function buildDelayedToggler(navID) {
                return debounce(function () {
                    // Component lookup should always be available since we are not using `ng-if`
                    $mdSidenav(navID).toggle().then(function () {
                    });
                }, 200);
            }
    }]);
    
    
    weatherApp.controller("sideNavController", ['$scope', '$timeout', '$mdSidenav',         function ($scope, $timeout, $mdSidenav) {
      /* TODO handle page here */
        
    }]);
    
    
    weatherApp.controller('homePageController', ['$scope', '$location', '$q', 'forecastService', 'commonServices', 'weatherService', function ($scope, $location, $q, forecastService, commonServices, weatherService) {

        function init() {
            // TODO use HashTable for user accounts
            var usersHashTable = new commonServices.HashTable(5);
        }
        
        $scope.submit = function () {
            if ($scope.forecast.selectedCity && 
                $scope.forecast.selectedCity.description) {
                
                forecastService.setCity($scope.forecast.selectedCity.description);
                if ($scope.cityNameForm.$valid) {
                    $location.path("forecast");
                }
            }
        };
    
        init();
    }]);
    
    
    weatherApp.controller('forecastPageController', ['$scope', '$routeParams', 'forecastService', 'weatherService', 'appConstants', function ($scope, $routeParams, forecastService, weatherService, appConstants) {
        
        $scope.dateFormat = _.cloneDeep(appConstants.WEATHER_DATE_FORMAT);
        
        // TODO refactor to single forecast object
        $scope.forecast = {
            cityName: forecastService.city,
            days: _.cloneDeep(appConstants.forecastPage.FORECAST_DAYS),
            tempUnits: _.cloneDeep(appConstants.forecastPage.FORECAST_TEMPERATURE_UNITS)
        };
        
        $scope.forecast.selectedDays = $scope.forecast.days[0];
        $scope.forecast.selectedTempUnits = $scope.forecast.tempUnits[0];


        $scope.selectedIndex = 0;
        
        $scope.forecast.city = forecastService.city;
        $scope.days = $routeParams.days || "2"; // default to 2 days
        
        
        
        $scope.weatherResult = weatherService.getWeather($scope.forecast.city, $scope.forecast.selectedDays.nextDays);
        
        // TODO Make these common services
        $scope.convertToCelsius = function (degK, symbol) {
            return Math.round(degK - 273.15) + " " + symbol;
        };
        
        $scope.convertToFahrenheit = function (degK, symbol) {
            return Math.round((1.8 * (degK - 273)) + 32) + " " + symbol;
        };
        
        $scope.convertToDate = function (dt) {
            return new Date(dt * 1000);
        };
        
        $scope.onForecastDaysChanged = function() {            
            $scope.weatherResult = weatherService.getWeather($scope.forecast.city, $scope.forecast.selectedDays.nextDays);
        };
        
        $scope.onForecastTempUnitsChanged = function() {
        };
    }]);
})();