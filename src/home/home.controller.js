import Geolocation from '../common/services/geolocation/geolocation';

const privates = new WeakMap();

export default class HomeController {
  static get $inject() {
    return ['$scope', '$state', 'OpenWeather'];
  }

  constructor($scope, $state, OpenWeather) {
    this.title = 'Waiting for your location...';

    privates.set(this, {
      $scope, $state, OpenWeather
    });

    this.getWeatherByGeolocation();
  }

  getWeatherByGeolocation() {
    const me = privates.get(this);
    return Geolocation.getLocation()
      .then(position => me.OpenWeather.getByGeolocation(position.coords.latitude, position.coords.longitude))
      .then(weather => {
        this.weather = weather;
        me.$scope.$digest();
      })
      .catch(err => me.$state.go('weather.zipcode-form'));
  }
}
