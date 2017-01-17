/* Created by Tony Kwok on 01/16/2916 */
(function () {
    // D3.js Factory for AngularJS, best approach for now to work in Angular
    weatherApp.factory('d3Service', ['$document', '$q', '$rootScope',
        function ($document, $q, $rootScope) {
            var d = $q.defer();

            function onScriptLoad() {
                // Load d3 client onto the page
                $rootScope.$apply(function () {
                    d.resolve(window.d3);
                });
            }
    
            var scriptTag = $document[0].createElement('script');
            scriptTag.type = 'text/javascript';
            scriptTag.async = true;
            scriptTag.src = 'http://d3js.org/d3.v3.min.js';
            
            scriptTag.onreadystatechange = function () {
                if (this.readyState === 'complete') onScriptLoad();
            }
            
            scriptTag.onload = onScriptLoad;
            
            var documentBody = $document[0].getElementsByTagName('body')[0];
            documentBody.appendChild(scriptTag);
            
            return {
                d3: function () {
                    return d.promise;
                }
            };
    }]);
})();