import angular from 'angular';
import config from './zipcode-form.config';
import ctrl from './zipcode-form.controller';
import openWeather from '../common/services/open-weather/open-weather.module';
import weatherCard from '../common/components/weather-card/weather-card.module';

export default angular.module('weather.zipcode-form', [
    'ui.router',
    openWeather.name,
    weatherCard.name
  ])
  .config(config)
  .controller('ZipcodeFormController', ctrl);
