import HomeModule from './home.module';
import 'angular-mocks';

describe('Home', () => {
  let makeController;

  beforeEach(angular.mock.module(HomeModule.name));
  beforeEach(angular.mock.inject((_$rootScope_, _$controller_) => {
    makeController = () => _$controller_('HomeCtrl', {
      $scope: _$rootScope_.$new()
    });
  }));

  describe('Controller', () => {
    it('should be defined', () => {
      const controller = makeController();
      expect(controller).toBeDefined();
    });
  });

});
