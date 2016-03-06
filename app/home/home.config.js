import 'angular-ui-router';

export default function ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider.state('weather.home', {
    url: '/home',
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl as homeCtrl'
  });
  $urlRouterProvider.otherwise('/home');
}
