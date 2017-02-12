import angular from 'angular';
import WeatherCardController from './weather-card.controller';
import weatherCard from './weather-card';
import capitalize from '../../filters/capitalize/capitalize.module.js';

export default angular.module('weather.card', [capitalize.name])
  .controller('WeatherCardController', WeatherCardController)
  .component('weatherCard', weatherCard);
