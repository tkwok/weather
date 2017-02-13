/* Created by Tony Kwok on 12/29/2916 */

(function() {
    weatherApp.config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'pages/homepage.html',
                controller: 'homePageController'
            })
            .when('/forecast', {
                templateUrl: 'pages/forecastpage.html',
                controller: 'forecastPageController'
            })
            .when('/forecast/:days', {
                templateUrl: 'pages/forecastpage.html',
                controller: 'forecastPageController'
            });
        
         // use the HTML5 History API
        $locationProvider.html5Mode(true);
    });
})();