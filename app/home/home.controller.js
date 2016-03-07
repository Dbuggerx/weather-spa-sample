import Geolocation from '../common/services/geolocation/geolocation';

const privates = new WeakMap();

export default class HomeCtrl {
  constructor($scope, $state, OpenWeather) {
    'ngInject';
    this.msg = 'Hello world';

    privates.set(this, {
      $scope, $state, OpenWeather
    });

    this.getWeatherByGeolocation();
  }

  getWeatherByGeolocation(){
    const me = privates.get(this);
    return Geolocation.getLocation()
      .then(position => me.OpenWeather.getByGeolocation(position.coords.latitude, position.coords.longitude))
      .then(weather => {
        this.weather = weather;
        me.$scope.$digest();
      })
      .catch(err => console.log(err));
  }
}
