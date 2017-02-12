import 'angular-ui-router';

export default ['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
  $stateProvider.state('weather.home', {
    url: '/home',
    templateUrl: 'home/home.html',
    controller: 'HomeController as HomeController'
  });
  $urlRouterProvider.otherwise('/home');
}];
