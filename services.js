/* Created by Tony Kwok on 12/29/2916 */

(function() {
    weatherApp.service('forecastService', ['appConstants', function(appConstants) {
        var self = this;

        // default city, private variable
        this.city = angular.copy(appConstants.DEFAULT_CITY);
        
        // city getter
        this.getCity = function() {
            return self.city;
        };
        // city setter
        this.setCity = function(city) {
            self.city = city;
        };
    }]);

    weatherApp.service('weatherService', ['$resource', 'appConstants', function($resource, appConstants) {

        this.getWeather = function(city, days) {
            // deep-copy to preserve constant purity and break two-way binding
            // add variables for better testability
            var weatherApiKey = angular.copy(appConstants.WEATHER_API_KEY),
                weatherApiUrl = angular.copy(appConstants.WEATHER_API_URL),
                weatherApi = $resource(weatherApiUrl, {get:{method: "JSONP"}});
            
            return weatherApi.get({q: city, cnt: days, appid: weatherApiKey}); 
        };

    }]);
})();