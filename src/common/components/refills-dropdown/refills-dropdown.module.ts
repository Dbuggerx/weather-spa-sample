import * as angular from 'angular';
import RefillsDropdown from './refills-dropdown';

export default angular.module('refills-dropdown', [])
  .directive('refillsDropdown', () => new RefillsDropdown());
