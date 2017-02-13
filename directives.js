/* Created by Tony Kwok on 12/29/2916 */
(function () {
    weatherApp.directive('customWeather', function () {
        return {
            templateUrl: 'directives/customWeatherTemplate.html',
            restrict: 'E',
            replace: false,
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
                    
                    for (var i = 0, len = arr.length; i < len; i++) {
                        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
                    }
                    return arr.join().replace(/,/g, " ");
                };
            }
        }
    });
    
    weatherApp.directive('placesAutocompleteDirective', function () {
        return {
            templateUrl: 'directives/placesAutocompleteTemplate.html',
            restrict: 'E',
            replace: true, 
            scope: {
                ngModel: '='
            },
            controller: function ($scope, $q) {
                /* TODO better error handling */
                if (!google || !google.maps) {
                    throw new Error('Google Maps JavaScript S library is not loaded!');
                }
                else if (!google.maps.places) {
                    throw new Error('Google Maps JS library does not have the Places module');
                }
                /* TODO Refactor me */
                var autocompleteService = new google.maps.places.AutocompleteService(),
                    getResults = function (address) {
                        var deferred = $q.defer(),
                            request = {
                                input: address,
                                types: ['(cities)']
                            };
                        
                    autocompleteService.getPlacePredictions(request, function (data) {
                        deferred.resolve(data);
                    });
                        
                    return deferred.promise;
                };
                
                $scope.search = function (input) {
                    if (!input) return;
                    return getResults(input).then(function (places) {
                        // no predictions can still return undefined
                        return places || [];
                    });
                };
            }
        }
    });
})();