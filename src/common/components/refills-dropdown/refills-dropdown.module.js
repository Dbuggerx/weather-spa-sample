import angular from 'angular';
import refillsDropdown from './refills-dropdown';

export default angular.module('refills-dropdown', [])
  .directive('refillsDropdown', refillsDropdown);
