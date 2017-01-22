import angular from 'angular';
import WeatherCardCtrl from './weather-card.controller';
import weatherCard from './weather-card';
import capitalize from '../../filters/capitalize/capitalize.module.js';

export default angular.module('weather.card', [capitalize.name])
  .controller('WeatherCardCtrl', WeatherCardCtrl)
  .component('weatherCard', weatherCard);
