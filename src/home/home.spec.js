/* eslint one-var: "off" */
import HomeModule from './home.module';
import MainModule from '../app';
import Geolocation from '../common/services/geolocation/geolocation';
import HomeController from './home.controller';
import 'angular-mocks';

describe('Home', () => {
  beforeEach(angular.mock.module(HomeModule.name));

  describe('Module', () => {
    let $state, $scope;
    beforeEach(angular.mock.module(MainModule.name));
    beforeEach(angular.mock.inject((_$state_, $rootScope, $templateCache) => {
      $state = _$state_;
      $templateCache.put('app.html', '');
      $templateCache.put('home/home.html', '');
      $scope = $rootScope.$new();
    }));

    it('should redirect to /home', () => {
      $scope.$apply();
      expect($state.current.name).toEqual('weather.home');
    });

    it('should respond to URL', () => {
      expect($state.href('weather.home')).toEqual('/home');
    });
  });

  describe('Controller', () => {
    let $scope, makeController, openWeatherMock;
    beforeEach(angular.mock.inject((_$rootScope_, _$controller_) => {
      $scope = _$rootScope_.$new();
      openWeatherMock = jasmine.createSpyObj('OpenWeather', ['getByGeolocation']);
      openWeatherMock.getByGeolocation.and.returnValue();
      makeController = () => _$controller_('HomeController', {
        $scope,
        OpenWeather: openWeatherMock
      });
      spyOn(Geolocation, 'getLocation').and.returnValue(Promise.resolve({
        coords: {
          latitude: 123,
          longitude: 456
        }
      }));
    }));

    describe('constructor', () => {
      let getLocationByGeolocationSpy;
      beforeEach(() => getLocationByGeolocationSpy = spyOn(HomeController.prototype, 'getWeatherByGeolocation').and.returnValue());
      it('should call getWeatherByGeolocation', () => {
        makeController();
        expect(getLocationByGeolocationSpy).toHaveBeenCalled();
      });
    });

    describe('getWeatherByGeolocation', () => {
      it('should call Geolocation.getLocation', () => {
        makeController();
        expect(Geolocation.getLocation).toHaveBeenCalled();
      });

      it('should call OpenWeather.getByGeolocation', done => {
        const controller = makeController();
        controller.getWeatherByGeolocation().then(() => {
          expect(openWeatherMock.getByGeolocation).toHaveBeenCalled();
          done();
        });
      });
    });
  });
});
