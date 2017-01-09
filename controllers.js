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
        $scope.city = forecastService.getCity();

        function init() {
            // create 5 buckets for this hash table
            var usersHashTable = new commonServices.HashTable(5);
            //console.log(usersHashTable.hash("Bob"));
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
        
        /* TODO Refactor Me */
        $scope.forecast = {
            days: [{
                id: 'forecastTwoDays',
                displayName: "Next 2 Days",
                link: '#!/forecast/2'
            },{
                id: 'forecastFiveDays',
                displayName: "Next 5 Days",
                link: '#!/forecast/5'
            },{
                id: 'forecastSevenDays',
                displayName: "Next 7 Days",
                link: '#!/forecast/7'
            }],
        };
        
        $scope.forecast.selectedDays = $scope.forecast.days[0];
        
        $scope.selectedIndex = 0;
        $scope.city = forecastService.city;
        $scope.days = $routeParams.days || "2"; // default to 2 days
        $scope.weatherResult = weatherService.getWeather($scope.city, $scope.days);
        $scope.dateFormat = angular.copy(appConstants.WEATHER_DATE_FORMAT);
        
        $scope.convertToFahrenheit = function (degK) {
            return Math.round((1.8 * (degK - 273)) + 32);
        };
        
        $scope.convertToDate = function (dt) {
            return new Date(dt * 1000);
        };
        
        $scope.onForecastDaysChanged = function() {
            //console.log($scope.forecast.selectedDays);
        };
    }]);
})();