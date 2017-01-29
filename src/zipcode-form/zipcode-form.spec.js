import ZipcodeModule from './zipcode-form.module';
import MainModule from '../app';
import 'angular-mocks';

describe('Zipcode Form', () => {
  beforeEach(angular.mock.module(ZipcodeModule.name));

  describe('Module', () => {
    let $state, $scope;
    beforeEach(angular.mock.module(MainModule.name));
    beforeEach(angular.mock.inject((_$state_, $rootScope, $templateCache) => {
      $state = _$state_;
      $templateCache.put('app.html', '');
      $templateCache.put('zipcode-form/zipcode-form.html', '');
      $scope = $rootScope.$new();
    }));

    it('should respond to URL', () => {
      expect($state.href('weather.zipcode-form')).toEqual('/zipcode');
    });
  });

  describe('Controller', () => {
    let $scope, makeController, openWeatherMock;
    beforeEach(angular.mock.inject((_$rootScope_, _$controller_) => {
      $scope = _$rootScope_.$new();
      openWeatherMock = jasmine.createSpyObj('OpenWeather', ['getByZip']);
      openWeatherMock.getByZip.and.returnValue(Promise.resolve());
      makeController = () => _$controller_('ZipcodeFormCtrl', {
        $scope,
        OpenWeather: openWeatherMock
      });
    }));

    describe('getWeather', () => {
      it('should call getErrorMsg', () => {
        const controller = makeController();
        spyOn(controller, 'getErrorMsg').and.returnValue();
        controller.getWeather();
        expect(controller.getErrorMsg).toHaveBeenCalled();
      });

      it('should call OpenWeather.getByZip', () => {
        const controller = makeController();
        controller.country = {
          code: 'test',
          name: 'test'
        };
        controller.zipCode = '123456';
        controller.getWeather();
        expect(openWeatherMock.getByZip).toHaveBeenCalled();
      });
    });
    describe('getErrorMsg', () => {
      it('should return error for zipCode', () => {
        const controller = makeController();
        controller.zipCode = '';
        expect(controller.getErrorMsg()).toBe('Please inform the zipcode');
      });

      it('should return error for country', () => {
        const controller = makeController();
        controller.zipCode = '123';
        controller.country = {
          code: null
        };
        expect(controller.getErrorMsg()).toBe('Please inform the country');
      });

      it('should return null when zipCode and country are provided', () => {
        const controller = makeController();
        controller.country = {
          code: 'test'
        };
        controller.zipCode = '123456';
        expect(controller.getErrorMsg()).toBeNull();
      });
    });

  });

});
