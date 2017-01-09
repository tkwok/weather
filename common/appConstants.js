/* Created by Tony Kwok on 12/29/2916 */
(function() {
    /* TODO refactor me */
    weatherApp.constant('appConstants', {
        APP_NAME: "WeatherIma",
        /* remember to remove keys before push */
        WEATHER_API_KEY: "",
        WEATHER_API_URL: "http://api.openweathermap.org/data/2.5/forecast/daily",
        AUTOCOMPLETE_API_KEY: "",
        AUTOCOMPLETE_API_URL: "https://maps.googleapis.com/maps/api/place/autocomplete/json?",
        // define all app constants here 
        WEATHER_DATE_FORMAT: "EEEE, MMMM dd, yyyy",
        FOOTER_TEXT: "Copyright 2017 Tony Kwok. All rights reserved.",
        homepage: {
            CITY_NOT_FOUND: 'Input City Not Found',
            SUBMIT_BUTTOM_LABEL: "Get Forecast"
        }
    });
})();