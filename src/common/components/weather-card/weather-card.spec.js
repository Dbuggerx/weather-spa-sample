import WeatherCardModule from './weather-card.module';
import 'angular-mocks';

describe('WeatherCard', () => {
  beforeEach(angular.mock.module(WeatherCardModule.name));

  describe('Controller', () => {
    let makeController;
    beforeEach(angular.mock.inject((_$rootScope_, _$controller_) => {
      makeController = () => {
        const ctrl = _$controller_('WeatherCardCtrl', {
          $scope: _$rootScope_.$new()
        });
        ctrl.weather = {
          "coord": {
            "lon": 145.77,
            "lat": -16.92
          },
          "weather": [{
            "id": 803,
            "main": "Clouds",
            "description": "broken clouds",
            "icon": "04n"
          }],
          "base": "cmc stations",
          "main": {
            "temp": 293.25,
            "pressure": 1019,
            "humidity": 83,
            "temp_min": 289.82,
            "temp_max": 295.37
          },
          "wind": {
            "speed": 5.1,
            "deg": 150
          },
          "clouds": {
            "all": 75
          },
          "rain": {
            "3h": 3
          },
          "snow": {
            "3h": 4
          },
          "dt": 1435658272,
          "sys": {
            "type": 1,
            "id": 8166,
            "message": 0.0166,
            "country": "AU",
            "sunrise": 1435610796,
            "sunset": 1435650870
          },
          "id": 2172797,
          "name": "Cairns",
          "cod": 200
        };
        return ctrl;
      };
    }));

    describe('weatherAvailable', () => {
      it('should reflect data availability', () => {
        const controller = makeController();
        expect(controller.weatherAvailable).toBeTruthy();
        controller.weather = null;
        expect(controller.weatherAvailable).toBeFalsy();
      });
    });

    describe('currentDate', () => {
      it('should return the formatted value', () => {
        const controller = makeController();
        expect(controller.currentDate).toBe('Tuesday, June 30th 2015');
      });
      it('should null when weather is not available', () => {
        const controller = makeController();
        controller.weather = null;
        expect(controller.currentDate).toBeNull();
      });
    });

    describe('hasWeatherData', () => {
      it('should reflect data availability', () => {
        const controller = makeController();
        expect(controller.hasWeatherData).toBeTruthy();
        controller.weather = null;
        expect(controller.hasWeatherData).toBeFalsy();
      });
    });

    describe('condition', () => {
      it('should return the formatted value', () => {
        const controller = makeController();
        expect(controller.condition).toBe('Clouds');
      });
      it('should null when weather is not available', () => {
        const controller = makeController();
        controller.weather = null;
        expect(controller.condition).toBeNull();
      });
    });

    describe('description', () => {
      it('should return the formatted value', () => {
        const controller = makeController();
        expect(controller.description).toBe('broken clouds');
      });
      it('should null when weather is not available', () => {
        const controller = makeController();
        controller.weather = null;
        expect(controller.description).toBeNull();
      });
    });

    describe('iconUrl', () => {
      it('should return the formatted value', () => {
        const controller = makeController();
        expect(controller.iconUrl).toBe('http://openweathermap.org/img/w/04n.png');
      });
      it('should null when weather is not available', () => {
        const controller = makeController();
        controller.weather = null;
        expect(controller.iconUrl).toBeNull();
      });
    });

    describe('hasMainData', () => {
      it('should reflect data availability', () => {
        const controller = makeController();
        expect(controller.hasMainData).toBeTruthy();
        controller.weather = null;
        expect(controller.hasMainData).toBeFalsy();
      });
    });

    describe('temperature', () => {
      it('should return the formatted value', () => {
        const controller = makeController();
        expect(controller.temperature).toBe('293℃');
      });
      it('should null when weather is not available', () => {
        const controller = makeController();
        controller.weather = null;
        expect(controller.temperature).toBeNull();
      });
    });

    describe('minTemperature', () => {
      it('should return the formatted value', () => {
        const controller = makeController();
        expect(controller.minTemperature).toBe('289℃');
      });
      it('should null when weather is not available', () => {
        const controller = makeController();
        controller.weather = null;
        expect(controller.minTemperature).toBeNull();
      });
    });

    describe('maxTemperature', () => {
      it('should return the formatted value', () => {
        const controller = makeController();
        expect(controller.maxTemperature).toBe('295℃');
      });
      it('should null when weather is not available', () => {
        const controller = makeController();
        controller.weather = null;
        expect(controller.maxTemperature).toBeNull();
      });
    });

    describe('shouldShowMinMaxTemp', () => {
      it('should return true when min and max temperatures are different', () => {
        const controller = makeController();
        expect(controller.shouldShowMinMaxTemp).toBeTruthy();
      });
      it('should return false when min and max temperatures are equal', () => {
        const controller = makeController();
        controller.weather.main.temp_min = 123;
        controller.weather.main.temp_max = 123;
        expect(controller.shouldShowMinMaxTemp).toBeFalsy();
      });
    });

    describe('humidity', () => {
      it('should return the formatted value', () => {
        const controller = makeController();
        expect(controller.humidity).toBe('83%');
      });
      it('should null when weather is not available', () => {
        const controller = makeController();
        controller.weather = null;
        expect(controller.humidity).toBeNull();
      });
    });

    describe('hasWind', () => {
      it('should reflect data availability', () => {
        const controller = makeController();
        expect(controller.hasWind).toBeTruthy();
        controller.weather = null;
        expect(controller.hasWind).toBeFalsy();
      });
    });

    describe('windSpeed', () => {
      it('should return the formatted value', () => {
        const controller = makeController();
        expect(controller.windSpeed).toBe('5.1 meter/sec');
      });
      it('should null when weather is not available', () => {
        const controller = makeController();
        controller.weather = null;
        expect(controller.windSpeed).toBeNull();
      });
    });

    describe('hasClouds', () => {
      it('should reflect data availability', () => {
        const controller = makeController();
        expect(controller.hasClouds).toBeTruthy();
        controller.weather = null;
        expect(controller.hasClouds).toBeFalsy();
      });
    });

    describe('cloudiness', () => {
      it('should return the formatted value', () => {
        const controller = makeController();
        expect(controller.cloudiness).toBe('75%');
      });
      it('should null when weather is not available', () => {
        const controller = makeController();
        controller.weather = null;
        expect(controller.cloudiness).toBeNull();
      });
    });

    describe('hasRain', () => {
      it('should reflect data availability', () => {
        const controller = makeController();
        expect(controller.hasRain).toBeTruthy();
        controller.weather = null;
        expect(controller.hasRain).toBeFalsy();
      });
    });

    describe('rain', () => {
      it('should return the formatted value', () => {
        const controller = makeController();
        expect(controller.rain).toBe('3.00 in the last 3 hours');
      });
      it('should null when weather is not available', () => {
        const controller = makeController();
        controller.weather = null;
        expect(controller.rain).toBeNull();
      });
    });

    describe('hasSnow', () => {
      it('should reflect data availability', () => {
        const controller = makeController();
        expect(controller.hasSnow).toBeTruthy();
        controller.weather = null;
        expect(controller.hasSnow).toBeFalsy();
      });
    });

    describe('snow', () => {
      it('should return the formatted value', () => {
        const controller = makeController();
        expect(controller.snow).toBe('4.00 in the last 3 hours');
      });
      it('should null when weather is not available', () => {
        const controller = makeController();
        controller.weather = null;
        expect(controller.snow).toBeNull();
      });
    });

  });

});
