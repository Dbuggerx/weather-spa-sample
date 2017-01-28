import 'angular-ui-router';

export default ['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider.state('weather.home', {
    url: '/home',
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl as homeCtrl'
  });
  $urlRouterProvider.otherwise('/home');
}]
