/* Created by Tony Kwok on 12/29/2916 */
(function() {
    weatherApp.service('forecastService', ['appConstants', function(appConstants) {
        var self = this;

        // default city, private variable
        this.city = null;
        
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

        /* TODO refactor this GET method to factory */
        this.getWeather = function(city, days) {
            // deep-copy to preserve constant purity and break two-way binding
            // add variables for better testability
            var weatherApiKey = _.cloneDeep(appConstants.WEATHER_API_KEY),
                weatherApiUrl = _.cloneDeep(appConstants.WEATHER_API_URL),
                weatherApi = $resource(weatherApiUrl, {get:{method: "JSONP"}});
            
            return weatherApi.get({q: city, cnt: days, appid: weatherApiKey}); 
        };
        
        // queries Google Places Autocomplete API to get autocomplete by cities
        this.getAutoComplete = function(userInput) {
            var self = this;
            
            var autoCompleteApiKey = _.cloneDeep(appConstants.AUTOCOMPLETE_API_KEY),
                autoCompleteApiUrl = _.cloneDeep(appConstants.AUTOCOMPLETE_API_URL),
                autoCompleteApi = $resource(autoCompleteApiUrl, {get:{method: "JSONP"}});
            
            autoCompleteApi.get({input: userInput, key: autoCompleteApiKey, types: '(cities)'});
            
            return [];            
        };

    }]);
})();