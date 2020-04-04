var app = angular.module("app", [
    'ui.router', 
    'ngLoadScript', 
    'ui.knob', 
    'chart.js', 
    'ui.bootstrap', 
    'gantt',
    'gantt.tooltips',
    'gantt.progress',
    'gantt.table',
    'gantt.tree',
    'gantt.groups',
    'ng-nvd3'
    ]);

app.run(['$location', '$rootScope', function( $location, $rootScope ){
    $rootScope.$on( '$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
        if (typeof toState.title != "undefined") {
            $rootScope.title = toState.title;
        }
    });
    $rootScope.$on("$locationChangeStart", function(event, next, current){
        // Prevent page navigation if collapsing/expanding side bar entry
        if (next.indexOf('#') < 0) {
            event.preventDefault();
        }
    })
    // Load default content
    $location.path('/day/hours/af');
}]);

app.config(["$locationProvider", function($locationProvider) {
  $locationProvider.html5Mode(false);
}]);