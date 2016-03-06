import angular from 'angular';
import config from './home.config';
import HomeController from './home.controller';

export default angular.module('weather.home', ['ui.router'])
  .config(config)
  .controller('HomeCtrl', HomeController);
