import angular from 'angular';
import 'angular-ui-router';
import './common/templates';
import home from './home/home.module';

export default angular.module('weather', [
    'templates',
    'ui.router',
    home.name
  ])
  .config(($stateProvider, $locationProvider) => {
    'ngInject';
    $stateProvider.state('weather', {
      abstract: true,
      templateUrl: 'app.html'
    });
    $locationProvider.html5Mode(true);
  });
