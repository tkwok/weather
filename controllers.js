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
                        // TODO action goes here
                    });
                }, 200);
            }
    }]);
    
    weatherApp.controller("sideNavController", ['$scope', '$timeout', '$mdSidenav', function ($scope, $timeout, $mdSidenav) {
      /* TODO handle sidenav data/logic here */
    }]);
    
    weatherApp.controller('homePageController', ['$scope', '$location', '$q', 'forecastService', 'commonServices', 'weatherService', function ($scope, $location, $q, forecastService, commonServices, weatherService) {
        
        function init() {
            // TODO use HashTable for user accounts for 5 users
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
    
    weatherApp.controller('forecastPageController', ['$scope', '$routeParams', '$filter', 'forecastService', 'weatherService', 'appConstants', function ($scope, $routeParams, $filter, forecastService, weatherService, appConstants) {
        
        /* TODO refactor this controller too large */
        var barChartDateFormat = _.cloneDeep(appConstants.forecastPage.FORECAST_BAR_CHART_DATE_FORMAT);
        
        $scope.barChartDataTypes = _.cloneDeep(appConstants.forecastPage.FORECAST_BAR_CHART_DATA_TYPES);
            
        $scope.dateFormat = _.cloneDeep(appConstants.WEATHER_DATE_FORMAT);
        $scope.barChartOptions = _.cloneDeep(appConstants.forecastPage.FORECAST_BAR_CHART_OPTIONS);
        
        $scope.forecast = {
            cityName: forecastService.city,
            days: _.cloneDeep(appConstants.forecastPage.FORECAST_DAYS),
            tempUnits: _.cloneDeep(appConstants.forecastPage.FORECAST_TEMPERATURE_UNITS),
        };
        
        $scope.barChartData = [{
            key: "Temperature",
            values: []
        }];
                
        function init() {        
            $scope.forecast.selectedDays = _.head($scope.forecast.days);
            $scope.forecast.selectedTempUnits = _.head($scope.forecast.tempUnits);
            $scope.barChart = {
                selectedBarChartDataType: _.head($scope.barChartDataTypes)
            };
            $scope.onForecastDaysChanged();
        }
        
        // TODO Make these common services
        $scope.convertToCelsius = function (degK, symbol) {
            var convertedValue = Math.round(degK - 273.15);
            return (symbol) ? convertedValue  + " " + symbol : convertedValue;
        };
        
        $scope.convertToFahrenheit = function (degK, symbol) {
            var convertedValue = Math.round((1.8 * (degK - 273)) + 32); 
            return (symbol) ? convertedValue + " " + symbol : convertedValue;
        };
        
        $scope.convertToDate = function (dt) {
            return new Date(dt * 1000);
        };
        
        $scope.convertTemp = function(degK, unit) {
            return (unit === 'celsius') ? $scope.convertToCelsius(degK) : $scope.convertToFahrenheit(degK);
        };
        
        $scope.onForecastDaysChanged = function() {    
            $scope.weatherResult = weatherService.getWeather($scope.forecast.cityName, $scope.forecast.selectedDays.nextDays);    
            $scope.onBarChartDataChanged();
        };      
        
        $scope.onForecastTempUnitsChanged = function() {
             $scope.onBarChartDataChanged();
        };
        
        $scope.onBarChartDataChanged = function() {
            // delete existing barChartData values array 
            _.first($scope.barChartData).values = [];
            
            // dynamically changes y axis label when barchart data type changed
            $scope.barChartOptions.chart.yAxis.axisLabel = $scope.barChart.selectedBarChartDataType.displayName;
                
            $scope.weatherResult.$promise.then(function(weatherItem) {
    
                function getValueType(item) {
                    switch($scope.barChart.selectedBarChartDataType.id) {
                        case "tempHigh": return $scope.convertTemp(item.temp.max, $scope.forecast.selectedTempUnits.id); break;
                        case "tempLows": return $scope.convertTemp(item.temp.min, $scope.forecast.selectedTempUnits.id); break;
                        case "humidity": return item.humidity; break;
                        default: return null; break;
                    }
                }
                
                // update barchart data from response data
                 _.forEach(weatherItem.list, function(item) {                     
                     _.first($scope.barChartData).values.push(
                         {'label': $filter('date')($scope.convertToDate(item.dt), barChartDateFormat), 
                          'value': getValueType(item)
                         }); 
                 });
            });
        };
        
        init();
    }]);
})();