import OpenWeatherModule from './open-weather.module';
import 'angular-mocks';

describe('OpenWeather Service', () => {
  let OpenWeather, $httpBackend;
  beforeEach(angular.mock.module(OpenWeatherModule.name));
  beforeEach(inject((_$httpBackend_, _OpenWeather_) => {
    $httpBackend = _$httpBackend_;
    OpenWeather = _OpenWeather_;
  }));

  it('should be defined', () => {
    expect(OpenWeather).toBeDefined();
  });

  describe('getByGeolocation', () => {
    it('should call OpenWeatherMap.org', done => {
      $httpBackend.expectGET('http://api.openweathermap.org/data/2.5/weather?lat=123&lon=456&units=metric&APPID=a22b2fa4abeb9caf7969f9961e7970b8')
        .respond({
          test: 'Api response'
        });
      OpenWeather.getByGeolocation(123, 456).then(data => {
        expect(data.test).toBe('Api response');
        done();
      });
      $httpBackend.flush();
    });
  });

  describe('getByZip', () => {
    it('should call OpenWeatherMap.org', done => {
      $httpBackend.expectGET('http://api.openweathermap.org/data/2.5/weather?zip=123,us&units=metric&APPID=a22b2fa4abeb9caf7969f9961e7970b8')
        .respond({
          test: 'Api response'
        });
      OpenWeather.getByZip(123, 'us').then(data => {
        expect(data.test).toBe('Api response');
        done();
      });
      $httpBackend.flush();
    });
  });

});
