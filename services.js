(function() {
    weatherApp.service('forecastService', function() {
        var self = this;
    
        this.city = "San Francisco, CA";
        var getCity = function(city) {
            return self.city;
        };
    });

    weatherApp.service('weatherService', ['$resource', function($resource) {

        this.getWeather = function(city, days) {
            var weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", 
            {get:{method: "JSONP"}});

            return weatherAPI.get({q: city, cnt: days, appid: "eb26b387e93955f5d1ac1181ece31d23"}); 
        };

    }]);
})();