import angular from 'angular';
import capitalize from './capitalize';

export default angular.module('capitalize', [])
  .filter('capitalize', capitalize);
