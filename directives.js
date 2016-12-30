/* Created by Tony Kwok on 12/29/2916 */

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
            },
            link: function (scope, elements, attrs) {
                
                // cap every first letter in string
                scope.capFirstLetters = function (text) {
                    var arr = text.split(" ");
                    for (var i=0, len=arr.length; i<len; i++) {
                        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
                    }
                    return arr.join().replace(/,/g, " ");
                };
            }
       }
    });
})();    
    