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
                var autocompleteService = new google.maps.places.AutocompleteService();
                var getResults = function (address) {
                    var deferred = $q.defer();
                    var request = {
                        input: address
                        , types: ['(cities)']
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
    
    weatherApp.directive('barChart', ['$window', 'd3Service','commonServices',
        function ($window, d3Service, commonServices) {
        return {
            restrict: 'E',
            scope: {
                data: '='
            },
            link: function (scope, element, attrs) {
                d3Service.d3().then(function (d3) {
                    var margin = parseInt(attrs.margin) || 20,
                        barHeight = parseInt(attrs.barHeight) || 20,
                        barPadding = parseInt(attrs.barPadding) || 5;
                                        
                    var svg = d3.select(element[0]).append('svg').style('width', '100%');
                    // TODO Browser onresize event
                    window.onresize = function () {
                        scope.$apply();
                    };
                    
                    // scope.data return as a $promise
                    scope.data.$promise.then(function(weatherDay) {
                        var dataSet = _.map(weatherDay.list, function(item) {
                            return commonServices.convertToFahrenheit(item.temp.max);
                        }); 
                        scope.render(dataSet);
                    });
                    
                    
                    // Watch for resize event
                    scope.$watch(function () {
                        return angular.element($window)[0].innerWidth;
                    }, function () {
                        
                        //scope.render(self.dataSet);
                    });
                    
                    scope.render = function (dataSet) {
                        //Width and height
                        var w = 500;
                        var h = 100;
                        
                        var x = d3.scale.ordinal()
                            .rangeRoundBands([0, w], .1);
                        
                        var y0 = d3.scale.linear().domain([300, 1100]).range([h, 0]);
                        
                        var xAxis = d3.svg.axis()
                            .scale(x)
                            .orient("bottom");
                        
                        var yAxisLeft = d3.svg.axis().scale(y0).ticks(4).orient("left");
                        
                        // remove all previous items before render
                        svg.selectAll('*').remove();
                        // If we don't pass any data, return out of the element
                        if (!dataSet) return;
                        // setup variables
                        svg.selectAll("rect")
                           .data(dataSet)
                           .enter()
                           .append("rect")
                           .attr("x", function(d, i) {
                                return i * (w / dataSet.length);
                            })
                            .attr("y", function(d) {
                                return h - (d * 1);  //Height minus data value
                            })                          
                            .attr("width", w / dataSet.length - barPadding)
                            .attr("height", function(d) {
                                return d * 1;  //TODO use scale 
                            })
                            .attr("fill", function(d) {
                                return "rgb(0, 0, " + (d * 10) + ")";
                            });
                        // text labels
                        svg.selectAll("text")
                            .data(dataSet)
                            .enter()
                            .append("text")
                            .attr("font-family", "sans-serif")
                            .attr("font-size", "11px")
                            .attr("fill", "white")
                            .attr("text-anchor", "middle")
                            .attr("font-family", "sans-serif")
                            .attr("font-size", "11px")
                            .attr("fill", "white")                    
                            .text(function(d) {
                                    return d;
                            })
                            .attr("x", function(d, i) {
                                return i * (w / dataSet.length) + (w / dataSet.length - barPadding) / 2;
                            })
                            .attr("y", function(d) {
                                return h - d + 14;  //15 is now 14
                            });                 
                    
                         svg.append("g")
                            .attr("class", "x axis")
                            .attr("transform", "translate(0," + h + ")")
                            .call(xAxis);
                        
                    };
                });
            }
        };
    }]);
})();