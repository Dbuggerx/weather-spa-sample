import WeatherCardModule from './weather-card.module';
import 'angular-mocks';

describe('WeatherCard', () => {
  beforeEach(angular.mock.module(WeatherCardModule.name));

  describe('Controller', () => {
    let makeController;
    beforeEach(angular.mock.inject((_$rootScope_, _$controller_) => {
      makeController = () => _$controller_('WeatherCardCtrl', {
        $scope: _$rootScope_.$new()
      });
    }));

    it('should be defined', () => {
      const controller = makeController();
      expect(controller).toBeDefined();
    });
  });

});
