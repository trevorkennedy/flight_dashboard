app.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/day/hours/af"); // For any unmatched url
    $stateProvider
        .state('hours_day', {title: '24 Hours', url: '/day/:view/:tab', controller: 'DayController', templateUrl: 'content/day.html'})
        .state('sorties_day', {title: '24 Hours', url: '/day:view/:tab', controller: 'DayController', templateUrl: 'content/day.html'})
        .state('hours_year', {title: '2 Years', url: '/year/:view', controller: 'YearController', templateUrl: 'content/year.html'})
        .state('sorties_year', {title: '2 Years', url: '/year:view', controller: 'YearController', templateUrl: 'content/year.html'})
        .state('outage', {title: 'Outages', url: '/outage', controller: 'OutageController', templateUrl: 'content/outage.html'})
    });