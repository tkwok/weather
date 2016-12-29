(function() {
    weatherApp.directive('customWeather', function() {
       return {
            templateUrl: 'directives/customWeatherTemplate.html',
            restrict: 'E',
            replace: true,
            scope: {
                weatherDay: "=",
                convertToDate: '&',
                convertToStandard: '&',
                dateFormat: "@"
            }
       }
    });
})();    
    