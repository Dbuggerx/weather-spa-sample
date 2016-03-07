import angular from 'angular';
import config from './home.config';
import HomeCtrl from './home.controller';
import openWeather from '../common/services/open-weather/open-weather.module';
import weatherCard from '../common/components/weather-card/weather-card.module';

export default angular.module('weather.home', [
    'ui.router',
    openWeather.name,
    weatherCard.name
  ])
  .config(config)
  .controller('HomeCtrl', HomeCtrl);
