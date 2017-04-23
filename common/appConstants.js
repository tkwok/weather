/* Created by Tony Kwok on 12/29/2916 */
(function() {
    /* TODO refactor me */
    weatherApp.constant('appConstants', {
        APP_NAME: "WeatherIma",
        /* remember to remove keys before push */
        WEATHER_API_KEY: "eb26b387e93955f5d1ac1181ece31d23",
        WEATHER_API_URL: "http://api.openweathermap.org/data/2.5/forecast/daily",
        AUTOCOMPLETE_API_KEY: "",
        AUTOCOMPLETE_API_URL: "https://maps.googleapis.com/maps/api/place/autocomplete/json?",
        // define all app constants here 
        WEATHER_DATE_FORMAT: "EEEE, MMMM dd, yyyy",
        FOOTER_TEXT: "Copyright 2017 Tony Kwok. All rights reserved.",
        homepage: {
            CITY_NOT_FOUND: 'Input City Not Found',
            SUBMIT_BUTTOM_LABEL: "Get Forecast"
        },
        forecastPage: {
            FORECAST_TEMPERATURE_UNITS: [{
                displayName: "Fahrenheit",
                id: "fahrenheit",
                symbol: "°F"
            }, {
                displayName: "Celsius",
                id: "celsius",
                symbol: "°C"
            }],
            FORECAST_BAR_CHART_DATA_TYPES: [{
                displayName: "Temperature Highs (Degree)",
                id: "tempHigh"
            }, {
                displayName: "Temperature Lows (Degree)",
                id: "tempLows"
            }, {
                displayName: "Humidity (%)",
                id: "humidity"
            }],
            FORECAST_DAYS: [{
                id: 'forecastTwoDays',
                displayName: "Next 2 Days",
                nextDays: 2,
                link: '#!/forecast/2'
            },{
                id: 'forecastFiveDays',
                displayName: "Next 5 Days",
                nextDays: 5,
                link: '#!/forecast/5'
            },{
                id: 'forecastSevenDays',
                displayName: "Next 7 Days",
                nextDays: 7,
                link: '#!/forecast/7'
            }],
            FORECAST_BAR_CHART_DATE_FORMAT: "MM/dd/yyyy",
            FORECAST_BAR_CHART_OPTIONS: {
                chart: {
                    type: 'discreteBarChart',
                    height: 450,
                    margin : {
                        top: 20,
                        right: 20,
                        bottom: 60,
                        left: 55
                    },
                    x: function(d){ return d.label; },
                    y: function(d){ return d.value; },
                    showValues: true,
                    valueFormat: function(d){
                        return d3.format('.f')(d);
                    },
                    transitionDuration: 500,
                    xAxis: {
                        axisLabel: 'Days'
                    },
                    yAxis: {
                        axisLabel: 'Temp',
                        axisLabelDistance: -10
                    }
                }
            }
        }
    });
})();
