/* Created by Tony Kwok on 12/29/2916 */

(function() {
    // config sce whitelisting app-wide 
    weatherApp.config(['$sceDelegateProvider', function($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            'self', 'http://api.openweathermap.org/**',
            'self', 'https://maps.googleapis.com/**'
        ]);
    }]);
})();
    