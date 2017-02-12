import moment from 'moment';

export default class WeatherCardController {
  constructor() {
    'ngInject';
  }

  get weatherAvailable() {
    return this.weather;
  }

  getWeatherData(fnGetData) {
    return !this.weatherAvailable ? null : fnGetData(this.weather);
  }

  get currentDate() {
    return this.getWeatherData(weather => moment.unix(weather.dt).utc().format('dddd, MMMM Do YYYY'));
  }

  get hasWeatherData() {
    return this.weatherAvailable && this.weather.weather.length;
  }

  get condition() {
    return this.getWeatherData(weather => weather.weather[0].main);
  }

  get description() {
    return this.getWeatherData(weather => weather.weather[0].description);
  }

  get iconUrl() {
    return this.getWeatherData(weather => `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`);
  }

  get hasMainData() {
    return this.weatherAvailable && this.weather.main;
  }
  get temperature() {
    return this.getWeatherData(weather => `${Math.floor(weather.main.temp)}\u2103`);
  }
  get minTemperature() {
    return this.getWeatherData(weather => `${Math.floor(weather.main.temp_min)}\u2103`);
  }
  get maxTemperature() {
    return this.getWeatherData(weather => `${Math.floor(weather.main.temp_max)}\u2103`);
  }
  get shouldShowMinMaxTemp() {
    return this.getWeatherData(weather => weather.main.temp_min != weather.main.temp_max);
  }
  get humidity() {
    return this.getWeatherData(weather => `${weather.main.humidity }%`);
  }

  get hasWind() {
    return this.weatherAvailable && this.weather.wind;
  }
  get windSpeed() {
    return this.getWeatherData(weather => `${weather.wind.speed } meter/sec`);
  }

  get hasClouds() {
    return this.weatherAvailable && this.weather.clouds;
  }
  get cloudiness() {
    return this.getWeatherData(weather => `${weather.clouds.all }%`);
  }

  get hasRain() {
    return this.weatherAvailable && this.weather.rain;
  }
  get rain() {
    return this.getWeatherData(weather => `${weather.rain['3h'].toFixed(2) } in the last 3 hours`);
  }

  get hasSnow() {
    return this.weatherAvailable && this.weather.snow;
  }
  get snow() {
    return this.getWeatherData(weather => `${weather.snow['3h'].toFixed(2) } in the last 3 hours`);
  }
}
