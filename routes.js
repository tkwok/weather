(function() {
    weatherApp.config(function($routeProvider) {
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
    });
})();