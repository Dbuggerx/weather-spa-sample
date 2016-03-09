import angular from 'angular';
import 'angular-ui-router';
import './common/templates';
import home from './home/home.module';
import zipform from './zipcode-form/zipcode-form.module';
import refillsDropdown from './common/components/refills-dropdown/refills-dropdown.module';

export default angular.module('weather', [
    'templates',
    'ui.router',
    home.name,
    zipform.name,
    refillsDropdown.name
  ])
  .config(($stateProvider, $locationProvider) => {
    'ngInject';
    $stateProvider.state('weather', {
      abstract: true,
      templateUrl: 'app.html'
    });
    $locationProvider.html5Mode(true);
  });
