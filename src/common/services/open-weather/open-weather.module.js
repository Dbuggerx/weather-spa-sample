import angular from 'angular';
import 'angular-resource';
import OpenWeather from './open-weather';

export default angular.module('open-weather', ['ngResource'])
  .service('OpenWeather', OpenWeather);
